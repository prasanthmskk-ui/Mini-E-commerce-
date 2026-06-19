import React from 'react'

export default function Pagination({page, totalPages, onChange}){
  return (
    <div className='flex items-center gap-2 justify-center mt-6'>
      <button disabled={page<=1} onClick={()=>onChange(page-1)} className='btn btn-ghost'>Prev</button>
      <div>Page {page} / {totalPages}</div>
      <button disabled={page>=totalPages} onClick={()=>onChange(page+1)} className='btn btn-ghost'>Next</button>
    </div>
  )
}
