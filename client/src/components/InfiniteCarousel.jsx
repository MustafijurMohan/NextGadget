import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GetAllBrandList } from "../api/brand";
import { GetAllCategoryList } from "../api/category";
import Marquee from "react-fast-marquee";

const InfiniteCarousel = () => {
  const categoryList = useSelector((state) => state.category.list);
  const brandList = useSelector((state) => state.brand.list);

  useEffect(() => {
    (async () => {
      await GetAllBrandList();
      await GetAllCategoryList();
    })();
  }, []);

  return (
    <div className="w-full py-10 ">
      {/* Brand Carousel */}
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Our Brands
      </h2>
      <Marquee pauseOnHover speed={40} gradient={true}>
        {brandList.map((brand) => (
          <div
            key={brand._id}
            className="mx-10 flex flex-col items-center justify-center"
          >
            <img
              src={brand.brandImg}
              alt={brand.brandName}
              className="h-10 w-10 object-contain rounded-full shadow-md"
            />
            <span className="mt-2 text-sm font-medium text-gray-600 capitalize">
              {brand.brandName}
            </span>
          </div>
        ))}
      </Marquee>

      {/* Category Carousel */}
      <h2 className="text-2xl font-bold text-center text-gray-700 my-8">
        Shop by Categories
      </h2>
      <Marquee pauseOnHover speed={40} gradient={true} direction="right">
        {categoryList.map((cat) => (
          <div
            key={cat._id}
            className="mx-10 flex flex-col items-center justify-center"
          >
            <img
              src={cat.categoryImg}
              alt={cat.categoryName}
              className="h-10 w-10 object-contain rounded-xl shadow-md"
            />
            <span className="mt-2 text-sm font-medium text-gray-600 capitalize">
              {cat.categoryName}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InfiniteCarousel;
