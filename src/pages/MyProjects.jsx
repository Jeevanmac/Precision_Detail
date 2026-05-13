import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';

const MyProjects = () => {
    const { user } = useAuthStore();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await api.get('/profile/dashboard');
                if (res.data.success) {
                    setPurchases(res.data.purchases);
                }
            } catch (err) {
                console.error('Failed to fetch library', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, []);

    const handleDownload = async (projectId) => {
        try {
            const tokenRes = await api.get(`/payments/downloads/token/${projectId}`);
            if (tokenRes.data.success) {
                const execRes = await api.post(`/payments/downloads/execute`, { 
                    token: tokenRes.data.downloadToken 
                });
                if (execRes.data.success) {
                    window.open(execRes.data.downloadUrl, '_blank');
                }
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Download authorization failed.');
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
                    <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase">Technical Library</h1>
                    <p className="text-on-surface-variant max-w-2xl mt-2 font-medium">Your acquired architectural assets and deployment licenses. Optimized for your workspace.</p>
                </header>

                {purchases.length === 0 ? (
                    <div className="bg-surface-container-low p-12 rounded-[2.5rem] border border-dashed border-outline-variant/30 text-center flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-outline mb-4">folder_off</span>
                        <h3 className="font-bold text-on-surface">Your library is currently vacant.</h3>
                        <p className="text-sm text-on-surface-variant mt-2 mb-6">Explore the marketplace to acquire high-performance assets.</p>
                        <a href="/projects" className="px-6 py-2 bg-primary text-on-primary rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all">Browse Projects</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {purchases.map((purchase) => (
                            <div key={purchase._id} className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 overflow-hidden hover:border-primary/30 transition-all group shadow-xl hover:shadow-primary/5">
                                <div className="aspect-video relative overflow-hidden bg-surface-bright">
                                    <img 
                                        src={purchase.projectId?.images?.[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'} 
                                        alt={purchase.projectId?.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-[10px] text-white font-black uppercase tracking-widest">{purchase.projectId?.category}</span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-black text-on-surface mb-1">{purchase.projectId?.title}</h3>
                                        <p className="text-xs text-on-surface-variant font-medium opacity-70 italic">Licensed on {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {purchase.projectId?.techStack?.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-on-surface">{purchase.downloadCount || 0}</span>
                                            <span className="text-[9px] text-outline font-bold uppercase tracking-tighter">Downloads</span>
                                        </div>
                                        <button 
                                            onClick={() => handleDownload(purchase.projectId?._id)}
                                            className="px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">download</span>
                                            Download Asset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyProjects;
