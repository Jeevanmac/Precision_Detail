import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import api from '../lib/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Check, 
    Trash2, 
    Eye, 
    Download, 
    ExternalLink, 
    FileText, 
    Code2, 
    Globe, 
    Mail, 
    Briefcase,
    AlertTriangle,
    Clock,
    User,
    ChevronRight,
    Users,
    Plus,
    Edit3,
    ToggleLeft,
    ToggleRight,
    Star,
    LayoutGrid,
    ClipboardList,
    PlusCircle,
    Save,
    RotateCcw,
    Terminal,
    MapPin,
    Activity,
    Search,
    Filter,
    ChevronLeft,
    Loader2,
    Cpu,
    Layers,
    Server
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import CustomSelect from '../components/ui/CustomSelect';

const JobModal = ({ job, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        department: 'Engineering',
        type: 'Freelance',
        location: 'Remote',
        description: '',
        duration: 'Ongoing',
        salary: '',
        skills: [],
        isFeatured: false,
        priority: 0,
        status: 'draft',
        applyButtonText: 'Apply Now',
        accentColor: '#8a2be2'
    });
    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (job) {
            setFormData(job);
        } else {
            setFormData({
                title: '',
                department: 'Engineering',
                type: 'Freelance',
                location: 'Remote',
                description: '',
                duration: 'Ongoing',
                salary: '',
                skills: [],
                isFeatured: false,
                priority: 0,
                status: 'draft',
                applyButtonText: 'Apply Now',
                accentColor: '#8a2be2'
            });
        }
    }, [job, isOpen]);

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Auto-add any pending skill input
            let finalSkills = [...(formData.skills || [])];
            if (skillInput.trim() && !finalSkills.includes(skillInput.trim())) {
                finalSkills.push(skillInput.trim());
            }

            const payload = { ...formData, skills: finalSkills };

            if (job) {
                await api.put(`/jobs/${job._id}`, payload);
                toast.success('Role synchronized successfully.');
            } else {
                await api.post('/jobs', payload);
                toast.success('New role registered in the registry.');
            }
            onSave();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-4xl bg-surface-container-low border border-primary/20 rounded-[2.5rem] relative shadow-2xl z-10 overflow-hidden flex flex-col max-h-[95vh]"
                >
                    <div className="h-1.5 bg-gradient-to-r from-primary via-purple-500 to-primary shrink-0"></div>
                    
                    <div className="p-8 border-b border-outline-variant/10 flex justify-between items-start shrink-0 bg-surface-container-low/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-on-surface tracking-tighter leading-tight">
                                    {job ? 'Architectural Update' : 'New Role Configuration'}
                                </h2>
                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Engineering Recruitment Node</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all border border-outline-variant/10">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Core Identity */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-outline flex items-center gap-2">
                                    <User size={12} /> Identity Context
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Job Title</label>
                                        <input 
                                            required 
                                            className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm" 
                                            placeholder="e.g. Senior Fullstack Architect"
                                            value={formData.title}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                            <CustomSelect 
                                                label="Department"
                                                options={[
                                                    { label: 'Engineering', value: 'Engineering', icon: Terminal },
                                                    { label: 'AI', value: 'AI', icon: Cpu },
                                                    { label: 'Design', value: 'Design', icon: Layers },
                                                    { label: 'DevOps', value: 'DevOps', icon: Server },
                                                    { label: 'Marketing', value: 'Marketing', icon: Globe },
                                                    { label: 'Management', value: 'Management', icon: Users },
                                                ]}
                                                value={formData.department}
                                                onChange={val => setFormData({...formData, department: val})}
                                            />
                                            <CustomSelect 
                                                label="Employment Type"
                                                options={[
                                                    { label: 'Freelance', value: 'Freelance', icon: Zap },
                                                    { label: 'Full Time', value: 'Full Time', icon: Briefcase },
                                                    { label: 'Part Time', value: 'Part Time', icon: Clock },
                                                    { label: 'Internship', value: 'Internship', icon: Zap },
                                                    { label: 'Contract', value: 'Contract', icon: Shield },
                                                ]}
                                                value={formData.type}
                                                onChange={val => setFormData({...formData, type: val})}
                                            />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                            <CustomSelect 
                                                label="Work Location"
                                                options={[
                                                    { label: 'Remote', value: 'Remote', icon: Globe },
                                                    { label: 'Hybrid', value: 'Hybrid', icon: MapPin },
                                                    { label: 'Onsite', value: 'Onsite', icon: MapPin },
                                                ]}
                                                value={formData.location}
                                                onChange={val => setFormData({...formData, location: val})}
                                            />
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Duration</label>
                                            <input 
                                                className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm" 
                                                placeholder="e.g. 6 Month Contract"
                                                value={formData.duration}
                                                onChange={e => setFormData({...formData, duration: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics & Compensation */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-outline flex items-center gap-2">
                                    <Clock size={12} /> Strategic Logistics
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Compensation (INR)</label>
                                        <input 
                                            required
                                            className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm" 
                                            placeholder="e.g. ₹80,000 – ₹1.2L/month"
                                            value={formData.salary}
                                            onChange={e => setFormData({...formData, salary: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white dark:text-white tracking-widest ml-1">Priority (Sort)</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm" 
                                                value={formData.priority}
                                                onChange={e => setFormData({...formData, priority: parseInt(e.target.value)})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <CustomSelect 
                                                label="Status Tier"
                                                options={[
                                                    { label: 'Draft', value: 'draft', icon: FileText },
                                                    { label: 'Active', value: 'active', icon: Activity },
                                                    { label: 'Closed', value: 'closed', icon: X },
                                                ]}
                                                value={formData.status}
                                                onChange={val => setFormData({...formData, status: val})}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div 
                                                onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}
                                                className={`w-12 h-6 rounded-full transition-all relative ${formData.isFeatured ? 'bg-primary shadow-[0_0_15px_rgba(138,43,226,0.5)]' : 'bg-surface-container-highest'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-7' : 'left-1 opacity-40'}`}></div>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white dark:text-white group-hover:text-primary transition-colors">Featured Node</span>
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="color" 
                                                className="w-6 h-6 rounded-md overflow-hidden bg-transparent border-none cursor-pointer"
                                                value={formData.accentColor}
                                                onChange={e => setFormData({...formData, accentColor: e.target.value})}
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white dark:text-white">Accent</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-outline flex items-center gap-2">
                                <FileText size={12} /> Architectural Blueprint (Description)
                            </h3>
                            <textarea 
                                required
                                className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-3xl px-6 py-6 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm min-h-[180px] resize-none" 
                                placeholder="Detail the mission, stack, and expectations..."
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                        </div>

                        {/* Skills / Tags */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-outline flex items-center gap-2">
                                <Code2 size={12} /> Technical Capability Tags
                            </h3>
                            <div className="space-y-4">
                                <input 
                                    className="w-full bg-surface-container-high/40 border border-white/20 dark:border-white/20 rounded-2xl px-5 py-4 text-on-surface placeholder:text-white/40 dark:placeholder:text-white/40 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-sm" 
                                    placeholder="Type skill and press Enter..."
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={handleAddSkill}
                                />
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map(skill => (
                                        <span key={skill} className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                            {skill}
                                            <button type="button" onClick={() => removeSkill(skill)} className="hover:text-on-surface transition-colors">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    {formData.skills.length === 0 && (
                                        <p className="text-[10px] text-outline italic">No capability tags assigned.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="p-8 border-t border-outline-variant/10 bg-surface-container-high/20 flex justify-end gap-4 shrink-0">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-outline-variant/10 text-on-surface hover:bg-surface-container transition-all"
                        >
                            Abort Sync
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div> : (
                                <>
                                    <Save size={16} /> {job ? 'Update Identity' : 'Execute Deploy'}
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const DetailsModal = ({ app, isOpen, onClose, onUpdateStatus }) => {
    if (!isOpen || !app) return null;

    const statuses = [
        { id: 'pending', label: 'Pending', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
        { id: 'reviewing', label: 'Reviewing', color: 'text-primary border-primary/20 bg-primary/10' },
        { id: 'interviewing', label: 'Interviewing', color: 'text-purple-400 border-purple-500/20 bg-purple-500/10' },
        { id: 'accepted', label: 'Accepted', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
        { id: 'rejected', label: 'Rejected', color: 'text-error border-error/20 bg-error/10' }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-2xl bg-surface-container-low border border-primary/20 rounded-[2.5rem] relative shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <div className="h-1.5 bg-gradient-to-r from-primary via-purple-500 to-primary shrink-0"></div>
                    
                    <div className="p-8 border-b border-outline-variant/10 flex justify-between items-start shrink-0 bg-surface-container-low/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl border border-primary/20">
                                {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-on-surface tracking-tighter leading-tight">{app.firstName} {app.lastName}</h2>
                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{app.role}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all border border-outline-variant/10">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Contact Matrix</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium">
                                        <Mail size={16} className="text-primary" />
                                        {app.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium">
                                        <Clock size={16} className="text-primary" />
                                        Applied {new Date(app.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Candidate Hubs</h3>
                                <div className="flex gap-2">
                                    {app.portfolioUrl ? (
                                        <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-xl text-xs font-bold text-on-surface border border-outline-variant/10 hover:border-primary/40 transition-all">
                                            <Globe size={14} className="text-primary" /> Portfolio
                                        </a>
                                    ) : (
                                        <span className="px-4 py-2 bg-surface-container-high/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-outline/40 border border-outline-variant/5">No Portfolio</span>
                                    )}
                                    {app.githubUrl ? (
                                        <a href={app.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-xl text-xs font-bold text-on-surface border border-outline-variant/10 hover:border-primary/40 transition-all">
                                            <Code2 size={14} className="text-primary" /> GitHub
                                        </a>
                                    ) : (
                                        <span className="px-4 py-2 bg-surface-container-high/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-outline/40 border border-outline-variant/5">No GitHub</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Strategic Intent Message</h3>
                            <div className="p-6 bg-surface-container-high/30 rounded-3xl border border-outline-variant/10 text-sm leading-relaxed text-on-surface-variant font-medium">
                                {app.message || "Candidate provided no strategic intent summary."}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Architectural Blueprint</h3>
                            {app.resumeUrl ? (
                                <div className="flex flex-wrap gap-3">
                                    <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                        <Eye size={16} /> View Resume
                                    </a>
                                    <a href={app.resumeUrl} download className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface rounded-xl text-xs font-black uppercase tracking-widest border border-outline-variant/20 hover:bg-primary/10 transition-all">
                                        <Download size={16} /> Download File
                                    </a>
                                </div>
                            ) : (
                                <div className="p-6 bg-error/5 rounded-3xl border border-error/10 flex items-center gap-4 text-error">
                                    <AlertTriangle size={20} />
                                    <p className="text-xs font-black uppercase tracking-widest">No resume document detected in the registry.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-8 border-t border-outline-variant/10 bg-surface-container-high/20 shrink-0">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-outline">Transition Status Tier</h3>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map((s) => (
                                    <button 
                                        key={s.id}
                                        onClick={() => onUpdateStatus(app._id, s.id)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            app.status === s.id ? s.color : 'bg-surface-container-high border-outline-variant/10 text-outline hover:border-primary/40'
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const DeleteConfirmation = ({ isOpen, onCancel, onConfirm, loading, title = "Purge Identity?" }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-sm bg-surface-container-low border border-error/30 rounded-[2rem] relative shadow-2xl z-10 p-10 text-center space-y-8"
                >
                    <div className="w-20 h-20 bg-error/10 rounded-3xl flex items-center justify-center text-error mx-auto border border-error/20">
                        <Trash2 size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-on-surface tracking-tighter">{title}</h2>
                        <p className="text-on-surface-variant text-xs font-medium">Do you want to permanently remove this entry from the recruitment registry? This cannot be undone.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={onCancel}
                            disabled={loading}
                            className="py-4 bg-surface-container-high text-on-surface rounded-xl font-black uppercase tracking-widest text-[10px] border border-outline-variant/10 hover:bg-surface-container-highest transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onConfirm}
                            disabled={loading}
                            className="py-4 bg-error text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-error/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                        >
                            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Purge Entry'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const AdminCareers = () => {
    const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'roles'
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteType, setDeleteType] = useState(null); // 'app' or 'job'
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/careers/applications');
            if (res.data.success) {
                setApplications(res.data.applications);
            }
        } catch (err) {
            console.error('Failed to fetch applications', err);
        }
    };

    const fetchJobs = async () => {
        try {
            const res = await api.get('/jobs');
            if (res.data.success) {
                setJobs(res.data.jobs);
            }
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchApplications(), fetchJobs()]);
        setLoading(false);
    };

    useEffect(() => {
        loadData();

        // High-stakes registry sync (2s heartbeat)
        const intervalId = setInterval(async () => {
            await Promise.all([fetchApplications(), fetchJobs()]);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await api.patch(`/careers/applications/${id}/status`, { status });
            if (res.data.success) {
                setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
                if (selectedApp && selectedApp._id === id) {
                    setSelectedApp(prev => ({ ...prev, status }));
                }
                toast.success('Identity status updated.');
            }
        } catch (err) {
            toast.error('Failed to update status.');
        }
    };

    const handleDeleteClick = (id, type) => {
        setDeleteId(id);
        setDeleteType(type);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        setDeleteLoading(true);
        try {
            const endpoint = deleteType === 'app' ? `/careers/applications/${deleteId}` : `/jobs/${deleteId}`;
            const res = await api.delete(endpoint);
            if (res.data.success) {
                if (deleteType === 'app') {
                    setApplications(prev => prev.filter(app => app._id !== deleteId));
                } else {
                    setJobs(prev => prev.filter(job => job._id !== deleteId));
                }
                setIsDeleteOpen(false);
                setDeleteId(null);
                toast.success('Identity permanently purged.');
            }
        } catch (err) {
            toast.error('Failed to purge identity.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleViewDetails = (app) => {
        setSelectedApp(app);
        setIsDetailsOpen(true);
    };

    const handleEditJob = (job) => {
        setSelectedJob(job);
        setIsJobModalOpen(true);
    };

    const handleNewRole = () => {
        setSelectedJob(null);
        setIsJobModalOpen(true);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8 lg:p-12 space-y-12 max-w-screen-2xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-black text-on-surface tracking-tighter uppercase leading-none">Careers Terminal</h2>
                        <p className="text-on-surface-variant font-medium max-w-xl opacity-70">Overseeing recruitment pipelines and role architecture. Synchronizing high-performance nodes.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleNewRole}
                            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Plus size={16} /> New Role
                        </button>
                        <div className="px-4 py-3 bg-surface-container-high rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-on-surface flex items-center gap-2">
                            <Users size={14} className="text-primary" /> {applications.length} Nodes
                        </div>
                        <button onClick={loadData} className="p-3 bg-surface-container-high text-on-surface rounded-xl border border-outline-variant/10 hover:bg-primary/10 hover:text-primary transition-all">
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-surface-container-low border border-outline-variant/10 rounded-2xl w-fit">
                    <button 
                        onClick={() => setActiveTab('applications')}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'applications' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-outline hover:bg-white/5'}`}
                    >
                        <ClipboardList size={14} /> Applications
                    </button>
                    <button 
                        onClick={() => setActiveTab('roles')}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'roles' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-outline hover:bg-white/5'}`}
                    >
                        <LayoutGrid size={14} /> Manage Roles
                    </button>
                </div>

                <div className="bg-surface-container-low rounded-[3rem] border border-outline-variant/10 overflow-hidden shadow-2xl shadow-black/50">
                    <AnimatePresence mode="wait">
                        {activeTab === 'applications' ? (
                            <motion.div 
                                key="apps"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full text-left">
                                    <thead className="bg-surface-container-high/50 text-[10px] font-black uppercase tracking-widest text-outline">
                                        <tr>
                                            <th className="px-10 py-6">Candidate Identity</th>
                                            <th className="px-10 py-6">Target Role</th>
                                            <th className="px-10 py-6">Asset Access</th>
                                            <th className="px-10 py-6">Status Tier</th>
                                            <th className="px-10 py-6 text-right">Command Center</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 font-medium">
                                        {applications.length > 0 ? applications.map((app) => (
                                            <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary font-black text-sm border border-outline-variant/10 group-hover:border-primary/30 transition-all">
                                                            {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-bold text-on-surface leading-tight mb-0.5">{app.firstName} {app.lastName}</h4>
                                                            <p className="text-[11px] text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                                                                <Mail size={10} className="text-primary" /> {app.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="space-y-1">
                                                        <span className="text-sm font-black text-on-surface tracking-tight italic group-hover:text-primary transition-colors">{app.role}</span>
                                                        <p className="text-[9px] text-outline uppercase tracking-widest flex items-center gap-1">
                                                            <Briefcase size={10} /> Candidate
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="flex gap-2">
                                                        {app.resumeUrl ? (
                                                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-on-primary transition-all border border-primary/20" title="View Resume">
                                                                <FileText size={16} />
                                                            </a>
                                                        ) : (
                                                            <div className="w-9 h-9 flex items-center justify-center bg-error/5 rounded-xl text-error/30 border border-error/10 cursor-not-allowed" title="No Resume">
                                                                <FileText size={16} />
                                                            </div>
                                                        )}
                                                        {app.portfolioUrl ? (
                                                            <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-surface-container-highest rounded-xl text-outline hover:text-primary transition-all border border-outline-variant/10" title="Portfolio">
                                                                <Globe size={16} />
                                                            </a>
                                                        ) : (
                                                            <div className="w-9 h-9 flex items-center justify-center bg-surface-container-high/30 rounded-xl text-outline/20 border border-outline-variant/5 cursor-not-allowed" title="No Portfolio">
                                                                <Globe size={16} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-lg ${
                                                        app.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/5' :
                                                        app.status === 'reviewing' ? 'bg-primary/10 text-primary border-primary/20 shadow-primary/5' :
                                                        app.status === 'interviewing' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/5' :
                                                        app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5' :
                                                        'bg-error/10 text-error border-error/20 shadow-error/5'
                                                    }`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex items-center justify-end gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-x-4 lg:group-hover:translate-x-0">
                                                        <button 
                                                            onClick={() => handleViewDetails(app)}
                                                            className="w-10 h-10 flex items-center justify-center text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-on-primary rounded-xl transition-all shadow-xl" title="View Details">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteClick(app._id, 'app')}
                                                            className="w-10 h-10 flex items-center justify-center text-error bg-error/10 border border-error/20 hover:bg-error hover:text-white rounded-xl transition-all shadow-xl" title="Purge Identity">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-10 py-24 text-center">
                                                    <div className="max-w-xs mx-auto space-y-4 opacity-30">
                                                        <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto">
                                                            <User size={40} className="text-outline" />
                                                        </div>
                                                        <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px]">Registry is currently vacant</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="roles"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full text-left">
                                    <thead className="bg-surface-container-high/50 text-[10px] font-black uppercase tracking-widest text-outline">
                                        <tr>
                                            <th className="px-10 py-6">Role Architecture</th>
                                            <th className="px-10 py-6">Context</th>
                                            <th className="px-10 py-6">Compensation</th>
                                            <th className="px-10 py-6">Status</th>
                                            <th className="px-10 py-6 text-right">Command Center</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 font-medium">
                                        {jobs.length > 0 ? jobs.map((job) => (
                                            <tr key={job._id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div 
                                                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm border border-white/10 group-hover:scale-105 transition-all shadow-lg"
                                                            style={{ backgroundColor: job.accentColor || '#8a2be2' }}
                                                        >
                                                            {job.title.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-bold text-on-surface leading-tight mb-0.5 flex items-center gap-2">
                                                                {job.title}
                                                                {job.isFeatured && <Star size={14} className="text-amber-400 fill-amber-400" />}
                                                            </h4>
                                                            <div className="flex gap-2 mt-1">
                                                                {job.skills.slice(0, 3).map(skill => (
                                                                    <span key={skill} className="text-[8px] text-outline uppercase tracking-widest px-1.5 py-0.5 bg-surface-container-highest rounded border border-outline-variant/5">{skill}</span>
                                                                ))}
                                                                {job.skills.length > 3 && <span className="text-[8px] text-outline uppercase tracking-widest">+{job.skills.length - 3}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="space-y-1">
                                                        <span className="text-xs font-black text-on-surface uppercase tracking-tight">{job.department}</span>
                                                        <p className="text-[9px] text-outline uppercase tracking-widest flex items-center gap-1">
                                                            <Globe size={10} /> {job.location} • {job.type}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8 text-on-surface font-black text-sm tracking-tight">
                                                    {job.salary}
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                        job.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        job.status === 'draft' ? 'bg-surface-container-high text-outline border-outline-variant/10' :
                                                        'bg-error/10 text-error border-error/20'
                                                    }`}>
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex items-center justify-end gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                                                        <button 
                                                            onClick={() => handleEditJob(job)}
                                                            className="w-10 h-10 flex items-center justify-center text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-on-primary rounded-xl transition-all shadow-xl" title="Edit Role">
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteClick(job._id, 'job')}
                                                            className="w-10 h-10 flex items-center justify-center text-error bg-error/10 border border-error/20 hover:bg-error hover:text-white rounded-xl transition-all shadow-xl" title="Purge Role">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-10 py-24 text-center">
                                                    <div className="max-w-xs mx-auto space-y-4 opacity-30">
                                                        <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto">
                                                            <Briefcase size={40} className="text-outline" />
                                                        </div>
                                                        <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px]">No active roles detected in the registry</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <DetailsModal 
                app={selectedApp} 
                isOpen={isDetailsOpen} 
                onClose={() => setIsDetailsOpen(false)} 
                onUpdateStatus={updateStatus}
            />

            <JobModal 
                job={selectedJob}
                isOpen={isJobModalOpen}
                onClose={() => setIsJobModalOpen(false)}
                onSave={fetchJobs}
            />

            <DeleteConfirmation 
                isOpen={isDeleteOpen}
                onCancel={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
                title={deleteType === 'app' ? "Purge Identity?" : "Purge Role Architect?"}
            />
        </DashboardLayout>
    );
};

export default AdminCareers;
