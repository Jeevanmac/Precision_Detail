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
            <div className="flex pt-6">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block w-72 fixed left-0 top-20 bottom-0 bg-surface-container-low border-r border-outline-variant/10 p-8 overflow-y-auto">
                    <div className="flex flex-col space-y-8">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-outline font-bold mb-6">Expertise</h3>
                            <div className="flex flex-col space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                                            activeFilter === cat 
                                            ? 'bg-primary/10 text-primary' 
                                            : 'text-on-surface-variant hover:bg-surface-container-high'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            {cat === 'All Projects' ? 'grid_view' : 'category'}
                                        </span>
                                        <span className="tracking-wide">{cat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 ml-0 lg:ml-72 p-8 lg:p-12">
                    <header className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-5xl font-black tracking-tighter text-on-surface mb-2">
                                    Browse <span className="text-primary">Projects</span>
                                </h1>
                                <p className="text-on-surface-variant max-w-xl">
                                    Explore high-end architectural templates and AI-driven models curated for the modern digital monolith.
                                </p>
                            </div>
                            <div className="w-full md:w-80 relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
                                <input 
                                    type="text" 
                                    placeholder="Filter repository..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-surface-container-high border border-outline-variant/10 rounded-full py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </header>

                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <div className="w-10 h-10 border-4 border-surface-container-highest border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : !isAuthenticated ? (
                        <div className="text-center py-32 bg-surface-container-low rounded-3xl border border-outline-variant/10 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none group-hover:border-primary/40 transition-colors duration-500"></div>
                            <span className="material-symbols-outlined text-6xl text-primary mb-6 animate-pulse">lock</span>
                            <h3 className="text-3xl font-black text-on-surface mb-4 uppercase tracking-tighter">Sign in to see the projects</h3>
                            <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-medium">Authenticate your identity to access our premium architectural blueprints and technical modules.</p>
                            <Link to="/login" className="px-8 py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">login</span>
                                See Projects
                            </Link>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProjects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                            <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-on-surface mb-2">No active results</h3>
                            <p className="text-on-surface-variant">No modules matched your precise search parameters.</p>
                        </div>
                    )}
                </main>
            </div>
        </MainLayout>
    );
};

export default Projects;
