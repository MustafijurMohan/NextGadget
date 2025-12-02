import { Link } from "react-router"
import Reveal from "../animation/Reveal"

const OrderCancel = () => {
  return (
    <Reveal>
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">
        Your payment was cancelled. No money has been deducted from your account.
      </p>
      <Link
        to="/cart"
        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
      >
        Return to Cart
      </Link>
    </div>
    </Reveal>
  )
}

export default OrderCancel
