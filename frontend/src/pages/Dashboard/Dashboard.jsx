import { useSelector } from 'react-redux';
import { 
  CalendarCheck, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';

import { getStatusBadge } from './Helpers';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  // Dummy data for our statistics.
  const stats = [
    {
      title: 'Total Bookings',
      value: '142',
      change: '+12.5%',
      isPositive: true,
      icon: CalendarCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Monthly Revenue',
      value: '4,500 MAD',
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Active Clients',
      value: '84',
      change: '-2.4%',
      isPositive: false,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Page Views',
      value: '1,204',
      change: '+24.1%',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  // Mock Data for Recent Bookings Table
  const recentBookings = [
    { id: '#BK-001', client: 'Karim', service: 'Haircut & Beard', date: 'Today, 2:30 PM', status: 'Confirmed', amount: '150 MAD' },
    { id: '#BK-002', client: 'Sara', service: 'Consultation', date: 'Tomorrow, 10:00 AM', status: 'Pending', amount: '300 MAD' },
    { id: '#BK-003', client: 'Youssef', service: 'VIP Treatment', date: 'Mar 18, 4:15 PM', status: 'Confirmed', amount: '450 MAD' },
    { id: '#BK-004', client: 'Amina', service: 'Basic Service', date: 'Mar 19, 9:00 AM', status: 'Cancelled', amount: '100 MAD' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here is what's happening with your services today.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex items-center">
                  {/* Icon */}
                  <div className={`flex-shrink-0 rounded-lg p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        {stat.title}
                      </dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              
              {/* Trend Footer */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className={`inline-flex items-center font-medium ${
                    stat.isPositive ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Recent Bookings</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service & Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                    <div className="text-sm text-gray-500">{booking.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
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