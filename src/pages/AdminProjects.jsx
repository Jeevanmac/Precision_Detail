import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal';
import ProjectEditorModal from '../components/admin/ProjectEditorModal';
import { toast } from 'react-hot-toast';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            if (res.data.success) {
                setProjects(res.data.projects);
            }
        } catch (err) {
            console.error('Failed to fetch projects', err);
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (project) => {
        setSelectedProject(project);
        setIsEditOpen(true);
    };

    const handleDeleteClick = (project) => {
        setSelectedProject(project);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        setActionLoading(true);
        try {
            await api.delete(`/projects/${selectedProject._id}`);
            toast.success('Project asset purged successfully');
            setProjects(projects.filter(p => p._id !== selectedProject._id));
            setIsDeleteOpen(false);
        } catch (err) {
            console.error('Delete failed', err);
            toast.error('Purge sequence failure');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdate = (updatedProject) => {
        setProjects(projects.map(p => p._id === updatedProject._id ? { ...p, ...updatedProject } : p));
        toast.success('Project asset synchronized');
        fetchProjects(); // Refresh to get signed URLs etc
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-on-surface tracking-tighter uppercase">Project Vault</h2>
                        <p className="text-on-surface-variant max-w-2xl mt-2 font-medium">Coordinate and deploy architectural assets. Manage inventory status and licensing parameters.</p>
                    </div>
                    <Link to="/admin/projects/new" className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                        Deploy New Asset
                    </Link>
                </div>

                {/* Projects Table/Grid */}
                <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-container-high/50 text-[10px] uppercase tracking-[0.2em] font-black text-outline">
                                    <th className="px-8 py-5">Asset Preview</th>
                                    <th className="px-8 py-5">Metric Analysis</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Unit Price</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/5">
                                {projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-surface-dim border border-outline-variant/10 overflow-hidden flex-shrink-0">
                                                    <img src={project.imageUrls?.[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-on-surface mb-0.5">{project.title}</h4>
                                                    <p className="text-[10px] text-on-surface-variant font-medium opacity-60">ID: {project._id?.substring(0, 8) || 'N/A'}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-on-surface">{project.purchaseCount || 0}</span>
                                                    <span className="text-[10px] text-outline font-bold uppercase tracking-tighter">Total Sales</span>
                                                </div>
                                                <div className="w-px h-6 bg-outline-variant/20 mx-2"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-primary">{project.activeUsers || 0}</span>
                                                    <span className="text-[10px] text-outline font-bold uppercase tracking-tighter">Deployments</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-surface-container-highest rounded-lg text-[10px] font-black uppercase tracking-widest text-on-surface-variant border border-outline-variant/5">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-on-surface">₹{project.price}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleEdit(project)}
                                                    className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(project)}
                                                    className="p-2 text-on-surface-variant hover:text-error transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <DeleteConfirmationModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                title={selectedProject?.title}
                loading={actionLoading}
            />

            <ProjectEditorModal 
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                project={selectedProject}
                onUpdate={handleUpdate}
            />
        </DashboardLayout>
    );
};

export default AdminProjects;
