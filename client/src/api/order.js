import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { getOrderDataAdmin, getUserOrderData } from "../redux/slice/order"


const url = import.meta.env.VITE_BACKEND_URL

// 🔑 Get token from Redux store
    const token = store.getState().user.token

// Order from cash on delivery
export const orderFromCash = async (address) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/cash`, {address}, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'] || "Order placed successfully!")
            return res.data['data']
        } else {
            toast.error(res.data['message'] || "Something went wrong!")
            return null
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// Order from stripe on delivery
export const orderFromStripe = async (address) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/stripe`, {address}, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success && res.data?.sessionUrl) {
            toast.success(res.data?.message)
            return res.data?.sessionUrl
        } else {
            toast.error(`Failed to create Stripe session.`)
            return null
        }

    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// get user order data
export const userOrderData = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + `/order-data`, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success) {
            store.dispatch(getUserOrderData(res.data['data']))
            return res.data['data']
        } else {
            return null
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// get user order data for admin
export const userOrderDataAdmin = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + `/all-orders`, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success) {
            store.dispatch(getOrderDataAdmin(res.data['data']))
            return res.data['data']
        } else {
            return null
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}



// Status update for admin
export const userOrderStatusUpdate = async (orderId, status) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(url + `/status-update/${orderId}`, {status}, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'])
            return res.data['data']
        } else {
            return null
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}
