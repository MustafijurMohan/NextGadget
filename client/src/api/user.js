import axios from 'axios'
import {toast} from 'react-toastify'
import store from '../redux/store/store'
import { getProfileData, getUserSignleData, resetForm, setUserData, setUserList } from '../redux/slice/user'
import { hideLoader, showLoader } from '../redux/slice/loader'
const url = import.meta.env.VITE_BACKEND_URL

// 🔑 Get token from Redux store
    const token = store.getState().user.token

// Registration Request
export const registration = async (formData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + '/register', formData)
        store.dispatch(hideLoader())

        if(res.data.success) {
            const token = res.data['token']
            const isAdmin = res.data['data']['isAdmin']
            store.dispatch(getUserSignleData(res.data['data']))
            store.dispatch(setUserData({token, isAdmin}))
            store.dispatch(resetForm())
            toast.success(res.data['message'])
        } else {
            toast.error(res.data['message'])
        }
    } catch (error) {
        store.dispatch(hideLoader())
        
    // ✅ Show backend error messages
        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong!")
        }
    }
}

// Login Request
export const login = async (formData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + '/login', formData)
        store.dispatch(hideLoader())

        if(res.data.success) {
            const token = res.data['token']
            const isAdmin = res.data['data']['isAdmin']
            store.dispatch(getUserSignleData(res.data['data']))
            store.dispatch(setUserData({token, isAdmin}))
            store.dispatch(resetForm())
            toast.success(res.data['message'])
        } else {
            toast.error(res.data['message'])
        }
    } catch (error) {
        store.dispatch(hideLoader())
        // ✅ Show backend error messages
        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong!")
        }
        
    }
}


// Get All User List
export const GetAllUserList = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + '/user-list', {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setUserList(res.data['data']))
        } else {
            toast.error(res.data['message'])
        }
    } catch (error) {
        store.dispatch(hideLoader())
        // ✅ Show backend error messages
        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong!")
        }
    }
}


// Get Single User
export const GetSingleUser = async (id) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url +`/single-user/${id}`, {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(getProfileData(res.data['data']))
            return res.data['data']
        } else {
            toast.error(res.data['message'])
            return null
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}

// Update Profile
export const updateUserProfile = async( formData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/user-update`, formData, {headers: {token}})
        store.dispatch(hideLoader())


        if (res.data?.success) {
            toast.success(res.data['message'])
            store.dispatch(getProfileData(res.data['data']))
            store.dispatch(getUserSignleData(res.data['data']))
            store.dispatch(resetForm())
            return res.data
        } else {
            toast.error(res.data['message'])
            return res.data
        }

    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}





// Forgot password function 
// Email Verification
export const VerifyEmail = async (email) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/verifyEmail/${email}`)
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'])
            localStorage.setItem("verifyEmail", email);
            return res.data;
        } else {
            toast.error(res.data['message'])
            return null;
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// Otp Verification
export const VerifyUserOtp = async (email, otp) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/verifyOtp`, {email, otp: Number(otp)})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'])
            localStorage.setItem("verifyOtp", otp);
            console.log(email, otp)
            return res.data;
        } else {
            toast.error(res.data['message'])
            return null;
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// Otp Verification
export const ResetNewPassword = async (email, otp, newPassword) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/resetPassword`, {email, otp: Number(otp), newPassword})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'])
            return res.data;
        } else {
            toast.error(res.data['message'])
            return null;
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}