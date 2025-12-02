import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { addItemToCart, setCartList } from "../redux/slice/cart"

const url = import.meta.env.VITE_BACKEND_URL

// 🔑 Get token from Redux store
    


// add to card
export const addToCart = async (productID, quantity) => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.post(url + '/create-cart', {productID, quantity}, {headers: {token}})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            toast.success(res.data['message'] || "Added to cart")

            store.dispatch(addItemToCart({productID, quantity}))
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

// cart list
export const cartList = async () => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.get(url + '/cart-list', {headers: {token}})
        store.dispatch(hideLoader())

        if (res.data?.success) {
            store.dispatch(setCartList(res.data['data'] || [])) 
            return res.data['data']
        } else {
            toast.error(res.data['message'])
            return []
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response.data.message || "Something went wrong!")
        return null
        
    }
}


// Delete single cart
export const deleteCartItem = async (id) => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.delete(url + `/cart-remove/${id}`, { headers: { token } })
        store.dispatch(hideLoader())
        toast.success(res.data.message)
        return true
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return false
    }
}


// Clear all cart
export const clearCart = async () => {
    try {
        const token = store.getState().user.token

        store.dispatch(showLoader())
        const res = await axios.delete(url + `/clear-cart`, { headers: { token } })
        store.dispatch(hideLoader())
        toast.success(res.data.message)
        return true
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response?.data?.message || "Something went wrong!")
        return false
    }
}


// Increase or Decrease update
export const updateCartQty = async (productID, quantity) => {
  try {
    const token = store.getState().user.token
    
    store.dispatch(showLoader());
    const res = await axios.post(
      url + "/create-cart",
      { productID, quantity },
      { headers: { token } }
    );
    store.dispatch(hideLoader());

    if (res.data?.success) {
        toast.success(res.data['message'])
      return { success: true, quantity };
    } else {
      toast.error(res.data.message || "Failed to update cart");
      return { success: false };
    }
  } catch (err) {
    store.dispatch(hideLoader());
    toast.error(err.response?.data?.message || "Something went wrong!");
    return { success: false };
  }
};
