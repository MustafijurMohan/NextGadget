
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign, AlertCircle } from 'lucide-react';
import Reveal from '../animation/Reveal';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Sample data - replace with your actual API data
  const salesData = [
    { name: 'Mon', sales: 4200, orders: 24 },
    { name: 'Tue', sales: 3800, orders: 20 },
    { name: 'Wed', sales: 5200, orders: 31 },
    { name: 'Thu', sales: 4600, orders: 27 },
    { name: 'Fri', sales: 6800, orders: 38 },
    { name: 'Sat', sales: 7500, orders: 42 },
    { name: 'Sun', sales: 6200, orders: 35 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#8b5cf6' },
    { name: 'Home & Garden', value: 20, color: '#ec4899' },
    { name: 'Sports', value: 12, color: '#10b981' },
    { name: 'Books', value: 8, color: '#f59e0b' }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 12250 },
    { name: 'Smart Watch', sales: 189, revenue: 37800 },
    { name: 'Laptop Stand', sales: 156, revenue: 7800 },
    { name: 'USB-C Cable', sales: 142, revenue: 2840 },
    { name: 'Phone Case', sales: 128, revenue: 3840 }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: '217',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Total Products',
      value: '1,842',
      change: '+3.2%',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Users',
      value: '3,456',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'bg-pink-500'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: 250, status: 'Completed', date: '2 hours ago' },
    { id: '#1235', customer: 'Jane Smith', amount: 180, status: 'Processing', date: '3 hours ago' },
    { id: '#1236', customer: 'Bob Johnson', amount: 420, status: 'Pending', date: '5 hours ago' },
    { id: '#1237', customer: 'Alice Brown', amount: 320, status: 'Completed', date: '6 hours ago' },
    { id: '#1238', customer: 'Charlie Wilson', amount: 190, status: 'Shipped', date: '8 hours ago' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    
    <div className="w-full px-4 py-2">
      {/* Header */}
      <Reveal>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1 text-sm">Welcome back! Here's what's happening with your store today.</p>
      </div>
    </Reveal>
      {/* Stats Grid */}
      <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 text-xs font-medium">{stat.change}</span>
                    <span className="text-gray-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Sales Chart */}
        <Reveal>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Sales Overview</h2>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </Reveal>
        {/* Category Distribution */}
        <Reveal>
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '11px' }}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        </Reveal>
      </div>

      {/* Bottom Section */}
      <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Product</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Sales</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Revenue</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-xs text-gray-900">{product.name}</td>
                    <td className="py-2 px-3 text-xs text-gray-600">{product.sales}</td>
                    <td className="py-2 px-3 text-xs text-gray-900 font-medium">${product.revenue.toLocaleString()}</td>
                    <td className="py-2 px-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(product.sales / 250) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-900">{order.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{order.customer}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-semibold text-gray-900">${order.amount}</span>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
            View All Orders →
          </button>
        </div>
      </div>
    </Reveal>
      {/* Low Stock Alert */}
      <Reveal>
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-xs font-semibold text-yellow-900">Low Stock Alert</h3>
          <p className="text-xs text-yellow-700 mt-1">8 products are running low on stock. Consider restocking soon.</p>
          <button className="mt-2 text-xs text-yellow-800 hover:text-yellow-900 font-medium underline">
            View Products
          </button>
        </div>
      </div>
      </Reveal>
    </div>
    
  );
};

export default AdminDashboard;