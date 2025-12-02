const express = require('express');

const { registerUser, loginUser, userList, singleUser, deleteUser, updateProfile, UserVerifyEmail, UserOtpVerify, UserResetPassword } = require('../controllers/UserController');
const { AuthVerification } = require('../middlewares/AuthVerification');
const { AdminVerification } = require('../middlewares/AdminVerification');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const { CreateBrand, BrandList } = require('../controllers/BrandController')
const { CreateCategory, CategoryList } = require('../controllers/CategoryController');
const { CreateProductSlider, ProductSliderList, RemoveSlider } = require('../controllers/ProductSliderController');
const { CreateProduct, ProductList, ProductListByBrand, ProductListByCategory, ProductListByRemark, ProductListBySimilar, ProductDetails, ProductListByKeyword, ProductSortByPrice, UpdateProduct, RemoveProduct } = require('../controllers/ProductController');
const { CreatCartList, UpdateCart, CartList, RemoveCart, ClearCart } = require('../controllers/CartListController');


const { CreateWishList, ReadWishList, RemoveWishList, ClearWishList } = require('../controllers/WishListController');
const { CreateContact, ContactList, RemoveContact } = require('../controllers/ContactController');
const { PlaceOrderCash, PlaceOrderStripe, GetAllOrders, OrderStatusUpdate, UserOrderData } = require('../controllers/OrderController');



const router = express.Router();



// User api
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/single-user/:id', AuthVerification, singleUser)
router.get('/user-list',AuthVerification, AdminVerification, userList)
router.post('/user-update',AuthVerification, uploadSingle, updateProfile)
router.delete('/user-delete/:id', deleteUser)

// forgot password api
router.post('/verifyEmail/:email', UserVerifyEmail)
router.post('/verifyOtp', UserOtpVerify)
router.post('/resetPassword', UserResetPassword)


// Brand api
router.post('/create-brand',AuthVerification, AdminVerification, uploadSingle, CreateBrand)
router.get('/BrandList', BrandList)

// Category api
router.post('/create-category', AuthVerification, AdminVerification, uploadSingle, CreateCategory)
router.get('/category-list', CategoryList)

// Product Slider api
router.post('/create-slider', AuthVerification, AdminVerification, uploadSingle, CreateProductSlider)
router.get('/slider-list', ProductSliderList)
router.delete('/slider-remove/:id', AuthVerification, AdminVerification, RemoveSlider)




// Products api
router.post('/create-product',AuthVerification, AdminVerification, uploadMultiple, CreateProduct)
router.get('/product-list', ProductList)
router.get('/ProductListByBrand/:BrandID', ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductListByCategory);
router.get('/ProductListByRemark/:Remark', ProductListByRemark);
router.get('/ProductListBySimilar/:CategoryID', ProductListBySimilar);
router.get('/ProductDetails/:ProductID', ProductDetails);
router.get('/ProductListByKeyword/:pageNo/:perPage/:Keyword', ProductListByKeyword);
router.get('/ProductSortByPrice/:sortOrder', ProductSortByPrice)
router.post('/product-update/:id', AuthVerification, AdminVerification, uploadMultiple, UpdateProduct)
router.delete('/product-remove/:id', AuthVerification, AdminVerification, RemoveProduct)


// Cart list api
router.post('/create-cart', AuthVerification, CreatCartList)
router.get('/cart-list', AuthVerification, CartList)
router.post('/cart-update/:cartID', AuthVerification, UpdateCart)
router.delete('/cart-remove/:id', AuthVerification, RemoveCart)
router.delete('/clear-cart', AuthVerification, ClearCart)

// Wish List api
router.post('/create-wish', AuthVerification, CreateWishList)
router.get('/wish-list', AuthVerification, ReadWishList)
router.delete('/remove-wishlist/:id', AuthVerification, RemoveWishList)
router.delete('/clear-wish', AuthVerification, ClearWishList)


// Order api
router.post('/cash', AuthVerification, PlaceOrderCash)
router.post('/stripe', AuthVerification, PlaceOrderStripe)
router.get('/order-data', AuthVerification, UserOrderData)
router.get('/all-orders', AuthVerification, AdminVerification, GetAllOrders)
router.post('/status-update/:orderId', AuthVerification, AdminVerification, OrderStatusUpdate)

// Contact api
router.post('/create-contact', CreateContact)
router.get('/contact-list', ContactList)
router.delete('/contact-remove/:id', AuthVerification, AdminVerification, RemoveContact)


module.exports = router;