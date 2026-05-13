import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, 
    Globe, 
    Shield, 
    Zap, 
    Database, 
    Layers, 
    Code2, 
    Activity, 
    ArrowRight, 
    Terminal,
    Users,
    Server,
    Smartphone,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    CheckCircle2,
    X,
    ChevronRight,
    Search,
    Filter,
    UploadCloud,
    FileText,
    AlertTriangle
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import api from '../lib/axiosInstance';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ApplicationModal = ({ role, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        portfolioUrl: '',
        githubUrl: '',
        message: '',
        resumeKey: ''
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Only PDF and DOC/DOCX are accepted.');
            return;
        }
        
        setResumeFile(file);
        setError('');
    };

    const uploadResume = async (file) => {
        setUploading(true);
        try {
            const res = await api.get(`/careers/upload-url?fileName=${file.name}&fileType=${file.type}`);
            const { uploadUrl, key } = res.data;
            
            await axios.put(uploadUrl, file, {
                headers: { 'Content-Type': file.type }
            });
            
            return key;
        } catch (err) {
            console.error('S3 Upload Failure', err);
            throw new Error('Resume transmission failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            let resumeKey = formData.resumeKey;
            
            if (resumeFile) {
                resumeKey = await uploadResume(resumeFile);
            }

            await api.post('/careers/apply', { 
                ...formData, 
                resumeKey,
                role: role.title 
            });
            setSuccess(true);
            toast.success('Identity Registered Successfully');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-xl bg-surface-container-low border border-primary/20 rounded-[2.5rem] relative shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden"
                    >
                        {/* Header Decoration */}
                        <div className="h-1.5 bg-gradient-to-r from-primary via-purple-500 to-primary shrink-0" style={{ backgroundColor: role.accentColor }}></div>
                        
                        {/* Sticky Header Section */}
                        <div className="p-8 pb-4 shrink-0 bg-surface-container-low/50 backdrop-blur-xl border-b border-outline-variant/10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest mb-3" style={{ borderColor: role.accentColor + '40', color: role.accentColor }}>Hiring System v4.0</div>
                                    <h2 className="text-2xl md:text-3xl font-black text-on-surface tracking-tighter leading-tight">Apply for {role.title}</h2>
                                    <p className="text-on-surface-variant text-xs font-medium mt-1">Submit your architectural profile to the network.</p>
                                </div>
                                <button onClick={onClose} className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-all border border-outline-variant/10 group">
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
                            {success ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 border border-emerald-500/20">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-on-surface tracking-tight mb-3">Identity Registered</h2>
                                    <p className="text-on-surface-variant text-base font-medium mb-10">Your application has been logged in our recruitment grid. We will evaluate your node shortly.</p>
                                    <button 
                                        onClick={onClose} 
                                        className="px-12 py-4 bg-surface-container-high text-on-surface rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-on-primary transition-all shadow-xl"
                                    >
                                        Close Terminal
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="mb-8 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-[11px] font-black uppercase tracking-widest flex items-center gap-3"
                                        >
                                            <Activity size={18} />
                                            {Array.isArray(error) ? error.join(', ') : error}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">First Name</label>
                                                <input 
                                                    required 
                                                    className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm backdrop-blur-md" 
                                                    placeholder="John"
                                                    value={formData.firstName}
                                                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Last Name</label>
                                                <input 
                                                    required 
                                                    className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm backdrop-blur-md" 
                                                    placeholder="Doe"
                                                    value={formData.lastName}
                                                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Professional Email</label>
                                            <input 
                                                required 
                                                type="email"
                                                className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm backdrop-blur-md" 
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Portfolio <span className="opacity-40">(Optional)</span></label>
                                                <input 
                                                    className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm backdrop-blur-md" 
                                                    placeholder="https://..."
                                                    value={formData.portfolioUrl}
                                                    onChange={e => setFormData({...formData, portfolioUrl: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">GitHub <span className="opacity-40">(Optional)</span></label>
                                                <input 
                                                    className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm backdrop-blur-md" 
                                                    placeholder="https://github.com/..."
                                                    value={formData.githubUrl}
                                                    onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        {/* Resume Upload Section */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Resume / CV (PDF/DOCX)</label>
                                            <div className="relative group">
                                                <input 
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    accept=".pdf,.doc,.docx"
                                                />
                                                <div className={`w-full p-6 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-md ${
                                                    resumeFile 
                                                    ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-400' 
                                                    : 'bg-surface-container-high/40 border border-white/20 dark:border-white/20 text-outline group-hover:border-primary/40 group-hover:bg-primary/5'
                                                }`}>
                                                    {resumeFile ? (
                                                        <>
                                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                                                 <FileText size={24} />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs font-black uppercase tracking-tight truncate max-w-[200px]">{resumeFile.name}</p>
                                                                <p className="text-[10px] opacity-60">Ready for transmission</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                                <UploadCloud size={24} />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs font-black uppercase tracking-tight">Click or drag to upload resume</p>
                                                                <p className="text-[10px] opacity-50 uppercase tracking-widest mt-1">PDF, DOC, DOCX • MAX 10MB</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Strategic Intent</label>
                                            <textarea 
                                                required
                                                className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm min-h-[120px] resize-none backdrop-blur-md" 
                                                placeholder="Tell us about your architectural background..."
                                                value={formData.message}
                                                onChange={e => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>

                                        <button 
                                            disabled={loading || uploading}
                                            className="w-full py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-6 relative overflow-hidden group"
                                            style={{ backgroundColor: role.accentColor }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            {(loading || uploading) ? (
                                                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <Zap size={16} />
                                                    {role.applyButtonText || 'Submit Application'}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Careers = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/jobs/active');
            if (res.data.success) {
                setRoles(res.data.jobs);
            }
        } catch (err) {
            console.error('Failed to fetch roles', err);
            toast.error('Failed to load recruitment nodes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleTalkToEngineer = () => {
        if (isAuthenticated) {
            navigate('/messages');
        } else {
            navigate('/login', { state: { from: '/messages' } });
        }
    };

    const whyJoin = [
        { title: 'Remote-first Culture', icon: Globe, desc: 'Work from anywhere in the world with absolute flexibility.' },
        { title: 'Engineering Freedom', icon: Code2, desc: 'Architect systems using your preferred modern toolkits.' },
        { title: 'Modern Tech Stack', icon: Cpu, desc: 'Build with the latest industry-standard engineering stacks.' },
        { title: 'Global Projects', icon: Zap, desc: 'Deliver software solutions to partners in 30+ countries.' },
        { title: 'Flexible Workflows', icon: Layers, desc: 'Agile methodologies built for high-performance freelancers.' },
        { title: 'Long-term Growth', icon: Activity, desc: 'Direct path to principal architecture and leadership roles.' }
    ];

    const filteredRoles = filter === 'All' ? roles : roles.filter(role => role.department.toUpperCase() === filter.toUpperCase());

    const handleApply = (role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    return (
        <MainLayout>
            <div className="relative overflow-hidden bg-background min-h-screen">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--cv-outline) 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
                </div>

                {selectedRole && (
                    <ApplicationModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        role={selectedRole}
                    />
                )}

                {/* Section 1: Hero */}
                <section className="relative pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden px-8 md:px-26">
                    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 relative z-10"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Join the Engineering Network</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-on-surface">
                                Build Systems That <br />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">Power the Future.</span>
                            </h1>
                            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg font-medium opacity-90">
                                We are recruiting high-performance freelance specialists to expand our digital monolith network. Specialized expertise in architecture, AI systems, and cloud engineering.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a href="#open-roles" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                    Explore Open Roles <ArrowRight size={14} />
                                </a>
                                <button 
                                    onClick={handleTalkToEngineer}
                                    className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-outline-variant text-on-surface hover:bg-surface-container transition-all"
                                >
                                    Our Culture
                                </button>
                            </div>

                            {/* Mini Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-outline-variant/10">
                                {[
                                    { label: '100% Remote', icon: Globe },
                                    { label: 'Global Team', icon: Users },
                                    { label: 'Flex Projects', icon: Layers },
                                    { label: 'Enterprise Clients', icon: Shield }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <item.icon size={16} className="text-primary" />
                                        <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative lg:h-[480px] flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse"></div>
                            {/* Futuristic Recruitment Visual */}
                            <div className="relative w-full aspect-square max-w-[420px] glass-card rounded-[2.5rem] overflow-hidden border-primary/20 flex items-center justify-center group">
                                <img 
                                    src="/assets/careers-hero.png" 
                                    alt="Engineering Network" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                                
                                {/* Floating Recruitment Cards */}
                                <div className="absolute top-8 left-8 p-4 glass-card border-outline-variant/30 rounded-xl animate-float">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                            <Code2 size={12} />
                                        </div>
                                        <div className="h-1 w-12 bg-on-surface/10 rounded-full"></div>
                                    </div>
                                    <div className="h-0.5 w-full bg-primary/30 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-8 right-8 p-4 glass-card border-outline-variant/30 rounded-xl animate-float" style={{ animationDelay: '1.5s' }}>
                                    <div className="flex gap-1 items-end h-6">
                                        {[30, 60, 40, 80, 50].map((h, i) => (
                                            <div key={i} className="w-1 bg-primary/40 rounded-full" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Why Join CV TECH */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">Why Engineers Choose CV TECH</h2>
                            <p className="text-on-surface-variant text-base font-medium leading-relaxed">
                                We've built an ecosystem where engineering craftsmanship meets operational freedom. Join a network designed for the modern developer.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyJoin.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 glass-card border-outline-variant/10 rounded-[2rem] space-y-5 hover:border-primary/30 transition-all duration-500 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black tracking-tight">{item.title}</h4>
                                        <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: Active Opportunities */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-surface-container/30 relative overflow-hidden" id="open-roles">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                            <div className="max-w-xl space-y-3">
                                <h2 className="text-4xl font-black tracking-tight text-on-surface">Active Opportunities</h2>
                                <p className="text-on-surface-variant text-base font-medium">Synchronize your capabilities with our active engineering pipelines.</p>
                            </div>
                            
                            {/* Filter System */}
                            <div className="flex flex-wrap gap-2">
                                {['All', 'Engineering', 'AI', 'Design', 'DevOps', 'Marketing', 'Management'].map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' : 'bg-background border border-outline-variant/10 text-on-surface-variant hover:border-primary/40'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <AnimatePresence mode='popLayout'>
                                    {filteredRoles.map((role, i) => (
                                        <motion.div 
                                            key={role._id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="group relative p-8 rounded-[2.5rem] bg-background border border-outline-variant/10 hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col"
                                        >
                                            <div 
                                                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                                style={{ backgroundColor: (role.accentColor || '#8a2be2') + '20' }}
                                            ></div>
                                            
                                            <div className="relative z-10 space-y-6 flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2">
                                                        <span 
                                                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20"
                                                            style={{ color: role.accentColor, borderColor: (role.accentColor || '#8a2be2') + '40', backgroundColor: (role.accentColor || '#8a2be2') + '10' }}
                                                        >
                                                            {role.type}
                                                        </span>
                                                        <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-[8px] font-black uppercase tracking-widest border border-outline-variant/10">{role.department}</span>
                                                        {role.isFeatured && (
                                                            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest border border-amber-500/20 flex items-center gap-1">
                                                                <Star size={8} className="fill-amber-500" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-on-surface-variant text-[9px] font-black uppercase tracking-widest">
                                                        <MapPin size={10} className="text-primary" style={{ color: role.accentColor }} />
                                                        {role.location}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-2xl font-black text-on-surface mb-3 group-hover:text-primary transition-colors tracking-tighter" style={{ '--tw-text-opacity': '1', color: `var(--on-surface)` }}>
                                                        <span className="group-hover:text-primary transition-colors" style={{ color: 'inherit' }}>{role.title}</span>
                                                    </h3>
                                                    <p className="text-on-surface-variant text-sm leading-relaxed font-medium opacity-80 line-clamp-3">{role.description}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-6 py-5 border-y border-outline-variant/10">
                                                    <div className="space-y-1">
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-outline">Duration</p>
                                                        <div className="flex items-center gap-2 font-black text-on-surface text-xs">
                                                            <Clock size={12} className="text-primary" style={{ color: role.accentColor }} />
                                                            {role.duration}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-outline">Compensation</p>
                                                        <div className="flex items-center gap-2 font-black text-on-surface text-xs">
                                                            <span className="text-primary font-bold" style={{ color: role.accentColor }}>₹</span>
                                                            {role.salary}
                                                        </div>
                                                    </div>
                                                </div>

                                                {role.skills && role.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {role.skills.map(skill => (
                                                            <span key={skill} className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/10 text-[8px] font-black uppercase tracking-widest text-on-surface-variant">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative z-10 pt-8">
                                                <button 
                                                    onClick={() => handleApply(role)}
                                                    className="w-full py-4 bg-surface-container text-on-surface font-black rounded-xl group-hover:bg-primary group-hover:text-on-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 shadow-lg"
                                                    style={{ '--hover-bg': role.accentColor }}
                                                >
                                                    {role.applyButtonText || 'Apply'} <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {filteredRoles.length === 0 && (
                                    <div className="col-span-full py-24 text-center">
                                        <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                                            <Search size={40} />
                                        </div>
                                        <p className="text-on-surface-variant font-black uppercase tracking-widest text-[10px]">No nodes detected in this sector</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 4: Engineering Culture */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                                The Developer <br />
                                <span className="text-primary italic">Never Dies.</span>
                            </h2>
                            <div className="space-y-4 text-lg text-on-surface-variant leading-relaxed font-medium opacity-90">
                                <p>We believe in craftsmanship, scalable systems, and absolute engineering excellence. At CV TECH, you don't just write code; you architect digital infrastructure.</p>
                                <p>Our collaborative environment is built for problem solvers who thrive on high-stakes architectural challenges and zero-trust security logic.</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-3 bg-primary/10 rounded-[2.5rem] blur-xl"></div>
                            <div className="relative glass-card rounded-[2.5rem] overflow-hidden border-primary/20 aspect-video flex items-center justify-center">
                                <img 
                                    src="/assets/globe-visual.png" 
                                    className="w-full h-full object-cover opacity-60" 
                                    alt="Culture Visualization" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-xl flex items-center justify-center text-primary animate-pulse">
                                        <Code2 size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Hiring Process */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-surface-container/30 relative">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">The Hiring Pipeline</h2>
                            <p className="text-on-surface-variant text-base font-medium">An efficient, asynchronous process designed for high-performance specialists.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-10"></div>
                            
                            {[
                                { step: '01', title: 'App Review', icon: Search },
                                { step: '02', title: 'Tech Screen', icon: Terminal },
                                { step: '03', title: 'Architecture', icon: Layers },
                                { step: '04', title: 'Final Sync', icon: Users },
                                { step: '05', title: 'Welcome', icon: Zap }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="relative z-10 flex flex-col items-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-background border border-outline-variant/10 flex items-center justify-center text-primary group hover:border-primary transition-all duration-500 shadow-xl">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-primary font-black text-[10px] tracking-widest">{item.step}</span>
                                        <h4 className="text-base font-black tracking-tight">{item.title}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 6: Testimonials */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {[
                                { name: 'Elena Vance', role: 'Principal Architect', quote: 'Working at CV TECH feels like building the future with people who truly care about engineering craftsmanship.' },
                                { name: 'Marcus Chen', role: 'AI Specialist', quote: 'The freedom to experiment with cutting-edge neural architectures is unparalleled. It is a true developer ecosystem.' },
                                { name: 'Sarah Miller', role: 'DevOps Lead', quote: 'High-stakes infrastructure with a "Developer Never Dies" mindset. The scalability challenges here are world-class.' }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    className="p-10 glass-card border-outline-variant/10 rounded-[2.5rem] space-y-8 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                        <Briefcase size={80} />
                                    </div>
                                    <p className="text-lg font-medium italic leading-relaxed text-on-surface opacity-90 relative z-10">
                                        "{item.quote}"
                                    </p>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-sm">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-on-surface tracking-tight text-sm">{item.name}</h4>
                                            <p className="text-primary text-[8px] font-black uppercase tracking-widest">{item.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 7: Global Network */}
                <section className="py-16 md:py-24 bg-surface-container/30 relative">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-outline-variant/10 bg-background group">
                                <img 
                                    src="/assets/globe-visual.png" 
                                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
                                    alt="Global Network" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse"></div>
                                        <Globe size={140} className="text-primary/20 relative z-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black tracking-tight">Global Engineering Network</h2>
                                    <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
                                        Our network connects specialists across 3 continents, delivering mission-critical infrastructure to the world's most demanding enterprises.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    {[
                                        { label: 'Countries', value: '30+' },
                                        { label: 'Engineers', value: '150+' },
                                        { label: 'Deployments', value: '10k+' },
                                        { label: 'Projects', value: '250+' }
                                    ].map((metric, i) => (
                                        <div key={i} className="space-y-1.5 border-l-2 border-primary/20 pl-5">
                                            <h4 className="text-2xl font-black text-on-surface tracking-tighter">{metric.value}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{metric.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 8: CTA Section */}
                <section className="py-16 px-6 md:px-12 relative pb-24">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-primary opacity-95"></div>
                            
                            <div className="relative z-10 lg:w-3/5 text-center lg:text-left space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
                                    Ready to engineer <br className="hidden md:block"/> the future?
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <a 
                                        href="#open-roles"
                                        className="px-10 py-5 bg-white text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Apply Now
                                    </a>
                                    <button 
                                        onClick={handleTalkToEngineer}
                                        className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all"
                                    >
                                        Talk to Engineering
                                    </button>
                                </div>
                            </div>

                            <div className="relative z-10 lg:w-2/5 hidden lg:flex justify-center">
                                <motion.div 
                                    animate={{ 
                                        rotateY: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center"
                                >
                                    <Cpu size={80} className="text-white opacity-40" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

const Star = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default Careers;
