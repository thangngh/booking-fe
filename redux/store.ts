import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reduce/auth.slice";


const reducer = {
    // define reducer
    authReducer: AuthSlice
}

const store = configureStore({ reducer })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;