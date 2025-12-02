
// import { useEffect, useState } from "react";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router";
// import { GetProductsByPaginationKeyword, ProductRemove } from "../api/product";
// import {  setProductList } from "../redux/slice/product";
// import { DeleteAlert } from "../helper/DeleteAlert";
// import { toast } from "react-toastify";
// import ReactPaginate from "react-paginate";

// const ProductList = () => {
//   const productList = useSelector((state) => state.product.list);
//   const dispatch = useDispatch();
//   const currency = "$";

//    // Pagination + Search states
//     const [pageNo, setPageNo] = useState(1)
//     const [perPage] = useState(5)
//     const [totalPages, setTotalPages] = useState(0)
//     const [keyword, setKeyword] = useState('0')
//     const [search, setSearch] = useState('')


//     // Fetch products with pagination + keyword
//     const loadProducts = async () => {
//       try {
//         const res = await GetProductsByPaginationKeyword(pageNo, perPage, keyword)

//         if (res?.success) {
//           dispatch(setProductList(res.data))
//           setTotalPages(res.totalPages)
//         } else {
//           dispatch(setProductList([]))
//           setTotalPages(0)
//         }
//       } catch (error) {
//         toast.error(error.message)
//       }
//     }


//     // handleSearch
//     const handleSearch = (e) => {
//       e.preventDefault()
//       setPageNo(1)
//       setKeyword(search.trim() || '0')
//     }

//      // Pagination handler
//     const handlePageClick = (e) => {
//       setPageNo(e.selected + 1)
//     }

//     // delete product
//     const handleDelete = async (id) => {
//       try {
//         const res = await DeleteAlert()
//           if(res.isConfirmed) {
//             const result = await ProductRemove(id)
//             if(result?.success) {
//               await loadProducts()
//             }
//           }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }


// // Fetch products on mount + when dependencies change
//     useEffect(() => {
//       loadProducts()
//     }, [pageNo, perPage, keyword])
    

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Product List</h2>

//       {/* Search Box */}
//       <form onSubmit={handleSearch} className="mb-4 flex gap-2">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search products..."
//           className="border px-3 py-2 rounded-md w-64"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
//         >
//           Search
//         </button>
//       </form>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="min-w-full text-left text-sm">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">Image</th>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Category</th>
//               <th className="px-6 py-3">Brand</th>
//               <th className="px-6 py-3">Price</th>
//               <th className="px-6 py-3">Remark</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {productList.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               productList.map((item, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <img
//                       src={
//                         item.image?.[0] ||
//                         item.image ||
//                         item.image1 ||
//                         "/placeholder.png"
//                       }
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                   </td>
//                   <td className="px-6 py-4 font-medium text-gray-800 capitalize">
//                     {item.name}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 capitalize">
//                     {item.categoryName || item.category?.categoryName || "-"}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 capitalize">
//                     {item.brandName || item.brand?.brandName || "-"}
//                   </td>
//                   <td className="px-6 py-4 text-gray-800">
//                     {currency}
//                     {item.price}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 capitalize">
//                     {item.remark}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600">
//                     <div className="flex items-center gap-3">
//                       <Link
//                         to={`/admin/add-product?id=${item._id}`}
//                         className="p-2 rounded-md hover:bg-gray-100"
//                         title="Edit"
//                       >
//                         <FaEdit size={16} className="text-blue-600" />
//                       </Link>

//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                         title="Delete"
//                       >
//                         <FaTrashAlt size={16} className="text-red-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//     {/* Pagination */}
//       {totalPages > 0 && (
//         <div className=" mt-6 flex justify-center">
//             <ReactPaginate
//               breakLabel="..."
//               nextLabel="Next →"
//               onPageChange={handlePageClick}
//               pageRangeDisplayed={3}
//               marginPagesDisplayed={2}
//               pageCount={totalPages}
//               previousLabel="← Prev"
//               containerClassName="flex gap-2"
//               pageClassName="px-3 py-1 border rounded-full cursor-pointer "
//               activeClassName="bg-black text-white"
//               previousClassName="px-3 py-1 border rounded-full cursor-pointer "
//               nextClassName="px-3 py-1 border rounded-full cursor-pointer "
//               breakClassName="px-3 py-1 cursor-pointer"
//             />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;






import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaSearch, FaBox, FaTag, FaDollarSign, FaFilter, FaPlus, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { GetProductsByPaginationKeyword, ProductRemove } from "../api/product";
import { setProductList } from "../redux/slice/product";
import { DeleteAlert } from "../helper/DeleteAlert";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';

const ProductList = () => {
  const productList = useSelector((state) => state.product.list);
  const dispatch = useDispatch();
  const currency = "$";

  // Pagination + Search states
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('0');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterBy, setFilterBy] = useState('all');

  // Fetch products with pagination + keyword
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await GetProductsByPaginationKeyword(pageNo, perPage, keyword);

      if (res?.success) {
        dispatch(setProductList(res.data));
        setTotalPages(res.totalPages);
      } else {
        dispatch(setProductList([]));
        setTotalPages(0);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(setProductList([]));
    } finally {
      setLoading(false);
    }
  };

  // handleSearch
  const handleSearch = (e) => {
    e.preventDefault();
    setPageNo(1);
    setKeyword(search.trim() || '0');
  };

  // Pagination handler
  const handlePageClick = (e) => {
    setPageNo(e.selected + 1);
  };

  // delete product
  const handleDelete = async (product) => {
    try {
      const res = await DeleteAlert();
      if (res.isConfirmed) {
        const result = await ProductRemove(product._id);
        if (result?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          await loadProducts();
        }
      }
    } catch (error) {
      toast.error(error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product. Please try again.",
        icon: "error"
      });
    }
  };

  // Handle view details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Get product stats
  const getProductStats = () => {
    const totalProducts = productList?.length || 0;
    const avgPrice = totalProducts > 0 
      ? (productList.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0) / totalProducts).toFixed(2)
      : 0;
    
    return { totalProducts, avgPrice };
  };

  const { totalProducts, avgPrice } = getProductStats();

  // Fetch products on mount + when dependencies change
  useEffect(() => {
    loadProducts();
  }, [pageNo, perPage, keyword]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Product Management
            </h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link
            to="/admin/add-product"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <FaPlus size={16} />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBox className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                <p className="text-sm text-gray-600">Products on Page</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaDollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{currency}{avgPrice}</p>
                <p className="text-sm text-gray-600">Avg. Price</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaTag className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalPages}</p>
                <p className="text-sm text-gray-600">Total Pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name, category, brand..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <FaSearch size={14} />
            <span>Search</span>
          </button>

          {/* Items per page */}
          <select
            value={perPage}
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaBox className="mr-2 text-blue-600" />
            Product Inventory ({totalProducts} items)
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category & Brand
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remark
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {productList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <FaBox className="text-gray-300 text-4xl mb-4" />
                        <p className="text-gray-500 text-lg">No products found</p>
                        <p className="text-gray-400 text-sm">
                          {keyword !== '0' ? 'Try adjusting your search terms' : 'Add your first product to get started'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  productList.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              src={
                                item.image?.[0] ||
                                item.image ||
                                item.image1 ||
                                "/placeholder.png"
                              }
                              alt={item.name}
                              className="h-16 w-16 rounded-lg object-cover border-2 border-gray-100"
                              onError={(e) => {
                                e.target.src = "/placeholder.png";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {item._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize mb-1">
                          <FaTag className="inline mr-1 text-purple-500" size={12} />
                          {item.categoryName || item.category?.categoryName || "-"}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          <FaStar className="inline mr-1 text-yellow-500" size={12} />
                          {item.brandName || item.brand?.brandName || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-green-600">
                          {currency}{item.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.remark === 'popular' 
                            ? 'bg-red-100 text-red-800'
                            : item.remark === 'new' 
                              ? 'bg-green-100 text-green-800'
                              : item.remark === 'regular'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.remark}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <FaEye size={16} />
                          </button>
                          <Link
                            to={`/admin/add-product?id=${item._id}`}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Edit Product"
                          >
                            <FaEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="Delete Product"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-lg shadow-sm border p-2">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <span className="flex items-center space-x-1">
                  <span>Next</span>
                  <FaChevronRight size={12} />
                </span>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel={
                <span className="flex items-center space-x-1">
                  <FaChevronLeft size={12} />
                  <span>Prev</span>
                </span>
              }
              containerClassName="flex items-center space-x-1"
              pageClassName="px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              activeClassName="bg-blue-600 text-white hover:bg-blue-700"
              previousClassName="px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              nextClassName="px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              breakClassName="px-3 py-2 text-sm"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div>
                <img
                  src={
                    selectedProduct.image?.[0] ||
                    selectedProduct.image ||
                    selectedProduct.image1 ||
                    "/placeholder.png"
                  }
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {currency}{selectedProduct.price}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium capitalize">
                      {selectedProduct.categoryName || selectedProduct.category?.categoryName || "-"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-medium capitalize">
                      {selectedProduct.brandName || selectedProduct.brand?.brandName || "-"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Remark</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedProduct.remark === 'popular' 
                        ? 'bg-red-100 text-red-800'
                        : selectedProduct.remark === 'new' 
                          ? 'bg-green-100 text-green-800'
                          : selectedProduct.remark === 'regular'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedProduct.remark}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Product ID</p>
                    <p className="font-mono text-sm">{selectedProduct._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;