import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';
import DashboardLayout from '../components/layout/DashboardLayout';

import useRazorpay from '../hooks/useRazorpay';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Cart = () => {
    const { user, checkAuth } = useAuthStore();
    const navigate = useNavigate();
    const { processPayment, isProcessing } = useRazorpay();
    const { executeRecaptcha } = useGoogleReCaptcha();
    
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [couponCode, setCouponCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');

    // Derived values for summary
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const discountAmount = (subtotal * appliedDiscount) / 100;
    const estimatedTax = (subtotal - discountAmount) * 0; // Tax mapping can be enabled here
    const finalTotal = subtotal - discountAmount + estimatedTax;

    useEffect(() => {
        const fetchPopulatedCart = async () => {
            if (!user) return;
            try {
                const res = await api.get('/projects');
                if (res.data.success) {
                    // Mapping based on user's current cart ObjectIds
                    const mappedItems = res.data.projects.filter(p => user.cart.includes(p._id));
                    setCartItems(mappedItems);
                }
            } catch (err) {
                console.error('Cart fetch failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPopulatedCart();
    }, [user]);

    const handleRemove = async (projectId) => {
        try {
            await api.post('/profile/cart/remove', { projectId });
            setCartItems(prev => prev.filter(item => item._id !== projectId));
            await checkAuth();
        } catch (err) {
            console.error('Deletion strictly blocked', err);
        }
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        setCouponError('');
        try {
            const res = await api.post('/coupons/validate', { code: couponCode });
            if (res.data.success) {
                setAppliedDiscount(res.data.discountPercentage);
            }
        } catch (err) {
            setAppliedDiscount(0);
            setCouponError(err.response?.data?.message || 'Invalid Promo Key');
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        
        let recaptchaToken = 'development';
        if (executeRecaptcha) {
            try {
                const token = await executeRecaptcha('checkout');
                if (token) recaptchaToken = token;
            } catch (err) {
                console.warn('reCAPTCHA failed', err);
            }
        }

        const projectIds = cartItems.map(item => item._id);
        await processPayment(projectIds, recaptchaToken);
    };

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-outline-variant/10 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    return (
        <DashboardLayout>
            <main className="flex-1 min-h-screen px-6 py-12 md:px-20 lg:px-32">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-on-surface">Shopping Cart</h1>
                    <p className="text-on-surface-variant max-w-2xl leading-relaxed">Review your selected professional assets and software licensing before proceeding to our secure payment gateway.</p>
                </header>

                {cartItems.length === 0 ? (
                    <div className="text-center py-24 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 shadow-xl">
                        <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
                        <h2 className="text-2xl text-on-surface font-bold mb-4">Registry is Empty</h2>
                        <Link to="/projects" className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl hover:scale-105 transition-all inline-block shadow-lg shadow-primary/20">
                            Return to Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-surface-container-high rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-surface-bright transition-colors duration-300 border border-outline-variant/5">
                                    <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800'} 
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-on-surface mb-1 uppercase tracking-wider">{item.title}</h3>
                                        <p className="text-sm text-on-surface-variant mb-4">{item.category} • Professional License</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <span className="text-primary font-bold text-xl">₹{item.price.toFixed(2)}</span>
                                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded font-black tracking-widest uppercase">Digital Delivery</span>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col gap-3">
                                        <button 
                                            onClick={() => handleRemove(item._id)}
                                            className="p-3 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="lg:col-span-4 sticky top-32">
                            <div className="bg-surface-container-highest rounded-2xl p-8 shadow-2xl shadow-primary-container/10 border border-outline-variant/10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-primary mb-8">Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-on-surface-variant font-medium">Subtotal</span>
                                        <span className="font-mono text-on-surface">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    {appliedDiscount > 0 && (
                                        <div className="flex justify-between items-center text-emerald-400">
                                            <span className="font-bold">Discount ({appliedDiscount}%)</span>
                                            <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10">
                                        <span className="text-on-surface-variant font-medium">Estimated Tax</span>
                                        <span className="font-mono text-on-surface">₹{estimatedTax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">Coupon Code</label>
                                    <div className="flex gap-2">
                                        <input 
                                            className="flex-1 bg-surface-container rounded-lg border-none focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline/40 font-mono text-sm tracking-widest px-4 py-3 outline-none" 
                                            maxLength="7" 
                                            placeholder="CVT2024" 
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        />
                                        <button 
                                            onClick={handleApplyCoupon}
                                            className="px-6 bg-surface-bright hover:bg-white/10 text-on-surface rounded-lg font-bold text-xs uppercase transition-colors border border-outline-variant/10"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponError && <p className="text-error text-xs font-bold mt-2 px-1">{couponError}</p>}
                                </div>

                                <div className="border-t border-outline-variant/20 pt-8 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Final Price</span>
                                        <span className="text-3xl font-black text-primary font-mono tracking-tighter">₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black uppercase tracking-widest text-sm shadow-lg shadow-primary-container/30 hover:shadow-primary-container/50 hover:-translate-y-0.5 transition-all duration-300 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                                </button>

                                <div className="mt-8 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-xs text-on-surface-variant opacity-60">
                                        <span className="material-symbols-outlined text-sm">verified_user</span>
                                        <span>Secure 256-bit SSL encrypted checkout</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Bonus Bento */}
                            <div className="mt-8 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Upgrade Insight</span>
                                </div>
                                <p className="text-sm text-on-surface-variant leading-relaxed">Add <span className="text-on-surface font-bold">Priority Support</span> for only ₹19.99/mo and get response times under 15 minutes.</p>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
};

export default Cart;
