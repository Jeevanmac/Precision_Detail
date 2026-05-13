import axios from 'axios';

/**
 * Higher-order Axios Instance
 * Configured for Bearer token-based authorization and silent refresh logic.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api'), 
    withCredentials: true,
});

// Request Interceptor: Injecting Authorization Bearer tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Silent Identity Rotation (Refresh)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 Unauthorized occurs and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh') && !originalRequest.url.includes('/auth/login')) {
            originalRequest._retry = true;

            try {
                // Request new access token from the backend vault (cookie sent automatically)
                const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
                
                const { accessToken } = res.data;
                localStorage.setItem('accessToken', accessToken);

                // Update the original request's authorization header mapping
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Re-execute standard pipeline request
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, wipe tokens and force re-authentication mapping
                localStorage.removeItem('accessToken');
                console.error('Session expired. Redirecting to auth check.');
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
