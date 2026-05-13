import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket']
});

export const connectSocket = (userId, role) => {
    if (!socket.connected) {
        socket.connect();
        socket.on('connect', () => {
            console.log('Socket Connected:', socket.id);
            socket.emit('join', { userId, role });
        });
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};
