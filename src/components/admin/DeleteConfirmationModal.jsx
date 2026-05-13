import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, loading }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-surface-container-low border border-error/20 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(255,59,48,0.15)] overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-error/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative space-y-8 text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 bg-error/10 border border-error/20 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                            <span className="material-symbols-outlined text-4xl text-error animate-pulse">warning</span>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase">Delete Project?</h3>
                            <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                                This action permanently removes the project asset <span className="text-error font-bold">"{title}"</span> and all linked metadata from the vault. This sequence cannot be reversed.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <button 
                                onClick={onConfirm}
                                disabled={loading}
                                className="w-full py-4 bg-error text-on-error rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-error/20 hover:bg-error/90 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Purging Asset...' : 'Delete Permanently'}
                            </button>
                            <button 
                                onClick={onClose}
                                disabled={loading}
                                className="w-full py-4 text-on-surface-variant font-black uppercase tracking-widest text-xs hover:text-on-surface transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteConfirmationModal;
