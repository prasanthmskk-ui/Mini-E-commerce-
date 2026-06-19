import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/api'
import { useStore } from '../context/StoreContext'
import Rating from '../components/Rating'

export default function ProductDetails(){
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const {dispatch} = useStore()

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const p = await fetchProductById(id)
        setProduct(p)
        dispatch({type:'ADD_RECENT', payload: p})
      }catch(e){
        setProduct(null)
      }finally{setLoading(false)}
    }
    load()
  },[id, dispatch])

  if(loading) return <div>Loading...</div>
  if(!product) return <div>Product not found</div>

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'>
        <img src={product.images?.[0]||product.thumbnail} alt={product.title} className='w-full h-96 object-cover rounded' />
        <div className='grid grid-cols-3 gap-2 mt-2'>
          {(product.images||[]).slice(0,3).map((src,i)=> (
            <img key={i} src={src} alt='' className='w-full h-24 object-cover rounded' />
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold'>{product.title}</h2>
        <div className='mt-2'><Rating value={product.rating} /></div>
        <div className='mt-4 text-lg font-bold'>₹{product.price}</div>
        <div className='mt-2 text-sm text-gray-500'>{product.stock} in stock • {product.brand}</div>
        <p className='mt-4 text-gray-700 dark:text-gray-300'>{product.description}</p>

        <div className='mt-6 flex gap-2'>
          <button onClick={()=>dispatch({type:'ADD_CART', payload:product})} className='btn btn-primary'>Add to Cart</button>
          <button onClick={()=>dispatch({type:'ADD_WISHLIST', payload:product})} className='btn btn-ghost'>Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}
