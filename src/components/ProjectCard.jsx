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
        <article className="group premium-card overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden bg-surface-container relative">
                <SafeImage 
                    src={project?.imageUrls?.[0]} 
                    alt={project?.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-1 rounded-md bg-surface-bright/90 backdrop-blur-md border border-outline-variant/10 text-[8px] font-black text-on-surface uppercase tracking-widest shadow-sm">
                        {project?.difficulty || 'Expert'}
                    </span>
                </div>
            </div>
            
            <div className="p-8">
                <div className="flex gap-2 mb-4">
                    <span className="text-[9px] font-black uppercase text-primary tracking-[0.15em]">
                        {project.category || 'Architecture'}
                    </span>
                    <span className="text-[9px] font-black uppercase text-outline tracking-[0.15em] border-l border-outline-variant/30 pl-2">
                        {project.techStack?.[0] || 'Modern'}
                    </span>
                </div>
                
                <h3 className="text-xl font-black tracking-tight text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                </h3>
                <p className="text-on-surface-variant text-[12px] mb-8 line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-6 border-t border-outline-variant/5">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-outline mb-1">Asset Value</span>
                        <span className="text-2xl font-black text-on-surface tracking-tighter">₹{project.price}</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleQuickBuy}
                            disabled={isProcessing}
                            className="bg-primary text-on-primary hover:scale-105 active:scale-95 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                        >
                            {isProcessing ? '...' : 'Buy'}
                        </button>
                        <Link 
                            to={`/projects/${project._id}`} 
                            className="w-11 h-11 rounded-xl bg-surface-container-high border border-outline-variant/10 flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-all group/btn"
                        >
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
