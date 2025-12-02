
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userOrderDataAdmin, userOrderStatusUpdate } from "../api/order"
import { Search, Filter, Download, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { orderStatusUpdate , successAlert, errorAlert } from "../helper/UpdateAlert" 

const OrderList = () => {
  const orderList = useSelector((state) => state.order.orderList)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [updatingOrders, setUpdatingOrders] = useState(new Set())
  const ordersPerPage = 10

  useEffect(() => {
    (async () => {
      await userOrderDataAdmin()
    })()
  }, [])

  // Filter and sort orders
  const filteredOrders = orderList
    .filter(order => {
      const matchesSearch = 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "All" || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === "amount-high") return b.totalAmount - a.totalAmount
      if (sortBy === "amount-low") return a.totalAmount - b.totalAmount
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage)

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />
      case "Processing": return <Package className="w-4 h-4" />
      case "Shipped": return <Truck className="w-4 h-4" />
      case "Delivered": return <CheckCircle className="w-4 h-4" />
      case "Cancelled": return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Shipped": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Delivered": return "bg-green-100 text-green-800 border-green-200"
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // const handleStatusChange = async (orderId, newStatus) => {
  //   // Prevent multiple simultaneous updates for the same order
  //   if (updatingOrders.has(orderId)) return
    
  //   setUpdatingOrders(prev => new Set([...prev, orderId]))
    
  //   try {
  //     const updatedOrder = await userOrderStatusUpdate(orderId, newStatus)
  //     if (updatedOrder) {
  //       // Refresh the order list to get updated data
  //       await userOrderDataAdmin()
  //     }
  //   } catch (error) {
  //     console.error('Failed to update order status:', error)
  //   } finally {
  //     setUpdatingOrders(prev => {
  //       const newSet = new Set(prev)
  //       newSet.delete(orderId)
  //       return newSet
  //     })
  //   }
  // }


  const handleStatusChange = async (orderId, currentStatus) => {
  if (updatingOrders.has(orderId)) return;

  const newStatus = await orderStatusUpdate(currentStatus);
  if (!newStatus || newStatus === currentStatus) return; // canceled or same status

  setUpdatingOrders(prev => new Set([...prev, orderId]));

  try {
    const updatedOrder = await userOrderStatusUpdate(orderId, newStatus);
    if (updatedOrder) {
      await userOrderDataAdmin(); // refresh order list
      successAlert(`Order status updated to "${newStatus}"!`);
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
    errorAlert("Failed to update order status.");
  } finally {
    setUpdatingOrders(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
              <p className="text-gray-600">Manage and track all customer orders</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orderList.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orderList.filter(o => o.status === "Pending").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orderList.filter(o => o.status === "Processing").length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">
                  {orderList.filter(o => o.status === "Delivered").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer name, or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Highest Amount</option>
                <option value="amount-low">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {paginatedOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        {/* Order Details */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              #{order._id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {order.user?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.user?.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              📞 {order.address?.phone}
                            </p>
                          </div>
                        </td>

                        {/* Products */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {order.products?.slice(0, 3).map((prod, i) => (
                              <img
                                key={i}
                                src={order.productDetails?.image?.[0] || "/api/placeholder/40/40"}
                                alt={order.productDetails?.name || "Product"}
                                className="w-10 h-10 rounded-lg object-cover border"
                              />
                            ))}
                            {order.products?.length > 3 && (
                              <span className="text-sm text-gray-500">
                                +{order.products.length - 3} more
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {order.products?.length} item(s)
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-gray-900">
                            ${order.totalAmount}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <button
                            value={order.status}
                              onClick={(e) => handleStatusChange(order._id, e.target.value)}
                              disabled={updatingOrders.has(order._id)}
                              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer min-w-[120px] ${getStatusColor(order.status)} ${
                                updatingOrders.has(order._id) 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                          >
                            {/* <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option> */}
                            {order.status}
                          </button>
                        </td>

                        {/* Address */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            <p className="font-medium">{order.address?.street}</p>
                            <p className="text-gray-600">
                              {order.address?.city}, {order.address?.state}
                            </p>
                            <p className="text-gray-600">
                              {order.address?.country} - {order.address?.zip}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 border rounded-md text-sm font-medium ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderList