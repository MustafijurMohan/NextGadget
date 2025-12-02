import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { resetForm, setSliderList } from "../redux/slice/slider"
const url = import.meta.env.VITE_BACKEND_URL


// 🔑 Get token from Redux store
    const token = store.getState().user.token


// Create Slider
export const CreateSlider = async (fromData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + '/create-slider', fromData, {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            toast.success(res.data['message'])
            store.dispatch(resetForm())
            return res.data;
        } else {
            toast.error(res.data['message'])
            return null
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


// Slider List
export const GetAllSliderList = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + '/slider-list', )
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setSliderList(res.data['data']))
            return res.data['data']; 
        } else {
            toast.error(res.data['message'])
            return [];
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

// Slider Remove
export const SliderRemove = async (id) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.delete(`${url}/slider-remove/${id}`, {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            toast.success(res.data['message'])
            return res.data
        } else {
            toast.error(res.data['message'])
            return null
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




