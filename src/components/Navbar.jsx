import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Moon, Sun, Search, Menu, X, LogOut } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';

import { Bell } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';
import NotificationDropdown from './notifications/NotificationDropdown';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const { theme, toggleTheme, initTheme } = useThemeStore();
    const { unreadCount, fetchNotifications, initSocketListeners, cleanupSocketListeners } = useNotificationStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        initTheme();
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        if (user) {
            fetchNotifications();
            initSocketListeners();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cleanupSocketListeners();
        };
    }, [initTheme, user]);

    const navLinks = [
        { name: 'All Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header 
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled ? 'h-16 glass-nav border-b border-primary/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'h-24 bg-transparent'
            }`}
        >
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div 
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                        <span className="text-on-primary font-black text-xs">CV</span>
                    </motion.div>
                    <span className="text-xl font-black tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors duration-300">
                        CV TECH
                    </span>
                </Link>

                {/* Main Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] relative group transition-colors duration-300 ${
                                location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            {link.name}
                            <motion.span 
                                className={`absolute -bottom-2 left-0 h-[2px] bg-primary rounded-full overflow-hidden transition-all duration-300 ${
                                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            >
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-on-primary/40 to-transparent w-full h-full"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.span>
                        </Link>
                    ))}
                </nav>

                {/* Utils & Auth */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 text-on-surface transition-all duration-300"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>

                    {/* Notifications */}
                    {user && (
                        <div className="relative">
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 text-on-surface transition-all duration-300 relative"
                            >
                                <Bell size={18} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-on-primary text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </motion.button>
                            <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
                        </div>
                    )}

                    {/* Cart */}
                    <Link 
                        to="/cart" 
                        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 text-on-surface transition-all duration-300"
                    >
                        <ShoppingBag size={18} />
                        {(user?.cart?.length > 0) && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-on-primary text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                {user?.cart?.length}
                            </span>
                        )}
                    </Link>

                    <div className="h-6 w-px bg-outline-variant/30 mx-2 hidden sm:block"></div>

                    {user ? (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link 
                                to="/dashboard" 
                                className="px-6 py-2.5 bg-primary text-on-primary text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 active:scale-95"
                            >
                                Dashboard
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-on-primary transition-all duration-300"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-6">
                            <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-300">
                                Sign In
                            </Link>
                            <Link 
                                to="/dashboard" 
                                className="px-8 py-3 bg-primary text-on-primary text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 active:scale-95"
                            >
                                DASHBOARD
                            </Link>
                        </div>
                    )}
                    
                    {/* Mobile Toggle */}
                    <button 
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-outline-variant/20 px-8 py-12 flex flex-col gap-8 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-black tracking-tight text-on-surface hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-outline-variant/10 my-4"></div>
                        {user ? (
                            <div className="flex flex-col gap-6">
                                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-primary">Dashboard</Link>
                                <button onClick={handleLogout} className="text-2xl font-black text-red-500 text-left">Sign Out</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-on-surface-variant">Sign In</Link>
                                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-primary uppercase">Dashboard</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
