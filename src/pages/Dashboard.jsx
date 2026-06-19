import React from 'react'
import { useStore } from '../context/StoreContext'
import { calcSubtotal } from '../services/cartUtils'

export default function Dashboard(){
  const {state} = useStore()
  const cart = state?.cart ?? []
  const wishlist = state?.wishlist ?? []
  let orders = state?.orders ?? []
  if((!orders || orders.length === 0)){
    try{
      const stored = localStorage.getItem('orders') || localStorage.getItem('cartify_orders')
      if(stored){
        const parsed = JSON.parse(stored)
        if(Array.isArray(parsed) && parsed.length>0) orders = parsed
      }
    }catch(e){
      // ignore parse errors
    }
  }
  const recentlyViewed = state?.recentlyViewed ?? []

  const totalCart = cart.length
  const totalWishlist = wishlist.length
  const totalOrders = orders.length
  const totalAmount = orders.reduce((s,o)=> s + (Number(o?.total) || 0), 0)

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Dashboard</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='card'>
          <div className='text-sm text-gray-500'>Products in Cart</div>
          <div className='text-2xl font-bold'>{totalCart}</div>
        </div>
        <div className='card'>
          <div className='text-sm text-gray-500'>Wishlist Items</div>
          <div className='text-2xl font-bold'>{totalWishlist}</div>
        </div>
        <div className='card'>
          <div className='text-sm text-gray-500'>Order Amount</div>
          <div className='text-2xl font-bold'>₹{Number(totalAmount || 0).toFixed(2)}</div>
        </div>
        <div className='card'>
          <div className='text-sm text-gray-500'>Total Orders</div>
          <div className='text-2xl font-bold'>{totalOrders}</div>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='font-medium'>Recently Viewed</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
          {recentlyViewed.length === 0 ? (
            <div className='text-gray-500'>No recently viewed products</div>
          ) : (
            recentlyViewed.map(p => (
              <div key={p?.id || JSON.stringify(p)} className='card'>
                <img src={p?.thumbnail} className='w-full h-36 object-cover rounded' alt={p?.title || ''} />
                <div className='mt-2 font-medium'>{p?.title || 'Untitled'}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
