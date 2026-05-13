import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import useAuthStore from '../store/useAuthStore';

const ProfileSettings = () => {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    });

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 max-w-4xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase">Security & Profile</h1>
                    <p className="text-on-surface-variant mt-2 font-medium">Manage your identity encryption and personal workspace parameters.</p>
                </header>

                <div className="space-y-12">
                    {/* Identity Mapping Section */}
                    <div className="bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">fingerprint</span>
                            <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Identity Mapping</h2>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">First Name</label>
                                    <input 
                                        className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-2xl px-5 py-3 text-on-surface placeholder:text-outline dark:placeholder:text-white/40 font-medium focus:ring-1 focus:ring-primary/50 transition-all"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Last Name</label>
                                    <input 
                                        className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-2xl px-5 py-3 text-on-surface placeholder:text-outline dark:placeholder:text-white/40 font-medium focus:ring-1 focus:ring-primary/50 transition-all"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Identity / Email</label>
                                <input 
                                    className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-2xl px-5 py-3 text-on-surface-variant font-medium opacity-50 cursor-not-allowed transition-all"
                                    value={formData.email}
                                    disabled
                                />
                            </div>
                            <button className="px-8 py-3 bg-primary text-on-primary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                Synchronize Identity
                            </button>
                        </form>
                    </div>

                    {/* Cryptographic Session Parameters */}
                    <div className="bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">encrypted</span>
                            <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Session Credentials</h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm text-on-surface-variant">Update your access keys to maintain peak security infrastructure.</p>
                            <div className="space-y-4">
                                <button className="w-full text-left p-6 rounded-3xl bg-surface-container-high hover:bg-surface-container-highest transition-all border border-outline-variant/10 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined">key</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-surface">Change Access Password</h4>
                                                <p className="text-[10px] text-outline uppercase font-black tracking-widest">Rotate your character sequence</p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </div>
                                </button>
                                <button className="w-full text-left p-6 rounded-3xl bg-surface-container-high hover:bg-surface-container-highest transition-all border border-outline-variant/10 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                                <span className="material-symbols-outlined">api</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-surface">API Keys & Tunneling</h4>
                                                <p className="text-[10px] text-outline uppercase font-black tracking-widest">Interface for external terminals</p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfileSettings;
