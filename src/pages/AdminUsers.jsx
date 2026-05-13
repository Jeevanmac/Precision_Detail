import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';

const AdminUsers = () => {
    const { user: currentUser } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            if (res.data.success) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.error('Failed to fetch identity registry', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const res = await api.put(`/admin/users/${userId}/role`, { role: newRole });
            if (res.data.success) {
                setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Role mapping failure.');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 space-y-12">
                <header>
                    <h2 className="text-4xl font-black text-on-surface tracking-tighter uppercase leading-none mb-2">Identity Governance</h2>
                    <p className="text-on-surface-variant font-medium max-w-2xl opacity-80">Managing access credentials and administrative permissions across the CV TECH ecosystem.</p>
                </header>

                <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-container-high/50 text-[10px] uppercase tracking-[0.2em] font-black text-outline">
                                    <th className="px-8 py-5">Developer Identity</th>
                                    <th className="px-8 py-5">Permission Tier</th>
                                    <th className="px-8 py-5">Registered On</th>
                                    <th className="px-8 py-5 text-right">Access Controls</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-[10px] border border-primary/10">
                                                    {(u.firstName?.[0] || 'U')}{(u.lastName?.[0] || 'N')}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-on-surface mb-0.5 truncate max-w-[150px]">{u.firstName} {u.lastName}</h4>
                                                    <p className="text-[10px] text-on-surface-variant font-medium opacity-60 uppercase">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                                                u.role === 'superuser' ? 'bg-error/10 text-error border-error/20' :
                                                u.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/5' : 
                                                'bg-surface-container-highest text-on-surface-variant border-outline-variant/10 opacity-70'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs text-on-surface-variant font-medium">{new Date(u.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* SuperUser Controls */}
                                                {currentUser?.role === 'superuser' && u.role !== 'superuser' && (
                                                    <button 
                                                        onClick={() => handleRoleUpdate(u._id, u.role === 'admin' ? 'user' : 'admin')}
                                                        className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                                            u.role === 'admin' ? 'bg-surface-container-high text-on-surface hover:text-error' : 'bg-primary text-on-primary hover:scale-105 shadow-lg shadow-primary/10'
                                                        }`}
                                                    >
                                                        {u.role === 'admin' ? 'Demote' : 'Promote'}
                                                    </button>
                                                )}
                                                
                                                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined text-sm">settings</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminUsers;
