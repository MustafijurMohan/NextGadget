

import { useState } from "react"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router" // make sure you use react-router-dom not react-router
import google from '../assets/google.png'
import {useDispatch, useSelector} from 'react-redux'
import { onChnageUserInput } from "../redux/slice/user"
import { login, registration } from "../api/user"
import { useEffect } from "react"
import Reveal from "../animation/Reveal"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch()
  const [currentState, setCurrentState] = useState("Login")
  const formDataInput = useSelector((state) => state.user.formDataInput)
  const token = useSelector((state) => state.user.token)

  const {name, email, password} = formDataInput
  const navigate = useNavigate()


  // OnChange Hander
  const onChangeHandler = (e) => {
    const {name, value} = e.target
    dispatch(onChnageUserInput({name, value}))
  }

  // Handle form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (currentState === 'Sign Up') {
      await registration(formDataInput)
    } else {
        await login(formDataInput)
    }
    
  }

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  

  return (
  <Reveal>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full sm:w-[500px] mx-auto p-10 rounded-md shadow-2xl">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl text-gray-900 font-bold mb-2">{currentState}</h1>
          <p className="text-gray-600">
            {currentState === "Login"
              ? "Welcome back! Please log in to continue."
              : "Join NextGadget Shopping and start your journey."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Full Name (Only for Sign Up) */}
          {currentState === "Sign Up" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={onChangeHandler}
                  name='name'
                  value={name}
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition-colors"
                  
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                onChange={onChangeHandler}
                name='email'
                value={email}
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition-colors"

              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                onChange={onChangeHandler}
                name="password"
                value={password}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition-colors"
                
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>


          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <label htmlFor="remember" className="ml-1">
                I agree to the <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            <Link to='/email-verify' className="text-blue-600 hover:underline">Forgot Your Password?</Link>
          </div>

          {/* Toggle between Login and Signup */}
          <div className="text-center">
            {currentState === "Login" ? (
              <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer hover:text-blue-600">
                Don’t have an account? <span className="font-semibold">Sign Up</span>
              </p>
            ) : (
              <p onClick={() => setCurrentState("Login")} className="cursor-pointer hover:text-blue-600">
                Already have an account? <span className="font-semibold">Login</span>
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !rememberMe}
            className={`w-full text-white py-2 rounded-md transition cursor-pointer ${
              loading || !rememberMe ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {loading ? "Processing..." : currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>

          {/* Social login (Optional) */}
          <div className="mt-6 flex flex-col gap-3 ">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition cursor-pointer"
            >
              <img src={google} alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
    </Reveal>
  )
}

export default Login










