
import axios from "axios"
import { hideLoader, showLoader } from "../redux/slice/loader"
import store from "../redux/store/store"
import { toast } from "react-toastify"
import { resetForm, setFormData, setProductList } from "../redux/slice/product"

const url = import.meta.env.VITE_BACKEND_URL


// 🔑 Get token from Redux store
    const token = store.getState().user.token



// Create Product
export const CreateProduct = async (fromData, ObjectID) => {
    try {
        store.dispatch(showLoader())
        let URL = `${url}/create-product`
        if(ObjectID !== 0) {
            URL =`${url}/product-update/${ObjectID}`
        }
        const res = await axios.post(URL , fromData, {headers: {token}})
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

// Product List
export const GetAllProductList = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(url + '/product-list', )
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setProductList(res.data['data']))
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


// Fill Product form
export const FillProductForm = async (id) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductDetails/${id}`, {headers: {token}})
        store.dispatch(hideLoader())

        if(res.data['success']) {
            let formValue = res.data['data'][0]
            store.dispatch(setFormData({name: 'name', value:formValue['name']}))
            store.dispatch(setFormData({name: 'description', value:formValue['description']}))
            store.dispatch(setFormData({name: 'price', value:formValue['price']}))
            store.dispatch(setFormData({name: 'remark', value:formValue['remark']}))
            store.dispatch(setFormData({name: 'categoryID', value:formValue.category?._id}))
            store.dispatch(setFormData({name: 'brandID', value:formValue.brand?._id}))
            return true
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


// Product List by Keyword with Pagination
export const GetProductsByPaginationKeyword = async (pageNo = 1, perPage = 10, keyword = "0") => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductListByKeyword/${pageNo}/${perPage}/${keyword}`)
        store.dispatch(hideLoader())

        if (res.data['success']) {
            // Optionally save products in redux state
            store.dispatch(setProductList(res.data['data']))
            return res.data
        } else {
            toast.error(res.data['message'])
            return { data: [], totalPages: 0, totalCount: 0 }
        }
    } catch (error) {
        store.dispatch(hideLoader())
        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong!")
        }
        return { data: [], totalPages: 0, totalCount: 0 }
    }
}

// Filter products by brand
export const GetProductsByBrand = async (brandId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductListByBrand/${brandId}`)
        store.dispatch(hideLoader())

        if (res.data['success']) {
            store.dispatch(setProductList(res.data['data']))
            return res.data['data']
        } else {
            toast.error(res.data['message'])
            return []
        }
    } catch (error) {
        store.dispatch(hideLoader())
        toast.error(error.response.data.message || "Something went wrong!")
        return []
    }
}

// Filter products by category
export const GetProductsByCategory = async (categoryId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductListByCategory/${categoryId}`)
        store.dispatch(hideLoader())

        if (res.data['success']) {
            store.dispatch(setProductList(res.data['data']))
            return res.data['data']
        } else {
            toast.error(res.data['message'])
            return []
        }
    } catch (error) {
        store.dispatch(hideLoader())
        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong!")
        }
        return []
    }
}

// Filter products by price
export const GetProductsSortedByPrice = async (sortOrder) => {
    try {
            store.dispatch(showLoader());
            const res = await axios.get(`${url}/ProductSortByPrice/${sortOrder}`);
            store.dispatch(hideLoader());

            if (res.data.success) {
                return res.data;
            } else {
                toast.error(res.data.message);
                return { success: false, data: [] };
            }
    } catch (error) {
        store.dispatch(hideLoader());
        toast.error(error.response?.data?.message || "Something went wrong!");
        return { success: false, data: [] };
    }
}


// Get product details
export const GetProductDetails = async (productId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductDetails/${productId}`)
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setProductList(res.data['data']))
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


// Get Similar product 
export const GetSimilarProduct = async (categoryId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductListBySimilar/${categoryId}`)
        store.dispatch(hideLoader())

        if(res.data['success']) {
            // store.dispatch(setProductList(res.data['data']))
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


// Get Remark product 
export const GetRemarkProduct = async (remark) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(`${url}/ProductListByRemark/${remark}`)
        store.dispatch(hideLoader())

        if(res.data['success']) {
            store.dispatch(setProductList(res.data['data']))
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


// Product Remove
export const ProductRemove = async (id) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.delete(`${url}/product-remove/${id}`, {headers: {token}})
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





