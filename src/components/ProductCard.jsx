import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useStore } from '../context/StoreContext'

export default function ProductCard({product}){
  const {dispatch} = useStore()

  function addToCart(){
    dispatch({type:'ADD_CART', payload:product})
  }
  function addToWishlist(){
    dispatch({type:'ADD_WISHLIST', payload:product})
  }

  return (
    <div className='card'>
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className='w-full h-40 object-cover rounded' />
      </Link>
      <div className='mt-3'>
        <Link to={`/product/${product.id}`} className='font-medium block'>{product.title}</Link>
        <div className='text-sm text-gray-500'>{product.category}</div>
        <div className='flex items-center justify-between mt-2'>
          <div>
            <div className='text-lg font-semibold'>₹{product.price}</div>
            <div className='text-xs text-gray-500'>{product.stock} in stock</div>
          </div>
          <Rating value={product.rating} />
        </div>
        <div className='mt-3 flex gap-2'>
          <button onClick={addToCart} className='btn btn-primary flex-1'>Add</button>
          <button onClick={addToWishlist} className='btn btn-ghost'>♡</button>
        </div>
      </div>
    </div>
  )
}
