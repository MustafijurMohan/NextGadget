import { useEffect, useState } from "react";
import { GetRemarkProduct } from "../api/product";
import Card from "./Card";

const remarks = ["New", "Trending", "Hot Deal", "Premium", "Limited", "BestSeller"];

const RemarkProducts = () => {
  const [selectedRemark, setSelectedRemark] = useState("New");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchProducts = async (remark) => {
    setLoading(true);
    const res = await GetRemarkProduct(remark);
    if (res?.data) {
      setProducts(res.data);
    } else {
      setProducts([]);
    }
    setVisibleCount(4);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(selectedRemark);
  }, [selectedRemark]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-6">
        Explore Products by Remark
      </h2>

      {/* Remark buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {remarks.map((remark) => (
          <button
            key={remark}
            onClick={() => setSelectedRemark(remark)}
            className={`px-4 py-2 rounded-full font-medium transition cursor-pointer ${
              selectedRemark === remark
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {remark}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-center py-6">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No products found for "{selectedRemark}"</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, visibleCount).map((product) => (
              <Card key={product._id} product={product} className="w-full" />
            ))}
          </div>

          {/* Load More button */}
          {visibleCount < products.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RemarkProducts;
