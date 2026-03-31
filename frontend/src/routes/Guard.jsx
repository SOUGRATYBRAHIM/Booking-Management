import { Navigate, Outlet } from 'react-router-dom';

import { LoadingSpinner } from '../components/ui/index';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <LoadingSpinner fullScreen variant="primary" label="Loading Dashboard..." />;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestRoute = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <LoadingSpinner fullScreen variant="primary" label="Please wait..." />;
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};