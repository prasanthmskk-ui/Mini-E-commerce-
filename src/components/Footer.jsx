import React from 'react'

export default function Footer(){
  return (
    <footer className='bg-white dark:bg-gray-900 border-t mt-8'>
      <div className='container py-6 text-sm text-gray-600 dark:text-gray-300 flex justify-between'>
        <div>© {new Date().getFullYear()} Cartify Pro — Built with ❤️</div>
        <div>Made for demo • DummyJSON data</div>
      </div>
    </footer>
  )
}
