import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    ChevronRight,
    Terminal,
    Users,
    Server,
    Smartphone
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const About = () => {
    const techStack = [
        { 
            name: 'AI / Machine Learning', 
            icon: Cpu, 
            desc: 'Neural architectures and generative AI models built for enterprise scale.',
            tags: ['TensorFlow', 'PyTorch', 'OpenAI'],
            color: 'from-purple-500/20 to-blue-500/20'
        },
        { 
            name: 'Web Infrastructure', 
            icon: Globe, 
            desc: 'High-performance reactive monoliths and edge-deployed applications.',
            tags: ['React', 'Next.js', 'TypeScript'],
            color: 'from-blue-500/20 to-cyan-500/20'
        },
        { 
            name: 'Cloud & DevOps', 
            icon: Server, 
            desc: 'Automated CI/CD pipelines and resilient cloud-native infrastructure.',
            tags: ['AWS', 'Docker', 'Kubernetes'],
            color: 'from-orange-500/20 to-red-500/20'
        },
        { 
            name: 'Backend Systems', 
            icon: Database, 
            desc: 'Distributed systems and high-throughput API architectures.',
            tags: ['Node.js', 'Go', 'PostgreSQL'],
            color: 'from-green-500/20 to-emerald-500/20'
        },
        { 
            name: 'Mobile Engineering', 
            icon: Smartphone, 
            desc: 'Premium cross-platform mobile experiences with native performance.',
            tags: ['Flutter', 'React Native', 'Swift'],
            color: 'from-pink-500/20 to-rose-500/20'
        },
        { 
            name: 'Security Systems', 
            icon: Shield, 
            desc: 'Fortified logic and zero-trust security built into every layer.',
            tags: ['OAuth', 'e2ee', 'IAM'],
            color: 'from-yellow-500/20 to-orange-500/20'
        }
    ];

    const values = [
        { title: 'Precision Engineering', desc: 'Every line of code is architected for maximum efficiency and readability.', icon: Code2 },
        { title: 'Security by Design', desc: 'Security is never an afterthought; it is baked into our foundational logic.', icon: Shield },
        { title: 'Scalable Architecture', desc: 'Systems that grow with your users, from startup to enterprise.', icon: Layers },
        { title: 'Global Reliability', desc: '99.9% uptime targets with geographically distributed infrastructure.', icon: Globe },
        { title: 'Human-Centered', desc: 'Software built for real people, solving real problems, with empathy.', icon: Users },
        { title: 'Term Maintenance', desc: 'Codebases designed to survive hype cycles and technical shifts.', icon: Activity }
    ];

    const stats = [
        { label: 'Global Projects', value: '250+', icon: Activity },
        { label: 'Countries Served', value: '30+', icon: Globe },
        { label: 'System Uptime', value: '99.9%', icon: Shield },
        { label: 'Engineering Hours', value: '50k+', icon: Zap }
    ];

    return (
        <MainLayout>
            <div className="relative overflow-hidden bg-background">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--cv-outline) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                </div>

                {/* Section 1: Hero */}
                <section className="relative pt-1 pb-16 md:pt-16 md:pb-24 overflow-hidden">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 relative z-10"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">The Digital Export Infrastructure</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-on-surface">
                                Building Systems That <br />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">Scale Beyond Borders.</span>
                            </h1>
                            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg font-medium opacity-90">
                                CV TECH is a modern software exporting enterprise delivering scalable digital infrastructure and high-performance engineering solutions to global partners.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link to="/dashboard" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                    Explore Solutions <ArrowRight size={14} />
                                </Link>
                                <button className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-outline-variant text-on-surface hover:bg-surface-container transition-all">
                                    Our Philosophy
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-outline-variant/10">
                                {[
                                    { label: 'Global Deployment', icon: Globe },
                                    { label: 'Enterprise Security', icon: Shield },
                                    { label: '24/7 Engineering', icon: Activity },
                                    { label: 'L-T Support', icon: Layers }
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
                            className="relative lg:h-[500px] flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse"></div>
                            {/* Futuristic Visual */}
                            <div className="relative w-full aspect-square max-w-[420px] glass-card rounded-[2.5rem] overflow-hidden border-primary/20 flex items-center justify-center">
                                <img 
                                    src="/assets/about-hero.png" 
                                    alt="Architecture Visualization" 
                                    className="w-full h-full object-cover opacity-80" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                                
                                {/* Floating Data Cards */}
                                <div className="absolute top-8 left-8 p-4 glass-card border-outline-variant/30 rounded-xl animate-float">
                                    <Terminal size={16} className="text-primary mb-1.5" />
                                    <div className="h-0.5 w-10 bg-primary rounded-full mb-1.5"></div>
                                    <div className="h-0.5 w-6 bg-on-surface/10 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-8 right-8 p-4 glass-card border-outline-variant/30 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                                    <Activity size={16} className="text-primary mb-1.5" />
                                    <div className="flex gap-1">
                                        {[40, 70, 50, 90, 60].map((h, i) => (
                                            <div key={i} className="w-0.5 bg-primary/40 rounded-full" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Who We Are */}
                <section className="py-16 md:py-24">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -inset-3 bg-primary/10 rounded-[2.5rem] blur-xl group-hover:bg-primary/20 transition-all duration-700"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-xl bg-surface-container">
                                <img 
                                    src="/assets/globe-visual.png" 
                                    className="w-full aspect-[4/5] object-cover opacity-90 invert dark:invert-0" 
                                    alt="Engineering Space" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50"></div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-4xl font-black tracking-tight text-on-surface">Engineering the Future of Digital Infrastructure</h2>
                                <p className="text-on-surface-variant text-base leading-relaxed font-medium">
                                    CV TECH serves as a bridge between academic learning and professional execution. We understand that starting from a blank canvas is the hardest part of software development.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {stats.map((stat, i) => (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="p-6 glass-card border-outline-variant/10 rounded-2xl space-y-3 hover:border-primary/30 transition-all duration-500"
                                    >
                                        <stat.icon size={20} className="text-primary" />
                                        <div>
                                            <h4 className="text-3xl font-black text-on-surface tracking-tighter">{stat.value}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">{stat.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-on-surface-variant text-sm leading-relaxed opacity-80">
                                Our mission is to accelerate your learning curve by providing codebases that are not just functional, but architecturally sound masterpieces. We specialize in software exporting, scalable systems, and enterprise cloud architecture.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Core Technologies */}
                <section className="py-16 md:py-24 bg-surface-container/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent"></div>
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">Core Technologies</h2>
                            <p className="text-on-surface-variant text-base font-medium">Built using globally trusted modern engineering stacks and battle-tested frameworks.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techStack.map((tech, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative p-8 rounded-3xl bg-background border border-outline-variant/10 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tech.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                                    
                                    <div className="relative z-10 space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/10 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                                            <tech.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black mb-2">{tech.name}</h3>
                                            <p className="text-on-surface-variant text-sm leading-relaxed font-medium">{tech.desc}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {tech.tags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 rounded-md bg-surface-container-high border border-outline-variant/20 text-[9px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tech Chips */}
                        <div className="mt-12 flex flex-wrap justify-center gap-3 opacity-40">
                            {['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Socket.IO', 'TensorFlow', 'Python', 'TypeScript'].map(tech => (
                                <span key={tech} className="px-4 py-1.5 rounded-full border border-outline-variant/30 text-[9px] font-black uppercase tracking-widest">{tech}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 4: Engineering Philosophy */}
                <section className="py-16 md:py-24 relative overflow-hidden">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                                The Developer <br />
                                <span className="text-primary italic">Never Dies.</span>
                            </h2>
                            <div className="space-y-4 text-lg text-on-surface-variant leading-relaxed font-medium opacity-90">
                                <p>We believe in clean architecture, extreme maintainability, and engineering discipline. Our codebases are designed to be living organisms that grow with the user.</p>
                                <p>Innovation isn't just about the new; it's about the sustainable. We build tools that survive the hype cycles of the modern tech world.</p>
                            </div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-10 md:p-12 rounded-[2.5rem] border-primary/20 relative group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Quote size={80} className="text-primary" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <p className="text-xl md:text-3xl font-light italic leading-tight text-on-surface">
                                    "Software should scale with both users and time. We don't just write code; we architect legacy systems."
                                </p>
                                
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-primary rounded-xl blur-md opacity-30"></div>
                                        <img 
                                            src="/assets/founder.png" 
                                            className="relative w-16 h-16 rounded-xl object-cover border-2 border-primary/20" 
                                            alt="Viktor Volkov" 
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-on-surface tracking-tight">Viktor Volkov</h4>
                                        <p className="text-primary text-[9px] font-black uppercase tracking-[0.3em]">Chief Architect & Founder</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 5: Global Impact */}
                <section className="py-16 md:py-24 bg-surface-container/30 relative">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-[2.5rem] overflow-hidden border border-outline-variant/10 bg-background group">
                                <img 
                                    src="/assets/globe-visual.png" 
                                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
                                    alt="Global Map" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                                
                                {/* Glowing Nodes */}
                                <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 bg-primary rounded-full animate-ping"></div>
                                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black tracking-tight">Global Impact</h2>
                                    <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
                                        Our infrastructure powers systems across 30+ countries, serving enterprises and government organizations with mission-critical reliability.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { label: 'Active Deployments', value: '10,000+' },
                                        { label: 'Engineering Support', value: '24/7/365' },
                                        { label: 'Enterprise Partners', value: '50+' },
                                        { label: 'Latency (Avg)', value: '< 20ms' }
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

                {/* Section 6: Company Values */}
                <section className="py-16 md:py-24">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-on-surface">Company Values</h2>
                            <p className="text-on-surface-variant text-base font-medium">The non-negotiable principles that define every project we undertake.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 glass-card border-outline-variant/10 rounded-[2rem] space-y-5 hover:border-primary/30 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary transition-all">
                                        <value.icon size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black tracking-tight">{value.title}</h4>
                                        <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{value.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 7: CTA Section */}
                <section className="py-16 relative">
                    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                        <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-primary opacity-90"></div>
                            
                            <div className="relative z-10 lg:w-3/5 text-center lg:text-left space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
                                    Let's build the next generation <br className="hidden md:block"/> of digital infrastructure.
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <Link 
                                        to="/dashboard" 
                                        className="px-10 py-5 bg-white text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Go to Dashboard
                                    </Link>
                                    <Link 
                                        to="/contact" 
                                        className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all"
                                    >
                                        Contact Engineering
                                    </Link>
                                </div>
                            </div>

                            <div className="relative z-10 lg:w-2/5 hidden lg:flex justify-center">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    className="relative w-64 h-64 flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
                                    <div className="absolute inset-6 border-2 border-white/10 rounded-full"></div>
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

// Simple Quote icon replacement if not in lucide
const Quote = ({ size, className }) => (
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
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4 4 6" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4 2.25 6" />
    </svg>
);

export default About;
