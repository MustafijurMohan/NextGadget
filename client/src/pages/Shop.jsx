import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import Card from '../components/Card';
import { IoIosArrowForward } from "react-icons/io";
import { GetAllCategoryList } from '../api/category';
import { GetAllBrandList } from '../api/brand';
import { GetProductsByBrand, GetProductsByCategory, GetProductsByPaginationKeyword, GetProductsSortedByPrice } from '../api/product';
import { setProductList } from '../redux/slice/product';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Reveal from '../animation/Reveal';

const Shop = () => {
  const [showFilter, setShowFilter] = useState(false); // Small Screen function
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const categoryList = useSelector((state) => state.category.list)
  const brandList = useSelector((state) => state.brand.list)

  const productsList = useSelector((state) => state.product.list)
  const dispatch = useDispatch()

  
   // Pagination + Search states
    const [pageNo, setPageNo] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [totalPages, setTotalPages] = useState(0)
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState("default");
    
    // 👇 Get keyword from URL query params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "0"; 

      // Fetch products with pagination + keyword
        const loadProducts = async () => {
          try {
            const res = await GetProductsByPaginationKeyword(pageNo, perPage, keyword)
            // console.log("Products API response:", res);
    
            if (res?.success) {
              // Adjust depending on actual structure
              const products = Array.isArray(res.data) ? res.data : res.data?.rows || [];
              dispatch(setProductList(products))
              setTotalPages(res.totalPages || res.data?.totalPages || 0)
            } else {
              dispatch(setProductList([]))
              setTotalPages(0)
            }
          } catch (error) {
            toast.error(error.message)
            console.error("loadProducts error:", error);
          }
        }   
        
        
            // Pagination handler
        const handlePageClick = (e) => {
          setPageNo(e.selected + 1)
        }

        // Handle "Show per page" change
        const handlePerPageChange = (e) => {
          setPerPage(Number(e.target.value));
          setPageNo(1); // reset to first page
        };


    // Brand filter toggle
      const filterByBrand = async (brandId) => {
        if (selectedBrand === brandId) {
          // 👉 uncheck if already selected
          setSelectedBrand(null);
          loadProducts(); // reload default products
        } else {
          setSelectedBrand(brandId);
          setSelectedCategory(null);
          const res = await GetProductsByBrand(brandId);
          if (res?.success) {
            dispatch(setProductList(res.data));
            setTotalPages(0);
          }
        }
      };

    // Category filter toggle
    const filterByCategory = async (categoryId) => {
      if (selectedCategory === categoryId) {
        // 👉 uncheck if already selected
        setSelectedCategory(null);
        loadProducts();
      } else {
        setSelectedCategory(categoryId);
        setSelectedBrand(null);
        const res = await GetProductsByCategory(categoryId);
        if (res?.success) {
          dispatch(setProductList(res.data));
          setTotalPages(0);
        }
      }
    };

      // --------------------------
      // Handle Sort By Price
      // --------------------------
      const handleSortChange = async (e) => {
        const selected = e.target.value;
        setSortOrder(selected);

        if (selected === "asc" || selected === "desc") {
          const res = await GetProductsSortedByPrice(selected);
          if (res?.success) {
            dispatch(setProductList(res.data));
            // setTotalPages(0); // disable pagination when sorting
          }
        } else {
          // Reset → reload default product list
          loadProducts();
        }
      };



  useEffect(() => {
    (async() => {
      await GetAllCategoryList()
      await GetAllBrandList()
      // only load default product list when no brand/category selected
      if (!selectedBrand && !selectedCategory) {
        loadProducts();
      }
    })()
  }, [pageNo, perPage, keyword, selectedBrand, selectedCategory])  

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10">
      {/* Left Side Filter */}
      <div className="lg:w-1/6">
        <div className="flex items-center gap-2">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-lg font-semibold text-gray-900 cursor-pointer"
          >
            FILTER
          </p>
          <IoIosArrowForward
            className={`sm:hidden ${showFilter ? "rotate-90" : ""}`}
            size={20}
          />
        </div>

        {/* Category Filter */}
        <Reveal>
        <div
          className={`bg-white p-6 mt-6 rounded-lg border border-gray-200 shadow-sm sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categories
          </h3>
          {
              categoryList.map((item, index) => {
                return (
                  <div key={index} className="space-y-3">
                    <label className="flex items-center cursor-pointer py-1 group">
                      <input
                        checked={selectedCategory === item._id}
                        onChange={() => filterByCategory(item._id)}
                        type="checkbox"
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors capitalize">
                        {item.categoryName}
                      </span>
                    </label>
                  </div>
                )
              })
            }
          
        </div>
        </Reveal>

        {/* Brand Filter */}
        <Reveal>
        <div
          className={`bg-white p-6 mt-6 rounded-lg border border-gray-200 shadow-sm sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brands</h3>
          {
            brandList.map((item, index) => {
              return (
                    <div key={index} className="space-y-3">
                      <label className="flex items-center cursor-pointer py-1 group">
                        <input
                          checked={selectedBrand === item._id}
                          onChange={() => filterByBrand(item._id)}
                          type="checkbox"
                          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors capitalize">
                          {item.brandName}
                        </span>
                      </label>
                    </div>
              )
            })
          }
          
        </div>
        </Reveal>
      </div>

      {/* Right Side */}
      <Reveal>
      <div className="flex-1">
        {/* Top Bar (Sort, Show, View Toggle) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Item per page */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show: </label>
            <select onChange={handlePerPageChange} value={perPage} className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
          </div>

          {/* sort by */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort By: </label>
            <select onChange={handleSortChange} value={sortOrder} className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer">
              <option value="default">Newest</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } transition-colors cursor-pointer`}
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM9 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM9 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM15 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM15 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } transition-colors cursor-pointer`}
              aria-label="List view"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zM3 8a1 1 0 000 2h14a1 1 0 100-2H3zM3 12a1 1 0 100 2h14a1 1 0 100-2H3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className= {`grid ${ viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-6`}
        >
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>

      {/* Pagination */}
        {totalPages > 0 && (
          <div className=" mt-6 flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next →"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="← Prev"
                containerClassName="flex gap-2"
                pageClassName="px-3 py-1 border rounded-full cursor-pointer "
                activeClassName="bg-black text-white"
                previousClassName="px-3 py-1 border rounded-full cursor-pointer "
                nextClassName="px-3 py-1 border rounded-full cursor-pointer "
                breakClassName="px-3 py-1 cursor-pointer"
              />
          </div>
        )}


      </div>
      </Reveal>
    </div>




  );
};

export default Shop;

