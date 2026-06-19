import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { calcSubtotal, calcTax, calcDelivery, calcGrandTotal } from '../services/cartUtils'

export default function Cart(){
  const {state, dispatch} = useStore()
  const navigate = useNavigate()
  const subtotal = calcSubtotal(state.cart)
  const tax = calcTax(subtotal)
  const delivery = calcDelivery(subtotal)
  const grand = calcGrandTotal(subtotal, tax, delivery, state.coupon?.discount||0)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'>
        <h2 className='text-xl font-semibold mb-4'>Shopping Cart</h2>
        {state.cart.length===0 && <div>Your cart is empty</div>}
        <div className='space-y-4'>
          {state.cart.map(item=> (
            <div key={item.id} className='card flex gap-4 items-center'>
              <img src={item.thumbnail} alt='' className='w-24 h-24 object-cover rounded' />
              <div className='flex-1'>
                <div className='font-medium'>{item.title}</div>
                <div className='text-sm text-gray-500'>₹{item.price} • {item.brand}</div>
              </div>
              <div className='flex items-center gap-2'>
                <button onClick={()=>dispatch({type:'SET_QTY', payload:{id:item.id, qty: Math.max(1, (item.qty||1)-1)}})} className='btn btn-ghost'>-</button>
                <div className='px-2'>{item.qty||1}</div>
                <button onClick={()=>dispatch({type:'SET_QTY', payload:{id:item.id, qty:(item.qty||1)+1}})} className='btn btn-ghost'>+</button>
                <button onClick={()=>dispatch({type:'REMOVE_CART', payload:item.id})} className='btn btn-ghost text-red-500'>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className='card'>
        <h3 className='font-semibold'>Order Summary</h3>
        <div className='mt-4 space-y-2'>
          <div className='flex justify-between'><span>Subtotal</span><strong>₹{subtotal.toFixed(2)}</strong></div>
          <div className='flex justify-between'><span>Tax</span><strong>₹{tax.toFixed(2)}</strong></div>
          <div className='flex justify-between'><span>Delivery</span><strong>₹{delivery.toFixed(2)}</strong></div>
          {state.coupon && <div className='flex justify-between text-green-600'><span>Coupon</span><strong>-₹{state.coupon.discount}</strong></div>}
          <div className='border-t pt-2 flex justify-between text-lg'><span>Total</span><strong>₹{grand.toFixed(2)}</strong></div>
        </div>
        <div className='mt-4'>
          <button onClick={()=>navigate('/checkout')} className='btn btn-primary w-full'>Checkout</button>
          <button onClick={()=>dispatch({type:'CLEAR_CART'})} className='btn btn-ghost w-full mt-2'>Clear Cart</button>
        </div>
      </aside>
    </div>
  )
}
