import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axiosInstance';
import CustomSelect from '../components/ui/CustomSelect';
import { 
    Calendar as CalendarIcon,
    Clock as ClockIcon
} from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/admin/analytics');
                if (res.data.success) {
                    setStats(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();

        // High-stakes real-time synchronization (2s interval)
        const intervalId = setInterval(fetchAnalytics, 2000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="p-8 lg:p-12 space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="font-inter antialiased tracking-tight text-on-surface text-4xl font-extrabold">Executive Overview</h2>
                    <p className="text-on-surface-variant body-md mt-2 max-w-2xl">Real-time performance metrics and system vitality for CV TECH digital infrastructure.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-xl text-sm font-bold border border-outline-variant/15 text-on-surface hover:bg-on-surface/5 transition-all duration-300">
                        Download Report
                    </button>
                    <Link to="/admin/projects/new" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-xl shadow-primary-container/20 hover:scale-[1.02] transition-all duration-300">
                        Create Project
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue */}
                <div className="bg-surface-container-high rounded-xl p-6 border border-transparent hover:border-primary/10 transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Total Revenue</p>
                    <h3 className="text-2xl font-black text-on-surface mt-1">₹{(stats?.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                {/* Total Sales */}
                <div className="bg-surface-container-high rounded-xl p-6 border border-transparent hover:border-primary/10 transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-500">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+8.2%</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Total Sales</p>
                    <h3 className="text-2xl font-black text-on-surface mt-1">{stats?.totalSales || 0}</h3>
                </div>
                {/* Total Users */}
                <div className="bg-surface-container-high rounded-xl p-6 border border-transparent hover:border-primary/10 transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors duration-500">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+18.1%</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Total Users</p>
                    <h3 className="text-2xl font-black text-on-surface mt-1">{stats?.totalUsers || 0}</h3>
                </div>
                {/* Active Projects */}
                <div className="bg-surface-container-high rounded-xl p-6 border border-transparent hover:border-primary/10 transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors duration-500">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                        </div>
                        <span className="text-on-surface-variant text-xs font-bold bg-on-surface/5 px-2 py-1 rounded-full">Stable</span>
                    </div>
                    <p className="text-on-surface-variant text-sm font-medium">Active Projects</p>
                    <h3 className="text-2xl font-black text-on-surface mt-1">{stats?.activeProjects || 0}</h3>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Line Chart Placeholder */}
                <div className="bg-surface-container-low rounded-2xl p-8 shadow-2xl shadow-primary-container/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h4 className="text-lg font-bold text-on-surface">Sales Over Time</h4>
                            <p className="text-sm text-on-surface-variant">Revenue growth vs previous quarter</p>
                        </div>
                        <CustomSelect 
                            options={[
                                { label: 'Last 6 Months', value: 'Last 6 Months', icon: ClockIcon },
                                { label: 'Last Year', value: 'Last Year', icon: CalendarIcon },
                            ]}
                            value="Last 6 Months"
                            onChange={() => {}}
                            className="w-48"
                        />
                    </div>
                    <div className="h-64 flex items-end justify-between gap-1 group relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                                <path d="M0,80 Q50,20 100,60 T200,30 T300,70 T400,10" fill="none" stroke="#dcb8ff" strokeWidth="3"></path>
                                <path d="M0,80 Q50,20 100,60 T200,30 T300,70 T400,10 V100 H0 Z" fill="url(#gradient-purple)" fillOpacity="0.2"></path>
                                <defs>
                                    <linearGradient id="gradient-purple" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#8a2be2"></stop>
                                        <stop offset="100%" stopColor="transparent"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex w-full justify-between mt-auto pt-4 text-[10px] uppercase tracking-tighter text-outline font-bold relative z-10">
                            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                        </div>
                    </div>
                </div>

                {/* Bar Chart Section */}
                <div className="bg-surface-container-low rounded-2xl p-8 shadow-2xl shadow-primary-container/5">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h4 className="text-lg font-bold text-on-surface">Top Selling Projects</h4>
                            <p className="text-sm text-on-surface-variant">Most downloaded licenses this month</p>
                        </div>
                        <button className="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {stats?.popularProjects?.length > 0 ? stats.popularProjects.map((item, idx) => {
                            // Calculate width dynamically (using top project as 100%)
                            const maxSales = stats.popularProjects[0].purchaseCount || 1;
                            const widthPercent = Math.max(10, Math.round((item.purchaseCount / maxSales) * 100)) + '%';
                            return (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-on-surface font-medium">{item.title}</span>
                                        <span className="text-on-surface-variant">{item.purchaseCount} sales</span>
                                    </div>
                                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                                        <div className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-1000" style={{ width: widthPercent }}></div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-on-surface-variant text-sm text-center py-4">No sales data available yet.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl shadow-primary-container/5 border border-outline-variant/10">
                <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/50">
                    <div>
                        <h4 className="text-lg font-bold text-on-surface">Recent Activity</h4>
                        <p className="text-sm text-on-surface-variant">Last 24 hours of platform interactions</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs uppercase tracking-widest text-outline font-bold bg-surface-container-high/50">
                                <th className="px-8 py-4">User</th>
                                <th className="px-8 py-4">Action</th>
                                <th className="px-8 py-4 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {stats?.recentActivity?.length > 0 ? stats.recentActivity.map((order, idx) => {
                                const userName = order?.userId?.name || order?.userId?.email?.split('@')[0] || 'Unknown User';
                                const initials = userName.substring(0, 2).toUpperCase();
                                const projectTitle = order?.projects?.[0]?.projectId?.title || 'a project';
                                
                                // Time calculation
                                const createdAt = order?.createdAt ? new Date(order.createdAt) : new Date();
                                const diff = Math.floor((new Date() - createdAt) / 60000);
                                let timeStr = diff < 1 ? 'Just now' : diff < 60 ? `${diff} mins ago` : `${Math.floor(diff/60)} hours ago`;

                                return (
                                    <tr key={idx} className="hover:bg-on-surface/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                    {initials}
                                                </div>
                                                <div>
                                                    <p className="text-on-surface font-bold text-sm">{userName}</p>
                                                    <p className="text-xs text-on-surface-variant">{order?.userId?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-on-surface text-sm font-medium">Purchased '{projectTitle}' {(order?.projects?.length || 0) > 1 ? `and ${order.projects.length - 1} more` : ''}</p>
                                        </td>
                                        <td className="px-8 py-5 text-right text-xs text-outline font-medium">{timeStr}</td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="3" className="px-8 py-8 text-center text-on-surface-variant">No recent platform interactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <footer className="mt-auto py-8 text-center border-t border-outline-variant/10">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-outline">CV TECH Architectural OS © 2024 • Developer Never Dies</p>
            </footer>
        </section>
    );
};

export default AdminDashboard;
