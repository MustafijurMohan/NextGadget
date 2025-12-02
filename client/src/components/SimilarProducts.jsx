import { useEffect, useState } from "react";
import { GetSimilarProduct } from "../api/product";
import Card from "./Card";

const SimilarProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // show 4 initially

  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      setLoading(true);
      const res = await GetSimilarProduct(categoryId);
      if (res?.data) {
        setProducts(res.data);
      }
      setLoading(false);
      setVisibleCount(4); // reset visible count when category changes
    })();
  }, [categoryId]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // load 4 more products
  };

  if (loading) {
    return <p className="text-center py-6">Loading similar products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-6 text-gray-500">No similar products found.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl text-center text-gray-700 font-bold mb-6">
        Discover Your Similar Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <Card key={product._id} product={product} className="w-full" />
        ))}
      </div>

      {/* Show Load More if there are more products */}
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
    </div>
  );
};

export default SimilarProducts;
