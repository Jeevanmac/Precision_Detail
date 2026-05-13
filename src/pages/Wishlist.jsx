import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';
import DashboardLayout from '../components/layout/DashboardLayout';

const Wishlist = () => {
    const { user, checkAuth } = useAuthStore();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopulatedWishlist = async () => {
            if (!user) return;
            try {
                const res = await api.get('/projects');
                if (res.data.success) {
                    const mappedItems = res.data.projects.filter(p => user.wishlist.includes(p._id));
                    setWishlistItems(mappedItems);
                }
            } catch (err) {
                console.error('Wishlist fetch failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPopulatedWishlist();
    }, [user]);

    const handleRemove = async (projectId) => {
        try {
            await api.post('/profile/wishlist/toggle', { projectId });
            setWishlistItems(prev => prev.filter(item => item._id !== projectId));
            await checkAuth();
        } catch (err) {
            console.error('Wishlist update failed', err);
        }
    };

    const handleAddToCart = async (projectId) => {
        try {
            await api.post('/profile/cart/add', { projectId });
            await checkAuth();
        } catch (err) {
            console.error('Cart assignment fault', err);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-outline-variant/10 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-16">
                <header className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Curated Selection</span>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface mb-6">Wishlist</h1>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                A digital monolith of your most ambitious architectural concepts and technical frameworks. Ready for deployment.
                            </p>
                        </div>
                    </div>
                </header>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-24 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 shadow-xl">
                        <span className="material-symbols-outlined text-6xl text-outline mb-4">favorite_border</span>
                        <h2 className="text-2xl text-on-surface font-bold mb-2">Vault is Empty</h2>
                        <p className="text-on-surface-variant mb-8">No architectural blueprints have been bookmarked for review.</p>
                        <Link to="/projects" className="px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:scale-105 transition-all inline-block">
                            Browse Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {wishlistItems.map(item => (
                            <div key={item._id} className="group relative flex flex-col bg-surface-container-low rounded-[2rem] overflow-hidden hover:translate-y-[-8px] transition-all duration-300 border border-outline-variant/5">
                                <div className="relative h-64 overflow-hidden bg-surface-dim">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'} 
                                        alt={item.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute top-4 right-4">
                                        <button 
                                            onClick={() => handleRemove(item._id)}
                                            className="w-10 h-10 rounded-full bg-surface-dim/40 backdrop-blur-md flex items-center justify-center text-error hover:bg-error hover:text-on-error transition-all scale-90 active:scale-75 border border-outline-variant/10"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-6">
                                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-primary/20">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold tracking-tight text-on-surface leading-tight">{item.title}</h3>
                                        <span className="text-xl font-black text-primary">₹{item.price}</span>
                                    </div>
                                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center gap-4">
                                        <button 
                                            onClick={() => handleAddToCart(item._id)}
                                            className="flex-1 bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl text-sm font-bold tracking-tight hover:shadow-[0_8px_20px_rgba(138,43,226,0.3)] active:scale-95 transition-all"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link 
                                            to={`/projects/${item._id}`}
                                            className="px-6 py-4 border border-outline-variant/20 text-on-surface-variant font-bold rounded-xl text-sm hover:bg-white/5 hover:text-on-surface transition-all"
                                        >
                                            Review
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="mt-32 pt-16 border-t border-outline-variant/10 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <span className="text-outline font-bold uppercase tracking-[0.2em] text-[10px] block mb-4">Collection Total</span>
                        <p className="text-3xl font-black text-on-surface tracking-tighter">
                            ₹{wishlistItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <span className="text-outline font-bold uppercase tracking-[0.2em] text-[10px] block mb-4">Assets Saved</span>
                        <p className="text-3xl font-black text-on-surface tracking-tighter">{wishlistItems.length.toString().padStart(2, '0')} Units</p>
                    </div>
                    <div>
                        <span className="text-outline font-bold uppercase tracking-[0.2em] text-[10px] block mb-4">Registry Integrity</span>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <p className="text-sm font-semibold text-on-surface">Private Vault</p>
                        </div>
                    </div>
                </footer>
            </div>
        </DashboardLayout>
    );
};

export default Wishlist;
