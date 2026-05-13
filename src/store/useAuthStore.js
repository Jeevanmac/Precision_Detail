import { create } from 'zustand';
import api from '../lib/axiosInstance';
import { connectSocket, disconnectSocket } from '../lib/socket';

/**
 * Authentication Store (Zustand)
 * Manages user state and persistent token mapping for Bearer authorization.
 */
const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    recentlyViewed: [], 

    /**
     * Check if the user is authenticated by pinging the profile endpoint.
     * Tokens are automatically injected via axios interceptors.
     */
    checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
            return;
        }

        set({ isCheckingAuth: true });
        try {
            const res = await api.get('/profile/dashboard');
            if (res.data.success) {
                set({ user: res.data.userProfile, isAuthenticated: true });
                connectSocket(res.data.userProfile._id, res.data.userProfile.role);
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    addToHistory: (project) => {
        set((state) => {
            const filtered = state.recentlyViewed.filter(p => p._id !== project._id);
            return { recentlyViewed: [project, ...filtered].slice(0, 10) };
        });
    },

    /**
     * Store user identity and establish persistent tokens in localStorage.
     */
    login: (userData, accessToken) => {
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        set({ user: userData, isAuthenticated: true });
        connectSocket(userData._id, userData.role);
    },

    /**
     * Terminate session and purge all security tokens from local storage.
     */
    logout: async () => {
        try {
            // Optional backend ping for logging/cleanup
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout ping failed, proceeding with local purge.', error);
        } finally {
            localStorage.removeItem('accessToken');
            set({ user: null, isAuthenticated: false });
            disconnectSocket();
        }
    }
}));

export default useAuthStore;
