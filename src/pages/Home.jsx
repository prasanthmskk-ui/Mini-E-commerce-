import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories } from '../services/api'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Pagination from '../components/Pagination'

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    fetchCategories().then(setCategories).catch(()=>setCategories([]))
  },[])

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const limit = 12
        const skip = (page-1)*limit
        const data = await fetchProducts({limit, skip, q, category})
        let list = data.products || []
        if(sort==='price_asc') list = list.sort((a,b)=>a.price-b.price)
        if(sort==='price_desc') list = list.sort((a,b)=>b.price-a.price)
        setProducts(list)
        setTotalPages(Math.max(1, Math.ceil((data.total||list.length)/limit)))
      }catch(e){
        setProducts([])
      }finally{setLoading(false)}
    }
    load()
  },[page, q, category, sort])

  // client-side filtering in addition to server query
  const filteredProducts = products.filter(p => {
    if(!q) return true
    const ql = q.toLowerCase()
    const title = (p.title || '').toString().toLowerCase()
    const desc = (p.description || '').toString().toLowerCase()
    return title.includes(ql) || desc.includes(ql)
  })

  return (
    <div>
      <div className='flex gap-4 items-center mb-6'>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search products...' className='flex-1 p-2 border rounded' />
        <select value={category} onChange={e=>setCategory(e.target.value)} className='p-2 border rounded'>
          <option value=''>All Categories</option>
          {categories.map((c, idx) => {
            // support categories as strings or objects
            const isObj = c && typeof c === 'object'
            const key = isObj ? (c.slug || c.url || c.id || idx) : c || idx
            const value = isObj ? (c.slug || c.url || c.id || '') : c
            const label = isObj ? (c.name || c.title || c.slug || c.url) : c
            return (
              <option key={key} value={value}>{label}</option>
            )
          })}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className='p-2 border rounded'>
          <option value=''>Sort</option>
          <option value='price_asc'>Price: Low to High</option>
          <option value='price_desc'>Price: High to Low</option>
        </select>
      </div>

      {loading ? <LoadingSkeleton count={12} /> : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredProducts.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
