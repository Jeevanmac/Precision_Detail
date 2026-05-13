import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    X, 
    MessageSquare, 
    Briefcase, 
    CheckCircle, 
    AlertTriangle, 
    Info, 
    Clock,
    Trash2,
    Check
} from 'lucide-react';
import useNotificationStore from '../../store/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const { 
        notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead, 
        deleteNotification,
        deleteAllNotifications,
        loading,
        error 
    } = useNotificationStore();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const getIcon = (type) => {
        switch (type) {
            case 'message': return <MessageSquare className="text-blue-400" size={16} />;
            case 'application': return <Briefcase className="text-purple-400" size={16} />;
            case 'job_posted': return <CheckCircle className="text-amber-400" size={16} />;
            case 'contact': return <Bell className="text-blue-500" size={16} />;
            case 'alert': return <AlertTriangle className="text-amber-400" size={16} />;
            default: return <Info className="text-primary" size={16} />;
        }
    };

    const handleNotificationClick = (n) => {
        if (!n.isRead) markAsRead(n._id);
        if (n.link) navigate(n.link);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                className="absolute right-0 top-full mt-4 w-[380px] max-w-[calc(100vw-2rem)] bg-surface-container-low/90 backdrop-blur-2xl border border-primary/20 rounded-[2rem] shadow-2xl z-[150] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Bell size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-on-surface uppercase tracking-wider">Registry Alerts</h3>
                            <p className="text-[10px] text-outline font-bold uppercase tracking-widest">{unreadCount} Pending Nodes</p>
                        </div>
                    </div>
                    {notifications.length > 0 && (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={markAllAsRead}
                                className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-on-surface transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-primary/10"
                            >
                                <Check size={12} /> Sync All
                            </button>
                            <button 
                                onClick={deleteAllNotifications}
                                title="Purge All Registry Nodes"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error hover:text-white transition-all duration-300"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto max-h-[420px] custom-scrollbar p-2">
                    {loading && notifications.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-outline">Synchronizing Registry...</p>
                        </div>
                    ) : error ? (
                        <div className="py-16 flex flex-col items-center justify-center text-center px-8">
                            <div className="w-16 h-16 rounded-[2rem] bg-error/10 flex items-center justify-center text-error mb-6">
                                <AlertTriangle size={32} />
                            </div>
                            <h4 className="text-sm font-black text-error uppercase tracking-wider mb-2">Sync Fault</h4>
                            <p className="text-[10px] text-outline font-medium leading-relaxed">{error}</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="py-16 flex flex-col items-center justify-center text-center px-8">
                            <div className="w-16 h-16 rounded-[2rem] bg-surface-container-high flex items-center justify-center text-outline mb-6 opacity-20">
                                <Bell size={32} />
                            </div>
                            <h4 className="text-sm font-black text-on-surface uppercase tracking-wider mb-2">Registry Silent</h4>
                            <p className="text-[10px] text-outline font-medium leading-relaxed">No architectural updates or system alerts detected in the current stream.</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {notifications.map((n) => (
                                <motion.div
                                    key={n._id}
                                    layout
                                    className={`relative group p-4 rounded-2xl transition-all cursor-pointer border border-transparent ${
                                        n.isRead ? 'hover:bg-surface-container-high/40' : 'bg-primary/5 hover:bg-primary/10 border-primary/10'
                                    }`}
                                    onClick={() => handleNotificationClick(n)}
                                >
                                    <div className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                                            n.isRead 
                                            ? 'bg-surface-container-high border-outline-variant/10 text-outline' 
                                            : 'bg-primary/10 border-primary/20 shadow-lg shadow-primary/10'
                                        }`}>
                                            {getIcon(n.type)}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex justify-between items-start">
                                                <h5 className={`text-xs font-black tracking-tight truncate ${n.isRead ? 'text-on-surface/70' : 'text-on-surface'}`}>
                                                    {n.title}
                                                </h5>
                                                {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0 mt-1"></span>}
                                            </div>
                                            <p className={`text-[11px] leading-relaxed line-clamp-2 ${n.isRead ? 'text-on-surface-variant/60 font-medium' : 'text-on-surface-variant font-bold'}`}>
                                                {n.message}
                                            </p>
                                            <div className="flex items-center gap-3 pt-1">
                                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-outline">
                                                    <Clock size={10} />
                                                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(n._id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-error/10 hover:text-error transition-all text-outline"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-outline-variant/10 bg-surface-container-low/50 text-center">
                    <button 
                        onClick={() => {
                            navigate(unreadCount > 0 ? '/admin/messages' : '/dashboard');
                            onClose();
                        }}
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-outline hover:text-primary transition-all flex items-center justify-center gap-2 m-auto"
                    >
                        View System Stream <CheckCircle size={10} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationDropdown;
