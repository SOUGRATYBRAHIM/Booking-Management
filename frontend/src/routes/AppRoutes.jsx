import { Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute.jsx';

import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardLayout from '../components/layout/DashboardLayout';
import Builder from '../pages/Builder/Builder';
import MyPages from '../pages/MyPages/MyPages';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes - Anyone can see these */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            

            {/* Protected Routes - Only logged-in users can see these */}
            {/* <Route element={<ProtectedRoute />}> */}
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pages" element={<MyPages />} />
                    <Route path="/builder/:id" element={<Builder />} />
                    <Route path="/settings" element={<div className="p-10">User Profile Settings</div>} />
                </Route>
            {/* </Route> */}
        </Routes>
    );
};

export default AppRoutes;