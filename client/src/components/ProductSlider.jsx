
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { GetAllSliderList } from "../api/slider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaArrowLeft size={16} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaArrowRight size={16} />
  </button>
);

const ProductSlider = () => {
  const sliderList = useSelector((state) => state.slider.list);

  useEffect(() => {
    (async () => {
      await GetAllSliderList();
    })();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots !bottom-8",
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-all duration-200" />
    ),
  };

  if (!sliderList || sliderList.length === 0) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center rounded-2xl">
        <div className="text-gray-500 text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl mt-2 shadow-lg slider-container">
      <Slider {...settings}>
        {sliderList.map((product, index) => (
          <div key={product.id || index} className="relative h-96 outline-none">
            <div className="h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 flex items-center relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-yellow-200 rounded-full opacity-60" />
              <div className="absolute bottom-12 left-12 w-24 h-24 bg-purple-200 rounded-full opacity-40" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30" />
              
              {/* Content Container */}
              <div className="container mx-auto px-8 flex items-center h-full relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                  {/* Left Content */}
                  <div className="space-y-6">
                    {/* Limited Time Badge */}
                    <div className="inline-flex items-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIMITED TIME
                      </span>
                    </div>

                    {/* Product Name */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h2>

                    {/* Product Description */}
                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        Up to 40% off
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-600">Starting from</span>
                        <span className="text-3xl font-bold text-gray-900">
                          ${product.price || '599.99'}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={product.link || `/product/${product.id}`}
                      className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      SHOP COLLECTION →
                    </Link>
                  </div>

                  {/* Right Content - Product Image */}
                  <div className="relative">
                    <div className="relative z-10">
                      {/* Blue border frame */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl transform rotate-3 opacity-80" />
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform -rotate-2 opacity-60" />
                      
                      {/* Product image container */}
                      <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Product+Image';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom CSS for slick dots - using regular style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        .slider-container .slick-dots li div {
          width: 12px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .slider-container .slick-dots li.slick-active div {
          background-color: gray;
          transform: scale(1.2);
        }
        .slider-container .slick-dots li:hover div {
          background-color: rgba(255, 255, 255, 0.8);
        }
      `}} />
    </div>
  );
};

export default ProductSlider;
