import axios from 'axios';
import { useUserStore } from './userService';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post<{ accessToken: string }>(
                    'http://localhost:3000/api/refresh-token',
                    { refreshToken }
                );
                
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                
                useUserStore.getState().setUser(accessToken);
                
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                useUserStore.getState().clearUser();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); 