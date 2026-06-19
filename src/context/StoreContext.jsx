import React, { createContext, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const StoreContext = createContext()

const initialState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  coupon: null,
  orders: []
}

function reducer(state, action){
  switch(action.type){
    case 'INIT':
      return {...state, ...action.payload}
    case 'ADD_CART':{
      const item = action.payload
      const exists = state.cart.find(i=>i.id===item.id)
      let cart
      if(exists){
        cart = state.cart.map(i=> i.id===item.id ? {...i, qty: i.qty+1} : i)
      } else {
        cart = [...state.cart, {...item, qty:1}]
      }
      return {...state, cart}
    }
    case 'REMOVE_CART':{
      const id = action.payload
      return {...state, cart: state.cart.filter(i=>i.id!==id)}
    }
    case 'SET_QTY':{
      const {id, qty} = action.payload
      return {...state, cart: state.cart.map(i=> i.id===id?{...i, qty}:i)}
    }
    case 'CLEAR_CART':
      return {...state, cart: []}
    case 'ADD_WISHLIST':{
      const item = action.payload
      if(state.wishlist.find(i=>i.id===item.id)) return state
      return {...state, wishlist:[...state.wishlist, item]}
    }
    case 'REMOVE_WISHLIST':{
      const id = action.payload
      return {...state, wishlist: state.wishlist.filter(i=>i.id!==id)}
    }
    case 'MOVE_WISHLIST_TO_CART':{
      const id = action.payload
      const item = state.wishlist.find(i=>i.id===id)
      if(!item) return state
      const newWishlist = state.wishlist.filter(i=>i.id!==id)
      const exists = state.cart.find(i=>i.id===id)
      let cart = state.cart
      if(exists) cart = state.cart.map(i=> i.id===id?{...i, qty: i.qty+1}:i)
      else cart = [...state.cart, {...item, qty:1}]
      return {...state, wishlist:newWishlist, cart}
    }
    case 'ADD_RECENT':{
      const item = action.payload
      const arr = state.recentlyViewed.filter(i=>i.id!==item.id)
      arr.unshift(item)
      return {...state, recentlyViewed: arr.slice(0,12)}
    }
    case 'APPLY_COUPON':{
      return {...state, coupon: action.payload}
    }
    case 'ADD_ORDER':{
      const order = action.payload
      const orders = [order, ...(state.orders || [])]
      return {...state, orders}
    }
    case 'SET_ORDERS':{
      return {...state, orders: action.payload}
    }
    default:
      return state
  }
}

export function StoreProvider({children}){
  const [persisted, setPersisted] = useLocalStorage('cartify_state', initialState)
  const [state, dispatch] = useReducer(reducer, persisted || initialState)

  useEffect(()=>{
    setPersisted(state)
  },[state, setPersisted])

  // Persist orders immediately to a dedicated key to ensure other pages can read them
  useEffect(()=>{
    try{
      const key = 'cartify_orders'
      localStorage.setItem(key, JSON.stringify(state.orders || []))
    }catch(e){
      // ignore
    }
  },[state.orders])

  // placeOrder helper writes orders to localStorage immediately and updates state
  function placeOrder(orderPayload){
    const newOrder = { ...orderPayload, id: Date.now().toString() }
    const updatedOrders = [...(state.orders || []), newOrder]
    try{
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
    }catch(e){
      console.error('Failed to persist orders to localStorage', e)
    }
    dispatch({type:'SET_ORDERS', payload: updatedOrders})
    return newOrder
  }

  function clearCart(){
    dispatch({type:'CLEAR_CART'})
  }

  return (
    <StoreContext.Provider value={{state, dispatch, placeOrder, clearCart}}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(){
  return useContext(StoreContext)
}
