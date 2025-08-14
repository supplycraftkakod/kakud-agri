import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducer from "../slices/productSlice";
import singleProductReducer from "../slices/singleProductSlice"
import blogReducer from "../slices/blog/blogSlice"
import allEventsReducer from "../slices/event/allEventsSlice"
import eventReducer from "../slices/event/eventSlice"
import impactReducer from '../slices/impact/impactSlice';
import teamReducer from "../slices/team/teamSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        singleProduct: singleProductReducer,
        blogs: blogReducer,
        events: allEventsReducer,
        event: eventReducer,
        impact: impactReducer,
        team: teamReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
