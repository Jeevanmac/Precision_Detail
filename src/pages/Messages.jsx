import React from 'react';
import useAuthStore from '../store/useAuthStore';
import UserMessages from './UserMessages';
import AdminMessages from './AdminMessages';

const Messages = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    if (user.role === 'admin' || user.role === 'superadmin' || user.role === 'superuser') {
        return <AdminMessages />;
    }

    return <UserMessages />;
};

export default Messages;
