import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';
import MainLayout from '../components/layout/MainLayout';
import Recommendations from '../components/Recommendations';
import SafeImage from '../components/SafeImage';
import useRazorpay from '../hooks/useRazorpay';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, checkAuth, addToHistory } = useAuthStore();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const { processPayment, isProcessing } = useRazorpay();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const isInCart = user?.cart?.includes(project?._id);
    const isInWishlist = user?.wishlist?.includes(project?._id);

    useEffect(() => {
        const fetchContext = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                if (res.data.success) {
                    setProject(res.data.project);
                    addToHistory(res.data.project);
                }
            } catch (err) {
                console.error('Context fetch failure', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContext();
    }, [id]);

    const handleCartToggle = async () => {
        if (!isAuthenticated) return navigate('/login');
        try {
            if (isInCart) {
                await api.post('/profile/cart/remove', { projectId: project._id });
            } else {
                await api.post('/profile/cart/add', { projectId: project._id });
            }
            await checkAuth();
        } catch (err) {
            console.error('Cart assignment fault', err);
        }
    };

    const handleWishlistToggle = async () => {
        if (!isAuthenticated) return navigate('/login');
        try {
            await api.post('/profile/wishlist/toggle', { projectId: project._id });
            await checkAuth(); 
        } catch (err) {
            console.error('Wishlist fault', err);
        }
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated) return navigate('/login');
        
        let recaptchaToken = 'development';
        if (executeRecaptcha) {
            try {
                const token = await executeRecaptcha('purchase');
                if (token) recaptchaToken = token;
            } catch (err) {
                console.warn('reCAPTCHA failed, using fallback.', err);
            }
        }

        await processPayment([project._id], recaptchaToken);
    };

    if (loading) return (
         <div className="min-h-screen bg-background flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-outline-variant/10 border-t-primary rounded-full animate-spin"></div>
         </div>
    );

    if (!project) return (
         <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface">
             <h1 className="text-3xl font-black mb-2">404</h1>
             <p className="text-on-surface-variant">Structural Object Not Found.</p>
         </div>
    );

    const images = project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls : ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'];

    return (
        <MainLayout>
            <main className="max-w-7xl mx-auto px-8 py-12">
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Gallery Section */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-low group relative shadow-2xl border border-outline-variant/10">
                            <SafeImage 
                                src={images[activeImg]} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                alt="Main Project Preview" 
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                {images.map((img, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setActiveImg(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <SafeImage src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        <div className="mt-8 space-y-10">
                            <div>
                                <h2 className="text-3xl font-bold text-on-surface mb-6">The Monolith Architecture</h2>
                                <p className="text-on-surface-variant leading-relaxed text-lg whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">Core Technology Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack?.map((tech, idx) => (
                                        <span key={idx} className="bg-surface-container-high border border-outline-variant/10 px-4 py-2 rounded-xl text-sm font-semibold text-on-surface">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 bg-surface-container-high p-8 rounded-[2rem] border border-outline-variant/10 shadow-2xl space-y-8">
                            <div className="space-y-4">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    {project.category}
                                </span>
                                <h1 className="text-3xl font-black tracking-tight text-on-surface leading-tight">
                                    {project.title}
                                </h1>
                            </div>

                            <div className="flex items-baseline gap-2 pb-6 border-b border-outline-variant/10">
                                <span className="text-5xl font-black text-on-surface">₹{project.price}</span>
                                <span className="text-outline font-bold uppercase text-xs tracking-widest">INR</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant font-medium">Difficulty Level</span>
                                    <span className="text-on-surface font-black uppercase tracking-tight">{project.difficulty}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant font-medium">Availability</span>
                                    <span className="text-primary font-bold">Instant Deployment</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                {project.demoVideoUrl && (
                                    <button 
                                        onClick={() => setIsVideoOpen(true)}
                                        className="w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all bg-surface-container-highest text-on-surface hover:bg-surface-bright active:scale-95 border border-outline-variant/10 shadow-lg"
                                    >
                                        <span className="material-symbols-outlined filled text-primary">
                                            play_circle
                                        </span>
                                        Watch Demo
                                    </button>
                                )}
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={isProcessing}
                                    className="w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all bg-white text-black hover:bg-white/90 active:scale-95 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="material-symbols-outlined filled">
                                        {isProcessing ? 'sync' : 'bolt'}
                                    </span>
                                    {isProcessing ? 'Processing...' : 'Buy Now'}
                                </button>
                                
                                <button 
                                    onClick={handleCartToggle}
                                    className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95`}
                                >
                                    <span className="material-symbols-outlined">
                                        {isInCart ? 'shopping_cart_checkout' : 'shopping_cart'}
                                    </span>
                                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                                
                                <button 
                                    onClick={handleWishlistToggle}
                                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-on-surface-variant hover:text-on-surface`}
                                >
                                    <span className={`material-symbols-outlined ${isInWishlist ? 'filled' : ''}`}>
                                        bookmark
                                    </span>
                                    <span className="text-sm font-black uppercase tracking-widest">
                                        {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </section>

                <div className="mt-24">
                    <Recommendations />
                </div>
            </main>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-12">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
                        >
                            <button 
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            {project.demoVideoUrl?.includes('youtube.com') || project.demoVideoUrl?.includes('youtu.be') ? (
                                <iframe 
                                    src={`https://www.youtube.com/embed/${project.demoVideoUrl.split('v=')[1]?.split('&')[0] || project.demoVideoUrl.split('/').pop()}`}
                                    className="w-full h-full border-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video 
                                    src={project.demoVideoUrl} 
                                    controls 
                                    className="w-full h-full" 
                                    autoPlay 
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
};

export default ProjectDetail;
