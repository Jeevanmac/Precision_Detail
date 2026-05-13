import { useState } from 'react';
import api from '../lib/axiosInstance';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

/**
 * useRazorpay Hook
 * Handles the end-to-end payment lifecycle:
 * 1. Script injection
 * 2. Order creation
 * 3. Signature verification
 */
const useRazorpay = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { user, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const processPayment = async (projectIds, recaptchaToken) => {
        setIsProcessing(true);
        try {
            const res = await loadRazorpayScript();
            if (!res) throw new Error('Razorpay SDK failed to load. Check your connection.');

            // 1. Create Order in Backend
            const { data } = await api.post('/payments/create-order', { 
                projectIds, 
                recaptchaToken 
            });

            if (!data.success) throw new Error(data.message);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: 'INR',
                name: 'CV TECH Marketplace',
                description: `Purchase of ${projectIds.length} technical asset(s)`,
                order_id: data.orderId,
                handler: async (response) => {
                    try {
                        console.log('[RAZORPAY] Payment success response:', response);
                        // 2. Verify Signature
                        const verifyRes = await api.post('/payments/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyRes.data.success) {
                            console.log('[RAZORPAY] Verification successful, unlocking assets...');
                            await checkAuth(); // Refresh user data to unlock downloads
                            navigate('/dashboard', { state: { paymentSuccess: true } });
                        } else {
                            throw new Error('Payment verification failed.');
                        }
                    } catch (err) {
                        console.error('[RAZORPAY] Verification Error:', err);
                        alert('Signature verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                },
                theme: {
                    color: '#6366f1',
                },
                modal: {
                    ondismiss: () => setIsProcessing(false)
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment Error:', error);
            alert(error.response?.data?.message || error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return { processPayment, isProcessing };
};

export default useRazorpay;
