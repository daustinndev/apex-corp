import { configureStore } from "@reduxjs/toolkit";
import navSlice from '../feactures/nav/navSlice'


export const store = configureStore({
    reducer:{
        nav:navSlice,
    }
})