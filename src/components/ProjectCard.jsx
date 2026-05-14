import { Link, useNavigate } from 'react-router-dom';
import useRazorpay from '../hooks/useRazorpay';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useAuthStore from '../store/useAuthStore';
import SafeImage from './SafeImage';

const ProjectCard = ({ project }) => {
    const { processPayment, isProcessing } = useRazorpay();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleQuickBuy = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) return navigate('/login');

        let recaptchaToken = 'development';
        if (executeRecaptcha) {
            try {
                const token = await executeRecaptcha('quick_buy');
                if (token) recaptchaToken = token;
            } catch (err) {
                console.warn('reCAPTCHA failed', err);
            }
        }
        await processPayment([project?._id], recaptchaToken);
    };

    return (
        <article className="group relative bg-surface-container-low backdrop-blur-md border border-outline-variant/20 rounded-[2.5rem] overflow-hidden hover:translate-y-[-8px] transition-all duration-500 hover:shadow-premium group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="aspect-[16/10] overflow-hidden relative">
                <SafeImage 
                    src={project?.imageUrls?.[0]} 
                    alt={project?.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-xl bg-surface-container/30 backdrop-blur-xl border border-outline-variant/20 text-[9px] font-black text-on-surface uppercase tracking-widest shadow-2xl">
                        {project?.difficulty || 'Expert'}
                    </span>
                </div>
            </div>
            
            <div className="p-10 relative z-10">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">
                        {project.category || 'Architecture'}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></div>
                    <span className="text-[10px] font-black uppercase text-slate-400 dark:text-white/40 tracking-[0.2em]">
                        {project.techStack?.[0] || 'Modern'}
                    </span>
                </div>
                
                <h3 className="text-2xl font-black tracking-tighter text-on-surface mb-4 group-hover:text-primary transition-colors leading-[1.1]">
                    {project.title}
                </h3>
                <p className="text-on-surface-variant text-[13px] mb-10 line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-8 border-t border-slate-200/50 dark:border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-1">Asset Value</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-primary font-black text-sm">₹</span>
                            <span className="text-3xl font-black text-on-surface tracking-tighter">{project.price}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleQuickBuy}
                            disabled={isProcessing}
                            className="bg-primary text-on-primary hover:scale-105 active:scale-95 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(168,85,247,0.3)] relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">{isProcessing ? '...' : 'Buy'}</span>
                        </button>
                        <Link 
                            to={`/projects/${project._id}`} 
                            className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all group/arrow"
                        >
                            <span className="material-symbols-outlined text-xl group-hover/arrow:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
