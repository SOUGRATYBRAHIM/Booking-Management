import { useState } from 'react';
import {
  CalendarCheck, DollarSign, Users, Plus, Search, Clock,
  Trash2, CalendarClock, CheckCircle, XCircle, Inbox, CalendarIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

import { getStatusBadge } from './Helpers';
import { useAuth } from '../../context/AuthContext';


const Dashboard = () => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [recentBookings, setrecentBookings] = useState([
    { id: '#BK-001', client: 'Karim Alaoui', phone: '06 12 34 56 78', service: 'Haircut & Beard', date: '2026-03-20', time: '14:30', status: 'Confirmed', amount: '150 MAD' },
    { id: '#BK-002', client: 'Sara Benali', phone: '06 98 76 54 32', service: 'Consultation', date: '2026-03-21', time: '10:00', status: 'Pending', amount: '300 MAD' },
    { id: '#BK-003', client: 'Youssef Tazi', phone: '06 55 44 33 22', service: 'VIP Treatment', date: '2026-03-18', time: '16:15', status: 'Confirmed', amount: '450 MAD' },
    { id: '#BK-004', client: 'Amina Idrissi', phone: '06 11 22 33 44', service: 'Basic Service', date: '2026-03-19', time: '09:00', status: 'Cancelled', amount: '100 MAD' },
  ]);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Filter bookings based on search term and status
  const filteredBookings = recentBookings.filter(booking => {
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate counts for status badges
  const pendingCount = recentBookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = recentBookings.filter(b => b.status === 'Confirmed').length;
  const cancelledCount = recentBookings.filter(b => b.status === 'Cancelled').length;
  const bookingsCount = recentBookings.length;

  // Quick stats data
  const stats = [
    { title: 'Total Bookings', value: bookingsCount, icon: CalendarCheck, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Monthly Revenue', value: '4,500 MAD', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { title: 'Active Clients', value: '84', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Pending', value: pendingCount, icon: CalendarClock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { title: 'Confirmed', value: confirmedCount, icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { title: 'Cancelled', value: cancelledCount, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' },

  ];

  // Mock function to update booking status (In real app, this would involve API calls)
  const updateBookingStatus = (id, newStatus) => {
    setrecentBookings(recentBookings.map(b => b.id === id ? { ...b, status: newStatus } : b));

    if (newStatus === 'Confirmed') toast.success('Booking confirmed successfully!');
    if (newStatus === 'Cancelled') toast.error('Booking cancelled.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full p-2 sm:p-4">

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{greeting}, {user?.name.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Here is what's happening with your business today.
          </p>
        </div>

        {/* New Booking Button */}
        <button className="hover:cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Booking
        </button>
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
            <h3 className="text-lg font-bold text-gray-900">Bookings Management</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">View and manage your client appointments.</p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
            />
          </div>

          {/* Filters Tabs */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 overflow-x-auto">
            {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`hover:cursor-pointer px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${statusFilter === status
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        {filteredBookings.length === 0 ? (

          /* EMPTY STATE */
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No bookings found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          /* TABLE DATA */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
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

                      
                    {/* Phone Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      <a href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition-colors" >
                        {booking.phone}
                      </a>
                    </td>

                    {/* Service Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {booking.service}
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-700">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                          {booking.time}
                        </div>
                      </div>
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
                        {booking.status === 'Pending' && (
                          <div className="flex items-center justify-end gap-2 text-gray-400">
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                              className="hover:cursor-pointer flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors"
                              title="Cancel Booking"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                              className="hover:cursor-pointer flex items-center justify-center h-8 w-8 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title="Approve Booking"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>

                          </div>
                        )}

                        <div className="w-px h-4 bg-gray-200 mx-1"></div> {/* Separator */}

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
        )}
      </div>
    </div>
  );
};

export default Dashboard;