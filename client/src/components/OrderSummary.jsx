import { useSelector } from "react-redux"

const OrderSummary = () => {
  const cartItems = useSelector(state => state.cart.list)

  // calculate subtotal like backend
  const subTotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.discountPrice ?? item.price
    return sum + unitPrice * item.quantity
  }, 0)

  const discount = 0           // can use promo logic if any
  const shippingCost = cartItems.length > 0 ? 10 : 0
  const totalAmount = subTotal - discount + shippingCost

  if (cartItems.length === 0) return null

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount:</span>
        <span>${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>${shippingCost.toFixed(2)}</span>
      </div>
      <hr className="text-gray-400" />
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>

      {/* <button
          onClick={async () => {
            // call your PlaceOrderCash API here
            // send the address + cart (backend recalculates totals)
          }}
          className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          Place Order
      </button> */}
    </div>
  )
}

export default OrderSummary
