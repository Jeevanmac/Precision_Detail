import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Globe, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState(''); // '', 'success', 'error'

    const handleSubscribe = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setStatus('success');
            setTimeout(() => setStatus(''), 5000);
            setEmail('');
        } else {
            setStatus('error');
        }
    };

    return (
        <footer className="w-full pt-32 pb-12 border-t border-outline-variant/10 bg-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-on-primary font-black text-[10px]">CV</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter text-on-surface uppercase">CV TECH</span>
                        </Link>
                        <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm font-medium">
                            Engineering digital infrastructure for the modern world. We architect and export high-performance software solutions for global enterprises.
                        </p>
                        <div className="flex gap-5">
                            {[X, Globe, Mail].map((Icon, i) => (
                                <motion.a 
                                    key={i}
                                    href="#" 
                                    whileHover={{ y: -3, color: '#a855f7' }}
                                    className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center justify-center text-on-surface-variant transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface">Platform</h4>
                        <ul className="space-y-4">
                            {['All Projects', 'Methodology', 'Tech Stack', 'Pricing'].map((link) => (
                                <li key={link}>
                                    <Link to="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Careers', 'Contact', 'Blog'].map((link) => (
                                <li key={link}>
                                    <Link to="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-on-surface">Stay Updated</h4>
                        <p className="text-xs text-on-surface-variant font-medium">Get the latest architectural briefings.</p>
                        <div className="space-y-3">
                            <form onSubmit={handleSubscribe} className={`relative group ${isProjectsPage ? 'w-full' : 'min-w-[240px]'}`}>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('');
                                    }}
                                    placeholder="Enter your email" 
                                    className={`w-full bg-surface-container border ${status === 'error' ? 'border-error/50' : 'border-outline-variant/30'} rounded-xl py-4 px-5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all pr-12`}
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                            {status === 'success' && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[10px] font-black uppercase tracking-widest text-primary"
                                >
                                    Thank you, you will be updated
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[10px] font-black uppercase tracking-widest text-error"
                                >
                                    Please enter a valid email
                                </motion.p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                    <p>© {new Date().getFullYear()} CV TECH LTD. ALL SYSTEMS OPERATIONAL.</p>
                    <div className="flex gap-10">
                        <Link to="#" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-on-surface transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-on-surface transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
