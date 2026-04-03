import { NavLink } from 'react-router-dom';
import {
    User,
    LayoutDashboard,
    CalendarDays,
    LayoutTemplate,
    Settings,
    LogOut,
    Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth.api';


const Sidebar = () => {
    const { user, setUser } = useAuth(); 

    const handleLogout = async () => {
        try {
            const response = await authApi.logout();

            toast.success(response.data.message);
            setUser(null);

        } catch {
            toast.error("Erreur lors de la déconnexion");
            setUser(null);
        }
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', path: '/bookings', icon: CalendarDays },
        { name: 'Calendar', path: '/calendar', icon: Clock }, 
        { name: 'My Pages', path: '/pages', icon: LayoutTemplate },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
            
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
                <span className="text-xl font-black text-blue-600 tracking-tight">BookingSaaS</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm
                                ${isActive
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </NavLink>
                    );
                })}

                <div className="my-4 border-t border-gray-100"></div>
                
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm
                        ${isActive
                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <Settings className="h-5 w-5" />
                    Settings
                </NavLink>
            </nav>

            {/* Logout & User Profile (Bottom) */}
            <div className="p-4 border-t border-gray-100 shrink-0">
                <div className="flex items-center justify-between gap-2">
                    
                    {/* User Info */}
                    <div className="flex items-center gap-3 overflow-hidden">
                        {user?.photo ? (
                            <img src={user.photo} alt="Profile" className="h-10 w-10 rounded-full object-cover border border-gray-200 shrink-0" />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold shrink-0 border border-blue-100">
                                {user?.name?.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
                            </div>
                        )}

                        <div className="flex flex-col truncate">
                            <span className="text-sm font-bold text-gray-900 truncate">
                                {user.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate font-medium">
                                {user.email}
                            </span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="hover:cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                        title="Log out"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Sidebar;