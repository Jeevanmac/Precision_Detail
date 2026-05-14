import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import { 
    Cpu, 
    Globe, 
    Shield, 
    Zap, 
    Rocket, 
    Cloud, 
    Database, 
    Terminal, 
    CheckCircle2, 
    ArrowRight,
    Search,
    MessageSquare,
    Layers,
    Activity,
    Lock,
    Mail,
    X
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const handleTalkToEngineer = () => {
        if (isAuthenticated) {
            navigate('/messages');
        } else {
            navigate('/login', { state: { from: '/messages' } });
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-background">
                {/* Background Grid & Glows */}
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
                <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/30 mb-8"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/70">v4.0 Enterprise Infrastructure Active</span>
                            </motion.div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-on-surface"
                            >
                                Engineering <br/>
                                Digital Infrastructure <br/>
                                <span className="purple-gradient-text italic">for the World.</span>
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 leading-relaxed mx-auto lg:mx-0 font-medium"
                            >
                                CV TECH architects and exports high-performance software solutions globally. We build the backbone of modern digital enterprises with surgical precision.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-6"
                            >
                                <Link 
                                    to="/dashboard" 
                                    className="px-10 py-5 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    to="/about" 
                                    className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-outline-variant text-on-surface hover:bg-surface-container transition-all duration-300 flex items-center gap-3"
                                >
                                    Our Capabilities <ArrowRight size={16} />
                                </Link>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-outline-variant/10"
                            >
                                {[
                                    { label: 'Global Delivery', icon: Globe },
                                    { label: 'Enterprise Security', icon: Shield },
                                    { label: 'On-time Delivery', icon: Zap },
                                    { label: 'Long-term Support', icon: Rocket }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                                        <item.icon size={18} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface/50">{item.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="flex-1 relative w-full lg:w-auto h-[500px] lg:h-[700px]">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative w-full h-full p-4 lg:p-12 flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
                                <img 
                                    src="/assets/network-visual.png" 
                                    alt="Global Infrastructure" 
                                    className="w-full h-full object-cover relative z-10 animate-float rounded-[3rem] shadow-2xl border border-primary/20"
                                />
                                
                                {/* Overlay Card */}
                                <motion.div 
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="absolute bottom-10 right-0 lg:-right-10 glass-card p-8 rounded-3xl min-w-[280px] z-20 border-outline-variant/30"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
                                            <div>
                                                <p className="text-3xl font-black text-on-surface">500+</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-primary">Clients Served</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-black text-on-surface">99.9%</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-primary">Uptime</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-3xl font-black text-on-surface">1.2k</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-primary">Projects Delivered</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-black text-on-surface">10+</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-primary dark:text-primary">Years Excellence</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section - FULL WIDTH MARQUEE */}
            <section className="py-20 bg-background border-y border-outline-variant/10 overflow-hidden">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/30 mb-12">We Deal with only trusted by global innovators</p>
                <div className="relative flex overflow-hidden">
                    <div className="flex animate-marquee gap-24 items-center whitespace-nowrap">
                        {[...Array(4)].map((_, idx) => (
                            <React.Fragment key={idx}>
                                {['Google', 'Microsoft', 'AWS', 'MongoDB', 'Docker', 'Cloudflare', 'Vercel', 'Stripe','Firebase'].map((logo) => (
                                    <motion.span 
                                        key={`${logo}-${idx}`}
                                        whileHover={{ opacity: 1, scale: 1.1, filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.5))' }}
                                        className="text-3xl md:text-5xl font-black tracking-tighter text-on-surface/20 cursor-default transition-all hover:text-primary"
                                    >
                                        {logo}
                                    </motion.span>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <motion.span {...fadeInUp} className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">End-to-End Engineering</motion.span>
                        <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface">Engineering for modern businesses.</motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Product Engineering', icon: Layers, desc: 'Turning ambitious ideas into scalable, high-performance software products.' },
                            { title: 'AI & Data Solutions', icon: Cpu, desc: 'Integrating advanced machine learning and data architectures into your core.' },
                            { title: 'Cloud & DevOps', icon: Cloud, desc: 'Optimizing infrastructure with modern cloud-native deployment pipelines.' },
                            { title: 'QA Automation', icon: Activity, desc: 'Ensuring absolute reliability through rigorous automated testing protocols.' },
                            { title: 'Support & Maintenance', icon: MessageSquare, desc: 'Long-term partnership ensuring your systems remain cutting-edge and secure.' },
                            { title: 'Digital Transformation', icon: Rocket, desc: 'Modernizing legacy systems with future-proof enterprise architectures.' }
                        ].map((service, i) => (
                            <motion.div 
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-10 group hover:neon-border transition-all duration-500 rounded-[2.5rem]"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 text-primary">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-on-surface mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-medium">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Competencies Section (Preserved & Adjusted) */}
            <section className="px-6 md:px-12 py-24 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Competencies</span>
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">Precision Engineering.</h2>
                        </div>
                        <p className="text-on-surface-variant max-w-md text-sm leading-relaxed">
                            We specialize in high-performance architectures that bridge the gap between complex neural systems and scalable web infrastructure.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Big Card */}
                        <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container transition-colors duration-500">
                            <div className="p-10 relative z-10 flex flex-col h-full">
                                <div className="mb-auto">
                                    <span className="material-symbols-outlined text-primary text-4xl mb-6">psychology</span>
                                    <h3 className="text-3xl font-black mb-4 text-on-surface">Neural Architecture</h3>
                                    <p className="text-on-surface-variant max-w-sm leading-relaxed">Advanced AI models integrated into existing enterprise ecosystems with surgical precision.</p>
                                </div>
                                <div className="mt-12 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    View Specification <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none">
                                <img src="/assets/neural-arch.png" className="w-full h-full object-cover object-right" alt="Neural" />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-container-low"></div>
                            </div>
                        </div>

                        {/* Small Card 1 */}
                        <div className="group relative overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container transition-colors duration-500 p-8">
                            <span className="material-symbols-outlined text-primary text-3xl mb-6">hub</span>
                            <h3 className="text-xl font-black mb-3 text-on-surface">Infrastructure</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Decentralized protocols built for ultimate scale and security.</p>
                            <div className="h-32 rounded-xl overflow-hidden bg-surface-container-highest/50 border border-outline-variant/5">
                                <img src="/assets/infra.png" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Infra" />
                            </div>
                        </div>

                        {/* Small Card 2 */}
                        <div className="group relative overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container transition-colors duration-500 p-8">
                            <span className="material-symbols-outlined text-primary text-3xl mb-6">bolt</span>
                            <h3 className="text-xl font-black mb-3 text-on-surface">Edge Tools</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Ultra-fast utilities optimized for low-latency environments.</p>
                            <div className="h-32 rounded-xl overflow-hidden bg-surface-container-highest/50 border border-outline-variant/5">
                                <img src="/assets/edge.png" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Edge" />
                            </div>
                        </div>

                        {/* Wide Card */}
                        <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container transition-colors duration-500 p-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <span className="material-symbols-outlined text-primary text-3xl mb-6">terminal</span>
                                <h3 className="text-2xl font-black mb-4 text-on-surface">OSS Mastery</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">Our open-source scripts power thousands of deployments daily. Clean, documented, and lethal in efficiency.</p>
                            </div>
                            <div className="flex-1 h-48 w-full rounded-2xl overflow-hidden border border-outline-variant/20 bg-background shadow-inner">
                                <img src="/assets/scripts.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="Scripts" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline Section */}
            <section className="py-32 bg-background overflow-hidden border-y border-outline-variant/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-24">
                        <span className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">The Workflow</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface">How we engineer excellence.</h2>
                    </div>

                    <div className="relative">
                        {/* Connector Line */}
                        <div className="absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/60 dark:via-primary/40 to-transparent -translate-y-1/2 hidden lg:block"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
                            {[
                                { step: '01', title: 'Discover', desc: 'In-depth analysis of your core business objectives.' },
                                { step: '02', title: 'Architect', desc: 'Designing the blueprint for scalable infrastructure.' },
                                { step: '03', title: 'Build', desc: 'Precision development using cutting-edge tech.' },
                                { step: '04', title: 'Deploy', desc: 'Seamless integration into your global ecosystem.' },
                                { step: '05', title: 'Support', desc: 'Continuous optimization and 24/7 monitoring.' }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    {...fadeInUp}
                                    transition={{ delay: i * 0.15 }}
                                    className="text-center group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant/30 flex items-center justify-center mx-auto mb-8 group-hover:neon-border group-hover:scale-110 transition-all duration-500">
                                        <span className="text-primary font-black text-xl">{item.step}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-on-surface mb-4 uppercase tracking-tighter">{item.title}</h4>
                                    <p className="text-on-surface-variant text-xs leading-relaxed font-medium">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-32 bg-surface-container-low relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Client Feedback</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-12">Built by engineers, trusted by leaders.</h2>
                        </div>
                        <div className="grid gap-8">
                            {[
                                { name: 'Alex Rivera', role: 'CTO, TechFlow', quote: 'CV TECH transformed our legacy systems into a modern microservices architecture that handles 10x more traffic with half the cost.' },
                                { name: 'Sarah Chen', role: 'Head of Engineering, Velo', quote: 'The precision and speed at which the CV TECH team operates is unmatched. They are our go-to partner for complex digital infrastructure.' }
                            ].map((t, i) => (
                                <motion.div 
                                    key={i}
                                    {...fadeInUp}
                                    className="glass-card p-8 rounded-[2rem] bg-background/50"
                                >
                                    <p className="text-lg text-on-surface font-medium italic mb-8">"{t.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-on-surface font-black text-sm">{t.name}</p>
                                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-background">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-primary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden group shadow-2xl shadow-primary/20"
                    >
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-on-primary mb-8 leading-[0.9]">
                                    Let’s engineer something <br/> extraordinary together.
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                    <Link 
                                        to="/dashboard" 
                                        className="px-12 py-6 bg-on-primary text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Go to Dashboard
                                    </Link>
                                    <button 
                                        onClick={handleTalkToEngineer}
                                        className="px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs border border-on-primary/20 text-on-primary hover:bg-on-primary/10 transition-all"
                                    >
                                        Schedule Consultation
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <img 
                                    src="/assets/globe-visual.png" 
                                    alt="Global Network" 
                                    className="w-full h-auto rounded-3xl animate-float invert dark:invert-0"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
