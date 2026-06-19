import React from 'react'
import { useStore } from '../context/StoreContext'

export default function Wishlist(){
  const {state, dispatch} = useStore()

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Wishlist</h2>
      {state.wishlist.length===0 && <div>No items in wishlist</div>}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {state.wishlist.map(item=> (
          <div key={item.id} className='card'>
            <img src={item.thumbnail} alt='' className='w-full h-40 object-cover rounded' />
            <div className='mt-2'>
              <div className='font-medium'>{item.title}</div>
              <div className='mt-2 flex gap-2'>
                <button onClick={()=>dispatch({type:'MOVE_WISHLIST_TO_CART', payload:item.id})} className='btn btn-primary flex-1'>Move to Cart</button>
                <button onClick={()=>dispatch({type:'REMOVE_WISHLIST', payload:item.id})} className='btn btn-ghost'>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
