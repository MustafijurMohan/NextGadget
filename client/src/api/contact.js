import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { resetContactForm, setContactList } from "../redux/slice/contact"

const url = import.meta.env.VITE_BACKEND_URL
// 🔑 Get token from Redux store
    const token = store.getState().user.token

// create contact
export const createContact = async (formData) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + '/create-contact', formData)
        store.dispatch(hideLoader())

        if(res.data['success']) {
            toast.success(res.data['message'])
            store.dispatch(resetContactForm())
        } else {
            toast.error(res.data['message'])
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// All contact list
export const allContactList = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + '/contact-list')
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setContactList(res.data['data']))
            return res.data['data']
        } else {
            return []
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// Remove contact
export const contactRemove = async (id) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.delete(url + `/contact-remove/${id}`, {headers: {token}})
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
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}
