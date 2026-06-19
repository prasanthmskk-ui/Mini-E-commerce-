import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { FiShoppingCart, FiHeart, FiMoon, FiSun } from 'react-icons/fi'

export default function Navbar(){
  const {state} = useStore()
  const cartCount = state.cart.reduce((s,i)=>s + (i.qty||0),0)
  const wishlistCount = state.wishlist.length
  const [theme, setTheme] = useState('light')
  const navigate = useNavigate()

  function toggleTheme(){
    const root = document.documentElement
    if(theme === 'light'){
      root.classList.add('dark')
      setTheme('dark')
    } else {
      root.classList.remove('dark')
      setTheme('light')
    }
  }

  return (
    <header className='bg-white dark:bg-gray-800 shadow'>
      <div className='container flex items-center justify-between py-4'>
        <div className='flex items-center gap-4'>
          <Link to='/' className='flex items-center gap-2'>
            <img src='/src/assets/logo.svg' alt='logo' className='w-8 h-8' />
            <span className='font-semibold text-lg'>Cartify Pro</span>
          </Link>
        </div>

        <nav className='flex items-center gap-4'>
          <NavLink to='/' className={({isActive})=> isActive? 'text-brand-500':'text-gray-600'}>Home</NavLink>
          <NavLink to='/dashboard' className={({isActive})=> isActive? 'text-brand-500':'text-gray-600'}>Dashboard</NavLink>
          <button onClick={()=>navigate('/wishlist')} className='relative'>
            <FiHeart className='text-xl' />
            {wishlistCount>0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{wishlistCount}</span>}
          </button>
          <button onClick={()=>navigate('/cart')} className='relative'>
            <FiShoppingCart className='text-xl' />
            {cartCount>0 && <span className='absolute -top-2 -right-2 bg-brand-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cartCount}</span>}
          </button>
          <button onClick={toggleTheme} className='ml-2'>
            {theme==='light'?<FiMoon/>:<FiSun/>}
          </button>
        </nav>
      </div>
    </header>
  )
}
