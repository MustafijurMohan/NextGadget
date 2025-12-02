import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    list: []
}

const wishSlice = createSlice({
    name: 'wish',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const product = action.payload 
            const exists = state.list.find((item) => item._id === product._id)

            if(!exists) {
                state.list.push(product)
            }
        },
        setWishList: (state, action) => {
            state.list = action.payload
        },
        removeWishItem: (state, action) => {
            state.list = state.list.filter((item) => item._id !== action.payload)
        },
        clearWishState: (state) => {
            state.list = []
        }
    }
})


export const {addToWishList, setWishList, removeWishItem, clearWishState} = wishSlice.actions
export default wishSlice.reducer




