import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducer from "../slices/productSlice";
import singleProductReducer from "../slices/singleProductSlice"
import blogReducer from "../slices/blog/blogSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        singleProduct: singleProductReducer,
        blogs: blogReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
