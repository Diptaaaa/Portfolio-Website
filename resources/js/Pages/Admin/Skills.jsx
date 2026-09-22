import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import TechIcon from '@/Components/TechIcon';
import {
    Award,
    BarChart3,
    Layers,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    ExternalLink,
    Upload,
    Image as ImageIcon,
    ChevronUp,
    ChevronDown,
    Check,
    Loader2,
    ShieldCheck,
    Eye,
    Code2,
    Users,
    Globe,
    Cpu,
    BookOpen,
    Sparkles,
} from 'lucide-react';

/* ── Icon Maps & Presets ─────────────────────────────────────────── */
const COMPETENCY_ICONS = [
    { value: 'Code2', label: 'Code & Dev (Code2)', icon: Code2 },
    { value: 'Users', label: 'People & Soft Skills (Users)', icon: Users },
    { value: 'Globe', label: 'Language & Global (Globe)', icon: Globe },
    { value: 'Cpu', label: 'AI & Methodology (Cpu)', icon: Cpu },
    { value: 'BookOpen', label: 'Education & Learning (BookOpen)', icon: BookOpen },
    { value: 'Layers', label: 'General / Layers (Layers)', icon: Layers },
    { value: 'Award', label: 'Credentials (Award)', icon: Award },
    { value: 'Sparkles', label: 'Specialized (Sparkles)', icon: Sparkles },
];

const BADGE_COLOR_PRESETS = [
    {
        name: 'Indigo (Technical)',
        value: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
        preview: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    },
    {
        name: 'Emerald (Interpersonal)',
        value: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
        preview: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
        name: 'Amber (Fluency)',
        value: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
        preview: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
        name: 'Sky (Methodology)',
        value: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
        preview: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    },
    {
        name: 'Purple (Domain / EdTech)',
        value: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
        preview: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
        name: 'Rose (Creative)',
        value: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
        preview: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
];

const TECH_ICON_OPTIONS = [
    { value: 'python', label: 'Python' },
    { value: 'sql', label: 'SQL & Database' },
    { value: 'database', label: 'Database / Storage' },
    { value: 'excel', label: 'Microsoft Excel' },
    { value: 'tableau', label: 'Tableau BI' },
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'meta', label: 'Meta' },
    { value: 'nvidia', label: 'NVIDIA' },
    { value: 'ai', label: 'AI Platform' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
];

/* ── High-contrast styling constants ──────────────────────────────── */
const inputCls = 'admin-input-dark w-full !bg-[#0c0e17] !text-white !border-white/15 rounded-xl px-3.5 py-2.5 text-sm placeholder-zinc-500 focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/30 transition';
const labelCls = 'block text-xs font-semibold text-zinc-200 mb-1.5';

export default function AdminSkills({
    certifications = [],
    tools = [],
    competencies = [],
}) {
    const [activeTab, setActiveTab] = useState('certifications'); // 'certifications' | 'tools' | 'competencies'
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const triggerSuccess = (msg) => {
        setSuccessMessage(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
    };

    /* ── Certification State & Modals ─────────────────────────────── */
    const [isAddCertOpen, setIsAddCertOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [deletingCert, setDeletingCert] = useState(null);
    const [previewCertImage, setPreviewCertImage] = useState(null);

    const addCertForm = useForm({
        title: '',
        issuer: '',
        year: new Date().getFullYear().toString(),
        icon: 'google',
        image: '',
        cred_id: '',
        order: certifications.length + 1,
        is_active: true,
    });

    const editCertForm = useForm({
        title: '',
        issuer: '',
        year: '',
        icon: 'google',
        image: '',
        cred_id: '',
        order: 1,
        is_active: true,
    });

    const openEditCert = (cert) => {
        setEditingCert(cert);
        editCertForm.setData({
            title: cert.title || '',
            issuer: cert.issuer || '',
            year: cert.year || '',
            icon: cert.icon || 'google',
            image: cert.image || '',
            cred_id: cert.cred_id || '',
            order: cert.order ?? 1,
            is_active: cert.is_active ?? true,
        });
    };

    const handleCreateCert = (e) => {
        e.preventDefault();
        addCertForm.post(route('admin.skills.certifications.store'), {
            onSuccess: () => {
                addCertForm.reset();
                setIsAddCertOpen(false);
                triggerSuccess('Sertifikasi baru berhasil ditambahkan!');
            },
        });
    };

    const handleUpdateCert = (e) => {
        e.preventDefault();
        editCertForm.put(route('admin.skills.certifications.update', editingCert.id), {
            onSuccess: () => {
                editCertForm.reset();
                setEditingCert(null);
                triggerSuccess('Perubahan sertifikasi berhasil disimpan!');
            },
        });
    };

    const handleDeleteCert = () => {
        if (!deletingCert) return;
        router.delete(route('admin.skills.certifications.destroy', deletingCert.id), {
            onSuccess: () => {
                setDeletingCert(null);
                triggerSuccess('Sertifikat berhasil dihapus!');
            },
        });
    };

    /* ── Core Tools State & Modals ────────────────────────────────── */
    const [isAddToolOpen, setIsAddToolOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const [deletingTool, setDeletingTool] = useState(null);

    const addToolForm = useForm({
        type: 'tool',
        name: '',
        category: '',
        icon: 'python',
        order: tools.length + 1,
        is_active: true,
    });

    const editToolForm = useForm({
        type: 'tool',
        name: '',
        category: '',
        icon: 'python',
        order: 1,
        is_active: true,
    });

    const openEditTool = (tool) => {
        setEditingTool(tool);
        editToolForm.setData({
            type: 'tool',
            name: tool.name || '',
            category: tool.category || '',
            icon: tool.icon || 'python',
            order: tool.order ?? 1,
            is_active: tool.is_active ?? true,
        });
    };

    const handleCreateTool = (e) => {
        e.preventDefault();
        addToolForm.post(route('admin.skills.items.store'), {
            onSuccess: () => {
                addToolForm.reset();
                setIsAddToolOpen(false);
                triggerSuccess('Core Tool baru berhasil ditambahkan!');
            },
        });
    };

    const handleUpdateTool = (e) => {
        e.preventDefault();
        editToolForm.put(route('admin.skills.items.update', editingTool.id), {
            onSuccess: () => {
                editToolForm.reset();
                setEditingTool(null);
                triggerSuccess('Perubahan Core Tool berhasil disimpan!');
            },
        });
    };

    const handleDeleteTool = () => {
        if (!deletingTool) return;
        router.delete(route('admin.skills.items.destroy', deletingTool.id), {
            onSuccess: () => {
                setDeletingTool(null);
                triggerSuccess('Core Tool berhasil dihapus!');
            },
        });
    };

    /* ── Core Competencies State & Modals ─────────────────────────── */
    const [isAddCompOpen, setIsAddCompOpen] = useState(false);
    const [editingComp, setEditingComp] = useState(null);
    const [deletingComp, setDeletingComp] = useState(null);

    const itemsToText = (items) => {
        if (Array.isArray(items)) return items.join('\n');
        if (typeof items === 'string') {
            try {
                const parsed = JSON.parse(items);
                if (Array.isArray(parsed)) return parsed.join('\n');
            } catch (e) {
                return items;
            }
        }
        return '';
    };

    const addCompForm = useForm({
        type: 'competency',
        name: '',
        category: '',
        icon: 'Code2',
        badge: 'Technical',
        badge_color: BADGE_COLOR_PRESETS[0].value,
        items: '',
        order: competencies.length + 1,
        is_active: true,
    });

    const editCompForm = useForm({
        type: 'competency',
        name: '',
        category: '',
        icon: 'Code2',
        badge: '',
        badge_color: BADGE_COLOR_PRESETS[0].value,
        items: '',
        order: 1,
        is_active: true,
    });

    const openEditComp = (comp) => {
        setEditingComp(comp);
        editCompForm.setData({
            type: 'competency',
            name: comp.name || '',
            category: comp.category || '',
            icon: comp.icon || 'Code2',
            badge: comp.badge || '',
            badge_color: comp.badge_color || BADGE_COLOR_PRESETS[0].value,
            items: itemsToText(comp.items),
            order: comp.order ?? 1,
            is_active: comp.is_active ?? true,
        });
    };

    const handleCreateComp = (e) => {
        e.preventDefault();
        addCompForm.post(route('admin.skills.items.store'), {
            onSuccess: () => {
                addCompForm.reset();
                setIsAddCompOpen(false);
                triggerSuccess('Kategori kompetensi baru berhasil ditambahkan!');
            },
        });
    };

    const handleUpdateComp = (e) => {
        e.preventDefault();
        editCompForm.put(route('admin.skills.items.update', editingComp.id), {
            onSuccess: () => {
                editCompForm.reset();
                setEditingComp(null);
                triggerSuccess('Perubahan kategori kompetensi berhasil disimpan!');
            },
        });
    };

    const handleDeleteComp = () => {
        if (!deletingComp) return;
        router.delete(route('admin.skills.items.destroy', deletingComp.id), {
            onSuccess: () => {
                setDeletingComp(null);
                triggerSuccess('Kategori kompetensi berhasil dihapus!');
            },
        });
    };

    /* ── Certificate Upload Dropzone Component ───────────────────── */
    function CertificateUploader({ currentImage, onImageUploaded, formError }) {
        const [uploading, setUploading] = useState(false);
        const [error, setError] = useState('');
        const fileRef = useRef(null);

        const handleUpload = async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            setError('');

            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await window.axios.post(route('admin.skills.upload-certificate'), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (res.data?.success) {
                    onImageUploaded(res.data.url);
                } else {
                    setError('Gagal mengupload file sertifikat.');
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Gagal mengunggah berkas sertifikat.');
            } finally {
                setUploading(false);
                if (fileRef.current) fileRef.current.value = '';
            }
        };

        return (
            <div className="space-y-2">
                <label className={labelCls}>Berkas / Gambar Sertifikat *</label>

                {/* Full-width clickable image preview */}
                {currentImage ? (
                    <div className="space-y-2">
                        {/* Large clickable preview area */}
                        <div
                            className={`relative w-full rounded-xl overflow-hidden border bg-[#0c0e17] cursor-pointer group transition ${
                                uploading
                                    ? 'border-indigo-500/50 pointer-events-none'
                                    : 'border-white/15 hover:border-indigo-500/50'
                            }`}
                            onClick={() => !uploading && fileRef.current?.click()}
                            title="Klik untuk ganti gambar sertifikat"
                        >
                            {/* Certificate image */}
                            <div className="aspect-[16/9] w-full bg-white flex items-center justify-center">
                                <img
                                    src={currentImage}
                                    alt="Pratinjau Sertifikat"
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>

                            {/* Upload overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                                        <span className="text-sm font-semibold text-white">Mengunggah...</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 rounded-full bg-indigo-600/80 border border-indigo-400/50 shadow-lg shadow-indigo-600/30">
                                            <Upload className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-white">Upload Gambar Baru</p>
                                            <p className="text-xs text-zinc-300 mt-0.5">PNG, JPG, WebP, SVG atau PDF (Maks. 10MB)</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Loading spinner overlay */}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
                                    <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                                    <span className="text-sm font-semibold text-white">Mengunggah sertifikat...</span>
                                </div>
                            )}

                            {/* Status badge */}
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[11px] font-semibold text-emerald-300">Berkas Terpasang</span>
                            </div>

                            {/* Replace hint badge */}
                            {!uploading && (
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload className="w-3 h-3 text-zinc-300" />
                                    <span className="text-[11px] text-zinc-300">Klik untuk ganti</span>
                                </div>
                            )}
                        </div>

                        {/* Action buttons below image */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                disabled={uploading}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition disabled:opacity-50"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploading ? 'Mengunggah...' : 'Upload Gambar Baru'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onImageUploaded('')}
                                disabled={uploading}
                                className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold border border-rose-500/30 transition disabled:opacity-50"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Dropzone when empty */
                    <div
                        onClick={() => !uploading && fileRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
                            uploading
                                ? 'border-indigo-500/50 bg-indigo-500/5 pointer-events-none py-10'
                                : 'border-white/15 bg-[#0c0e17] hover:border-indigo-500/60 hover:bg-indigo-500/5 py-10'
                        }`}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                                <span className="text-sm font-semibold text-zinc-200">Sedang mengunggah berkas...</span>
                            </div>
                        ) : (
                            <>
                                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-indigo-400">
                                    <Upload className="w-7 h-7" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-bold text-zinc-100">
                                        Klik untuk upload gambar sertifikat
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        PNG, JPG, WebP, SVG atau PDF — Maks. 10MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleUpload}
                />

                {/* Direct URL entry fallback */}
                <div className="pt-1">
                    <input
                        type="text"
                        className={inputCls}
                        value={currentImage}
                        onChange={(e) => onImageUploaded(e.target.value)}
                        placeholder="Atau masukkan path langsung (cth: /images/certificates/my-cert.png)"
                    />
                </div>

                {(error || formError) && (
                    <p className="text-rose-400 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{error || formError}</span>
                    </p>
                )}
            </div>
        );
    }

    return (
        <AdminLayout title="Skills & Sertifikasi">
            <Head title="Kelola Skills & Sertifikasi - Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* Header with Title & Quick Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                            <Award className="w-4 h-4" />
                            <span>Kredensial & Taksonomi Keahlian</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Skills & Sertifikasi
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400">
                            Kelola sertifikat terverifikasi, core tools & platforms, dan taksonomi keahlian portofolio.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/skills"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1a1d2e] hover:bg-[#22263d] text-zinc-200 text-xs font-medium border border-white/10 shadow-sm transition"
                        >
                            <span>Lihat Halaman Publik</span>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                    </div>
                </div>

                {/* Success Alert Banner */}
                {showSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between animate-in fade-in">
                        <div className="flex items-center gap-2.5 text-sm font-medium">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Tabs Navigation */}
                <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                    <button
                        onClick={() => setActiveTab('certifications')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                            activeTab === 'certifications'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-white hover:bg-[#23273e] border border-white/5'
                        }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Sertifikasi Profesional</span>
                        <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
                            {certifications.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('tools')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                            activeTab === 'tools'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-white hover:bg-[#23273e] border border-white/5'
                        }`}
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span>Core Tools & Platforms</span>
                        <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
                            {tools.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('competencies')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                            activeTab === 'competencies'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-white hover:bg-[#23273e] border border-white/5'
                        }`}
                    >
                        <Layers className="w-4 h-4" />
                        <span>Taksonomi & Kompetensi</span>
                        <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
                            {competencies.length}
                        </span>
                    </button>
                </div>

                {/* ══════════════════════════════════════════════════════════════ */}
                {/* TAB 1: CERTIFICATIONS                                         */}
                {/* ══════════════════════════════════════════════════════════════ */}
                {activeTab === 'certifications' && (
                    <div className="space-y-6">
                        {/* Section Action Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1a1d2e] border border-white/5">
                            <div className="space-y-0.5">
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>Daftar Sertifikat Terverifikasi</span>
                                </h2>
                                <p className="text-xs text-zinc-400">
                                    Kelola dokumen sertifikasi, gambar bukti kelulusan, dan credential ID.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsAddCertOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Sertifikat Baru</span>
                            </button>
                        </div>

                        {/* Certifications Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {certifications.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="rounded-xl border border-white/10 bg-[#1a1d2e] hover:border-white/20 transition-all flex flex-col overflow-hidden shadow-sm hover:shadow-md group"
                                >
                                    {/* Certificate Image Preview */}
                                    <div className="relative aspect-[16/10] w-full bg-[#0c0e17] overflow-hidden border-b border-white/5">
                                        {cert.image ? (
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-1">
                                                <ImageIcon className="w-8 h-8" />
                                                <span className="text-[11px]">Tanpa Berkas</span>
                                            </div>
                                        )}

                                        {/* Status badge */}
                                        <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-sm ${
                                            cert.is_active
                                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                                : 'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                                        }`}>
                                            {cert.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>

                                        {/* Year badge */}
                                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-zinc-300 text-[10px] font-mono border border-white/10">
                                            {cert.year || 'N/A'}
                                        </span>
                                    </div>

                                    {/* Certificate Info */}
                                    <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2.5">
                                                <div className="p-2 rounded-lg bg-[#0c0e17] border border-white/10 flex-shrink-0">
                                                    <TechIcon name={cert.icon} className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                                        {cert.title}
                                                    </h3>
                                                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                                                        {cert.issuer}
                                                    </p>
                                                </div>
                                            </div>

                                            {cert.cred_id && (
                                                <div className="p-2 rounded-lg bg-[#0c0e17] border border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                                                    <span className="text-zinc-500">ID:</span>
                                                    <span className="truncate text-zinc-300">{cert.cred_id}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Actions Footer */}
                                        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-mono text-zinc-500">
                                                Urutan: #{cert.order}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                {cert.image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewCertImage(cert.image)}
                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                                                        title="Lihat Pratinjau"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => openEditCert(cert)}
                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
                                                    title="Edit Sertifikat"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeletingCert(cert)}
                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                                    title="Hapus Sertifikat"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════════════ */}
                {/* TAB 2: CORE TOOLS & PLATFORMS                                 */}
                {/* ══════════════════════════════════════════════════════════════ */}
                {activeTab === 'tools' && (
                    <div className="space-y-6">
                        {/* Section Action Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1a1d2e] border border-white/5">
                            <div className="space-y-0.5">
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                                    <span>Core Tools & Platforms (Marquee Carousel)</span>
                                </h2>
                                <p className="text-xs text-zinc-400">
                                    Daftar alat analitis & platform yang berjalan pada animasi banner atas di halaman Skills.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsAddToolOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Core Tool</span>
                            </button>
                        </div>

                        {/* Tools Table / Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tools.map((tool) => (
                                <div
                                    key={tool.id}
                                    className="p-4 rounded-xl border border-white/10 bg-[#1a1d2e] hover:border-indigo-500/40 transition flex flex-col justify-between gap-3 shadow-sm group"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <div className="p-2.5 rounded-xl bg-[#0c0e17] border border-white/10 text-white group-hover:scale-110 transition-transform">
                                                <TechIcon name={tool.icon} className="w-5 h-5" />
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                                                tool.is_active
                                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                            }`}>
                                                {tool.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-white">
                                                {tool.name}
                                            </h3>
                                            <p className="text-xs text-zinc-400 truncate mt-0.5">
                                                {tool.category || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-zinc-500">
                                            Urutan: #{tool.order} • Icon: {tool.icon}
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openEditTool(tool)}
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
                                                title="Edit Tool"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingTool(tool)}
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                                title="Hapus Tool"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════════════ */}
                {/* TAB 3: CORE COMPETENCIES & TAXONOMY                           */}
                {/* ══════════════════════════════════════════════════════════════ */}
                {activeTab === 'competencies' && (
                    <div className="space-y-6">
                        {/* Section Action Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1a1d2e] border border-white/5">
                            <div className="space-y-0.5">
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-purple-400" />
                                    <span>Taksonomi Keahlian (Core Competencies)</span>
                                </h2>
                                <p className="text-xs text-zinc-400">
                                    Kelompok kategori keahlian (Hard Skills, Soft Skills, Languages, AI Pipelines) beserta daftar tag keahliannya.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsAddCompOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Kategori Kompetensi</span>
                            </button>
                        </div>

                        {/* Competencies Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {competencies.map((comp) => {
                                const matchedIcon = COMPETENCY_ICONS.find((i) => i.value === comp.icon);
                                const IconComponent = matchedIcon ? matchedIcon.icon : Layers;
                                const itemsArr = Array.isArray(comp.items)
                                    ? comp.items
                                    : (typeof comp.items === 'string' ? (()=>{ try { return JSON.parse(comp.items); } catch(e) { return []; } })() : []);

                                return (
                                    <div
                                        key={comp.id}
                                        className="p-5 rounded-xl border border-white/10 bg-[#1a1d2e] hover:border-white/20 transition flex flex-col justify-between gap-4 shadow-sm"
                                    >
                                        <div className="space-y-4">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-[#0c0e17] border border-white/10 text-indigo-400">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                                            {comp.name}
                                                        </h3>
                                                        <p className="text-xs text-zinc-400">
                                                            {comp.category || '-'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {comp.badge && (
                                                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${comp.badge_color || BADGE_COLOR_PRESETS[0].value}`}>
                                                        {comp.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Skills Tag Pills */}
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {itemsArr.length > 0 ? (
                                                    itemsArr.map((item, iIdx) => (
                                                        <span
                                                            key={iIdx}
                                                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#0c0e17] text-zinc-300 border border-white/10"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-zinc-500 italic">
                                                        Belum ada keahlian ditambahkan
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer */}
                                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-zinc-500">
                                                Urutan: #{comp.order} • {itemsArr.length} Keahlian
                                            </span>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditComp(comp)}
                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
                                                    title="Edit Kategori"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeletingComp(comp)}
                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                                    title="Hapus Kategori"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: TAMBAH SERTIFIKAT                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {isAddCertOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-xl bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Award className="w-4 h-4 text-indigo-400" />
                                <span>Tambah Sertifikasi Baru</span>
                            </h3>
                            <button
                                onClick={() => setIsAddCertOpen(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateCert} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Judul Sertifikat *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={addCertForm.data.title}
                                    onChange={(e) => addCertForm.setData('title', e.target.value)}
                                    placeholder="Contoh: Google Data Analytics Professional"
                                    required
                                />
                                {addCertForm.errors.title && <p className="text-rose-400 text-xs mt-1">{addCertForm.errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Organisasi Penerbit *</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={addCertForm.data.issuer}
                                        onChange={(e) => addCertForm.setData('issuer', e.target.value)}
                                        placeholder="Contoh: Google, Microsoft, Meta"
                                        required
                                    />
                                    {addCertForm.errors.issuer && <p className="text-rose-400 text-xs mt-1">{addCertForm.errors.issuer}</p>}
                                </div>

                                <div>
                                    <label className={labelCls}>Tahun Terbit</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={addCertForm.data.year}
                                        onChange={(e) => addCertForm.setData('year', e.target.value)}
                                        placeholder="Contoh: 2026"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Provider Icon</label>
                                    <select
                                        className={inputCls}
                                        value={addCertForm.data.icon}
                                        onChange={(e) => addCertForm.setData('icon', e.target.value)}
                                    >
                                        {TECH_ICON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Credential ID / Nomor Sertifikat</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={addCertForm.data.cred_id}
                                        onChange={(e) => addCertForm.setData('cred_id', e.target.value)}
                                        placeholder="Contoh: GDA-2026-984210"
                                    />
                                </div>
                            </div>

                            {/* Certificate Upload Dropzone */}
                            <CertificateUploader
                                currentImage={addCertForm.data.image}
                                onImageUploaded={(url) => addCertForm.setData('image', url)}
                                formError={addCertForm.errors.image}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={addCertForm.data.order}
                                        onChange={(e) => addCertForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>

                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                            checked={addCertForm.data.is_active}
                                            onChange={(e) => addCertForm.setData('is_active', e.target.checked)}
                                        />
                                        <span className="text-xs font-semibold text-zinc-200">
                                            Tampilkan di Portofolio (Aktif)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddCertOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addCertForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {addCertForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Simpan Sertifikat</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: EDIT SERTIFIKAT                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {editingCert && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-xl bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Pencil className="w-4 h-4 text-indigo-400" />
                                <span>Edit Sertifikasi</span>
                            </h3>
                            <button
                                onClick={() => setEditingCert(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateCert} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Judul Sertifikat *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={editCertForm.data.title}
                                    onChange={(e) => editCertForm.setData('title', e.target.value)}
                                    required
                                />
                                {editCertForm.errors.title && <p className="text-rose-400 text-xs mt-1">{editCertForm.errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Organisasi Penerbit *</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={editCertForm.data.issuer}
                                        onChange={(e) => editCertForm.setData('issuer', e.target.value)}
                                        required
                                    />
                                    {editCertForm.errors.issuer && <p className="text-rose-400 text-xs mt-1">{editCertForm.errors.issuer}</p>}
                                </div>

                                <div>
                                    <label className={labelCls}>Tahun Terbit</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={editCertForm.data.year}
                                        onChange={(e) => editCertForm.setData('year', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Provider Icon</label>
                                    <select
                                        className={inputCls}
                                        value={editCertForm.data.icon}
                                        onChange={(e) => editCertForm.setData('icon', e.target.value)}
                                    >
                                        {TECH_ICON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Credential ID / Nomor Sertifikat</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={editCertForm.data.cred_id}
                                        onChange={(e) => editCertForm.setData('cred_id', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Certificate Upload Dropzone */}
                            <CertificateUploader
                                currentImage={editCertForm.data.image}
                                onImageUploaded={(url) => editCertForm.setData('image', url)}
                                formError={editCertForm.errors.image}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={editCertForm.data.order}
                                        onChange={(e) => editCertForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>

                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                            checked={editCertForm.data.is_active}
                                            onChange={(e) => editCertForm.setData('is_active', e.target.checked)}
                                        />
                                        <span className="text-xs font-semibold text-zinc-200">
                                            Tampilkan di Portofolio (Aktif)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingCert(null)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editCertForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {editCertForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Perbarui Sertifikat</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: TAMBAH CORE TOOL                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {isAddToolOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-lg bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-indigo-400" />
                                <span>Tambah Core Tool & Platform</span>
                            </h3>
                            <button
                                onClick={() => setIsAddToolOpen(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTool} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Nama Tool / Platform *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={addToolForm.data.name}
                                    onChange={(e) => addToolForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Python (Pandas), Tableau, SQL & DBMS"
                                    required
                                />
                                {addToolForm.errors.name && <p className="text-rose-400 text-xs mt-1">{addToolForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelCls}>Kategori / Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={addToolForm.data.category}
                                    onChange={(e) => addToolForm.setData('category', e.target.value)}
                                    placeholder="Contoh: Data Analysis & Manipulation"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Icon Tool</label>
                                    <select
                                        className={inputCls}
                                        value={addToolForm.data.icon}
                                        onChange={(e) => addToolForm.setData('icon', e.target.value)}
                                    >
                                        {TECH_ICON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={addToolForm.data.order}
                                        onChange={(e) => addToolForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                        checked={addToolForm.data.is_active}
                                        onChange={(e) => addToolForm.setData('is_active', e.target.checked)}
                                    />
                                    <span className="text-xs font-semibold text-zinc-200">
                                        Tampilkan di Banner Marquee (Aktif)
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddToolOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addToolForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {addToolForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Simpan Tool</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: EDIT CORE TOOL                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {editingTool && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-lg bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Pencil className="w-4 h-4 text-indigo-400" />
                                <span>Edit Core Tool</span>
                            </h3>
                            <button
                                onClick={() => setEditingTool(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateTool} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Nama Tool / Platform *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={editToolForm.data.name}
                                    onChange={(e) => editToolForm.setData('name', e.target.value)}
                                    required
                                />
                                {editToolForm.errors.name && <p className="text-rose-400 text-xs mt-1">{editToolForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelCls}>Kategori / Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={editToolForm.data.category}
                                    onChange={(e) => editToolForm.setData('category', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Icon Tool</label>
                                    <select
                                        className={inputCls}
                                        value={editToolForm.data.icon}
                                        onChange={(e) => editToolForm.setData('icon', e.target.value)}
                                    >
                                        {TECH_ICON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={editToolForm.data.order}
                                        onChange={(e) => editToolForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                        checked={editToolForm.data.is_active}
                                        onChange={(e) => editToolForm.setData('is_active', e.target.checked)}
                                    />
                                    <span className="text-xs font-semibold text-zinc-200">
                                        Tampilkan di Banner Marquee (Aktif)
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingTool(null)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editToolForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {editToolForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Perbarui Tool</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: TAMBAH KOMPETENSI                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {isAddCompOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-xl bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Layers className="w-4 h-4 text-purple-400" />
                                <span>Tambah Kategori Kompetensi</span>
                            </h3>
                            <button
                                onClick={() => setIsAddCompOpen(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateComp} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Nama Kategori *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={addCompForm.data.name}
                                    onChange={(e) => addCompForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Hard Skills, Soft Skills, Languages"
                                    required
                                />
                                {addCompForm.errors.name && <p className="text-rose-400 text-xs mt-1">{addCompForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelCls}>Subtitle / Deskripsi</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={addCompForm.data.category}
                                    onChange={(e) => addCompForm.setData('category', e.target.value)}
                                    placeholder="Contoh: Technical Analytical Toolsets"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Icon Kategori</label>
                                    <select
                                        className={inputCls}
                                        value={addCompForm.data.icon}
                                        onChange={(e) => addCompForm.setData('icon', e.target.value)}
                                    >
                                        {COMPETENCY_ICONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Teks Badge</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={addCompForm.data.badge}
                                        onChange={(e) => addCompForm.setData('badge', e.target.value)}
                                        placeholder="Contoh: Technical, Interpersonal, Fluency"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>Warna Tema Badge</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {BADGE_COLOR_PRESETS.map((p) => (
                                        <button
                                            key={p.name}
                                            type="button"
                                            onClick={() => addCompForm.setData('badge_color', p.value)}
                                            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition flex items-center justify-between ${
                                                addCompForm.data.badge_color === p.value
                                                    ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                                                    : 'border-white/10 bg-[#0c0e17] text-zinc-400 hover:bg-white/5'
                                            }`}
                                        >
                                            <span className="truncate">{p.name.split(' ')[0]}</span>
                                            <span className={`w-3 h-3 rounded-full border ${p.preview.split(' ')[0]}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>Daftar Keahlian (1 keahlian per baris) *</label>
                                <textarea
                                    rows={5}
                                    className={inputCls}
                                    value={addCompForm.data.items}
                                    onChange={(e) => addCompForm.setData('items', e.target.value)}
                                    placeholder={`Data Analysis\nQuerying & DBMS\nStatistical Analysis\nData Visualization`}
                                    required
                                />
                                <p className="text-[11px] text-zinc-500 mt-1">
                                    Tuliskan setiap skill pada baris baru (tekan Enter untuk memisahkan).
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={addCompForm.data.order}
                                        onChange={(e) => addCompForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>

                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                            checked={addCompForm.data.is_active}
                                            onChange={(e) => addCompForm.setData('is_active', e.target.checked)}
                                        />
                                        <span className="text-xs font-semibold text-zinc-200">
                                            Tampilkan di Portofolio (Aktif)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddCompOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addCompForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {addCompForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Simpan Kategori</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MODAL: EDIT KOMPETENSI                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {editingComp && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative w-full max-w-xl bg-[#13151f] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1a1d2e]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Pencil className="w-4 h-4 text-indigo-400" />
                                <span>Edit Kategori Kompetensi</span>
                            </h3>
                            <button
                                onClick={() => setEditingComp(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateComp} className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className={labelCls}>Nama Kategori *</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={editCompForm.data.name}
                                    onChange={(e) => editCompForm.setData('name', e.target.value)}
                                    required
                                />
                                {editCompForm.errors.name && <p className="text-rose-400 text-xs mt-1">{editCompForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelCls}>Subtitle / Deskripsi</label>
                                <input
                                    type="text"
                                    className={inputCls}
                                    value={editCompForm.data.category}
                                    onChange={(e) => editCompForm.setData('category', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Icon Kategori</label>
                                    <select
                                        className={inputCls}
                                        value={editCompForm.data.icon}
                                        onChange={(e) => editCompForm.setData('icon', e.target.value)}
                                    >
                                        {COMPETENCY_ICONS.map((opt) => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0c0e17] text-white">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelCls}>Teks Badge</label>
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={editCompForm.data.badge}
                                        onChange={(e) => editCompForm.setData('badge', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>Warna Tema Badge</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {BADGE_COLOR_PRESETS.map((p) => (
                                        <button
                                            key={p.name}
                                            type="button"
                                            onClick={() => editCompForm.setData('badge_color', p.value)}
                                            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition flex items-center justify-between ${
                                                editCompForm.data.badge_color === p.value
                                                    ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                                                    : 'border-white/10 bg-[#0c0e17] text-zinc-400 hover:bg-white/5'
                                            }`}
                                        >
                                            <span className="truncate">{p.name.split(' ')[0]}</span>
                                            <span className={`w-3 h-3 rounded-full border ${p.preview.split(' ')[0]}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>Daftar Keahlian (1 keahlian per baris) *</label>
                                <textarea
                                    rows={5}
                                    className={inputCls}
                                    value={editCompForm.data.items}
                                    onChange={(e) => editCompForm.setData('items', e.target.value)}
                                    required
                                />
                                <p className="text-[11px] text-zinc-500 mt-1">
                                    Tuliskan setiap skill pada baris baru (tekan Enter untuk memisahkan).
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className={labelCls}>Urutan Tampilan</label>
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={editCompForm.data.order}
                                        onChange={(e) => editCompForm.setData('order', e.target.value)}
                                        min="1"
                                    />
                                </div>

                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded bg-[#0c0e17] border-white/20 text-indigo-600 focus:ring-indigo-500"
                                            checked={editCompForm.data.is_active}
                                            onChange={(e) => editCompForm.setData('is_active', e.target.checked)}
                                        />
                                        <span className="text-xs font-semibold text-zinc-200">
                                            Tampilkan di Portofolio (Aktif)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingComp(null)}
                                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editCompForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                                >
                                    {editCompForm.processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <span>Perbarui Kategori</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* DIALOG KONFIRMASI HAPUS SERTIFIKAT                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {deletingCert && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md bg-[#13151f] rounded-2xl border border-white/15 p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3 text-rose-400">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">Hapus Sertifikat?</h3>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            Apakah Anda yakin ingin menghapus sertifikat <strong className="text-white font-semibold">"{deletingCert.title}"</strong> ({deletingCert.issuer})? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingCert(null)}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteCert}
                                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
                            >
                                Ya, Hapus Sertifikat
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* DIALOG KONFIRMASI HAPUS TOOL                                   */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {deletingTool && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md bg-[#13151f] rounded-2xl border border-white/15 p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3 text-rose-400">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">Hapus Core Tool?</h3>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            Apakah Anda yakin ingin menghapus tool <strong className="text-white font-semibold">"{deletingTool.name}"</strong>?
                        </p>
                        <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingTool(null)}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteTool}
                                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
                            >
                                Ya, Hapus Tool
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* DIALOG KONFIRMASI HAPUS KOMPETENSI                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {deletingComp && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md bg-[#13151f] rounded-2xl border border-white/15 p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3 text-rose-400">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-white">Hapus Kategori Kompetensi?</h3>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            Apakah Anda yakin ingin menghapus kategori <strong className="text-white font-semibold">"{deletingComp.name}"</strong> beserta seluruh daftar keahlian di dalamnya?
                        </p>
                        <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingComp(null)}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteComp}
                                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
                            >
                                Ya, Hapus Kategori
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* LIGHTBOX PREVIEW MODAL                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {previewCertImage && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
                    onClick={() => setPreviewCertImage(null)}
                >
                    <div
                        className="relative max-w-3xl w-full bg-[#13151f] rounded-2xl border border-white/20 p-4 shadow-2xl flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-300 font-mono">
                                Pratinjau Sertifikat
                            </span>
                            <button
                                onClick={() => setPreviewCertImage(null)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
                            <img
                                src={previewCertImage}
                                alt="Sertifikat"
                                className="w-full h-auto max-h-[75vh] object-contain"
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </AdminLayout>
    );
}
