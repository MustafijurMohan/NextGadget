import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        formDataInput: {
            brandName: '',
        },
        list: []
    }


export const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        setBrandList: (state, action) => {
            state.list = action.payload
        },
        resetForm: (state) => {
            state.formDataInput = { brandName: ""};
        },
    }
})

export const {setFormData, setBrandList, resetForm} = brandSlice.actions
export default brandSlice.reducer