import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'

export default function App(){
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>} />
          <Route path='product/:id' element={<ProductDetails/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='wishlist' element={<Wishlist/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
      <ToastContainer position='top-right' />
    </>
  )
}
