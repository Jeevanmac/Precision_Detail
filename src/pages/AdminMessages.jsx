import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';
import DashboardLayout from '../components/layout/DashboardLayout';
import { socket } from '../lib/socket';

const AdminMessages = () => {
    const { user } = useAuthStore();
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    const loadThreads = async () => {
        try {
            const res = await api.get('/admin/messages');
            if (res.data.success) {
                setThreads(res.data.threads);
                if (res.data.threads.length > 0 && !selectedThread) {
                    setSelectedThread(res.data.threads[0]);
                }
            }
        } catch (err) {
            console.error('Log pull failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) loadThreads();

        // Real-time update for admins
        socket.on('new_message', (message) => {
            setThreads(prev => {
                const threadExists = prev.find(t => t.user._id === message.senderId._id || t.user._id === message.senderId);
                if (threadExists) {
                    return prev.map(t => {
                        if (t.user._id === (message.senderId._id || message.senderId)) {
                            const updated = {
                                ...t,
                                messages: [message, ...t.messages],
                                lastMessageAt: message.createdAt
                            };
                            if (selectedThread?.user._id === updated.user._id) {
                                setSelectedThread(updated);
                            }
                            return updated;
                        }
                        return t;
                    }).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
                } else {
                    // New thread from new user
                    loadThreads(); // Refresh list to get user details
                    return prev;
                }
            });
        });

        return () => {
            socket.off('new_message');
        };
    }, [user, selectedThread]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim() || !selectedThread) return;
        try {
            const res = await api.post('/messages', { 
                text, 
                receiverId: selectedThread.user._id 
            });
            if (res.data.success) {
                // Update local state
                const updatedThread = {
                    ...selectedThread,
                    messages: [res.data.message, ...selectedThread.messages],
                    lastMessageAt: res.data.message.createdAt
                };
                setSelectedThread(updatedThread);
                
                setThreads(prev => prev.map(t => 
                    t.user._id === updatedThread.user._id ? updatedThread : t
                ).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)));
                
                setText('');
            }
        } catch (err) {
            console.error('Broadcast failed', err);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-outline-variant/10 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden">
                {/* Chat List Sidebar (Left) */}
                <div className="w-full md:w-96 flex flex-col border-r border-outline-variant/10 bg-surface-container-low/30 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-black tracking-tighter text-on-surface">Support Inbox</h1>
                        </div>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
                                <input 
                                    className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl pl-10 text-sm focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-white/40 text-on-surface py-3 outline-none transition-all" 
                                    placeholder="Search users..." 
                                    type="text"
                                />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-8">
                        {threads.length === 0 ? (
                            <div className="p-6 text-center text-on-surface-variant text-sm">
                                No support tickets found.
                            </div>
                        ) : (
                            threads.map((thread) => (
                                <div 
                                    key={thread.user._id}
                                    onClick={() => setSelectedThread(thread)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-l-4 transition-all ${
                                        selectedThread?.user._id === thread.user._id
                                        ? 'bg-surface-container-high border-primary shadow-xl shadow-black/5'
                                        : 'hover:bg-surface-container-low border-transparent'
                                    }`}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {thread.user.name ? thread.user.name.substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-bold text-on-surface truncate">{thread.user.name || thread.user.email}</h4>
                                        </div>
                                        <p className="text-xs text-on-surface-variant truncate">
                                            {thread.messages[0]?.text || "No messages"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Window (Right) */}
                <div className="flex-1 flex flex-col relative bg-surface-dim/30">
                    {!selectedThread ? (
                        <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                            Select a thread to view messages.
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="p-6 flex items-center justify-between bg-surface-container-low/50 backdrop-blur-md border-b border-outline-variant/5 sticky top-0 z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-bold">
                                        {selectedThread.user.name ? selectedThread.user.name.substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-on-surface">{selectedThread.user.name || 'User'}</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-outline font-black uppercase tracking-widest leading-none">{selectedThread.user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Canvas */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col-reverse">
                                {selectedThread.messages.map((msg, idx) => {
                                    const isMe = String(msg.senderId?._id || msg.senderId || msg.sender?._id || msg.sender || '') === String(user?._id || user?.id || '');
                                    return (
                                        <div key={msg._id} className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                                            <div className={`p-4 rounded-3xl shadow-lg border border-outline-variant/10 ${
                                                isMe 
                                                ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-br-none' 
                                                : 'bg-surface-container-high text-on-surface rounded-bl-none'
                                            }`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <span className={`block text-[10px] mt-2 font-bold uppercase tracking-widest opacity-60 ${isMe ? 'text-right' : ''}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Input Area */}
                            <div className="p-8 bg-surface-container-low/50 backdrop-blur-xl border-t border-outline-variant/10">
                                <form onSubmit={handleSend} className="flex items-center gap-4 max-w-4xl mx-auto w-full">
                                    <div className="flex-1 relative">
                                        <input 
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-white/40 text-on-surface outline-none transition-all" 
                                            placeholder="Reply to user..." 
                                            type="text"
                                        />
                                    </div>
                                    <button type="submit" className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center text-on-primary shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all outline-none">
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminMessages;
