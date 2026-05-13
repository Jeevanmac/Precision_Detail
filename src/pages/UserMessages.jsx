import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';
import DashboardLayout from '../components/layout/DashboardLayout';
import { socket } from '../lib/socket';

const UserMessages = () => {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    const loadMessages = async () => {
        try {
            const res = await api.get('/messages');
            if (res.data.success) {
                setMessages(res.data.messages);
            }
        } catch (err) {
            console.error('Log pull failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadMessages();
            
            // High-frequency telemetry (2s interval)
            const intervalId = setInterval(loadMessages, 2000);

            // Listen for real-time messages
            socket.on('new_message', (message) => {
                setMessages(prev => [message, ...prev]);
            });

            return () => {
                clearInterval(intervalId);
                socket.off('new_message');
            };
        }
    }, [user]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
            const res = await api.post('/messages', { text });
            if (res.data.success) {
                setMessages(prev => [res.data.message, ...prev]);
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
                            <h1 className="text-2xl font-black tracking-tighter text-on-surface">Messages</h1>
                            <button className="material-symbols-outlined p-2 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all">add_comment</button>
                        </div>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
                            <input 
                                className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl pl-10 text-sm focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-white/40 text-on-surface py-3 outline-none transition-all" 
                                placeholder="Search conversations..." 
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-8">
                        {/* Static Admin Support Channel */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high border-l-4 border-primary shadow-xl shadow-black/5">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-primary">support_agent</span>
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-surface-container-high rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-bold text-on-surface truncate">Admin Support</h4>
                                    <span className="text-[10px] text-primary font-bold uppercase">Active</span>
                                </div>
                                <p className="text-xs text-on-surface-variant truncate">
                                    {messages[0]?.text || "No recent messages"}
                                </p>
                            </div>
                        </div>

                        {/* Upsell for Team Messaging */}
                        <div className="p-6 bg-surface-container-high/20 rounded-2xl border border-dashed border-outline-variant/10 text-center mt-4">
                            <span className="material-symbols-outlined text-outline text-2xl mb-2">group_add</span>
                            <p className="text-[10px] font-bold text-outline uppercase tracking-widest leading-relaxed">
                                Team messaging coming soon for Pro architectures.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chat Window (Right) */}
                <div className="flex-1 flex flex-col relative bg-surface-dim/30">
                    {/* Chat Header */}
                    <div className="p-6 flex items-center justify-between bg-surface-container-low/50 backdrop-blur-md border-b border-outline-variant/5 sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-on-surface">Admin Support</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    <span className="text-[10px] text-outline font-black uppercase tracking-widest leading-none">Internal Stream</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="material-symbols-outlined p-2 text-outline hover:text-primary hover:bg-surface-container-high rounded-lg transition-all">info</button>
                        </div>
                    </div>

                    {/* Messages Canvas */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col-reverse">
                        {messages.length === 0 ? (
                            <div className="m-auto text-center">
                                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-6 text-outline">
                                    <span className="material-symbols-outlined text-4xl">chat_bubble</span>
                                </div>
                                <p className="text-on-surface-variant font-bold">No communication logs recorded.</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = String(msg.senderId?._id || msg.senderId || msg.sender?._id || msg.sender || '') === String(user?._id || user?.id || '');
                                return (
                                    <div key={msg._id} className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                                        {!isMe && (
                                            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline text-[12px] shrink-0 border border-outline-variant/10">
                                                AD
                                            </div>
                                        )}
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
                            })
                        )}
                        
                        <div className="flex items-center justify-center mb-8">
                            <span className="px-4 py-1 rounded-full bg-surface-container-low border border-outline-variant/10 text-[10px] font-black text-outline uppercase tracking-widest">
                                Secure Support Tunnel Activated
                            </span>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-surface-container-low/50 backdrop-blur-xl border-t border-outline-variant/10">
                        <form onSubmit={handleSend} className="flex items-center gap-4 max-w-4xl mx-auto w-full">
                            <div className="flex-1 relative">
                                <input 
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-outline dark:placeholder:text-white/40 text-on-surface outline-none transition-all" 
                                    placeholder="Report architecture anomaly or request support..." 
                                    type="text"
                                />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline hover:text-primary">sentiment_satisfied</button>
                            </div>
                            <button type="submit" className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center text-on-primary shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all outline-none">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserMessages;
