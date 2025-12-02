import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { addToWishList, removeWishItem, setWishList } from "../redux/slice/wish"


const url = import.meta.env.VITE_BACKEND_URL

// 🔑 Get token from Redux store
    


// Add to Wishlist
export const addToWish = async (productID) => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.post(url + '/create-wish', {productID}, {headers: {token}})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'] || "Added to Wishlist")
            if(res.data['data']['productID']) {
                store.dispatch(addToWishList(res.data['data']['productID']))
            }
            
            return res.data
        } else {
            toast.error(res.data['message'])
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response.data.message || "Something went wrong!")
        return null
    }
}


// wish list
export const getWishList = async () => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.get(url + '/wish-list', {headers: {token}})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            store.dispatch(setWishList(res.data['data'])) 
            return res.data['data']
        } else {
            toast.error(res.data['message'])
            return []
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return null
    }
}


// Delete single wish
export const deleteWishItem = async (id) => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.delete(url + `/remove-wishlist/${id}`, { headers: { token } })
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'] || 'Removed from wishlist')
            store.dispatch(removeWishItem(id))
            return true
        } else {
            toast.error(res.data['message'])
            return false
        }
        
        
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return false
    }
}


// Clear all wish
export const clearWishList = async () => {
    try {
        const token = store.getState().user.token
        
        store.dispatch(showLoader())
        const res = await axios.delete(url + `/clear-wish`, { headers: { token } })
        store.dispatch(hideLoader())
        toast.success(res.data.message)
        return true
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return false
    }
}
