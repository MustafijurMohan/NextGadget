import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        formDataInput: {
            name: '',
            email: '',
            password: '',
            country: '',
            mobile: ''
        },
        list: [],
        token: localStorage.getItem('token') || null,
        isAdmin: localStorage.getItem('isAdmin') !== null ? JSON.parse(localStorage.getItem('isAdmin')) : false,
        singleData: localStorage.getItem('singleData') ? JSON.parse(localStorage.getItem('singleData')) : {},
        profileData: {}
    }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onChnageUserInput: (state, action) => {
            const {name, value} = action.payload
            state.formDataInput[name] = value
        },
        setUserData: (state, action) => {
            const {token, isAdmin} = action.payload
            state.token = token
            state.isAdmin = isAdmin ?? false;
            if (token) {
                localStorage.setItem("token", token);
            } else {
                localStorage.removeItem("token");
            }
                localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
        },
        getUserSignleData: (state, action) => {
            state.singleData = action.payload
            localStorage.setItem("singleData", JSON.stringify(action.payload))
        },
        getProfileData: (state, action) => {
            state.profileData = action.payload
        },
        logoutUser: (state) => {
            state.token = null
            state.isAdmin = false
            state.singleData = {}
            localStorage.removeItem('token')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('singleData')
        },
        setUserList: (state, action) => {
            state.list = action.payload
        },
        resetForm: (state) => {
            state.formDataInput = {name: '', email: '', password: ''}
        }
    }
})

export const {onChnageUserInput, setUserData, getUserSignleData,getProfileData, logoutUser, setUserList, resetForm} = userSlice.actions
export default userSlice.reducer