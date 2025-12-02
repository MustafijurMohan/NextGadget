
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { GetSingleUser, updateUserProfile } from '../api/user';;
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, Mail, Globe, Phone, Camera, Save } from 'lucide-react';
import { getProfileData } from '../redux/slice/user';

const Profile = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      country: '',
      mobile: '',
      image: ''
    });
    const {name, email, country, mobile, image} = formData;

    useEffect(() => {
      (async () => {
        const data = await GetSingleUser(profileId);
        if(data) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            country: data.country || '',
            mobile: data.mobile || '',
            image: data.image || '',
          });
          dispatch(getProfileData(data));
        }
      })();
    }, [dispatch, profileId]);

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value});
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({...formData, image: file});
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('email', email);
        formDataToSend.append('country', country);
        formDataToSend.append('mobile', mobile);

        if(image instanceof File) {
          formDataToSend.append('image', image);
        }

        const res = await updateUserProfile(formDataToSend);
        if(res?.success) {
          navigate('/');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Update your personal information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Image Section */}
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
            
            <div className="relative px-6 sm:px-10 pb-10">
              {/* Profile Image Upload */}
              <div className="flex justify-center -mt-16 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                    {typeof image === 'string' && image.trim() !== "" ? (
                      <img
                        src={image}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : image instanceof File ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                        <User className="w-16 h-16 text-indigo-400" />
                      </div>
                    )}
                  </div>
                  
                  <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full cursor-pointer shadow-lg transition-all duration-200 hover:scale-110">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Country and Mobile Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Country Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your country"
                      />
                    </div>
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={mobile}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 cursor-pointer" />
                        Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Keep your information up to date for a better experience
          </div>
        </div>
      </div>
    );
};

export default Profile;
