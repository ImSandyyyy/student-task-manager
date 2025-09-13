import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = '/' }: ProtectedRouteProps) => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-container">
                Loading...
            </div>
        );
    }

    if (requireAuth && !isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!requireAuth && isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;