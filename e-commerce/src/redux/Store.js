import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice"
import checkoutReducer from "./slice/checkoutSlice"
import orderReducer from "./slice/orderSlice"
import adminReducer from "./slice/adminSlice"
import adminProductReducer from "./slice/adminProductSlice"
import adminOrdersReducer from "./slice/adminOrderSlice"
const Store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout:checkoutReducer,
        orders: orderReducer,
        admin: adminReducer,
        adminProducts: adminProductReducer,
        adminOrdersReducer: adminOrdersReducer,
    },
});

export default Store;