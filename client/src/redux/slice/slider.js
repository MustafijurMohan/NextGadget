import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    formData: { name: '', description: '' },
    list: []
};


const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const {name, value} = action.payload
            state.formData[name] = value
        },
        setSliderList: (state, action) => {
            state.list = action.payload;
        },
        resetForm: (state) => {
            state.formData = { name: '', description: '' };
        },
    },
});

export const { setFormData, setSliderList, resetForm } = sliderSlice.actions;
export default sliderSlice.reducer;
