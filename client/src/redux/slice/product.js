import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    formDataInput: {
        name: '',
        description: '',
        price: '',
        remark: '',
        categoryID: '',
        brandID: ''
    },
    list: [],
}



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        setProductList: (state, action) => {
            state.list = action.payload
        },
        
        resetForm: (state) => {
            Object.keys(state.formDataInput).forEach((i) => (state.formDataInput[i]) = '')
        }
    }
})

export const {setFormData, setProductList, resetForm} = productSlice.actions
export default productSlice.reducer