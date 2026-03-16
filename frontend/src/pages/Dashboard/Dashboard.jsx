import { useSelector } from 'react-redux';
import { 
  CalendarCheck, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

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

      {/* Placeholder for the next section */}
      <div className="mt-8 bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex items-center justify-center h-64 border-dashed">
        <p className="text-gray-400 font-medium">Recent Bookings Table will go here</p>
      </div>
    </div>
  );
};

export default Dashboard;