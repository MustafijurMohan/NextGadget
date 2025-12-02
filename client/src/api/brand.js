import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { resetForm, setBrandList } from "../redux/slice/brand"
const url = import.meta.env.VITE_BACKEND_URL

// 🔑 Get token from Redux store
    const token = store.getState().user.token



// Create Brand
export const CreateBrand = async (fromData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + '/create-brand', fromData, {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            toast.success(res.data['message'])
            store.dispatch(resetForm())
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


// Brand List
export const GetAllBrandList = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url+'/BrandList')
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setBrandList(res.data['data']))
            return res.data;
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