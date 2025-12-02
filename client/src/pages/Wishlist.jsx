import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWishList, deleteWishItem, clearWishList } from "../api/wish"
import { addToCart } from "../api/cart"
import { Link } from "react-router"
import { clearWishState, removeWishItem } from "../redux/slice/wish"
import Reveal from "../animation/Reveal"

const Wishlist = () => {
  const wishList = useSelector((state) => state.wish.list)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if(token) {
        await getWishList()
      }
      
    })()
  }, [dispatch, token])


    // Delete single wish item
    const handleDelete = async (id) => {
      const success = await deleteWishItem(id)
      if (success) dispatch(removeWishItem(id))
    }
  
    // Clear wish
    const handleClearWish = async () => {
      const success = await clearWishList()
      if (success) dispatch(clearWishState())
    }



  return (
    <Reveal>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishList.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded cursor-pointer"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded shadow-md p-4">
          {/* Wishlist Items */}
          {wishList.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image && item.image.length > 0 ? item.image[0] : '/placeholder.png'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brandName}</p>
                  <p className="text-sm text-gray-400">{item.categoryName}</p>
                  <p className="font-bold mt-1">
                    ${item.discountPrice || item.price}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={async () => {
                    const res = await addToCart(item.productId, 1)
                    if(res?.success) {
                      // after successfully added to cart, remove from wishlist
                      await deleteWishItem(item._id)
                    }
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Clear All */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClearWish}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
    </Reveal>
  )
}

export default Wishlist
