import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = () => {
    const { isAuthenticated, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-[#121317] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
            </div>
        );
    }

    // Logic constraints checking routing validation
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
