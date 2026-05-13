import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const AdminCoupons = () => {
    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 space-y-12 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-4xl">confirmation_number</span>
                </div>
                <h2 className="text-3xl font-black text-on-surface uppercase tracking-tighter">Discount Matrix</h2>
                <p className="text-on-surface-variant max-w-sm mt-2">The promotional infrastructure is currently being initialized. Advanced coupon mapping will be available in the next deployment.</p>
                <button className="mt-8 px-6 py-2 bg-surface-container-high border border-outline-variant/20 rounded-xl text-xs font-bold text-on-surface tracking-widest uppercase">
                    Notify on Activation
                </button>
            </div>
        </DashboardLayout>
    );
};

export default AdminCoupons;
