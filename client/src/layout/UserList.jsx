// import { FaRegTrashAlt } from "react-icons/fa";
// import {useSelector} from 'react-redux'
// import upload from '../assets/upload_area.png'
// import { GetAllUserList } from "../api/user";
// import { useEffect } from "react";

// const UserList = () => {

//   const userList =  useSelector((state) => state.user.list)

//   useEffect(() => {
//     (async () => {
//       await GetAllUserList()
//     })()
//   }, [])
  
//   return (
//     <>
//     {/* User List Section */}
//       <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//         User List
//       </h1>

//       <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="min-w-full text-left text-sm">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">User Image</th>
//               <th className="px-6 py-3"> Name</th>
//               <th className="px-6 py-3"> Email</th>
//               <th className="px-6 py-3"> Admin</th>
//               <th className="px-6 py-3"> Mobile</th>
//               <th className="px-6 py-3"> Country</th>
//               <th className="px-6 py-3"> Action</th>
//             </tr>
//           </thead>
//           <tbody>
//                 {userList.length > 0 ? (
//                   userList.map((item, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-4"><img src={item.image} className="w-20" alt="upload" /></td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{item.email}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{item.isAdmin}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{item.mobile}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{item.country}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800 cursor-pointer"><FaRegTrashAlt size={22} /></td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="2" className="text-center py-6 text-gray-500">No User found</td>
//                   </tr>
//                 )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default UserList






import { FaRegTrashAlt, FaEye, FaUsers, FaUserShield, FaCalendarAlt, FaMobile, FaGlobe, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import upload from '../assets/upload_area.png';
import { GetAllUserList } from "../api/user";
import { useEffect, useState } from "react";
// import { DeleteAlert } from "../path/to/your/DeleteAlert"; // Update this path
import Swal from 'sweetalert2';

const UserList = () => {
  const userList = useSelector((state) => state.user.list);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('all'); // all, admin, user

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await GetAllUserList();
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDeleteClick = async (user) => {
    try {
      const result = await DeleteAlert();
      
      if (result.isConfirmed) {
        // Add your delete API call here
        // Example: await deleteUser(user.id);
        
        console.log('Deleting user:', user);
        // Refresh the user list
        await GetAllUserList();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = userList?.filter(user => {
    if (filter === 'admin') return user.isAdmin === true || user.isAdmin === 'true';
    if (filter === 'user') return user.isAdmin === false || user.isAdmin === 'false';
    return true;
  });

  const adminCount = userList?.filter(user => user.isAdmin === true || user.isAdmin === 'true').length || 0;
  const regularUserCount = userList?.length - adminCount || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">Manage system users and administrators</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2">
                <FaUsers className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Total: {userList?.length || 0}
                </span>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2">
                <FaUserShield className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Admins: {adminCount}
                </span>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2">
                <FaUserCheck className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Users: {regularUserCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === 'all'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Users ({userList?.length || 0})
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === 'admin'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Admins ({adminCount})
          </button>
          <button
            onClick={() => setFilter('user')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === 'user'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Users ({regularUserCount})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaUsers className="mr-2 text-blue-600" />
            User Directory
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id || index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                            src={user.image || upload}
                            alt={user.name || 'User'}
                            onError={(e) => {
                              e.target.src = upload;
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 mb-1">
                        {user.email || 'N/A'}
                      </div>
                      {user.mobile && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaMobile className="mr-1" size={12} />
                          {user.mobile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.isAdmin === true || user.isAdmin === 'true'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.isAdmin === true || user.isAdmin === 'true' ? (
                          <>
                            <FaUserShield className="mr-1" size={12} />
                            Admin
                          </>
                        ) : (
                          <>
                            <FaUserCheck className="mr-1" size={12} />
                            User
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.country ? (
                        <div className="flex items-center">
                          <FaGlobe className="mr-2 text-gray-400" size={12} />
                          {user.country}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" size={12} />
                        {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                          title="Delete User"
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
                      <FaUserTimes className="text-gray-300 text-4xl mb-4" />
                      <p className="text-gray-500 text-lg">No users found</p>
                      <p className="text-gray-400 text-sm">
                        {filter === 'all' 
                          ? 'No users registered yet' 
                          : `No ${filter === 'admin' ? 'administrators' : 'regular users'} found`
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-start space-x-6 mb-6">
              <img
                className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                src={selectedUser.image || upload}
                alt={selectedUser.name || 'User'}
                onError={(e) => {
                  e.target.src = upload;
                }}
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedUser.name || 'N/A'}
                </h4>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedUser.isAdmin === true || selectedUser.isAdmin === 'true'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedUser.isAdmin === true || selectedUser.isAdmin === 'true' ? (
                      <>
                        <FaUserShield className="mr-1" size={12} />
                        Administrator
                      </>
                    ) : (
                      <>
                        <FaUserCheck className="mr-1" size={12} />
                        Regular User
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedUser.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <p className="text-gray-900">{selectedUser.mobile || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <p className="text-gray-900">{selectedUser.country || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <p className="text-gray-900">{selectedUser.id || 'N/A'}</p>
              </div>
              {selectedUser.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joined</label>
                  <p className="text-gray-600">{formatDate(selectedUser.createdAt)}</p>
                </div>
              )}
              {selectedUser.lastLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <p className="text-gray-600">{formatDate(selectedUser.lastLogin)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;