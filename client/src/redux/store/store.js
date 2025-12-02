import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/user'
import loaderReducer from '../slice/loader'
import brandReducer from '../slice/brand'
import categoryReducer from '../slice/category'
import sliderReducer from '../slice/slider'
import productReducer from '../slice/product'
import cartReducer from '../slice/cart'
import wishReducer from '../slice/wish'
import orderReducer from '../slice/order'
import contactReducer from '../slice/contact'

export default configureStore({
    reducer: {
        loader: loaderReducer,
        user: userReducer,
        brand: brandReducer,
        category: categoryReducer,
        slider: sliderReducer,
        product: productReducer,
        cart: cartReducer,
        wish: wishReducer,
        order: orderReducer,
        contact: contactReducer
    }
})