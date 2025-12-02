import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import { Link } from "react-router";
import { addToCart } from "../api/cart";
import { addItemToCart } from "../redux/slice/cart";
import Reveal from "../animation/Reveal";

const Card = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch()





    // api call
    const handleAddToCart = async () => {
      const res = await addToCart(product._id, quantity)

        if (res?.success) {
          // Build cart item in the shape Redux expects
          const cartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            quantity: quantity,
            brandName: product.brand?.brandName,
            categoryName: product.category?.categoryName,
            productID: product._id
          };

        dispatch(addItemToCart(cartItem));
      }
    }



    // ⏺ When quantity changes, update cart (but not when it’s 0)
    useEffect(() => {
      if(quantity > 0) {
        handleAddToCart()
      }
    }, [quantity])
    

    return (
        <Reveal>
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
              <div className="relative w-full flex items-center justify-center bg-gray-50">
              <img src={product.image[0]} alt={product.name} className="object-contain max-h-56 hover:scale-105 transition-transform ease-out duration-500 cursor-pointer"/>
                  <span className="absolute left-2 top-2 bg-green-600 text-white text-xs px-2 py-1 rounded"> {product['remark']} </span>
                  <span className="absolute right-2 top-2 bg-black text-white text-xs px-2 py-1 rounded">-{product['discount']}% </span>
              </div>
            </Link>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-gray-800 font-medium uppercase tracking-wide">
                {product.name}
              </h3>
              <div className="flex justify-between">
                <span className=" text-gray-800 font-sm mr-2 bg-gray-200 p-1 rounded capitalize">
                  {product['category']['categoryName']}
                </span>
                <span className=" text-gray-800 font-sm bg-gray-200 p-1 capitalize">
                  {product['brand']['brandName']}
                </span>
              </div>
              {/* Price */}
              <div className="mt-2 flex justify-between">
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${product.price}
                </span>
                <span className="text-lg font-semibold text-black">
                  ${product.discountPrice}
                </span>
              </div>

              {/* Cart Actions */}
              {quantity === 0 ? (
                <button
                  onClick={() => setQuantity(1)}
                  className="w-full mt-4 py-2 border border-black text-black font-medium rounded hover:bg-black hover:text-white transition cursor-pointer"
                >
                  ADD TO CART
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 0)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
  );
};

export default Card;




