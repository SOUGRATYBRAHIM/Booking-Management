import { Routes, Route } from 'react-router-dom';

import { GuestRoute, ProtectedRoute } from './Guard';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Builder from '../pages/Builder/Builder';
import MyPages from '../pages/MyPages/MyPages';
import PublicView from '../pages/PublicView/PublicView';
import Settings from '../pages/Settings/Settings';
import Bookings from '../pages/Bookings/Bookings';
import Calendar from '../pages/Calendar/Calendar';
import DashboardLayout from '../components/layout/DashboardLayout';


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="subdomain/:slug" element={<PublicView />} />

            <Route element={<GuestRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pages" element={<MyPages />} />
                    <Route path="/builder/:id" element={<Builder />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/Calendar" element={<Calendar />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;