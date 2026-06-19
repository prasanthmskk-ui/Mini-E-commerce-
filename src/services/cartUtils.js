export function calcSubtotal(cart){
  return cart.reduce((s,i)=> s + (i.price * (i.qty||1)), 0)
}

export function calcTax(subtotal, rate=0.12){
  return subtotal * rate
}

export function calcDelivery(subtotal){
  if(subtotal > 500) return 0
  return 50
}

export function calcGrandTotal(subtotal, tax, delivery, discount=0){
  return Math.max(0, subtotal + tax + delivery - discount)
}
