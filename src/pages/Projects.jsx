import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';
import ProjectCard from '../components/ProjectCard';
import MainLayout from '../components/layout/MainLayout';
import { socket } from '../lib/socket';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Projects');
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const loadArchitecture = async () => {
            try {
                const res = await api.get('/projects');
                if (res.data.success) {
                    setProjects(res.data.projects);
                }
            } catch (err) {
                console.error('Core catalog disconnected', err);
            } finally {
                setLoading(false);
            }
        };

        loadArchitecture();
    }, []);

    useEffect(() => {
        const handleSync = () => {
            const loadArchitecture = async () => {
                try {
                    const res = await api.get('/projects');
                    if (res.data.success) {
                        setProjects(res.data.projects);
                    }
                } catch (err) {
                    console.error('Real-time sync failure', err);
                }
            };
            loadArchitecture();
        };

        socket.on('new_notification', handleSync);
        return () => {
            socket.off('new_notification', handleSync);
        };
    }, []);

    const filteredProjects = (projects || []).filter(p => 
        (activeFilter === 'All Projects' || p?.category === activeFilter) &&
        ((p?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
        (p?.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (p?.techStack || []).some(tech => (tech?.toLowerCase() || '').includes(searchTerm.toLowerCase())))
    );

    const categories = ['All Projects', 'Web App', 'Mobile App', 'Backend API', 'UI Kit', 'Machine Learning'];

    return (
        <MainLayout hasSidebar={true}>
            <div className="flex pt-6 bg-background min-h-screen relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full opacity-50"></div>
                    <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full opacity-50"></div>
                </div>
                {/* Sidebar Filters */}
                <aside className="hidden lg:block w-72 fixed left-0 top-20 bottom-0 bg-surface-container/80 backdrop-blur-3xl border-r border-outline-variant/20 p-8 overflow-y-auto z-20 shadow-xl">
                    <div className="flex flex-col space-y-10 relative z-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                                <h3 className="text-[11px] uppercase tracking-[0.25em] text-on-surface/40 font-black">Projects</h3>
                            </div>
                            <div className="flex flex-col space-y-2.5">
                                {categories.map(cat => {
                                    const iconMap = {
                                        'All Projects': 'grid_view',
                                        'Web App': 'language',
                                        'Mobile App': 'smartphone',
                                        'Backend API': 'terminal',
                                        'UI Kit': 'layers',
                                        'Machine Learning': 'memory'
                                    };
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`flex items-center gap-3.5 px-6 py-4 rounded-2xl font-black transition-all duration-500 text-[11px] uppercase tracking-widest group ${
                                                activeFilter === cat 
                                                ? 'bg-primary text-on-primary shadow-2xl shadow-primary/40 scale-[1.02]' 
                                                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                                            }`}
                                        >
                                            <span className={`material-symbols-outlined text-[18px] transition-transform duration-500 ${activeFilter === cat ? 'scale-110' : 'group-hover:scale-110 opacity-70'}`}>
                                                {iconMap[cat] || 'category'}
                                            </span>
                                            <span>{cat}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 ml-0 lg:ml-72 p-8 lg:p-12 relative z-10">
                    <header className="mb-16">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                            <div className="relative">
                                <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-primary/20 rounded-full blur-md"></div>
                                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface mb-4">
                                    Engineering <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Catalog</span>
                                </h1>
                                <p className="text-on-surface-variant max-w-xl text-base font-medium leading-relaxed">
                                    Explore premium architectural blueprints and AI-driven models architected for the modern digital monolith.
                                </p>
                            </div>
                            <div className="w-full lg:w-[400px] relative group">
                                <div className="absolute inset-0 bg-primary/10 dark:bg-primary/10 rounded-2xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 group-focus-within:text-primary transition-all duration-500">search</span>
                                    <input 
                                        type="text" 
                                        placeholder="Search the repository..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-surface-container backdrop-blur-xl border border-outline-variant/30 rounded-2xl py-5 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <div className="w-10 h-10 border-4 border-surface-container-highest border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : !isAuthenticated ? (
                        <div className="text-center py-24 bg-white/65 dark:bg-white/[0.02] backdrop-blur-[18px] rounded-[3rem] border border-white/40 dark:border-white/5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-10 border border-primary/20 shadow-[0_10px_30px_rgba(168,85,247,0.15)] animate-float">
                                    <span className="material-symbols-outlined text-5xl">lock</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-on-surface mb-6 tracking-tighter uppercase leading-tight">Restricted<br />Architecture</h3>
                                <p className="text-on-surface-variant max-w-md mx-auto mb-12 font-medium text-lg leading-relaxed px-6">Authenticate your identity to access our premium architectural blueprints and technical modules.</p>
                                <Link to="/login" className="px-14 py-5 bg-primary text-on-primary font-black uppercase tracking-[0.25em] text-[11px] rounded-2xl shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 group/btn">
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">login</span>
                                    Authorize Access
                                </Link>
                            </div>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProjects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-surface-container backdrop-blur-xl rounded-[3rem] border border-outline-variant/20 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-surface-container-high rounded-3xl flex items-center justify-center text-on-surface/20 mx-auto mb-8 border border-outline-variant/20">
                                    <span className="material-symbols-outlined text-4xl">search_off</span>
                                </div>
                                <h3 className="text-2xl font-black text-on-surface mb-3 tracking-tighter uppercase">No modules found</h3>
                                <p className="text-on-surface-variant max-w-sm mx-auto font-medium">We couldn't find any architectural patterns matching your current filter parameters.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </MainLayout>
    );
};

export default Projects;
