import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/admin/orders');
                if (res.data.success) {
                    setOrders(res.data.orders);
                }
            } catch (err) {
                console.error('Failed to fetch orders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-outline-variant/10 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 space-y-12">
                <div>
                    <h2 className="text-4xl font-black text-on-surface tracking-tighter uppercase">Transaction Logs</h2>
                    <p className="text-on-surface-variant max-w-2xl mt-2 font-medium">Monitoring real-time revenue streams and fiscal integrity across the digital marketplace.</p>
                </div>

                <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-container-high/50 text-[10px] uppercase tracking-[0.2em] font-black text-outline">
                                    <th className="px-8 py-5">Identity / Order ID</th>
                                    <th className="px-8 py-5">Quantum Amount</th>
                                    <th className="px-8 py-5">Integrity Status</th>
                                    <th className="px-8 py-5">Timestamp</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/5">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div>
                                                <h4 className="text-sm font-bold text-on-surface mb-0.5">{order.userId?.email || 'System Operation'}</h4>
                                                <p className="text-[10px] text-on-surface-variant font-medium opacity-60">REF: {order._id}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-on-surface">₹{order.totalAmount}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                order.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-error/10 text-error border-error/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs text-on-surface-variant font-medium">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                            </button>
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

export default AdminOrders;
