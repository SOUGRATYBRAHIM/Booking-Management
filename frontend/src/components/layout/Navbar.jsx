import { useSelector } from 'react-redux';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
    // const user = await .get('/api/user');
    const user = useSelector((state) => state.auth.user);

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div>
                <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
                    Welcome back {user?.name || 'User'}
                </h1>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600 relative">
                    {/* Notification dot */}
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        <User className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;