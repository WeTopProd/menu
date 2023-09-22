import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth";
import basketReducer from "./basket";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        basket: basketReducer
    },
})
