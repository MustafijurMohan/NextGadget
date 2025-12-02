import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { Link } from "react-router"
import Reveal from "../animation/Reveal"

const OrderSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      // ✅ If you want, call your backend to confirm payment status with Stripe
      // console.log("Stripe Session ID:", sessionId)
    }
  }, [sessionId])

  return (
    <Reveal>
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>

      <div className="flex gap-4">
        <Link to="/shop" className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
            Continue Shopping
        </Link>

        <Link to="/order" className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
            Order
        </Link>
      </div>
      
    </div>
    </Reveal>
  )
}

export default OrderSuccess
