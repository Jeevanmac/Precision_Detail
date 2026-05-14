import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ShieldCheck, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import OtpInput from './OtpInput';
import api from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('📨 Initiating OTP dispatch request...');
            const res = await api.post('/auth/forgot-password', { email });
            
            if (res.data.success) {
                console.log('✅ OTP dispatched successfully.');
                setStep(2);
                setCooldown(30);
                toast.success('Authorization code dispatched.');
            } else {
                const msg = res.data.message || 'Failed to send OTP email.';
                setError(msg);
                toast.error(msg);
            }
        } catch (err) {
            console.error('❌ OTP dispatch request failed:', err);
            const msg = err.response?.data?.message || 'Failed to dispatch authorization code. Please check your connection.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (code) => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/verify-otp', { email, otp: code });
            if (res.data.success) {
                setStep(3);
                toast.success('Identity verified.');
            } else {
                setError(res.data.message || 'Verification failed.');
                toast.error(res.data.message || 'Verification failed.');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Verification failed.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            toast.error('Passwords do not match.');
            return;
        }
        
        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            const msg = 'Password must be 8+ characters with uppercase, lowercase, number, and special character.';
            setError(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/reset-password', { email, password: newPassword });
            if (res.data.success) {
                setStep(4);
                toast.success('Access key updated successfully.');
            } else {
                setError(res.data.message || 'Password update failed.');
                toast.error(res.data.message || 'Password update failed.');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Password update failed.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
            ></motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md glass-card rounded-[2.5rem] border-primary/20 shadow-2xl overflow-hidden p-8 sm:p-10"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-on-surface/5 text-outline transition-colors"
                >
                    <X size={20} />
                </button>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">Identity Recovery</h2>
                                <p className="text-on-surface-variant text-xs mt-2 font-medium">Enter your registered email to receive an authorization code.</p>
                            </div>

                            <form onSubmit={handleSendOtp} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-on-surface tracking-widest ml-1">Registered Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-outline" />
                                        <input 
                                            required
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="admin@cvtech.io"
                                            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-2xl pl-14 pr-6 py-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-error text-[10px] font-black uppercase tracking-widest">
                                        <AlertCircle size={14} /> {error}
                                    </div>
                                )}

                                <button 
                                    disabled={loading}
                                    className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <RefreshCw className="animate-spin" size={16} /> : 'DISPATCH CODE'} <ArrowRight size={16} />
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                    <Lock size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">Verify Identity</h2>
                                <p className="text-on-surface-variant text-xs mt-2 font-medium">We've sent a 6-digit code to <span className="text-primary">{email}</span></p>
                            </div>

                            <div className="space-y-8">
                                <OtpInput onComplete={handleVerifyOtp} />

                                {error && (
                                    <div className="flex justify-center items-center gap-2 text-error text-[10px] font-black uppercase tracking-widest">
                                        <AlertCircle size={14} /> {error}
                                    </div>
                                )}

                                <div className="text-center">
                                    <button 
                                        onClick={handleSendOtp}
                                        disabled={cooldown > 0 || loading}
                                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                                    >
                                        {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">New Access Key</h2>
                                <p className="text-on-surface-variant text-xs mt-2 font-medium">Create a high-strength password for your identity.</p>
                            </div>

                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-on-surface tracking-widest ml-1">New Password</label>
                                    <input 
                                        required
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-2xl px-6 py-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-on-surface tracking-widest ml-1">Confirm Password</label>
                                    <input 
                                        required
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-2xl px-6 py-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-error/5 border border-error/10 rounded-xl flex items-start gap-2 text-error text-[9px] font-bold leading-relaxed">
                                        <AlertCircle size={14} className="shrink-0" /> {error}
                                    </div>
                                )}

                                <button 
                                    disabled={loading}
                                    className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <RefreshCw className="animate-spin" size={16} /> : 'UPDATE ACCESS KEY'}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-500/20">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight mb-2">Success</h2>
                            <p className="text-on-surface-variant text-sm font-medium mb-8">Your access key has been updated. You can now login with your new credentials.</p>
                            
                            <button 
                                onClick={onClose}
                                className="w-full py-4 bg-surface-container-highest text-on-surface font-black uppercase tracking-widest text-[10px] rounded-2xl border border-outline-variant/10 hover:bg-surface-bright transition-all"
                            >
                                BACK TO LOGIN
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordModal;
