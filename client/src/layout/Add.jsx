// import { useDispatch, useSelector } from 'react-redux'
// import upload from "../assets/upload_area.png";
// import { useEffect, useState } from 'react';
// import { GetAllCategoryList } from '../api/category';
// import { GetAllBrandList } from '../api/brand';
// import { resetForm, setFormData } from '../redux/slice/product';
// import { CreateProduct, FillProductForm } from '../api/product';
// import { useNavigate, useSearchParams } from 'react-router';
// import { toast } from 'react-toastify';


// const Add = () => {
  
//   const dispatch = useDispatch()
//   const list = useSelector((state) => state.category.list)
//   const brandList = useSelector((state) => state.brand.list)
//   const {formDataInput} = useSelector((state) => state.product)
//   const {name, description, price, remark, categoryID, brandID} = formDataInput

//     // ✅ Local state for File
//   const navigate = useNavigate()

//   const [searchParams] = useSearchParams()
//   const productId = searchParams.get('id')
//   const [ObjectID, setObjectID] = useState(0)

//   // Image State
//   const [image1, setImage1] = useState(null)
//   const [preview1, setPreview1] = useState(null)

//   const [image2, setImage2] = useState(null)
//   const [preview2, setPreview2] = useState(null);

//   const [image3, setImage3] = useState(null)
//   const [preview3, setPreview3] = useState(null);

//   const [image4, setImage4] = useState(null)
//   const [preview4, setPreview4] = useState(null);

//   // on change handle
//   const handleInputChange = (e) => {
//     const {name, value} = e.target
//     dispatch(setFormData({name, value}))
//   }

//   // handle file change
//   const handleFileChange = (e, setter, previewSetter) => {
//     const file = e.target.files?.[0];
//       if (file && file instanceof File) {
//       setter(file); // store file in state
//       previewSetter(URL.createObjectURL(file)); // generate preview
//     } else {
//       setter(null);
//       previewSetter(null);
//     }
//   };



//   // on Submit
//   const handleFormSubmit = async (e) => {
//     e.preventDefault()

//     try {
      
//       const formData = new FormData()

//       formData.append('name', name)
//       formData.append('description', description)
//       formData.append('price', price)
//       formData.append('remark', remark)
//       formData.append('categoryID', categoryID)
//       formData.append('brandID', brandID)

//       image1 && formData.append('image1', image1)
//       image2 && formData.append('image2', image2)
//       image3 && formData.append('image3', image3)
//       image4 && formData.append('image4', image4)

//       await CreateProduct(formData, ObjectID)
//       setImage1(null)
//       setImage2(null)
//       setImage3(null)
//       setImage4(null)
//       setPreview1(null)
//       setPreview2(null)
//       setPreview3(null)
//       setPreview4(null)

//       // navigate('/admin/product-list')
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // Fill form if productId exists
// useEffect(() => {
  
//     (async () => {
//       await GetAllCategoryList();
//       await GetAllBrandList();

//     if (productId) {
//       const success = await FillProductForm(productId);
//       setObjectID(productId) // fill form after lists loaded
//       if (!success) toast.error("Failed to load product data");
//     } else {
//       dispatch(resetForm());
//     }
//     })()
  
// }, [productId]);

  


//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
//           {productId ? "Update Product" : "Add Product"}
//       </h1>

//       <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
//         {/* Upload Images */}
//         <div>
//           <p className="mb-3 font-medium text-gray-700">Upload Images</p>
//           <div className="flex flex-wrap gap-4">

//             {[1,2,3,4].map((i) => {
//               const img = [preview1, preview2, preview3, preview4][i-1];
//               const setter = [setImage1, setImage2, setImage3, setImage4][i-1];
//               const previewSetter = [setPreview1, setPreview2, setPreview3, setPreview4][i-1];
//               return (
//                 <label
//                   key={i}
//                   htmlFor={`image${i}`}
//                   className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
//                 >
//                   {img ? (
//                     <img src={img} className="w-12 h-12 opacity-80" alt={`upload${i}`} />
//                   ) : (
//                     <>
//                       <img src={upload} className="w-12 h-12 opacity-80" alt="upload" />
//                       <span className="text-xs text-gray-500 mt-1">Upload</span>
//                     </>
//                   )}
//                   <input onChange={(e) => handleFileChange(e, setter, previewSetter)} type="file" id={`image${i}`} hidden />
//                 </label>
//               )
//             })}
//             {/* Image 1 */}
//             {/* <label
//               htmlFor="image1"
//               className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
//             >
//               {preview1 ? (
//                 <img src={preview1} className="w-12 h-12 opacity-80" alt="upload" />
//               ) : (
//                 <>
//                   <img src={upload} className="w-12 h-12 opacity-80" alt="upload" />
//                   <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 </>
//               )}
//               <input onChange={(e) => handleFileChange(e, setImage1, setPreview1)} type="file" id="image1" hidden />
//             </label> */}

//             {/* Image 2 */}
//             {/* <label
//               htmlFor="image2"
//               className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
//             >
//               {preview2 ? (
//                 <img src={preview2} className="w-12 h-12 opacity-80" alt="upload" />
//               ) : (
//                 <>
//                   <img src={upload} className="w-12 h-12 opacity-80" alt="upload" />
//                   <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 </>
//               )}
//               <input onChange={(e) =>  handleFileChange(e, setImage2, setPreview2)} type="file" id="image2" hidden />
//             </label> */}

//             {/* Image 3 */}
//             {/* <label
//               htmlFor="image3"
//               className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
//             >
//               {preview3 ? (
//                 <img src={preview3} className="w-12 h-12 opacity-80" alt="upload" />
//               ) : (
//                 <>
//                   <img src={upload} className="w-12 h-12 opacity-80" alt="upload" />
//                   <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 </>
//               )}
//               <input onChange={(e) =>  handleFileChange(e, setImage3, setPreview3)} type="file" id="image3" hidden />
//             </label> */}

//             {/* Image 4 */}
//             {/* <label
//               htmlFor="image4"
//               className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
//             >
//               {preview4 ? (
//                 <img src={preview4} className="w-12 h-12 opacity-80" alt="upload" />
//               ) : (
//                 <>
//                   <img src={upload} className="w-12 h-12 opacity-80" alt="upload" />
//                   <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 </>
//               )}
//               <input onChange={(e) =>  handleFileChange(e, setImage4, setPreview4)} type="file" id="image4" hidden />
//             </label> */}

//           </div>
//         </div>

//         {/* Product Name */}
//         <div>
//           <p className="mb-2 font-medium text-gray-700">Product Name</p>
//           <input
//             onChange={handleInputChange}
//             name='name'
//             value={name}
//             type="text"
//             placeholder="Enter product name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <p className="mb-2 font-medium text-gray-700">Description</p>
//           <textarea
//             onChange={handleInputChange}
//             name='description'
//             value={description}
//             rows={5}
//             placeholder="Enter product description"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             required
//           />
//         </div>

//         {/* Category, Brand, Remark, Price */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Category */}
//           <div>
//             <p className="mb-2 font-medium text-gray-700">Category</p>
//             <select onChange={handleInputChange} name='categoryID' value={categoryID} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
//               <option value='' >Select Category</option>
//               {
//                 list.map((item, index) => (
//                   <option key={item._id} className='capitalize' value={item._id}>{item.categoryName}</option>
//                 ))
//               }
//             </select>
//           </div>

//           {/* Brand */}
//           <div>
//             <p className="mb-2 font-medium text-gray-700">Brand</p>
//             <select onChange={handleInputChange} name='brandID' value={brandID} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
//               <option value=''>Select Brand</option>
//               {
//                 brandList.map((item, index) => (
//                   <option key={item._id} className='capitalize' value={item._id}>{item.brandName}</option>
//                 ))
//               }
//             </select>
//           </div>

//           {/* Remark */}
//           <div>
//             <p className="mb-2 font-medium text-gray-700">Remark</p>
//             <select onChange={handleInputChange} name='remark' value={remark} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
//               <option value="">Select Remark</option>
//               <option value="New">New</option>
//               <option value="Trending">Trending</option>
//               <option value="Hot Deal">Hot Deal</option>
//               <option value="Premium">Premium</option>
//               <option value="Limited">Limited</option>
//               <option value="BestSeller">Best Seller</option>
//             </select>
//           </div>

//           {/* Price */}
//           <div>
//             <p className="mb-2 font-medium text-gray-700">Price</p>
//             <input
//               onChange={handleInputChange} name='price' value={price}
//               type="number"
//               placeholder="25"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-8 py-3 rounded-md bg-black text-white font-medium shadow hover:bg-gray-800 transition cursor-pointer"
//           >
//             {productId ? "Update Product" : "Add Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Add;





import { useDispatch, useSelector } from 'react-redux';
import upload from "../assets/upload_area.png";
import { useEffect, useState } from 'react';
import { GetAllCategoryList } from '../api/category';
import { GetAllBrandList } from '../api/brand';
import { resetForm, setFormData } from '../redux/slice/product';
import { CreateProduct, FillProductForm } from '../api/product';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt, FaImage, FaSave, FaArrowLeft, FaBox, FaTag, FaStar, FaDollarSign, FaFileAlt, FaTimes, FaEye } from 'react-icons/fa';

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.category.list);
  const brandList = useSelector((state) => state.brand.list);
  const { formDataInput } = useSelector((state) => state.product);
  const { name, description, price, remark, categoryID, brandID } = formDataInput;

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const [ObjectID, setObjectID] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);

  // Image State
  const [image1, setImage1] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [preview4, setPreview4] = useState(null);

  // Form validation state
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!name?.trim()) newErrors.name = 'Product name is required';
    if (!description?.trim()) newErrors.description = 'Description is required';
    if (!price || parseFloat(price) <= 0) newErrors.price = 'Valid price is required';
    if (!categoryID) newErrors.categoryID = 'Category is required';
    if (!brandID) newErrors.brandID = 'Brand is required';
    if (!remark) newErrors.remark = 'Remark is required';
    
    if (!productId && !image1) newErrors.image1 = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // on change handle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // handle file change
  const handleFileChange = (e, setter, previewSetter, imageNumber) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP)');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setter(file);
      previewSetter(URL.createObjectURL(file));
      
      // Clear error for first image
      if (imageNumber === 1 && errors.image1) {
        setErrors(prev => ({ ...prev, image1: '' }));
      }
    } else {
      setter(null);
      previewSetter(null);
    }
  };

  // Clear image
  const clearImage = (setter, previewSetter) => {
    setter(null);
    previewSetter(null);
  };

  // on Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('price', price);
      formData.append('remark', remark);
      formData.append('categoryID', categoryID);
      formData.append('brandID', brandID);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const result = await CreateProduct(formData, ObjectID);
      
      if (result?.success) {
        toast.success(productId ? 'Product updated successfully!' : 'Product created successfully!');
        
        if (!productId) {
          // Reset form for new product
          setImage1(null);
          setImage2(null);
          setImage3(null);
          setImage4(null);
          setPreview1(null);
          setPreview2(null);
          setPreview3(null);
          setPreview4(null);
          dispatch(resetForm());
        }
        
        // Navigate to product list after short delay
        setTimeout(() => {
          navigate('/admin/product-list');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fill form if productId exists
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await GetAllCategoryList();
        await GetAllBrandList();

        if (productId) {
          const success = await FillProductForm(productId);
          setObjectID(productId);
          if (!success) toast.error("Failed to load product data");
        } else {
          dispatch(resetForm());
        }
      } catch (error) {
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, dispatch]);

  const imageData = [
    { image: image1, preview: preview1, setter: setImage1, previewSetter: setPreview1 },
    { image: image2, preview: preview2, setter: setImage2, previewSetter: setPreview2 },
    { image: image3, preview: preview3, setter: setImage3, previewSetter: setPreview3 },
    { image: image4, preview: preview4, setter: setImage4, previewSetter: setPreview4 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/product-list')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Back to Product List"
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {productId ? "Update Product" : "Add New Product"}
              </h1>
              <p className="text-gray-600 mt-1">
                {productId ? "Edit product details and save changes" : "Create a new product for your inventory"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaBox className="mr-2 text-green-600" />
            Product Information
          </h2>
        </div>

        <div className="p-8">
          <div onSubmit={handleFormSubmit} className="space-y-8">
            {/* Upload Images Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Product Images *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageData.map((imgData, i) => (
                  <div key={i} className="relative group">
                    <label
                      htmlFor={`image${i + 1}`}
                      className={`cursor-pointer w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-200 ${
                        imgData.preview 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
                      } ${i === 0 && errors.image1 ? 'border-red-300 bg-red-50' : ''}`}
                    >
                      {imgData.preview ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={imgData.preview} 
                            className="w-full h-full object-cover rounded-lg" 
                            alt={`Product ${i + 1}`} 
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPreviewModal(imgData.preview);
                                }}
                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                              >
                                <FaEye size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  clearImage(imgData.setter, imgData.previewSetter);
                                }}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                              >
                                <FaTimes size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <FaCloudUploadAlt className="text-gray-400 text-2xl mb-2 group-hover:text-green-500" />
                          <span className="text-sm text-gray-500 group-hover:text-green-600 font-medium">
                            {i === 0 ? 'Main Image *' : `Image ${i + 1}`}
                          </span>
                          <span className="block text-xs text-gray-400 mt-1">
                            JPG, PNG, WebP
                          </span>
                        </div>
                      )}
                      <input 
                        onChange={(e) => handleFileChange(e, imgData.setter, imgData.previewSetter, i + 1)} 
                        type="file" 
                        id={`image${i + 1}`} 
                        accept="image/*"
                        className="hidden" 
                      />
                    </label>
                    {i === 0 && errors.image1 && (
                      <p className="text-red-500 text-xs mt-1">{errors.image1}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload up to 4 images. First image will be used as the main product image.
              </p>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBox className="inline mr-2 text-gray-500" size={14} />
                    Product Name *
                  </label>
                  <input
                    onChange={handleInputChange}
                    name='name'
                    value={name || ''}
                    type="text"
                    placeholder="Enter product name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFileAlt className="inline mr-2 text-gray-500" size={14} />
                    Description *
                  </label>
                  <textarea
                    onChange={handleInputChange}
                    name='description'
                    value={description || ''}
                    rows={5}
                    placeholder="Enter detailed product description"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaDollarSign className="inline mr-2 text-gray-500" size={14} />
                    Price *
                  </label>
                  <input
                    onChange={handleInputChange}
                    name='price'
                    value={price || ''}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaTag className="inline mr-2 text-gray-500" size={14} />
                    Category *
                  </label>
                  <select 
                    onChange={handleInputChange} 
                    name='categoryID' 
                    value={categoryID || ''} 
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.categoryID ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value=''>Select Category</option>
                    {list.map((item) => (
                      <option key={item._id} className='capitalize' value={item._id}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.categoryID && <p className="text-red-500 text-xs mt-1">{errors.categoryID}</p>}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaStar className="inline mr-2 text-gray-500" size={14} />
                    Brand *
                  </label>
                  <select 
                    onChange={handleInputChange} 
                    name='brandID' 
                    value={brandID || ''} 
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.brandID ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value=''>Select Brand</option>
                    {brandList.map((item) => (
                      <option key={item._id} className='capitalize' value={item._id}>
                        {item.brandName}
                      </option>
                    ))}
                  </select>
                  {errors.brandID && <p className="text-red-500 text-xs mt-1">{errors.brandID}</p>}
                </div>

                {/* Remark */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status *
                  </label>
                  <select 
                    onChange={handleInputChange} 
                    name='remark' 
                    value={remark || ''} 
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.remark ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Remark</option>
                    <option value="New">New</option>
                    <option value="Trending">Trending</option>
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="Premium">Premium</option>
                    <option value="Limited">Limited</option>
                    <option value="BestSeller">Best Seller</option>
                  </select>
                  {errors.remark && <p className="text-red-500 text-xs mt-1">{errors.remark}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/product-list')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaSave size={16} />
                    <span>{productId ? "Update Product" : "Create Product"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewModal}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewModal(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;