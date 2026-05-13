import { create } from 'zustand';
import api from '../lib/axiosInstance';
import { socket } from '../lib/socket';

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,

    fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/notifications');
            if (res.data.success) {
                set({ 
                    notifications: res.data.notifications, 
                    unreadCount: res.data.unreadCount,
                    loading: false 
                });
            }
        } catch (err) {
            console.error('Notification fetch failure', err);
            set({ 
                loading: false, 
                error: 'Registry synchronization failure. Check your uplink.' 
            });
        }
    },

    markAsRead: async (id) => {
        try {
            const res = await api.patch(`/notifications/${id}/read`);
            if (res.data.success) {
                set(state => ({
                    notifications: state.notifications.map(n => n._id === id ? { ...n, isRead: true } : n),
                    unreadCount: Math.max(0, state.unreadCount - 1)
                }));
            }
        } catch (err) {
            console.error('Mark as read failure', err);
        }
    },

    markAllAsRead: async () => {
        try {
            const res = await api.patch('/notifications/read-all');
            if (res.data.success) {
                set(state => ({
                    notifications: state.notifications.map(n => ({ ...n, isRead: true })),
                    unreadCount: 0
                }));
            }
        } catch (err) {
            console.error('Mark all as read failure', err);
        }
    },

    deleteNotification: async (id) => {
        try {
            const res = await api.delete(`/notifications/${id}`);
            if (res.data.success) {
                set(state => ({
                    notifications: state.notifications.filter(n => n._id !== id),
                    unreadCount: state.notifications.find(n => n._id === id && !n.isRead) 
                        ? Math.max(0, state.unreadCount - 1) 
                        : state.unreadCount
                }));
            }
        } catch (err) {
            console.error('Delete notification failure', err);
        }
    },

    deleteAllNotifications: async () => {
        try {
            const res = await api.delete('/notifications/purge-all');
            if (res.data.success) {
                set({
                    notifications: [],
                    unreadCount: 0
                });
            }
        } catch (err) {
            console.error('Delete all notifications failure', err);
        }
    },

    addNotification: (notification) => {
        set(state => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1
        }));
    },

    // Initialize real-time listeners
    initSocketListeners: () => {
        socket.on('new_notification', (notification) => {
            get().addNotification(notification);
        });
    },

    cleanupSocketListeners: () => {
        socket.off('new_notification');
    }
}));

export default useNotificationStore;
