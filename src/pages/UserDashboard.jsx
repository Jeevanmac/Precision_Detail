import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';

const UserDashboard = () => {
    const { user } = useAuthStore();
    const location = useLocation();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(!!location.state?.paymentSuccess);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/profile/dashboard');
                if (res.data.success) {
                    setPurchases(res.data.purchases || []);
                }
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();

        if (showSuccessToast) {
            const timer = setTimeout(() => setShowSuccessToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessToast]);

    const handleSecureDownload = async (projectId) => {
        setDownloadingId(projectId);
        try {
            const tokenRes = await api.get(`/payments/downloads/token/${projectId}`);
            if (tokenRes.data.success) {
                const execRes = await api.post(`/payments/downloads/execute`, { 
                    token: tokenRes.data.downloadToken 
                });
                if (execRes.data.success) {
                    // Start download by opening URL
                    const link = document.createElement('a');
                    link.href = execRes.data.downloadUrl;
                    link.download = `project_${projectId}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Download Error. Ensure payment was successful.');
        } finally {
            setDownloadingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 animate-in fade-in duration-700">
            {showSuccessToast && (
                <div className="fixed top-8 right-8 z-[100] bg-surface-container-highest border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-on-surface">Payment Successful</h4>
                        <p className="text-xs text-on-surface-variant">Your architectural asset has been unlocked.</p>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                    Welcome back, {user?.firstName || 'Developer'}.
                </h1>
                <p className="text-on-surface-variant max-w-2xl font-medium">Your personal technical workspace is optimized. Review your acquisitions and manage your deployments.</p>
            </header>

            {/* Metric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Acquisitions</p>
                    <h3 className="text-3xl font-black text-on-surface">{purchases.length}</h3>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-tertiary/10 rounded-2xl text-tertiary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Extractions</p>
                    <h3 className="text-3xl font-black text-on-surface">{purchases.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0)}</h3>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary/10 rounded-2xl text-secondary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Saved Blueprints</p>
                    <h3 className="text-3xl font-black text-on-surface">{user?.wishlist?.length || 0}</h3>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-surface-container-highest rounded-2xl text-outline group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Rank</p>
                    <h3 className="text-3xl font-black text-on-surface">Pro</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Recently Purchased */}
                <div className="xl:col-span-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-on-surface">Purchased Library</h2>
                        <span className="text-xs font-bold text-outline uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full border border-outline-variant/10">Secure Vault</span>
                    </div>

                    <div className="space-y-4">
                        {purchases.length === 0 ? (
                            <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/20">
                                <span className="material-symbols-outlined text-4xl text-outline mb-4">inventory_2</span>
                                <h3 className="text-lg font-bold text-on-surface">No assets deployed yet.</h3>
                                <p className="text-sm text-on-surface-variant mb-6">Explore the marketplace to acquire professional architecture.</p>
                                <Link to="/projects" className="text-primary font-bold text-sm hover:underline">Browse Projects</Link>
                            </div>
                        ) : (
                            purchases.map((purchase) => (
                                <div key={purchase._id} className="bg-surface-container-high rounded-3xl p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-surface-bright transition-all duration-300 border border-outline-variant/5 group">
                                    <div className="w-full md:w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-dim border border-outline-variant/10">
                                        <img 
                                            alt={purchase.projectId?.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                            src={purchase.projectId?.images?.[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'} 
                                        />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-primary/10 rounded text-[9px] text-primary uppercase font-bold tracking-widest border border-primary/10">SUCCESS</span>
                                            <span className="px-2 py-0.5 bg-surface-container-highest rounded text-[9px] text-on-surface-variant uppercase font-bold tracking-widest border border-outline-variant/5">{purchase.projectId?.category}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-on-surface mb-1">{purchase.projectId?.title}</h4>
                                        <p className="text-on-surface-variant text-xs font-medium opacity-60 italic">Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleSecureDownload(purchase.projectId?._id)}
                                        disabled={downloadingId === purchase.projectId?._id}
                                        className="w-full md:w-auto bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/30 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        <span className={`material-symbols-outlined text-lg ${downloadingId === purchase.projectId?._id ? 'animate-bounce' : ''}`}>
                                            {downloadingId === purchase.projectId?._id ? 'sync' : 'download'}
                                        </span>
                                        {downloadingId === purchase.projectId?._id ? 'Preparing...' : 'Download'}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="xl:col-span-4 space-y-8">
                    {/* Security Info */}
                    <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary">security</span>
                            <h3 className="font-black uppercase tracking-tighter text-on-surface">Vault Security</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>Downloads are protected by 256-bit S3 signed URLs.</span>
                            </li>
                            <li className="flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>Single-use tokens expire after 30 seconds.</span>
                            </li>
                            <li className="flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                <span>IP address tracking enabled for asset integrity.</span>
                            </li>
                        </ul>
                    </div>

                    {/* AI Recommendation Placeholder */}
                    <div className="bg-gradient-to-br from-primary/5 to-surface-container-high p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <h3 className="font-bold text-on-surface">Neural Insight</h3>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">Based on your stack, we recommend the <span className="text-primary font-bold">Advanced Monolith Template</span>.</p>
                            <Link to="/projects" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">View Suggestion</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
