import axios from 'axios'

const api = axios.create({baseURL: 'https://dummyjson.com'})

export async function fetchProducts(params = {}){
  const {limit=20, skip=0, q, category} = params
  let url = `/products?limit=${limit}&skip=${skip}`
  if(q) url += `&q=${encodeURIComponent(q)}`
  if(category) url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  const res = await api.get(url)
  return res.data
}

export async function fetchProductById(id){
  const res = await api.get(`/products/${id}`)
  return res.data
}

export async function fetchCategories(){
  const res = await api.get('/products/categories')
  return res.data
}
