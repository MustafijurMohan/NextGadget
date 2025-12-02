import { useEffect, useState } from "react";
import Slider from "react-slick";
import { GetAllProductList } from "../api/product";
import Card from "./Card";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AllProduct = () => {
  const productList = useSelector((state) => state.product.list);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // ✅ Detect screen width at mount and on resize
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlides(); // set correct slidesToShow at first render
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // ✅ Fetch product list
  useEffect(() => {
    (async () => {
      await GetAllProductList();
    })();
  }, []);

  if (!productList || productList.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );
  }

  // ✅ Custom arrows
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-700 hover:bg-black text-white sm:p-4 p-2 rounded-full"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-700 hover:bg-black text-white sm:p-4 p-2 rounded-full"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );

  // ✅ Slider settings — uses dynamic slidesToShow
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Products
      </h2>

      <Slider {...settings}>
        {productList.map((product) => (
          <div key={product._id} className="px-2">
            <Card product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AllProduct;
