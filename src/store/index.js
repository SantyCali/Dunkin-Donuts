import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import userReducer from './slices/userSlice'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'
import ordersReducer from './slices/ordersSlice'
import placesReducer from './slices/placesSlice' 

import { shopApi } from '../services/shopApi'
import { authApi } from '../services/authApi'
import { profileApi } from '../services/profileApi'
import { ordersApi } from '../services/ordersApi'

export const store = configureStore({
  reducer: {
    userReducer,
    shopReducer,
    cartReducer,
    ordersReducer,
    placesReducer,                               
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(ordersApi.middleware),
})

setupListeners(store.dispatch)
