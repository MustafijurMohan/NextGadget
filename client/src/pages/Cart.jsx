
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { Trash2 } from "lucide-react"
import { cartList, clearCart, deleteCartItem, updateCartQty } from "../api/cart"
import { clearCartState, removeCartItem, setCartList, updateCartItemQty } from "../redux/slice/cart"
import OrderSummary from "../components/OrderSummary"
import Reveal from "../animation/Reveal"


const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.list)
  const token = useSelector((state) => state.user.token)
  const navigate = useNavigate()

  // Load cart list
  useEffect(() => {
    // const fetchCart = async () => {
    //   const res = await cartList()
    //   if (res?.data) {
    //     dispatch(setCartList(res.data))
    //   }
    // }
    // fetchCart()

    (async() => {
      if(token) {
        await cartList()
      }
    })()
  }, [dispatch, token])

  // Delete single cart item
  const handleDelete = async (id) => {
    const success = await deleteCartItem(id)
    if (success) dispatch(removeCartItem(id))
  }

  // Clear cart
  const handleClearCart = async () => {
    const success = await clearCart()
    if (success) dispatch(clearCartState())
  }

  return (
    <Reveal>
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.brandName} | {item.categoryName}
                    </p>
                    <p className="text-sm text-gray-700">
                      ${item.quantity * (item.discountPrice ?? item.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={async () => {
                      if (item.quantity > 1) {
                        const result = await updateCartQty(item.productID, item.quantity - 1)
                        if (result.success)
                          dispatch(updateCartItemQty({ productID: item.productID, quantity: result.quantity }))
                      } else {
                        await handleDelete(item._id)
                      }
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={async () => {
                      const result = await updateCartQty(item.productID, item.quantity + 1)
                      if (result.success)
                        dispatch(updateCartItemQty({ productID: item.productID, quantity: result.quantity }))
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-gray-600 hover:bg-red-50 rounded-full cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <OrderSummary />
            <div>
              <button
                onClick={() => navigate('/place-order')}
                className="w-full py-2 mt-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Proceed To Checkout
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Reveal>
  )
}

export default Cart

