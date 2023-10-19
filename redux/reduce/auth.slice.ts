import { createSlice } from "@reduxjs/toolkit"


type initState = {
    // define interface
}

const initState: initState = {

}


const authSlide = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         * handle 3 state in promise
         * pending, fulfilled, reject 
         */
    },
})

export default authSlide.reducer