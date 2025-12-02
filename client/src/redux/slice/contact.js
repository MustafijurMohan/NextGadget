
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formDataInput: { 
        name: '', email: '', subject: '', message: ''
    },
    list: []
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        createToContact: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        setContactList: (state, action) => {
            state.list = action.payload
        },
        removeContactFormList: (state, action) => {
            state.list = state.list.filter(contact => contact._id !== action.payload)
        },
        resetContactForm: (state) => {
            state.formDataInput = { name: '', email: '', subject: '', message: '' }
        }
    }
})

export const {createToContact, setContactList, removeContactFormList, resetContactForm} = contactSlice.actions
export default contactSlice.reducer