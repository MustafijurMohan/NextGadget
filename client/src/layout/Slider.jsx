// import { useDispatch, useSelector } from 'react-redux';
// import upload from '../assets/upload_area.png'
// import { FaRegTrashAlt } from "react-icons/fa";
// import { useEffect, useState } from 'react';
// import { setFormData, setSliderList } from '../redux/slice/slider';
// import { CreateSlider, GetAllSliderList, SliderRemove } from '../api/slider';
// import { DeleteAlert } from '../helper/DeleteAlert';

// const Slider = () => {

//   const {formData, list} = useSelector((state) => state.slider)
//   const dispatch = useDispatch()
//   const {name, description} = formData

//     // ✅ Local state for File
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);

//       // Handle file Change
//     const handleFileChange = (e) => {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);

//       if (selectedFile) {
//         setPreview(URL.createObjectURL(selectedFile));
//       }
//   };

//   // Handle Input Change
//   const handleInputChange = (e) => {
//     const {name, value} = e.target
//     dispatch(setFormData({name, value}))
//   }

//   // handle submit
//   const handleFormSubmit = async (e) => {
//     e.preventDefault()

//     if (!name || !description || !file) {
//       toast.error(" Name or Image or Description are required!");
//       return;
//     }

//     try {
//       const formDataInput = new FormData()
//       formDataInput.append('name', name)
//       formDataInput.append('description', description)
//       formDataInput.append('image', file)

//       // api call
//       const res = await CreateSlider(formDataInput)
//       if(res?.success) {
//         // ✅ refresh list after create
//         await GetAllSliderList();

        
//         setFile(null);
//         setPreview(null);
//         dispatch(resetForm()); 
//       }

//     } catch (error) {
//       console.log(error.message)
//     }
//   }



//   // Slider Remove
//   const sliderRemove = async (id) => {
//     const res = await DeleteAlert()
//     if(res.isConfirmed) {
//       const result = await SliderRemove(id)
//       if(result?.success) {
//           // ✅ refresh list after delete
//           await GetAllSliderList();
//       }
//     }
//   }


//   // Get All Slider List
//   useEffect(() => {
//     (async() => {
//       const res = await GetAllSliderList()
//       if(res?.success){
//         dispatch(setSliderList(res.data))
//       }
//     })()
//   }, [dispatch])
  




//   return (
//     <div>
//          {/* Product Form */}
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
//         Product Slider
//       </h1>

//       <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-xl p-6 mb-10">
//         <div className="flex flex-col md:flex-row items-center justify-center gap-6">
//           {/* Upload Image */}
//           <div className="flex flex-col items-center">
//             <p className="mb-2 font-medium text-gray-700">Upload Image</p>
//             <label htmlFor="prod-img" className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 transition">
//               <img src={preview || upload} alt="upload" className="w-20 h-20 object-cover rounded-md opacity-90"/>
//               <span className="text-sm text-gray-500 mt-2">Click to upload</span>
//               <input onChange={handleFileChange} type="file" id="prod-img" hidden/>
//             </label>
//           </div>

//           {/* Product Name */}
//           <div className="flex flex-col w-full md:w-1/3">
//             <p className="mb-2 font-medium text-gray-700">Product Name</p>
//             <input onChange={handleInputChange} type="text" value={name} name="name" placeholder="Enter product name" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" required />
//           </div>

//           {/* Product Description */}
//           <div className="flex flex-col w-full md:w-1/3">
//             <p className="mb-2 font-medium text-gray-700">Description</p>
//             <input onChange={handleInputChange} type="text" value={description} name="description" placeholder="Enter description" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" required />
//           </div>

//           {/* Add Button */}
//           <div className="mt-6 md:mt-8">
//             <button type="submit" className="px-8 py-2 rounded-md bg-black text-white font-medium shadow hover:bg-gray-800 transition cursor-pointer" >
//               ADD
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Slider List Section */}
//         <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//           Slider List
//         </h1>
  
//         <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//           <table className="min-w-full text-left text-sm">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Slider Image</th>
//                 <th className="px-6 py-3"> Name</th>
//                 <th className="px-6 py-3"> Description</th>
//                 <th className="px-6 py-3"> Action</th>
//               </tr>
//             </thead>
//             <tbody>
//                 {list.length > 0 ? (
//                   list.map((item) => (
//                     <tr key={item._id} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
//                       </td>
//                       <td className="px-6 py-4 font-medium text-gray-800 capitalize">{item.name}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800 capitalize">{item.description}</td>
//                       <td onClick={() => sliderRemove(item._id)} className="px-6 py-4 font-medium text-gray-800 capitalize cursor-pointer"><FaRegTrashAlt size={20} /> </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="2" className="text-center py-6 text-gray-500">No Slider found</td>
//                   </tr>
//                 )}
//             </tbody>
//           </table>
//         </div>
//     </div>
//   )
// }

// export default Slider








import { useDispatch, useSelector } from 'react-redux';
import upload from '../assets/upload_area.png';
import { FaRegTrashAlt, FaEye, FaPlus, FaImage, FaSlidersH, FaEdit, FaCloudUploadAlt, FaPlay, FaPause } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { setFormData, setSliderList, resetForm } from '../redux/slice/slider';
import { CreateSlider, GetAllSliderList, SliderRemove } from '../api/slider';
import { DeleteAlert } from '../helper/DeleteAlert';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Slider = () => {
  const { formData, list } = useSelector((state) => state.slider);
  const dispatch = useDispatch();
  const { name, description } = formData;

  // Local state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editSliderId, setEditSliderId] = useState(null);

  // Handle file Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP)');
        return;
      }
      
      // Validate file size (10MB max for slider images)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  // Reset form
  const resetFormState = () => {
    setFile(null);
    setPreview(null);
    setEditMode(false);
    setEditSliderId(null);
    dispatch(resetForm());
  };

  // Handle submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name?.trim()) {
      toast.error("Slider name is required!");
      return;
    }

    if (!description?.trim()) {
      toast.error("Description is required!");
      return;
    }

    if (!file && !editMode) {
      toast.error("Slider image is required!");
      return;
    }

    try {
      setLoading(true);
      const formDataInput = new FormData();
      formDataInput.append('name', name.trim());
      formDataInput.append('description', description.trim());
      
      if (file) {
        formDataInput.append('image', file);
      }

      if (editMode) {
        // Add update logic here
        // await UpdateSlider(editSliderId, formDataInput);
        toast.success('Slider updated successfully!');
      } else {
        const res = await CreateSlider(formDataInput);
        if (res?.success) {
          toast.success('Slider added successfully!');
        }
      }

      // Refresh list after create/update
      await GetAllSliderList();
      resetFormState();
    } catch (error) {
      console.error(error);
      toast.error(editMode ? 'Failed to update slider' : 'Failed to add slider');
    } finally {
      setLoading(false);
    }
  };

  // Slider Remove
  const sliderRemove = async (slider) => {
    try {
      const res = await DeleteAlert();
      if (res.isConfirmed) {
        const result = await SliderRemove(slider._id);
        if (result?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Slider has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          // Refresh list after delete
          await GetAllSliderList();
        }
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete slider. Please try again.",
        icon: "error"
      });
    }
  };

  // Handle edit
  const handleEditClick = (slider) => {
    setEditMode(true);
    setEditSliderId(slider._id);
    setPreview(slider.image);
    dispatch(setFormData({ name: 'name', value: slider.name }));
    dispatch(setFormData({ name: 'description', value: slider.description }));
  };

  // Handle view details
  const handleViewDetails = (slider) => {
    setSelectedSlider(slider);
  };

  // Get All Slider List
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await GetAllSliderList();
        if (res?.success) {
          dispatch(setSliderList(res.data));
        }
      } catch (error) {
        console.error('Error fetching sliders:', error);
        toast.error('Failed to load sliders');
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
            Slider Management
          </h1>
          <p className="text-gray-600">Create and manage homepage sliders</p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="bg-white px-6 py-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaSlidersH className="text-indigo-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{list?.length || 0}</p>
                <p className="text-sm text-gray-600">Active Sliders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Slider Form */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {editMode ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-green-600" />}
            {editMode ? 'Edit Slider' : 'Add New Slider'}
          </h2>
          {editMode && (
            <button
              onClick={resetFormState}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
            {/* Upload Image Section */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Slider Image *
              </label>
              <div className="relative group">
                <label
                  htmlFor="slider-img"
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-indigo-50 group-hover:shadow-md"
                >
                  {preview ? (
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Slider preview" 
                        className="w-24 h-16 object-cover rounded-lg shadow-md" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <FaCloudUploadAlt className="text-white opacity-0 group-hover:opacity-100 text-lg" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FaImage className="text-gray-400 text-3xl mb-2 group-hover:text-indigo-500" />
                      <span className="text-sm text-gray-500 group-hover:text-indigo-600 font-medium">
                        Upload slider image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WebP (Max 10MB)
                      </span>
                    </>
                  )}
                  <input 
                    onChange={handleFileChange} 
                    type="file" 
                    id="slider-img" 
                    accept="image/*"
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Slider Name Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slider Name *
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                value={name || ''}
                name="name"
                placeholder="Enter slider name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                value={description || ''}
                name="description"
                placeholder="Enter description"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleFormSubmit}
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : editMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl'
                      : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white hover:shadow-xl'
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
                    <span>{editMode ? 'Update Slider' : 'Add Slider'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider List Section */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaSlidersH className="mr-2 text-indigo-600" />
            Slider Gallery ({list?.length || 0})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Slider Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
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
                      <div className="flex-shrink-0 relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-12 object-cover rounded-lg shadow-sm border-2 border-gray-100"
                          onError={(e) => {
                            e.target.src = upload;
                          }}
                        />
                        <div className="absolute -top-1 -right-1 bg-indigo-100 rounded-full p-1">
                          <FaPlay className="text-indigo-600" size={8} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {item._id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs">
                        <p className="line-clamp-2 capitalize">
                          {item.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaPlay className="mr-1" size={10} />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
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
                          title="Edit Slider"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => sliderRemove(item)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                          title="Delete Slider"
                        >
                          <FaRegTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <FaSlidersH className="text-gray-300 text-4xl mb-4" />
                      <p className="text-gray-500 text-lg">No sliders found</p>
                      <p className="text-gray-400 text-sm">Create your first slider above</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slider Details Modal */}
      {selectedSlider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Slider Details</h3>
              <button
                onClick={() => setSelectedSlider(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Slider Image */}
              <div className="relative">
                <img
                  src={selectedSlider.image}
                  alt={selectedSlider.name}
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = upload;
                  }}
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <FaSlidersH className="text-indigo-600" size={16} />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slider Name</label>
                  <p className="text-gray-900 capitalize">{selectedSlider.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaPlay className="mr-1" size={8} />
                    Active
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900 capitalize">{selectedSlider.description}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slider ID</label>
                  <p className="text-gray-600 text-sm">{selectedSlider._id}</p>
                </div>
                {selectedSlider.createdAt && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-gray-600">{new Date(selectedSlider.createdAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;