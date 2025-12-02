// import { useDispatch, useSelector } from "react-redux";
// import upload from "../assets/upload_area.png";
// import { useEffect, useState } from "react";
// import { setCategoryList, setFormData } from "../redux/slice/category";
// import { CreateCategory, GetAllCategoryList } from "../api/category";
// import { toast } from "react-toastify";

// const Category = () => {
//   const {formDataInput, list} = useSelector((state) => state.category)

//   const dispatch = useDispatch()
//   const { categoryName} = formDataInput

//   // ✅ Local state for File
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Handle File Change
//   const handleFileChange = (e) => {
//   const selectedFile = e.target.files[0];
//   setFile(selectedFile);

//   if (selectedFile) {
//     setPreview(URL.createObjectURL(selectedFile));
//   }
// };


//   // on Change handler
//   const handleInputChange = (e) => {
//     const {name, value} = e.target
//     dispatch(setFormData({name, value}))
//   }

//    // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     //   if (!categoryName || !file) {
//     //   toast.error("Category name and image are required!");
//     //   return;
//     // }

//     try {
//       const formData = new FormData()
//       formData.append('categoryName', categoryName)
//       formData.append('image', file)


//       await CreateCategory(formData)
//       const res = await GetAllCategoryList()
//       if(res?.success) {
//         dispatch(setCategoryList(res.data))
//       }

//        // Reset form
//       setFile(null);
//       setPreview(null);
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

// // Get all Category list
//   useEffect(() => {
//     (async () => {
//       const res = await GetAllCategoryList()
//       if(res?.success) {
//         dispatch(setCategoryList(res.data))
//       }
//     })()
//   }, [dispatch])



//   return (
//     <>
//       <div className="p-6 max-w-5xl mx-auto">
//             {/* Categroy Section */}
//             <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
//               Category Section
//             </h1>
      
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-10">
//               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
//                 {/* Upload Image */}
//                 <div className="flex flex-col items-center">
//                   <p className="mb-2 font-medium text-gray-700">Upload Image</p>
//                   <label
//                     htmlFor="img"
//                     className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 transition"
//                   >
//                     <img src={preview || upload} alt="upload" className="w-20 opacity-80" />
//                     <span className="text-sm text-gray-500 mt-2">Click to upload</span>
//                     <input onChange={handleFileChange} type="file" id="img" hidden />
//                   </label>
//                 </div>
      
//                 {/* Category Name Input */}
//                 <div className="flex flex-col w-full md:w-1/2">
//                   <p className="mb-2 font-medium text-gray-700">Category Name</p>
//                   <input
//                     onChange={handleInputChange}
//                     name="categoryName"
//                     value={categoryName}
//                     type="text"
//                     placeholder="Enter category name"
//                     className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    
//                   />
//                 </div>
      
//                 {/* Add Button */}
//                 <div className="mt-6 md:mt-8">
//                   <button
//                     type="submit"
//                     className="px-8 py-2 rounded-md bg-black text-white font-medium shadow hover:bg-gray-800 transition cursor-pointer"
//                   >
//                     ADD
//                   </button>
//                 </div>
//               </div>
//             </form>
      
//             {/* Brand List Section */}
//             <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//               Category List
//             </h1>
      
//             <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//               <table className="min-w-full text-left text-sm">
//                 <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                   <tr>
//                     <th className="px-6 py-3">Category Image</th>
//                     <th className="px-6 py-3">Category Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                     {list.length > 0 ? (
//                       list.map((item) => (
//                         <tr key={item._id} className="border-b hover:bg-gray-50">
//                           <td className="px-6 py-4">
//                             <img src={item.categoryImg} alt={item.categoryName} className="w-16 h-16 object-cover rounded-md" />
//                           </td>
//                           <td className="px-6 py-4 font-medium text-gray-800 capitalize">{item.categoryName}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="2" className="text-center py-6 text-gray-500">No categories found</td>
//                       </tr>
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//     </>
//   )
// }

// export default Category






import { useDispatch, useSelector } from "react-redux";
import upload from "../assets/upload_area.png";
import { useEffect, useState } from "react";
import { setCategoryList, setFormData } from "../redux/slice/category";
import { CreateCategory, GetAllCategoryList } from "../api/category";
import { toast } from "react-toastify";
import { FaRegTrashAlt, FaEye, FaPlus, FaImage, FaLayerGroup, FaEdit, FaCloudUploadAlt, FaTh } from "react-icons/fa";
import { DeleteAlert } from "../helper/DeleteAlert"; // Update this path
import Swal from 'sweetalert2';

const Category = () => {
  const { formDataInput, list } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { categoryName } = formDataInput;

  // Local state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  // Handle File Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP)');
        return;
      }
      
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // On Change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setEditMode(false);
    setEditCategoryId(null);
    dispatch(setFormData({ name: 'categoryName', value: '' }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName?.trim()) {
      toast.error("Category name is required!");
      return;
    }

    if (!file && !editMode) {
      toast.error("Category image is required!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('categoryName', categoryName.trim());
      
      if (file) {
        formData.append('image', file);
      }

      if (editMode) {
        // Add update logic here
        // await UpdateCategory(editCategoryId, formData);
        toast.success('Category updated successfully!');
      } else {
        await CreateCategory(formData);
        toast.success('Category added successfully!');
      }

      const res = await GetAllCategoryList();
      if (res?.success) {
        dispatch(setCategoryList(res.data));
      }

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(editMode ? 'Failed to update category' : 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDeleteClick = async (category) => {
    try {
      const result = await DeleteAlert();
      
      if (result.isConfirmed) {
        // Add your delete API call here
        // await deleteCategory(category._id);
        
        console.log('Deleting category:', category);
        
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        
        // Refresh the category list
        const res = await GetAllCategoryList();
        if (res?.success) {
          dispatch(setCategoryList(res.data));
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete category. Please try again.",
        icon: "error"
      });
    }
  };

  // Handle edit
  const handleEditClick = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setPreview(category.categoryImg);
    dispatch(setFormData({ name: 'categoryName', value: category.categoryName }));
  };

  // Handle view details
  const handleViewDetails = (category) => {
    setSelectedCategory(category);
  };

  // Get all Category list
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await GetAllCategoryList();
        if (res?.success) {
          dispatch(setCategoryList(res.data));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Category Management
          </h1>
          <p className="text-gray-600">Organize your products with categories</p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaLayerGroup className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{list?.length || 0}</p>
                <p className="text-sm text-gray-600">Total Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Form */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {editMode ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-green-600" />}
            {editMode ? 'Edit Category' : 'Add New Category'}
          </h2>
          {editMode && (
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Upload Image Section */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category Image *
              </label>
              <div className="relative group">
                <label
                  htmlFor="img"
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-purple-50 group-hover:shadow-md"
                >
                  {preview ? (
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Category preview" 
                        className="w-24 h-24 object-cover rounded-lg shadow-md" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <FaCloudUploadAlt className="text-white opacity-0 group-hover:opacity-100 text-xl" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FaImage className="text-gray-400 text-3xl mb-2 group-hover:text-purple-500" />
                      <span className="text-sm text-gray-500 group-hover:text-purple-600 font-medium">
                        Click to upload image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WebP (Max 5MB)
                      </span>
                    </>
                  )}
                  <input 
                    onChange={handleFileChange} 
                    type="file" 
                    id="img" 
                    accept="image/*"
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Category Name Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                onChange={handleInputChange}
                name="categoryName"
                value={categoryName || ''}
                type="text"
                placeholder="Enter category name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : editMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl'
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {editMode ? <FaEdit size={16} /> : <FaPlus size={16} />}
                    <span>{editMode ? 'Update Category' : 'Add Category'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid View Option */}
      <div className="mb-4 flex justify-end">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button className="px-3 py-2 bg-purple-100 text-purple-600 rounded-md text-sm font-medium">
            <FaTh className="inline mr-1" size={14} />
            Table View
          </button>
        </div>
      </div>

      {/* Category List Section */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaLayerGroup className="mr-2 text-purple-600" />
            Category Directory ({list?.length || 0})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list?.length > 0 ? (
                list.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0">
                        <img 
                          src={item.categoryImg} 
                          alt={item.categoryName} 
                          className="w-16 h-16 object-cover rounded-lg shadow-sm border-2 border-gray-100"
                          onError={(e) => {
                            e.target.src = upload;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {item.categoryName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {item._id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200 p-2 hover:bg-green-50 rounded-lg"
                          title="Edit Category"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                          title="Delete Category"
                        >
                          <FaRegTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <FaLayerGroup className="text-gray-300 text-4xl mb-4" />
                      <p className="text-gray-500 text-lg">No categories found</p>
                      <p className="text-gray-400 text-sm">Create your first category above</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Details Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Category Details</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={selectedCategory.categoryImg}
                  alt={selectedCategory.categoryName}
                  className="w-32 h-32 object-cover rounded-xl mx-auto shadow-lg"
                  onError={(e) => {
                    e.target.src = upload;
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-purple-100 rounded-full p-2">
                  <FaLayerGroup className="text-purple-600" size={16} />
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                {selectedCategory.categoryName}
              </h4>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p><strong>Category ID:</strong> {selectedCategory._id}</p>
                </div>
                
                {selectedCategory.createdAt && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p><strong>Created:</strong> {new Date(selectedCategory.createdAt).toLocaleDateString()}</p>
                  </div>
                )}
                
                {selectedCategory.updatedAt && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p><strong>Updated:</strong> {new Date(selectedCategory.updatedAt).toLocaleDateString()}</p>
                  </div>
                )}
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800"><strong>Status:</strong> Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;