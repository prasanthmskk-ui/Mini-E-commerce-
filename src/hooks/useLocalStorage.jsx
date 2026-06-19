import { useCallback, useState } from 'react'

export default function useLocalStorage(key, initialValue){
  const [state, setState] = useState(()=>{
    try{
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    }catch(e){
      return initialValue
    }
  })

  const setPersisted = useCallback((value)=>{
    try{
      const v = typeof value === 'function' ? value(state) : value
      setState(v)
      localStorage.setItem(key, JSON.stringify(v))
    }catch(e){
      console.error('localStorage set error', e)
    }
  },[key, state])

  return [state, setPersisted]
}
