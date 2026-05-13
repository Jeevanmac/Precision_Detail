import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';
import axios from 'axios';
import { 
    Cpu, 
    Globe, 
    Shield, 
    Zap, 
    Database, 
    Layers, 
    Code2, 
    Activity as ActivityIcon, 
    ArrowRight, 
    Terminal,
    Users,
    Server,
    Smartphone,
    Plus,
    X,
    Layout,
    Star,
    Cloud,
    FileText
} from 'lucide-react';
import CustomSelect from '../components/ui/CustomSelect';

const AdminNewProject = () => {
    const navigate = useNavigate();
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
    });
    const [zipFile, setZipFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setZipFile(e.target.files[0]);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!zipFile) {
            return setError("A ZIP file is required for deployment.");
        }

        setLoading(true);
        setProgress(5);

        try {
            let uploadedImageKeys = [];
            
            // 1. Upload Images Sequentially
            if (imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    const file = imageFiles[i];
                    const urlRes = await api.get(`/projects/config/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
                    if (!urlRes.data.success) throw new Error("Failed to get image upload URL");
                    
                    const { uploadUrl, key: imageKey } = urlRes.data;

                    await axios.put(uploadUrl, file, {
                        headers: { 'Content-Type': file.type }
                    });
                    
                    if (imageKey) {
                        uploadedImageKeys.push(imageKey);
                        console.log(`[Frontend] Uploaded image to S3: ${imageKey}`);
                    }
                    setProgress(5 + ((i + 1) / imageFiles.length) * 20); // Progress up to 25%
                }
            }

            setProgress(25);

            // 2. Get Pre-signed URL for ZIP
            const zipUrlRes = await api.get(`/projects/config/upload-url?fileName=${encodeURIComponent(zipFile.name)}`);
            if (!zipUrlRes.data.success) throw new Error("Failed to get ZIP upload URL");
            
            const { uploadUrl, key } = zipUrlRes.data;

            // 3. Upload ZIP file directly to S3
            await axios.put(uploadUrl, zipFile, {
                headers: {
                    'Content-Type': zipFile.type || 'application/zip'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // Map 25% to 90%
                    setProgress(25 + (percentCompleted * 0.65));
                }
            });

            setProgress(90);

            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
                imageKeys: uploadedImageKeys,
                zipFileKey: key
            };

            const projectRes = await api.post('/projects', payload);
            
            if (projectRes.data.success) {
                setProgress(100);
                setTimeout(() => {
                    navigate('/admin/projects');
                }, 1000);
            }

        } catch (err) {
            console.error("Upload failed", err);
            setError(err.response?.data?.message || err.message || "An error occurred during deployment.");
            setLoading(false);
            setProgress(0);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 max-w-4xl mx-auto space-y-12">
                <div className="flex items-center gap-4">
                    <Link to="/admin/projects" className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
                        arrow_back
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase">Deploy New Asset</h2>
                        <p className="text-on-surface-variant font-medium mt-1">Upload architecture to secure S3 vault and publish to marketplace.</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-xl">
                        <p className="text-error font-bold text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 shadow-2xl space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Project Title</label>
                            <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary text-on-surface outline-none transition-all placeholder:text-outline dark:placeholder:text-white/40" placeholder="e.g. NeuralStack Framework" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Price (INR)</label>
                            <input required name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" min="0" className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary text-on-surface outline-none transition-all placeholder:text-outline dark:placeholder:text-white/40" placeholder="49.99" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Description</label>
                        <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary text-on-surface outline-none resize-none transition-all placeholder:text-outline dark:placeholder:text-white/40" placeholder="Detailed architectural description..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <CustomSelect 
                                label="Difficulty"
                                options={[
                                    { label: 'Entry Level', value: 'Entry Level', icon: Zap },
                                    { label: 'Intermediate', value: 'Intermediate', icon: ActivityIcon },
                                    { label: 'Senior Engineer', value: 'Senior Engineer', icon: Star },
                                ]}
                                value={formData.difficulty}
                                onChange={val => setFormData({...formData, difficulty: val})}
                            />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest uppercase text-white dark:text-white">Tech Stack (Comma Separated)</label>
                        <input required name="techStack" value={formData.techStack} onChange={handleChange} type="text" className="w-full bg-surface-container-highest border border-white/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary text-on-surface outline-none transition-all placeholder:text-outline dark:placeholder:text-white/40" placeholder="React, Node.js, MongoDB" />
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10">
                        <label className="text-[10px] font-black tracking-widest uppercase text-outline mb-4 block">Project Preview Images</label>
                        <div className="relative border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 hover:bg-surface-bright transition-colors group cursor-pointer text-center">
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">add_photo_alternate</span>
                                <span className="font-bold text-sm text-on-surface">{imageFiles.length > 0 ? `${imageFiles.length} image(s) selected` : 'Select preview images'}</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-2">First image acts as the primary thumbnail.</p>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10">
                        <label className="text-[10px] font-black tracking-widest uppercase text-outline mb-4 block">Secure Asset File (ZIP)</label>
                        <div className="relative border-2 border-dashed border-primary/30 rounded-2xl p-8 hover:bg-primary/5 transition-colors group cursor-pointer text-center">
                            <input 
                                type="file" 
                                accept=".zip,application/zip" 
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform">folder_zip</span>
                                <span className="font-bold text-on-surface">{zipFile ? zipFile.name : 'Click or drag ZIP file here'}</span>
                                {zipFile && <span className="text-xs text-on-surface-variant">{(zipFile.size / (1024 * 1024)).toFixed(2)} MB</span>}
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-primary">Deploying Asset...</span>
                                <span className="text-on-surface">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-primary-container h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? 'Processing...' : 'Deploy to Vault'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default AdminNewProject;
