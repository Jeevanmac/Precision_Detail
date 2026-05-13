import React, { useState, useEffect } from 'react';
import { 
    X, 
    Zap, 
    Activity, 
    FileText, 
    Archive, 
    Clock, 
    Wrench, 
    Plus, 
    Trash2, 
    Globe, 
    Smartphone, 
    Server, 
    Layers, 
    Cpu 
} from 'lucide-react';
import CustomSelect from '../ui/CustomSelect';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axiosInstance';
import axios from 'axios';

const ProjectEditorModal = ({ isOpen, onClose, project, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Web App',
        techStack: '',
        difficulty: 'Intermediate',
        tags: '',
        featured: false,
        status: 'Active',
        deploymentStatus: 'Ready',
        demoVideoUrl: '',
        documentationUrl: '',
        pptUrl: '',
        externalLinks: {
            demo: '',
            repo: '',
            docs: ''
        }
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [zipFile, setZipFile] = useState(null);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                price: project.price || '',
                category: project.category || 'Web App',
                techStack: project.techStack?.join(', ') || '',
                difficulty: project.difficulty || 'Intermediate',
                tags: project.tags?.join(', ') || '',
                featured: project.featured || false,
                status: project.status || 'Active',
                deploymentStatus: project.deploymentStatus || 'Ready',
                demoVideoUrl: project.demoVideoUrl || '',
                documentationUrl: project.documentationUrl || '',
                pptUrl: project.pptUrl || '',
                externalLinks: {
                    demo: project.externalLinks?.demo || '',
                    repo: project.externalLinks?.repo || '',
                    docs: project.externalLinks?.docs || ''
                }
            });
            setExistingImages(project.imageUrls || []);
        }
    }, [project]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleZipChange = (e) => {
        if (e.target.files?.[0]) {
            setZipFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setProgress(5);

        try {
            let uploadedImageKeys = project.imageKeys || [];

            if (imageFiles.length > 0) {
                const newKeys = [];
                for (let i = 0; i < imageFiles.length; i++) {
                    const file = imageFiles[i];
                    const urlRes = await api.get(`/projects/config/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
                    const { uploadUrl, key: imageKey } = urlRes.data;

                    await axios.put(uploadUrl, file, {
                        headers: { 'Content-Type': file.type }
                    });
                    newKeys.push(imageKey);
                    setProgress(5 + ((i + 1) / imageFiles.length) * 40);
                }
                uploadedImageKeys = newKeys;
            }

            let zipKey = project.zipFileKey;
            if (zipFile) {
                const zipUrlRes = await api.get(`/projects/config/upload-url?fileName=${encodeURIComponent(zipFile.name)}`);
                const { uploadUrl, key } = zipUrlRes.data;

                await axios.put(uploadUrl, zipFile, {
                    headers: { 'Content-Type': zipFile.type || 'application/zip' },
                    onUploadProgress: (p) => {
                        const pct = Math.round((p.loaded * 100) / p.total);
                        setProgress(45 + (pct * 0.45));
                    }
                });
                zipKey = key;
            }

            setProgress(95);

            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
                tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
                imageKeys: uploadedImageKeys,
                zipFileKey: zipKey
            };

            const res = await api.put(`/projects/${project._id}`, payload);
            if (res.data.success) {
                setProgress(100);
                onUpdate(res.data.project);
                setTimeout(onClose, 500);
            }
        } catch (err) {
            console.error('Update failed', err);
            setError(err.response?.data?.message || 'Update sequence failure');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-5xl max-h-[90vh] bg-surface-container-low border border-outline-variant/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="p-8 border-b border-outline-variant/5 flex items-center justify-between bg-surface-container-high/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">edit_note</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-on-surface tracking-tighter uppercase">Edit Project Asset</h2>
                                <p className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase opacity-60">ID: {project?._id}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 custom-scrollbar">
                        {error && (
                            <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-xl">
                                <p className="text-error font-bold text-sm">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Core Metadata</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Asset Title</label>
                                            <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <CustomSelect 
                                                    label="Category"
                                                    options={[
                                                        { label: 'Web App', value: 'Web App', icon: Globe },
                                                        { label: 'Mobile App', value: 'Mobile App', icon: Smartphone },
                                                        { label: 'Backend API', value: 'Backend API', icon: Server },
                                                        { label: 'UI Kit', value: 'UI Kit', icon: Layers },
                                                        { label: 'Machine Learning', value: 'Machine Learning', icon: Cpu },
                                                    ]}
                                                    value={formData.category}
                                                    onChange={val => setFormData({...formData, category: val})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Price (INR)</label>
                                                <input required name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Tech Stack (Comma Separated)</label>
                                            <input required name="techStack" value={formData.techStack} onChange={handleChange} type="text" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Tags (Comma Separated)</label>
                                            <input name="tags" value={formData.tags} onChange={handleChange} type="text" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Status & Flags</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <CustomSelect 
                                                label="Visibility Status"
                                                options={[
                                                    { label: 'Active', value: 'Active', icon: Activity },
                                                    { label: 'Draft', value: 'Draft', icon: FileText },
                                                    { label: 'Archived', value: 'Archived', icon: Archive },
                                                ]}
                                                value={formData.status}
                                                onChange={val => setFormData({...formData, status: val})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <CustomSelect 
                                                label="Deployment State"
                                                options={[
                                                    { label: 'Ready', value: 'Ready', icon: Zap },
                                                    { label: 'Pending', value: 'Pending', icon: Clock },
                                                    { label: 'Maintenance', value: 'Maintenance', icon: Wrench },
                                                ]}
                                                value={formData.deploymentStatus}
                                                onChange={val => setFormData({...formData, deploymentStatus: val})}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-surface-container-highest rounded-2xl">
                                        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 rounded-md text-primary focus:ring-primary bg-surface-container-low border-none" />
                                        <span className="text-sm font-bold text-on-surface uppercase tracking-tight">Featured Asset</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Media & Links */}
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Media Management</h3>
                                    
                                    {/* Image Preview / Upload */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Preview Gallery</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {existingImages.map((img, i) => (
                                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-outline-variant/10 relative group">
                                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-[8px] font-black text-white uppercase">Existing</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="relative aspect-square border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center hover:bg-surface-bright transition-colors cursor-pointer overflow-hidden group">
                                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">add_a_photo</span>
                                                <span className="text-[8px] font-black text-outline uppercase mt-1">{imageFiles.length > 0 ? `${imageFiles.length} New` : 'Add New'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ZIP Upload */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Architecture Bundle (ZIP)</label>
                                        <div className="relative border border-outline-variant/10 bg-surface-container-highest rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-primary/5 transition-all">
                                            <input type="file" accept=".zip" onChange={handleZipChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-primary">folder_zip</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-on-surface truncate">{zipFile ? zipFile.name : 'Update ZIP Asset'}</p>
                                                <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tight opacity-60">Leave empty to keep existing bundle</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">External Integrations</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Demo Video URL</label>
                                            <input name="demoVideoUrl" value={formData.demoVideoUrl} onChange={handleChange} type="url" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" placeholder="https://youtube.com/..." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Live Demo Link</label>
                                                <input name="externalLinks.demo" value={formData.externalLinks.demo} onChange={handleChange} type="url" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Repository URL</label>
                                                <input name="externalLinks.repo" value={formData.externalLinks.repo} onChange={handleChange} type="url" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none transition-all placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Detailed Description</label>
                            <textarea required name="description" value={formData.description} onChange={handleChange} rows="6" className="w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-[2rem] px-8 py-6 text-sm focus:ring-2 focus:ring-primary/50 text-on-surface outline-none resize-none leading-relaxed placeholder:text-on-surface/50 dark:placeholder:text-white/40" />
                        </div>
                    </form>

                    {/* Footer / Actions */}
                    <div className="p-8 border-t border-outline-variant/5 bg-surface-container-high/30">
                        {loading && (
                            <div className="mb-6 space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span className="text-primary">Synchronizing Data...</span>
                                    <span className="text-on-surface">{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-surface-container-highest rounded-full h-1 overflow-hidden">
                                    <motion.div 
                                        className="bg-primary h-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end gap-4">
                            <button onClick={onClose} disabled={loading} className="px-8 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">
                                Discard Changes
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Apply Modifications'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectEditorModal;
