import OrderSummary from "../components/OrderSummary"
import stripe from '../assets/stripe_logo.png'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { onChangeOrderInput, resetOrderForm } from "../redux/slice/order"
import { orderFromCash, orderFromStripe } from "../api/order"


const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const formDataInput = useSelector((state) => state.order.formDataInput)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {name, email, street, city, state, zip, country, phone} = formDataInput


  // on change handler
  const onChangeHandler = (e) => {
    const {name, value} = e.target
    dispatch(onChangeOrderInput({name, value}))
  }

// on submit handler
const onSubmitHandler = async (e) => {
  e.preventDefault()
  try {
    if(method === 'cod') {
      const res = await orderFromCash(formDataInput)
      if(res?.success) {
        dispatch(resetOrderForm())
        navigate('/order')
      }
    } else if(method === 'stripe') {
      const sessionUrl = await orderFromStripe(formDataInput)
      if(sessionUrl) {
        window.location.href = sessionUrl
      }
    }
  } catch (error) {
    console.error(error)
  }
}



  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col justify-between sm:flex-row gap-4 pt-5 min-h-[80vh] ">
        {/* Left Side Address from */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[580px]">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">DELIVERY INFORMATION</h2>
            <p className="text-gray-600">Please provide your delivery details below</p>
          </div>

          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="name" value={name}  type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="First Name" required/>
          </div>
          <input onChange={onChangeHandler} name="email" value={email} type="email" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Email Address" required />
          <input onChange={onChangeHandler} name="street" value={street} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Street" />
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="city" value={city} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="City" required/>
            <input onChange={onChangeHandler} name="state" value={state} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="State" required/>
          </div>
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="zip" value={zip} type="number" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Zip" required/>
            <input onChange={onChangeHandler} name="country" value={country} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Country" required/>
          </div>
            <input onChange={onChangeHandler} name="phone" value={phone} type="number" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Phone" required/>
        </div>

        {/* Right Side - Order Summary + Payment  */}

        <div className="sm:w-[480px] mt-8">
          <div className=" mt-8 min-w-80">
            <OrderSummary />
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <p className="text-xl sm:text-2xl text-gray-600">PAYMENT METHOD</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 px-3 py-2 border cursor-pointer">
                <p className={`min-h-3.5 w-3.5 rounded-full border ${method === 'stripe'? 'bg-green-400': ''}`}></p>
                <img className="h-5 mx-4" src={stripe} alt="" />
              </div>
              
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 px-3 py-2 border cursor-pointer">
                <p className={`min-h-3.5 w-3.5 rounded-full border ${method === 'cod'? 'bg-green-400': ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="text-end w-full mt-4">
              <button type="submit"  className="w-full py-2 mt-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer">Place Order</button>
            </div>

          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder





