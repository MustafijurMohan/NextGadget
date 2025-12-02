import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        formDataInput: {
            name: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: ''
        },
        list: [],
        orderList: []
    }

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        onChangeOrderInput: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        getUserOrderData: (state, action) => {
            state.list = action.payload
        },
        getOrderDataAdmin: (state, action) => {
            state.orderList = action.payload
        },
        resetOrderForm: (state) => {
            state.formDataInput = {name: '', email: '', street: '', city: '', state: '', zip: '', country: '', phone: ''}
        }
    }
})


export const {onChangeOrderInput, getUserOrderData, getOrderDataAdmin, resetOrderForm} = orderSlice.actions
export default orderSlice.reducer