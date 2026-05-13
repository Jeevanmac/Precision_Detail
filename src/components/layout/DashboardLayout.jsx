import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useThemeStore from '../../store/useThemeStore';

const DashboardLayout = ({ children }) => {
    const { logout, user } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const commonMenu = [
        { name: 'Settings', icon: 'settings', path: '/settings' },
    ];

    const userMenu = [
        { name: 'Overview', icon: 'dashboard', path: '/dashboard' },
        { name: 'My Projects', icon: 'folder_special', path: '/dashboard/my-projects' }, 
        { name: 'Wishlist', icon: 'favorite', path: '/wishlist' },
        { name: 'Cart', icon: 'shopping_cart', path: '/cart' },
        { name: 'Messages', icon: 'chat_bubble', path: '/messages' },
    ];

    const adminMenu = [
        { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'Projects', icon: 'inventory_2', path: '/admin/projects' },
        { name: 'Orders', icon: 'shopping_bag', path: '/admin/orders' },
        { name: 'Users', icon: 'person', path: '/admin/users' },
        { name: 'Messages', icon: 'mail', path: '/messages' },
        { name: 'Coupons', icon: 'confirmation_number', path: '/admin/coupons' },
        { name: 'Careers', icon: 'badge', path: '/admin/careers' },
        { name: 'Analytics', icon: 'analytics', path: '/admin/analytics' },
    ];

    const menuItems = user?.role === 'admin' ? [...adminMenu, ...commonMenu] : [...userMenu, ...commonMenu];

    return (
        <div className="flex flex-col h-screen bg-background text-on-background selection:bg-primary/30 overflow-hidden font-inter antialiased">
            {/* Minimal Mobile Header & Theme Toggle Floating Action */}
            <div className="md:hidden flex justify-between items-center px-6 py-4 bg-background border-b border-outline-variant/10">
                <div className="flex gap-3">
                    <button className="p-2 rounded-xl bg-surface-container border border-outline-variant/10 shadow-sm text-on-surface-variant" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                    <Link to="/" className="p-2 rounded-xl bg-surface-container border border-outline-variant/10 shadow-sm text-on-surface-variant">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                </div>
                
                <button onClick={toggleTheme} className="p-2 bg-surface-container hover:bg-primary/10 hover:text-primary transition-all rounded-xl border border-outline-variant/10 shadow-sm text-on-surface-variant">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* SideNavBar */}
                <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex fixed md:sticky left-0 top-0 h-full border-r border-outline-variant/10 bg-surface-container-lowest/50 backdrop-blur-xl w-72 flex-col font-inter text-sm font-semibold tracking-wide z-40 overflow-hidden`}>
                    
                    {/* Top-Left Home Action & Theme */}
                    <div className="hidden md:flex px-8 pt-8 pb-4 justify-between items-center">
                        <Link to="/" title="Go to Home" className="inline-flex p-2.5 bg-surface-container hover:bg-primary hover:text-on-primary transition-all duration-200 rounded-xl text-on-surface border border-outline-variant/10 shadow-sm group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200">home</span>
                        </Link>
                        <button onClick={toggleTheme} title="Toggle Theme" className="inline-flex p-2.5 bg-surface-container hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl text-on-surface-variant border border-outline-variant/10 shadow-sm group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>

                    <div className="px-8 pt-4 pb-8 flex-shrink-0">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-on-primary">
                                    {user?.role === 'admin' ? 'terminal' : 'developer_board'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-on-surface text-base font-bold truncate max-w-[140px]">{user?.role === 'admin' ? 'Admin Hub' : 'Dev Terminal'}</h2>
                                <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em]">
                                    {user?.role === 'admin' ? 'Superuser' : 'Premium Tier'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-sidebar px-8 pb-4">
                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`py-3 px-6 flex items-center gap-3 transition-all duration-200 rounded-xl group hover:pl-8 ${
                                        location.pathname === item.path
                                        ? 'bg-primary border-l-4 border-on-primary text-on-primary shadow-lg shadow-primary/20'
                                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined ${location.pathname === item.path ? 'fill-1' : ''}`} style={{ fontVariationSettings: location.pathname === item.path ? '"FILL" 1' : '' }}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-auto p-8 border-t border-outline-variant/10">
                        {user?.role !== 'admin' && (
                            <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] mb-4 shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-lg">star</span>
                                Upgrade to Pro
                            </button>
                        )}
                        <button 
                            onClick={logout}
                            className="w-full text-on-surface-variant py-3 px-6 flex items-center gap-3 hover:text-error transition-all duration-300 rounded-xl hover:bg-error/5"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
