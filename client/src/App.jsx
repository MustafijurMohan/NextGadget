import { BrowserRouter as Router, Routes, Route } from 'react-router'
  import { ToastContainer } from 'react-toastify';

import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Order from './pages/Order'
import PlaceOrder from './pages/PlaceOrder'
import Notfound from './pages/Notfound'
import Footer from './pages/Footer'
import Navbar from './components/Navbar'
import Wishlist from './pages/Wishlist'
import Admin from './admin/Admin'
import Brand from './layout/Brand'
import Category from './layout/Category'
import Slider from './layout/Slider'
import Add from './layout/Add'
import ProductList from './layout/ProductList'
import OrderList from './layout/OrderList'
import UserList from './layout/UserList'
import ContactList from './layout/ContactList'
import AdminRoute from './admin/AdminRoute';
import Loader from './components/Loader';
import OrderSuccess from './pages/OrderSuccess';
import OrderCancel from './pages/OrderCancel';
import Profile from './pages/Profile';
import EmailVerify from './pages/EmailVerify';
import OtpVerify from './pages/OtpVerify';
import ResetPassword from './pages/ResetPassword';
import Reveal from './animation/Reveal';

const App = () => {


  return (
    <>
      <div className='px-4 sm:px-[1vw] lg:px-[3vw]'>
        <Router>
          <Loader />
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wish' element={<Wishlist />} />
            <Route path='/order' element={<Order />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/order-success' element={<OrderSuccess />} />
            <Route path='/order-cancel' element={<OrderCancel />} />


            <Route path='/login' element={<Login />} />
            <Route path='/profile/:profileId' element={<Profile />} />
            <Route path='/email-verify' element={<EmailVerify />} />
            <Route path='/otp-verify' element={<OtpVerify />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            <Route path='/admin' element={<AdminRoute> <Admin /> </AdminRoute>}>
              <Route path='brand' element={<Brand />} />
              <Route path='category' element={<Category />} />
              <Route path='slider' element={<Slider />} />
              <Route path='add-product' element={<Add />} />
              <Route path='product-list' element={<ProductList />} />
              <Route path='order-list' element={<OrderList />} />
              <Route path='user-list' element={<UserList />} />
              <Route path='contact-list' element={<ContactList />} />
            </Route>

            <Route path='*' element={<Notfound />} />

          </Routes>
          <Reveal><Footer /></Reveal>
        </Router>
      </div>
      
    </>
  )
}

export default App
