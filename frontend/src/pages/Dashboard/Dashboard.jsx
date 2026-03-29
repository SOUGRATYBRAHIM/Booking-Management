import { useSelector } from 'react-redux';
import {
  CalendarCheck,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Search,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';

import { getStatusBadge } from './Helpers';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Dummy data for our statistics.
  const stats = [
    { title: 'Total Bookings', value: '142', icon: CalendarCheck, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Monthly Revenue', value: '4,500 MAD', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { title: 'Active Clients', value: '84', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Page Views', value: '1,204', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  // Mock Data for Recent Bookings Table
  const recentBookings = [
    { id: '#BK-001', client: 'Karim Alaoui', service: 'Haircut & Beard', date: 'Today, 2:30 PM', duration: '45 min', status: 'Confirmed', amount: '150 MAD' },
    { id: '#BK-002', client: 'Sara Benali', service: 'Consultation', date: 'Tomorrow, 10:00 AM', duration: '30 min', status: 'Pending', amount: '300 MAD' },
    { id: '#BK-003', client: 'Youssef Tazi', service: 'VIP Treatment', date: 'Mar 18, 4:15 PM', duration: '90 min', status: 'Confirmed', amount: '450 MAD' },
    { id: '#BK-004', client: 'Amina Idrissi', service: 'Basic Service', date: 'Mar 19, 9:00 AM', duration: '30 min', status: 'Cancelled', amount: '100 MAD' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full p-2 sm:p-4">

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{greeting}, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Here is what's happening with your business today.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex items-center gap-3">

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID or Name..."
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
            />
          </div>

          {/* New Booking Button */}
          <button className="hover:cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm">
            <Plus className="h-4 w-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100 group">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex-shrink-0 rounded-xl p-3 ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Bookings Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Your latest client appointments</p>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
            View all
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">

                  {/* Client Column with Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
                        {booking.client.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{booking.client}</div>
                        <div className="text-xs text-gray-500">{booking.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Service Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-800">{booking.service}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> {booking.duration}
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {booking.date}
                  </td>

                  {/* Amount Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {booking.amount}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1 transition-opacity duration-200">
                      <button
                        className="hover:cursor-pointer text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit Booking"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        className="hover:cursor-pointer text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;