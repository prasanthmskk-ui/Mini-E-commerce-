import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function Rating({value=0}){
  const stars = []
  for(let i=1;i<=5;i++){
    if(value >= i) stars.push(<FaStar key={i} className='text-yellow-400' />)
    else if(value > i-1 && value < i) stars.push(<FaStarHalfAlt key={i} className='text-yellow-400' />)
    else stars.push(<FaRegStar key={i} className='text-yellow-400' />)
  }
  return <div className='flex items-center gap-1'>{stars}<span className='text-xs text-gray-500 ml-2'>{value.toFixed(1)}</span></div>
}
