import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeCartList: () => {},
})

export default CartContext
