import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';

const AdminAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/admin/analytics');
                if (res.data.success) {
                    setData(res.data);
                }
            } catch (err) {
                console.error('Analytics stream failure', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

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
                {/* Strategic Header */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 py-6 border-b border-outline-variant/10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black tracking-widest uppercase mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Live System Vitality
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-on-surface tracking-tighter uppercase leading-none">
                            Strategic <span className="text-primary italic">Matrix.</span>
                        </h1>
                        <p className="text-on-surface-variant font-medium mt-4 max-w-xl opacity-80">Aggregate performance intelligence across the CV TECH monolithic core. Visualizing revenue density and user acquisition momentum.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] text-outline font-black uppercase tracking-widest mb-1">Architecture Status</p>
                            <p className="text-emerald-400 font-bold text-sm uppercase flex items-center justify-end gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                Nominal
                            </p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Main Revenue Ribbon */}
                    <div className="xl:col-span-8 bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight">Revenue Density</h3>
                                    <p className="text-xs text-on-surface-variant font-medium">Fiscal performance mapped over 24-hour cycles.</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-4xl font-black text-on-surface tracking-tighter">₹{data?.revenue?.toLocaleString() || '0'}</h4>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Gross Yield (Lifetime)</p>
                                </div>
                            </div>

                            {/* Custom SVG Ribbon Chart */}
                            <div className="h-64 w-full relative">
                                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.4"></stop>
                                            <stop offset="100%" stopColor="#8a2be2" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path 
                                        d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60 L800,200 L0,200 Z" 
                                        fill="url(#chart-grad)" 
                                    />
                                    <path 
                                        d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60" 
                                        fill="none" 
                                        stroke="#8a2be2" 
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="animate-draw-path"
                                    />
                                    {/* Data Nodes */}
                                    {[0, 200, 400, 600, 800].map((x, i) => (
                                        <circle key={i} cx={x} cy={150 - (i % 2 === 0 ? 50 : -20)} r="4" fill="#8a2be2" />
                                    ))}
                                </svg>
                                <div className="flex justify-between mt-6 px-2 text-[9px] font-black text-outline uppercase tracking-[0.3em]">
                                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Vitality / Stats */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-outline-variant/10">
                            <h4 className="text-xs font-black text-outline uppercase tracking-widest mb-6">Quantum Metrics</h4>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">Total Transactions</span>
                                    </div>
                                    <span className="text-lg font-black text-on-surface">{data?.totalSales || '0'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                            <span className="material-symbols-outlined text-sm">groups</span>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">Identity Nodes (Users)</span>
                                    </div>
                                    <span className="text-lg font-black text-on-surface">1,284</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                            <span className="material-symbols-outlined text-sm">terminal</span>
                                        </div>
                                        <span className="text-sm font-bold text-on-surface">Deployed Assets</span>
                                    </div>
                                    <span className="text-lg font-black text-on-surface">42</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-primary-container rounded-[2.5rem] p-8 text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden group">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Efficiency Rating</h4>
                                <h3 className="text-4xl font-black tracking-tighter mb-4 italic">98.4%</h3>
                                <p className="text-[10px] leading-relaxed opacity-70 uppercase font-bold tracking-widest">Architectural stability is at peak capacity across global nodes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Projects Heatmap */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.popularProjects?.map((proj, idx) => (
                        <div key={idx} className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 hover:border-primary/20 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="px-3 py-1 bg-surface-container-high rounded text-[8px] font-black uppercase tracking-widest text-outline">{proj.category}</div>
                                <div className="text-[10px] font-black text-primary uppercase tracking-widest">Top Asset</div>
                            </div>
                            <h4 className="text-2xl font-black text-on-surface mb-2 group-hover:text-primary transition-colors tracking-tight uppercase leading-none">{proj.title}</h4>
                            <div className="mt-8 flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] text-outline font-black uppercase tracking-widest mb-1">Total Deployed</p>
                                    <h5 className="text-2xl font-black text-on-surface">{proj.purchaseCount || 0} Licenses</h5>
                                </div>
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Security Feed / Suspicious Activity */}
                <div className="bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-2xl">
                    <div className="p-8 border-b border-outline-variant/10 bg-surface-container-high/30 flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-black text-on-surface uppercase tracking-tight">Security Manifest</h4>
                            <p className="text-xs text-on-surface-variant font-medium">Monitoring anomalous identity mappings and fiscal attempts.</p>
                        </div>
                        <div className="px-4 py-2 bg-error/10 border border-error/20 rounded-full text-error text-[10px] font-black uppercase tracking-widest">12 Anomalies Detected</div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-surface-container-high/50 text-[10px] font-black uppercase tracking-widest text-outline">
                                <tr>
                                    <th className="px-8 py-5">Node Identity</th>
                                    <th className="px-8 py-5">Security Level</th>
                                    <th className="px-8 py-5">Anomaly Description</th>
                                    <th className="px-8 py-5 text-right">Action taken</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data?.suspiciousActivity?.length > 0 ? data.suspiciousActivity.map((act, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 text-sm font-bold text-on-surface">{act.userId || 'Guest Node'}</td>
                                        <td className="px-8 py-5">
                                            <span className="px-2 py-0.5 bg-error/10 text-error text-[9px] font-black rounded-lg uppercase tracking-widest border border-error/20">Critical</span>
                                        </td>
                                        <td className="px-8 py-5 text-xs text-on-surface-variant font-medium">Multiple IP mapping collision (Count: {act.ipCount})</td>
                                        <td className="px-8 py-5 text-right font-black text-primary text-[10px] uppercase tracking-widest cursor-pointer hover:underline">Isolate Node</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-10 text-center text-on-surface-variant font-medium italic opacity-50">No critical anomalies detected in the current cycle.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAnalytics;
