import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = '/' }: ProtectedRouteProps) => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: 'var(--md-sys-color-text)'
            }}>
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