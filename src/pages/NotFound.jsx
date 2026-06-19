import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className='text-center py-20'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='mt-2'>Page not found</p>
      <Link to='/' className='btn btn-primary mt-4 inline-block'>Go Home</Link>
    </div>
  )
}
