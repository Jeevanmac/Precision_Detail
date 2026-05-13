import React from 'react';
import useAuthStore from '../store/useAuthStore';
import DashboardLayout from '../components/layout/DashboardLayout';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <DashboardLayout>
            {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </DashboardLayout>
    );
};

export default Dashboard;
