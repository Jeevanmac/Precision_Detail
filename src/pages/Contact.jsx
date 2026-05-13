import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Shield, 
    Globe, 
    Cpu, 
    Zap, 
    Layers, 
    Code2, 
    Activity, 
    ArrowRight, 
    Terminal,
    Users,
    Server,
    ChevronDown,
    Send,
    CheckCircle2,
    Database,
    Smartphone
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';
import { toast } from 'react-hot-toast';
import CustomSelect from '../components/ui/CustomSelect';

const ContactHubCard = ({ icon: Icon, title, value, subtext, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className="p-8 glass-card border-outline-variant/10 rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all duration-500 group"
    >
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
            <Icon size={24} />
        </div>
        <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-outline">{title}</p>
            <h4 className="text-xl font-black text-on-surface tracking-tight">{value}</h4>
            <p className="text-on-surface-variant text-sm font-medium">{subtext}</p>
        </div>
    </motion.div>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-outline-variant/10">
        <button 
            onClick={onClick}
            className="w-full py-6 flex items-center justify-between text-left group"
        >
            <span className="text-lg font-black text-on-surface group-hover:text-primary transition-colors tracking-tight">{question}</span>
            <motion.div 
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-on-surface-variant group-hover:text-primary transition-colors"
            >
                <ChevronDown size={20} />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-on-surface-variant font-medium leading-relaxed max-w-2xl">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleTalkToEngineer = () => {
        if (isAuthenticated) {
            navigate('/messages');
        } else {
            navigate('/login', { state: { from: '/messages' } });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/contact', formData);
            if (res.data.success) {
                setSuccess(true);
                setFormData({ fullName: '', email: '', phone: '', interest: '', message: '' });
                toast.success('Synchronization Initiated');
            }
        } catch (err) {
            console.error('Transmission failure', err);
            toast.error('Mission Failed: Connection Severed');
        } finally {
            setLoading(false);
        }
    };

    const faqs = [
        { 
            question: "How fast is support response?", 
            answer: "Our enterprise response team typically synchronizes within 2-4 hours for mission-critical inquiries. Standard consultations receive a response within 24 business hours." 
        },
        { 
            question: "Do you provide enterprise solutions?", 
            answer: "Yes, we specialize in high-availability enterprise infrastructure, scalable digital monoliths, and secure internal system architectures for global organizations." 
        },
        { 
            question: "Can we request custom software?", 
            answer: "Custom software architecture is our core competency. We build bespoke systems tailored to your specific operational logic and scaling requirements." 
        },
        { 
            question: "Do you support long-term maintenance?", 
            answer: "We offer comprehensive 'Developer Never Dies' maintenance contracts to ensure your systems remain performant, secure, and technologically current." 
        },
        { 
            question: "Is remote collaboration supported?", 
            answer: "Absolutely. We are a remote-first engineering network with advanced synchronization tools to ensure seamless global collaboration across all time zones." 
        }
    ];

    const services = [
        { icon: Cpu, title: 'AI Infrastructure', desc: 'Neural architectures and automated ML pipelines.' },
        { icon: Globe, title: 'Web Platforms', desc: 'High-performance Next.js and Go monoliths.' },
        { icon: Server, title: 'Cloud Engineering', desc: 'Secure AWS/Kubernetes orchestration.' },
        { icon: Database, title: 'SaaS Systems', desc: 'Scalable multi-tenant software ecosystems.' },
        { icon: Layers, title: 'Enterprise Dashboards', desc: 'Precision-engineered internal interfaces.' },
        { icon: Shield, title: 'DevOps & Security', desc: 'Hardened CI/CD and zero-trust logic.' }
    ];

    return (
        <MainLayout>
            <div className="relative overflow-hidden bg-background">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--cv-outline) 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
                </div>

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
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Global Engineering Communication</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-on-surface">
                                Let's Build the <br />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">Future Together.</span>
                            </h1>
                            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg font-medium opacity-90">
                                Specialized support for software architecture, enterprise AI systems, and scalable cloud infrastructure. Initiate a mission-critical synchronization.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <button 
                                    onClick={handleTalkToEngineer}
                                    className="px-8 py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    Start a Conversation <ArrowRight size={14} />
                                </button>
                                <Link to="/projects" className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-outline-variant text-on-surface hover:bg-surface-container transition-all">
                                    Explore Solutions
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-outline-variant/10">
                                {[
                                    { label: '24/7 Support', icon: Activity },
                                    { label: 'Global Deployment', icon: Globe },
                                    { label: 'Enterprise Security', icon: Shield },
                                    { label: 'Fast Response', icon: Zap }
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
                            {/* Futuristic Communication Dashboard */}
                            <div className="relative w-full aspect-square max-w-[420px] glass-card rounded-[2.5rem] overflow-hidden border-primary/20 flex items-center justify-center group">
                                <img 
                                    src="/assets/contact-hero.png" 
                                    alt="Communication Network" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                                
                                {/* Floating Widgets */}
                                <div className="absolute top-10 right-10 p-4 glass-card border-outline-variant/30 rounded-xl animate-float">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <Activity size={12} />
                                        </div>
                                        <div className="text-[8px] font-black text-on-surface tracking-widest uppercase">Uptime 99.9%</div>
                                    </div>
                                    <div className="h-0.5 w-full bg-emerald-500/30 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-10 left-10 p-4 glass-card border-outline-variant/30 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex gap-1 items-end h-6">
                                        {[40, 70, 50, 90, 60].map((h, i) => (
                                            <div key={i} className="w-1 bg-primary/40 rounded-full" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                    <div className="mt-2 text-[8px] font-black text-primary tracking-widest uppercase">Support Analytics</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Contact Hub */}
                <section className="py-16 md:py-24 px-8 md:px-16">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ContactHubCard 
                                icon={MapPin} 
                                title="Global HQ" 
                                value="Austin, TX" 
                                subtext="101 Monolith Plaza, Suite 404" 
                                delay={0.1}
                            />
                            <ContactHubCard 
                                icon={Mail} 
                                title="Direct Email" 
                                value="hello@cvtech.io" 
                                subtext="Response within 24 hours" 
                                delay={0.2}
                            />
                            <ContactHubCard 
                                icon={Phone} 
                                title="Engineering Hotline" 
                                value="+91 63014 37386" 
                                subtext="Available Mon–Sat • 9AM–7PM IST" 
                                delay={0.3}
                            />
                            <ContactHubCard 
                                icon={Clock} 
                                title="Enterprise Support" 
                                value="Mission Critical" 
                                subtext="Dedicated Slack & Priority Line" 
                                delay={0.4}
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Contact Form */}
                <section className="py-16 md:py-24 px-8 md:px-16 bg-surface-container/30 relative" id="contact-form">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div>
                    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black tracking-tight text-on-surface">Synchronize with <br /> Our Architects</h2>
                                <p className="text-on-surface-variant text-base font-medium leading-relaxed max-w-md">
                                    Ready to deploy a new solution or scale your existing infrastructure? Submit your mission parameters and our lead architects will contact you shortly.
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                {[
                                    { text: "Detailed architecture assessment", icon: Layers },
                                    { text: "Secure deployment strategy", icon: Shield },
                                    { text: "Scaling & performance roadmap", icon: Activity }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-on-surface font-black text-sm uppercase tracking-tighter">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <item.icon size={16} />
                                        </div>
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 rounded-[2.5rem] border-primary/20 relative overflow-hidden"
                            >
                                {success ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 border border-emerald-500/20">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h2 className="text-3xl font-black text-on-surface tracking-tight mb-3">Message Transmitted</h2>
                                        <p className="text-on-surface-variant text-base font-medium mb-10">Our engineering leads have received your synchronization request. Expect a response shortly.</p>
                                        <button 
                                            onClick={() => setSuccess(false)} 
                                            className="px-12 py-4 bg-surface-container-high text-on-surface rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-on-primary transition-all shadow-xl"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Full Name</label>
                                                <input 
                                                    required 
                                                    className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline/30 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm" 
                                                    placeholder="John Doe"
                                                    value={formData.fullName}
                                                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Email Address</label>
                                                <input 
                                                    required 
                                                    type="email"
                                                    className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline/30 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm" 
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Phone Number</label>
                                                <input 
                                                    className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline/30 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm" 
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                                />
                                            </div>
                                            <CustomSelect 
                                                label="Service Interest"
                                                options={[
                                                    { label: 'Custom Software Architecture', value: 'Custom Software Architecture', icon: Layers },
                                                    { label: 'Cloud Infrastructure Optimization', value: 'Cloud Infrastructure Optimization', icon: Server },
                                                    { label: 'AI & Machine Learning Integration', value: 'AI & Machine Learning Integration', icon: Cpu },
                                                    { label: 'Security Audit & Hardening', value: 'Security Audit & Hardening', icon: Shield },
                                                    { label: 'Legacy System Modernization', value: 'Legacy System Modernization', icon: Zap },
                                                ]}
                                                value={formData.interest}
                                                onChange={val => setFormData({...formData, interest: val})}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Your Message</label>
                                            <textarea 
                                                required
                                                className="w-full bg-surface-container-low border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline/30 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all text-sm min-h-[120px] resize-none" 
                                                placeholder="Tell us about your project mission..."
                                                value={formData.message}
                                                onChange={e => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>

                                        <button 
                                            disabled={loading}
                                            className="w-full py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 overflow-hidden relative group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Services Grid */}
                <section className="py-16 md:py-24 px-8 md:px-16">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">What Can We Help You Build?</h2>
                            <p className="text-on-surface-variant text-base font-medium">Explore our specialized engineering domains for your next mission.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 glass-card border-outline-variant/10 rounded-[2rem] space-y-5 hover:border-primary/30 transition-all duration-500 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                                        <service.icon size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black tracking-tight">{service.title}</h4>
                                        <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{service.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 5: Global Network */}
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
                                        { label: 'Uptime', value: '99.9%' },
                                        { label: 'Avg Response', value: '< 4h' },
                                        { label: 'Countries Served', value: '30+' },
                                        { label: 'Active Projects', value: '250+' }
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

                {/* Section 6: FAQ Section */}
                <section className="py-16 md:py-24 px-8 md:px-16">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/3 space-y-4">
                                <h2 className="text-4xl font-black tracking-tight">Frequently <br /> Asked Questions</h2>
                                <p className="text-on-surface-variant text-base font-medium">Quick answers to common synchronization parameters.</p>
                            </div>
                            <div className="lg:w-2/3">
                                {faqs.map((faq, i) => (
                                    <FAQItem 
                                        key={i}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openFaq === i}
                                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 7: Final CTA */}
                <section className="py-16 px-6 md:px-12 relative">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-primary opacity-95"></div>
                            
                            <div className="relative z-10 lg:w-3/5 text-center lg:text-left space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
                                    Ready to engineer <br className="hidden md:block"/> something extraordinary?
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <button 
                                        onClick={handleTalkToEngineer}
                                        className="px-10 py-5 bg-white text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Talk to Engineering
                                    </button>
                                    <button 
                                        onClick={handleTalkToEngineer}
                                        className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all"
                                    >
                                        Start Your Project
                                    </button>
                                </div>
                            </div>

                            <div className="relative z-10 lg:w-2/5 hidden lg:flex justify-center">
                                <motion.div 
                                    animate={{ 
                                        rotateY: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="relative w-64 h-64 flex items-center justify-center perspective-1000"
                                >
                                    <div className="absolute inset-0 border-2 border-white/20 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)]"></div>
                                    <Globe size={120} className="text-white/20" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default Contact;
