// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addItemTocart: (state, { payload }) => {
      const { product, quantity } = payload
      const idx = state.cartItems.findIndex(i => i.id === product.id)
      if (idx >= 0) state.cartItems[idx].quantity += quantity
      else state.cartItems.push({ ...product, quantity })
      state.total = state.cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0)
    },
    removeItemFromCart: (state, { payload: id }) => {
      state.cartItems = state.cartItems.filter(i => i.id !== id)
      state.total = state.cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.total = 0
    },
  },
})

export const { addItemTocart, removeItemFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
