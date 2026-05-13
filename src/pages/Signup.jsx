import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, 
    Zap, 
    Layers, 
    Cpu, 
    ArrowRight, 
    Lock, 
    Mail, 
    Eye, 
    EyeOff, 
    Activity,
    Terminal,
    Globe,
    User
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';

const FeatureBadge = ({ icon: Icon, text }) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md"
    >
        <Icon size={12} className="text-primary" />
        <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/70">{text}</span>
    </motion.div>
);

const Signup = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError('');

        let recaptchaToken = 'development';
        
        if (executeRecaptcha) {
            try {
                const token = await executeRecaptcha('signup');
                if (token) recaptchaToken = token;
            } catch (err) {
                console.warn('reCAPTCHA failed, bypassing for development.', err);
            }
        }

        try {
            const res = await api.post('/auth/signup', { ...form, recaptchaToken });
            if (res.data.success) {
                login(res.data.user, res.data.accessToken, res.data.refreshToken);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Identity initialization failed.');
        }
    }, [executeRecaptcha, form, login, navigate]);

    return (
        <div className="h-screen w-full overflow-hidden bg-background relative flex transition-colors duration-500">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/assets/login-bg.png" 
                    className="w-full h-full object-cover opacity-30 dark:opacity-20" 
                    alt="Background" 
                />
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]"></div>
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-1"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none z-1"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-1" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--cv-on-surface) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            {/* Left Side: Cinematic Visuals (IDENTICAL TO LOGIN) */}
            <div className="hidden lg:flex w-7/12 relative flex-col p-16 justify-between border-r border-outline-variant/10">
                <Link to="/">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 z-10 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            <span className="text-white font-black text-lg italic leading-none">cv</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-on-surface uppercase">CV TECH</span>
                    </motion.div>
                </Link>

                <div className="relative z-10 max-w-2xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Identity Vault: Ready
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-7xl xl:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] mb-10"
                    >
                        Start Your <br/>
                        <span className="purple-gradient-text italic">Legacy.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-on-surface-variant text-lg font-medium leading-relaxed max-w-lg mb-10 opacity-80"
                    >
                        Join the elite network of architectural engineers. Secure your identity and begin deploying premium assets globally.
                    </motion.p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <FeatureBadge icon={Shield} text="Secure" />
                        <FeatureBadge icon={Layers} text="Scalable" />
                        <FeatureBadge icon={Globe} text="Cloud Native" />
                        <FeatureBadge icon={Cpu} text="AI Powered" />
                    </div>

                    {/* Infrastructure Statistics */}
                    <div className="grid grid-cols-3 gap-8 pt-0 border-t border-outline-variant/10">
                        {[
                            { label: 'Uptime', val: '99.99%' },
                            { label: 'Global Nodes', val: '240+' },
                            { label: 'Latency', val: '<20ms' }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                                className="pt-4"
                            >
                                <p className="text-2xl font-black text-on-surface tracking-tighter">{stat.val}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-12 z-10 pb-4"
                >
                    {['Google', 'AWS', 'MongoDB', 'Vercel', 'Microsoft'].map((logo) => (
                        <span key={logo} className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 hover:text-primary transition-colors cursor-default">{logo}</span>
                    ))}
                </motion.div>

                {/* Abstract Visual Elements */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 right-[-20%] w-[800px] h-[800px] border border-primary/10 rounded-full flex items-center justify-center -translate-y-1/2 opacity-20"
                    >
                        <div className="w-[600px] h-[600px] border border-primary/5 rounded-full flex items-center justify-center">
                            <div className="w-[400px] h-[400px] border border-primary/5 rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Floating UI Elements */}
                    <motion.div 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-4 glass-card p-4 rounded-2xl border-outline-variant/10 w-48 shadow-2xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/60">Vault Status</span>
                        </div>
                        <p className="text-[10px] font-bold text-on-surface tracking-tight">Encryption Layers Active</p>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/3 right-16 glass-card p-6 rounded-3xl border-primary/20 w-64 shadow-2xl"
                    >
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Identity Stream</span>
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Activity size={16} className="text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-black text-on-surface leading-none">99.9% SECURE</p>
                            <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Quantum Hardened</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Authentication Panel */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-8 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg"
                >
                    <div className="glass-card py-8 px-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 border border-primary/30 rounded-[2.5rem] group-hover:border-primary/60 transition-colors duration-500 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            {/* Mobile Logo & Name */}
                            <div className="lg:hidden flex items-center gap-3 mb-8">
                                <Link to="/" className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                        <span className="text-white font-black text-sm italic leading-none">cv</span>
                                    </div>
                                    <span className="text-base font-black tracking-tighter text-on-surface uppercase">CV TECH</span>
                                </Link>
                            </div>

                            <div className="mb-8 pt-4 lg:pt-8">
                                <div className="flex items-center gap-4 mb-3">
                                    <h2 className="text-4xl font-black tracking-tight text-on-surface">Register Identity</h2>
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-inner border border-primary/20">
                                        <User size={18} />
                                    </div>
                                </div>
                                <p className="text-on-surface-variant text-sm font-medium opacity-80">Establish your terminal credentials and access key.</p>
                            </div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-4 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-[11px] font-black uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Activity size={18} />
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-black text-white dark:text-white tracking-widest ml-1">First Name</label>
                                        <input 
                                            required
                                            type="text"
                                            value={form.firstName}
                                            onChange={e => setForm({...form, firstName: e.target.value})}
                                            placeholder="John"
                                            className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-on-surface/50 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Last Name</label>
                                        <input 
                                            required
                                            type="text"
                                            value={form.lastName}
                                            onChange={e => setForm({...form, lastName: e.target.value})}
                                            placeholder="Doe"
                                            className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-on-surface/50 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[11px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Professional Email</label>
                                    <div className="relative group">
                                        <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                                        <input 
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({...form, email: e.target.value})}
                                            placeholder="dev@cvtech.io"
                                            className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl pl-14 pr-6 py-4 text-on-surface placeholder:text-on-surface/50 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] uppercase font-black text-white dark:text-white tracking-widest">Access Key</label>
                                        <Link to="#" className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline opacity-70">Forgot Key?</Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                                        <input 
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            value={form.password}
                                            onChange={e => setForm({...form, password: e.target.value})}
                                            placeholder="••••••••••••"
                                            className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl pl-14 pr-14 py-4 text-on-surface placeholder:text-on-surface/50 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    INITIALIZE PIPELINE <ArrowRight size={16} />
                                </button>
                            </form>

                            <div className="relative my-10">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/10"></div></div>
                                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em] font-black text-on-surface-variant/40">
                                    <span className="bg-surface-container-low px-4">Or Continue With</span>
                                </div>
                            </div>

                            <p className="text-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-8">
                                Already Authenticated? <Link to="/login" className="text-primary hover:underline">Establish Link</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
