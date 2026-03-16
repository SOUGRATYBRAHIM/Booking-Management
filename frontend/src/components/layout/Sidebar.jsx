import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import {
    LayoutDashboard,
    CalendarDays,
    Paintbrush,
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();

    // const user = await .get('/api/user');
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', path: '/bookings', icon: CalendarDays },
        { name: 'Page Builder', path: '/builder', icon: Paintbrush },
        { name: 'Profile', path: '/profile', icon: Settings },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col hidden md:flex">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <span className="text-xl font-bold text-blue-600">BookingSaaS</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm
                                    ${item.name === 'Profile' ? 'mt-4 pt-4 border-t border-gray-200' : ''}
                                    ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button at the bottom */}
            <div className="p-4 border-t border-gray-200 space-y-3">

                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                        <User className="h-4 w-4" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                            {user?.name || 'Account'}
                        </span>
                        <span className="text-xs text-gray-500">
                            {user?.email || ''}
                        </span>
                    </div>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>



            </div>
        </div>
    );
};

export default Sidebar;