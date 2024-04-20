import React from 'react'
import { useOrder } from './context/OrderContext.js'

const Transaction = () => {

  const {symbol, price} = useOrder();
  return (
    <div>
      <h2> Stock : {symbol}</h2>
      <p>Price : {price}</p>
    </div>
  )
}

export default Transaction
