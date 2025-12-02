import { useEffect } from "react"
import { useSelector } from "react-redux"
import { userOrderData } from "../api/order"

const Order = () => {
  const orderList = useSelector((state) => state.order.list)

  // Fetch orders on page load
  useEffect(() => {
    (async () => {
      await userOrderData()
    })()
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orderList.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orderList.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-medium">{order._id}</span>
                </p>
                <p className={`text-sm font-semibold px-2 py-1 rounded ${
                  order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "Processing"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Shipped"
                ? "bg-purple-100 text-purple-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.status}
          </p>
              </div>

              {/* Products */}
              <div className="divide-y">
                <div className="flex items-center gap-4 py-3">
                  <img
                    src={order.productDetails.image?.[0]}
                    alt={order.productDetails.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{order.productDetails.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {order.products[0].quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    $
                    {(
                      (order.productDetails.discountPrice ??
                        order.productDetails.price) * order.products[0].quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <p>Payment: {order.paymentMethod}</p>
                <p className="font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>
                <p>
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US")}
                </p>
              </div>

              {/* Track Order Button */}
              <div className="mt-4 text-right">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition cursor-pointer">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order
