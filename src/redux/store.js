




import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlices'
import cartReducer from './slices/cartSlices'
import orderReducer from './slices/orderSlices'
export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer
    },
})