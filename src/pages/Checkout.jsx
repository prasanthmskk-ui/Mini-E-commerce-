import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { calcSubtotal, calcTax, calcDelivery, calcGrandTotal } from '../services/cartUtils'
import { toast } from 'react-toastify'

export default function Checkout(){
  const store = useStore() || {}
  const { state = {}, dispatch = () => {}, placeOrder: ctxPlaceOrder, clearCart: ctxClearCart } = store

  // fallback helpers if context doesn't provide them
  const placeOrder = typeof ctxPlaceOrder === 'function' ? ctxPlaceOrder : (orderPayload) => {
    const newOrder = { ...orderPayload, id: Date.now().toString() }
    try{
      const existing = JSON.parse(localStorage.getItem('orders') || '[]')
      const updated = [...existing, newOrder]
      localStorage.setItem('orders', JSON.stringify(updated))
      dispatch({type:'SET_ORDERS', payload: updated})
    }catch(e){
      console.error('fallback placeOrder failed', e)
    }
    return newOrder
  }

  const clearCart = typeof ctxClearCart === 'function' ? ctxClearCart : () => dispatch({type: 'CLEAR_CART'})
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('')
  const cart = state?.cart ?? []
  const subtotal = calcSubtotal(cart)
  const tax = calcTax(subtotal)
  const delivery = calcDelivery(subtotal)

  function applyCoupon(){
    if(coupon==='SAVE50'){
      dispatch({type:'APPLY_COUPON', payload:{code:coupon, discount:50}})
    } else {
      dispatch({type:'APPLY_COUPON', payload:null})
    }
  }

  const grand = calcGrandTotal(subtotal, tax, delivery, state.coupon?.discount||0)

  const handlePlaceOrder = () => {
    if(!cart || cart.length === 0){
      alert('Your cart is empty! Add items before placing an order.')
      toast.info('Your cart is empty')
      return
    }

    const payload = {
      items: cart,
      subtotal,
      tax,
      delivery,
      discount: state.coupon?.discount || 0,
      total: calcGrandTotal(subtotal, tax, delivery, state.coupon?.discount||0),
      createdAt: new Date().toISOString()
    }

    try{
      // placeOrder persists to localStorage and updates context state synchronously
      placeOrder(payload)
      // clear cart via provided helper
      clearCart()
      toast.success('Order placed successfully')
      // small delay to let localStorage/state settle, then navigate
      setTimeout(()=>navigate('/dashboard'), 120)
    }catch(err){
      console.error('Order processing failed:', err)
      toast.error('Order failed. Try again.')
    }
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'>
        <h2 className='text-xl font-semibold'>Checkout</h2>
        <div className='mt-4 card'>
          <h3 className='font-medium'>Shipping Details</h3>
          <p className='text-sm text-gray-500 mt-2'>Demo checkout — no real payment integration.</p>
        </div>
      </div>
      <aside className='card'>
        <div className='space-y-2'>
          <div className='flex justify-between'><span>Subtotal</span><strong>₹{subtotal.toFixed(2)}</strong></div>
          <div className='flex justify-between'><span>Tax</span><strong>₹{tax.toFixed(2)}</strong></div>
          <div className='flex justify-between'><span>Delivery</span><strong>₹{delivery.toFixed(2)}</strong></div>
          <div className='mt-2'>
            <input placeholder='Coupon code' value={coupon} onChange={e=>setCoupon(e.target.value)} className='w-full p-2 border rounded' />
            <button onClick={applyCoupon} className='btn btn-primary w-full mt-2'>Apply</button>
          </div>
          <div className='border-t pt-2 flex justify-between text-lg'><span>Grand Total</span><strong>₹{grand.toFixed(2)}</strong></div>
        </div>
        <div className='mt-4'>
          <button onClick={handlePlaceOrder} disabled={cart.length===0} className='btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed'>Place Order</button>
        </div>
      </aside>
    </div>
  )
}
