import React from 'react'

export default function LoadingSkeleton({count=6}){
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({length:count}).map((_,i)=> (
        <div key={i} className='p-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse h-56' />
      ))}
    </div>
  )
}
