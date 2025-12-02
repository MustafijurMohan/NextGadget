import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { GetProductDetails } from "../api/product";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import SimilarProducts from "../components/SimilarProducts";
import { addToWish } from "../api/wish";
import { addToCart } from "../api/cart";
import { addItemToCart } from "../redux/slice/cart";




const Product = () => {
  const { productId } = useParams();
  const productList = useSelector((state) => state.product.list);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch()

   // Fetch product and set default image
  useEffect(() => {
    (async () => {
      const res = await GetProductDetails(productId);
      if (res?.data?.length > 0) {
        setSelectedImage(res.data[0].image[0]); // set first image
      }
    })();
  }, [productId]);

  if (!productList || productList.length === 0) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  const product = productList[0];
  const discountPrice = product.discountPrice || product.price;




  // Add to Wish list
  const handleWishList = async () => {
    await addToWish(product._id)
  }

  //   // Add to Cart list
  const handleAddToCart = async () => {
    const res = await addToCart(product._id, 1);
      if (res?.success) {
        // Update Redux for instant UI update
        const cartItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.image,
          quantity: 1,
          brandName: product.brand?.brandName,
          categoryName: product.category?.categoryName,
          productID: product._id
        };
          dispatch(addItemToCart(cartItem));
      }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 ">
      {/* Left side: Thumbnails + Main Image */}
        <div className="flex">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-4 mr-4">
            {product.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl shadow-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full max-w-md rounded-2xl transition-transform duration-300 ease-in-out hover:scale-125 object-contain"
            />
            
          </div>
        </div>

        {/* Right side: Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center text-yellow-500 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
            
            <span className="text-gray-500 ml-2">(122)</span>
          </div>

          <div className="flex mb-2">
              <span className="text-xl font-semibold text-gray-700 ">{product.category['categoryName']}</span>
              <span className="text-xl capitalize font-semibold text-gray-700 ml-6 ">{product.brand['brandName']}</span>
          </div>

          {/* Price with discount */}
          <div className="mb-4">
            {product.discount > 0 ? (
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-red-600">
                  ${discountPrice}
                </span>
                <span className="line-through text-gray-500">
                  ${product.price}
                </span>
                <span className="text-green-600">-{product.discount}%</span>
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="flex items-center bg-black text-white px-5 py-3 rounded-xl shadow hover:bg-gray-800 transition cursor-pointer">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button onClick={handleWishList} className="flex items-center bg-black text-white px-5 py-3 rounded-xl shadow hover:bg-gray-800 transition cursor-pointer">
              <FaHeart className="mr-2" /> Wishlist
            </button>
          </div>
        </div>
      </div>

         {/* ✅ Similar Products full width */}
      <div className="max-w-6xl mx-auto p-6">
        <SimilarProducts categoryId={product?.category?._id} />
      </div>
    </>

  );
};

export default Product;




