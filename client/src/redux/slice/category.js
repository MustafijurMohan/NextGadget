// categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formDataInput: { categoryName: '' },
    list: []
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        setCategoryList: (state, action) => {
            state.list = action.payload;
        },
        resetForm: (state) => {
            state.formDataInput = { categoryName: '' };
        },
    },
});

export const { setFormData, setCategoryList, resetForm } = categorySlice.actions;
export default categorySlice.reducer;
