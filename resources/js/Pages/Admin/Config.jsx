import { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import TechIcon from '@/Components/TechIcon';
import { getAvatarStyle } from '@/Utils/avatarHelper';
import { 
    User, 
    Share2, 
    Sparkles, 
    Save, 
    ExternalLink, 
    CheckCircle2, 
    ShieldCheck, 
    Mail, 
    Phone,
    Upload,
    Image as ImageIcon,
    MapPin,
    Eye,
    RotateCcw,
    Sliders,
    ZoomIn,
    Move,
    Sun,
    Contrast,
    Palette
} from 'lucide-react';

export default function Config({ settings = {}, status }) {
    const [activeTab, setActiveTab] = useState('profile_preview');
    const [avatarPreview, setAvatarPreview] = useState(settings.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop');
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        // Profile & Avatar
        avatar_url: settings.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        avatar_file: null,
        avatar_filter: settings.avatar_filter || 'none',
        avatar_zoom: settings.avatar_zoom ? Number(settings.avatar_zoom) : 100,
        avatar_pos_x: settings.avatar_pos_x !== undefined && settings.avatar_pos_x !== '' ? Number(settings.avatar_pos_x) : 50,
        avatar_pos_y: settings.avatar_pos_y !== undefined && settings.avatar_pos_y !== '' ? Number(settings.avatar_pos_y) : 50,
        avatar_brightness: settings.avatar_brightness ? Number(settings.avatar_brightness) : 100,
        avatar_contrast: settings.avatar_contrast ? Number(settings.avatar_contrast) : 100,

        full_name: settings.full_name || 'Muhammad Rafli Pradipta',
        job_title: settings.job_title || 'Data Analyst & Information Technology Education Graduate',
        status_badge: settings.status_badge || 'Available for Opportunities',
        location: settings.location || 'Malang, East Java, Indonesia',
        summary_title: settings.summary_title || 'PROFILE SUMMARY',
        bio_summary: settings.bio_summary || 'Detail-oriented Data Analyst and Information Technology Education graduate (GPA 3.75/4.00) with strong expertise in end-to-end data processing, exploratory analysis, and data visualization. Proficient in Python (Pandas), SQL, and Microsoft Excel to clean complex datasets, query relational databases, and extract actionable business insights. Skilled in leveraging modern AI analytics workflows to optimize data processing pipelines and streamline reporting. Adept at translating complex data findings into data-backed strategic recommendations and communicating effectively with technical and non-technical stakeholders.',
        
        // Education
        gpa: settings.gpa || '3.75 / 4.00',
        university: settings.university || 'Universitas Brawijaya',
        faculty: settings.faculty || "Faculty of Computer Science · Bachelor's in IT Education",

        // Contact & Socials
        whatsapp_number: settings.whatsapp_number || '+62 877 7375 9636',
        whatsapp_url: settings.whatsapp_url || 'https://wa.me/qr/OR62X7KAFNBEF1',
        email: settings.email || 'raflipradipta321@gmail.com',
        linkedin_username: settings.linkedin_username || 'muhammad-rafli-pradipta',
        linkedin_url: settings.linkedin_url || 'https://www.linkedin.com/in/muhammad-rafli-pradipta-45b165288/',
        instagram_username: settings.instagram_username || '@rrafli.pd',
        instagram_url: settings.instagram_url || 'https://www.instagram.com/rrafli.pd?igsi=MXJrZTJzeTZpeWRiMQ==',
        canva_label: settings.canva_label || 'Canva Portfolio',
        canva_url: settings.canva_url || 'https://portoraflipradipta.my.canva.site/',

        // Display & Cursor
        enable_neon_cursor: settings.enable_neon_cursor === '1' || settings.enable_neon_cursor === true || settings.enable_neon_cursor === undefined,
        neon_cursor_color: settings.neon_cursor_color || 'magenta',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar_file', file);
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleUrlChange = (url) => {
        setData('avatar_url', url);
        setData('avatar_file', null);
        setAvatarPreview(url);
    };

    const resetToDefaultAvatar = () => {
        const defaultUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop';
        setData('avatar_url', defaultUrl);
        setData('avatar_file', null);
        setAvatarPreview(defaultUrl);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.config.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const tabs = [
        { 
            id: 'profile_preview', 
            label: 'Header, Bio & Kontak', 
            icon: User, 
            desc: 'Foto profil, nama, kontak, dan ringkasan bio' 
        },
        { 
            id: 'display', 
            label: 'Tampilan & Neon Cursor', 
            icon: Sparkles, 
            desc: 'Pengaturan efek kursor dan tema visual' 
        },
    ];

    const neonColors = [
        { id: 'magenta', label: 'Neon Rose / Magenta', hex: '#f43f5e', border: 'border-rose-500' },
        { id: 'cyan', label: 'Electric Cyan / Blue', hex: '#00f0ff', border: 'border-cyan-400' },
        { id: 'violet', label: 'Neon Violet / Purple', hex: '#a855f7', border: 'border-purple-500' },
        { id: 'emerald', label: 'Cyber Emerald / Green', hex: '#10b981', border: 'border-emerald-500' },
    ];

    return (
        <AdminLayout title="Pengaturan Profil">
            <Head title="Pengaturan Profil - Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* ── Page Header ─────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Pengaturan Profil Portofolio
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                            Ubah data profil, foto, tautan kontak, dan ringkasan portofolio secara dinamis.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium border border-white/10 transition"
                        >
                            <span>Buka Website</span>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                    </div>
                </div>

                {/* ── Flash Success Notification ───────────────────────── */}
                {(status || recentlySuccessful) && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-3 text-sm animate-fadeIn">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-emerald-200">
                                    Konfigurasi Berhasil Disimpan!
                                </p>
                                <p className="text-[11px] sm:text-xs text-emerald-300/80">
                                    {status || 'Semua perubahan konten dan foto portofolio telah aktif diperbarui.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Form Container ──────────────────────────────────── */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Navigation Tabs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 shadow-sm ${
                                        isActive
                                            ? 'border-indigo-500/80 bg-indigo-500/10 ring-1 ring-indigo-500/30 text-white'
                                            : 'border-white/5 bg-[#1a1d2e]/80 hover:bg-[#1a1d2e] text-zinc-400 hover:text-zinc-200'
                                    }`}
                                >
                                    <div className={`p-2.5 rounded-xl shrink-0 ${
                                        isActive 
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                                            : 'bg-white/5 text-zinc-400'
                                    }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                                            {tab.label}
                                        </span>
                                        <span className="block text-[11px] text-zinc-500 mt-0.5 leading-relaxed truncate">
                                            {tab.desc}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* ═══════════════════════════════════════════════════════
                        TAB 1: HEADER, BIO & KONTAK (WITH LIVE PREVIEW)
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === 'profile_preview' && (
                        <div className="space-y-6">
                            {/* ── LIVE PREVIEW BOX (MIMICS WEBSITE HEADER) ── */}
                            <div className="rounded-2xl bg-[#090a0f] border border-white/10 p-5 sm:p-7 shadow-2xl space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-indigo-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                                            Live Preview Tampilan Website
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        ● Real-time Preview
                                    </span>
                                </div>

                                {/* Preview Header: Circular Photo + Name + Headline + Location */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700 shadow-xl shrink-0">
                                        <img
                                            src={avatarPreview}
                                            alt={data.full_name || 'Profile Avatar'}
                                            className="w-full h-full"
                                            style={getAvatarStyle(data)}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.full_name || 'RP')}`;
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                                            {data.full_name || 'MUHAMMAD RAFLI PRADIPTA'}
                                        </h2>
                                        <p className="text-xs sm:text-sm font-medium text-zinc-400">
                                            {data.job_title || 'Data Analyst & Information Technology Education Graduate'}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-0.5">
                                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                            <span>{data.location || 'Malang, East Java, Indonesia'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Contact Badges Row */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {/* WhatsApp */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300">
                                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>WhatsApp</span>
                                    </span>

                                    {/* Email */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300">
                                        <Mail className="w-3.5 h-3.5 text-rose-400" />
                                        <span>Email</span>
                                    </span>

                                    {/* LinkedIn */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300">
                                        <TechIcon name="linkedin" className="w-3.5 h-3.5 text-blue-400" />
                                        <span>LinkedIn</span>
                                    </span>

                                    {/* Instagram */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300">
                                        <TechIcon name="instagram" className="w-3.5 h-3.5 text-pink-400" />
                                        <span>Instagram</span>
                                    </span>

                                    {/* Canva */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300">
                                        <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                                        <span>{data.canva_label || 'Canva Portfolio'}</span>
                                    </span>
                                </div>

                                {/* Preview Profile Summary Section */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{data.summary_title || 'PROFILE SUMMARY'}</span>
                                    </div>
                                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                                        {data.bio_summary || 'Tuliskan deskripsi ringkasan profil Anda...'}
                                    </div>
                                </div>
                            </div>

                            {/* ── SETTINGS INPUTS: FOTO PROFIL & BIODATA ── */}
                            <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-xl space-y-6">
                                <div className="border-b border-white/5 pb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-base font-bold text-white">
                                            1. Foto Profil (Avatar) & Pengaturan Filter
                                        </h2>
                                        <p className="text-xs text-zinc-400 mt-0.5">
                                            Atur foto profil bulat, filter warna, zoom, dan posisi agar pas di dalam lingkaran.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    {/* Avatar preview circle */}
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 border-2 border-indigo-500/40 shadow-xl">
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar Preview"
                                                className="w-full h-full"
                                                style={getAvatarStyle(data)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={resetToDefaultAvatar}
                                            className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            <span>Reset Foto</span>
                                        </button>
                                    </div>

                                    {/* Upload and URL input */}
                                    <div className="flex-1 w-full space-y-4">
                                        {/* File Upload option */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                                                <span>Unggah Foto dari Komputer / Laptop</span>
                                            </label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer bg-[#0f1117] border border-white/10 rounded-xl p-1"
                                            />
                                            <p className="text-[10px] text-zinc-500">
                                                Format: JPG, PNG, WEBP. Maksimal 5 MB.
                                            </p>
                                        </div>

                                        {/* URL option */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                                                <span>Atau Gunakan Tautan URL Gambar Online</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.avatar_url}
                                                onChange={(e) => handleUrlChange(e.target.value)}
                                                placeholder="https://images.unsplash.com/... atau URL gambar"
                                                className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ── PENGATURAN FILTER & ADJUSTMENT FOTO ── */}
                                <div className="pt-4 border-t border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Sliders className="w-4 h-4 text-indigo-400" />
                                            <h3 className="text-xs sm:text-sm font-semibold text-white">
                                                Penyesuaian Tampilan Foto (Adjust & Filters)
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    avatar_filter: 'none',
                                                    avatar_zoom: 100,
                                                    avatar_pos_x: 50,
                                                    avatar_pos_y: 50,
                                                    avatar_brightness: 100,
                                                    avatar_contrast: 100,
                                                }));
                                            }}
                                            className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            <span>Kembalikan Pengaturan Foto</span>
                                        </button>
                                    </div>

                                    {/* 1. Filter Selection Buttons */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                            <Palette className="w-3.5 h-3.5 text-pink-400" />
                                            <span>Pilihan Efek Filter Warna</span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                            {[
                                                { id: 'none', label: 'Warna Asli (Tanpa Filter)', desc: 'Natural & jernih' },
                                                { id: 'grayscale', label: 'Hitam & Putih', desc: 'Monokrom halus' },
                                                { id: 'contrast', label: 'Hitam & Putih Kontras', desc: 'Gaya bold & tajam' },
                                                { id: 'warm', label: 'Nuansa Hangat (Warm)', desc: 'Vintage estetik' },
                                            ].map((filterOption) => {
                                                const isSelected = (data.avatar_filter || 'none') === filterOption.id;
                                                return (
                                                    <button
                                                        key={filterOption.id}
                                                        type="button"
                                                        onClick={() => setData('avatar_filter', filterOption.id)}
                                                        className={`p-3 rounded-xl border text-left transition ${
                                                            isSelected
                                                                ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                                                                : 'border-white/5 bg-[#0f1117] text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                                                        }`}
                                                    >
                                                        <span className="block text-xs font-semibold truncate">
                                                            {filterOption.label}
                                                        </span>
                                                        <span className="block text-[10px] text-zinc-500 mt-0.5 truncate">
                                                            {filterOption.desc}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* 2. Adjustment Sliders (Zoom, Pos Y, Pos X) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                        {/* Zoom / Scale */}
                                        <div className="p-3.5 rounded-xl bg-[#0f1117] border border-white/5 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                    <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                                                    <span>Zoom Foto</span>
                                                </label>
                                                <span className="text-xs font-mono font-bold text-indigo-400">
                                                    {data.avatar_zoom}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="100"
                                                max="200"
                                                step="5"
                                                value={data.avatar_zoom}
                                                onChange={(e) => setData('avatar_zoom', Number(e.target.value))}
                                                className="w-full accent-indigo-500 cursor-pointer"
                                            />
                                            <div className="flex justify-between text-[10px] text-zinc-500">
                                                <span>Normal (100%)</span>
                                                <span>Dekat (200%)</span>
                                            </div>
                                        </div>

                                        {/* Posisi Vertikal (Atas/Bawah) */}
                                        <div className="p-3.5 rounded-xl bg-[#0f1117] border border-white/5 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                    <Move className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>Posisi Vertikal (Y)</span>
                                                </label>
                                                <span className="text-xs font-mono font-bold text-emerald-400">
                                                    {data.avatar_pos_y}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={data.avatar_pos_y}
                                                onChange={(e) => setData('avatar_pos_y', Number(e.target.value))}
                                                className="w-full accent-emerald-500 cursor-pointer"
                                            />
                                            <div className="flex justify-between text-[10px] text-zinc-500">
                                                <span>Atas (0%)</span>
                                                <span>Tengah</span>
                                                <span>Bawah (100%)</span>
                                            </div>
                                        </div>

                                        {/* Posisi Horizontal (Kiri/Kanan) */}
                                        <div className="p-3.5 rounded-xl bg-[#0f1117] border border-white/5 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                    <Move className="w-3.5 h-3.5 text-blue-400" />
                                                    <span>Posisi Horizontal (X)</span>
                                                </label>
                                                <span className="text-xs font-mono font-bold text-blue-400">
                                                    {data.avatar_pos_x}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={data.avatar_pos_x}
                                                onChange={(e) => setData('avatar_pos_x', Number(e.target.value))}
                                                className="w-full accent-blue-500 cursor-pointer"
                                            />
                                            <div className="flex justify-between text-[10px] text-zinc-500">
                                                <span>Kiri (0%)</span>
                                                <span>Tengah</span>
                                                <span>Kanan (100%)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Kecerahan & Kontras */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                        {/* Kecerahan */}
                                        <div className="p-3.5 rounded-xl bg-[#0f1117] border border-white/5 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                                                    <span>Kecerahan (Brightness)</span>
                                                </label>
                                                <span className="text-xs font-mono font-bold text-amber-400">
                                                    {data.avatar_brightness}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="70"
                                                max="130"
                                                step="2"
                                                value={data.avatar_brightness}
                                                onChange={(e) => setData('avatar_brightness', Number(e.target.value))}
                                                className="w-full accent-amber-500 cursor-pointer"
                                            />
                                        </div>

                                        {/* Kontras */}
                                        <div className="p-3.5 rounded-xl bg-[#0f1117] border border-white/5 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                                    <Contrast className="w-3.5 h-3.5 text-violet-400" />
                                                    <span>Kontras (Contrast)</span>
                                                </label>
                                                <span className="text-xs font-mono font-bold text-violet-400">
                                                    {data.avatar_contrast}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="70"
                                                max="130"
                                                step="2"
                                                value={data.avatar_contrast}
                                                onChange={(e) => setData('avatar_contrast', Number(e.target.value))}
                                                className="w-full accent-violet-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── SETTINGS INPUTS: BIODATA & RINGKASAN ── */}
                            <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-xl space-y-6">
                                <div className="border-b border-white/5 pb-4">
                                    <h2 className="text-base font-bold text-white">
                                        2. Biodata & Teks Utama
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Nama lengkap, gelar profesi, lokasi, dan judul ringkasan.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-300">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            placeholder="Muhammad Rafli Pradipta"
                                            className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-300">
                                            Gelar / Headline Profesi
                                        </label>
                                        <input
                                            type="text"
                                            value={data.job_title}
                                            onChange={(e) => setData('job_title', e.target.value)}
                                            placeholder="Data Analyst & Information Technology Education Graduate"
                                            className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-300">
                                            Lokasi Domisili
                                        </label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Malang, East Java, Indonesia"
                                            className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-300">
                                            Judul Bagian Ringkasan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.summary_title}
                                            onChange={(e) => setData('summary_title', e.target.value)}
                                            placeholder="PROFILE SUMMARY"
                                            className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition uppercase"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Isi Ringkasan Profil (Profile Summary)
                                    </label>
                                    <textarea
                                        rows="6"
                                        value={data.bio_summary}
                                        onChange={(e) => setData('bio_summary', e.target.value)}
                                        placeholder="Tuliskan ringkasan profesional mengenai keahlian Anda..."
                                        className="w-full p-3.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white leading-relaxed placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* ── SETTINGS INPUTS: 5 TOMBOL KONTAK & SOSMED ── */}
                            <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-xl space-y-6">
                                <div className="border-b border-white/5 pb-4">
                                    <h2 className="text-base font-bold text-white">
                                        3. Tombol Kontak & Tautan Media Sosial
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Kelola 5 tombol kontak yang berada tepat di bawah nama Anda.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* 1. WhatsApp */}
                                    <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span>WhatsApp: Nomor Tampilan</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.whatsapp_number}
                                                onChange={(e) => setData('whatsapp_number', e.target.value)}
                                                placeholder="+62 877 7375 9636"
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-400">Tautan Chat (wa.me)</label>
                                            <input
                                                type="text"
                                                value={data.whatsapp_url}
                                                onChange={(e) => setData('whatsapp_url', e.target.value)}
                                                placeholder="https://wa.me/qr/..."
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Email */}
                                    <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 space-y-1.5">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>Email Utama</span>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="raflipradipta321@gmail.com"
                                            className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* 3. LinkedIn */}
                                    <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                                                <TechIcon name="linkedin" className="w-3.5 h-3.5" />
                                                <span>LinkedIn: Username / ID</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.linkedin_username}
                                                onChange={(e) => setData('linkedin_username', e.target.value)}
                                                placeholder="muhammad-rafli-pradipta"
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-400">Tautan Profil LinkedIn</label>
                                            <input
                                                type="text"
                                                value={data.linkedin_url}
                                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                                placeholder="https://www.linkedin.com/in/..."
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* 4. Instagram */}
                                    <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-pink-400">
                                                <TechIcon name="instagram" className="w-3.5 h-3.5" />
                                                <span>Instagram: Username</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.instagram_username}
                                                onChange={(e) => setData('instagram_username', e.target.value)}
                                                placeholder="@rrafli.pd"
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-400">Tautan Profil Instagram</label>
                                            <input
                                                type="text"
                                                value={data.instagram_url}
                                                onChange={(e) => setData('instagram_url', e.target.value)}
                                                placeholder="https://www.instagram.com/..."
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* 5. Canva Portfolio */}
                                    <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                <span>Canva: Label Tombol</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.canva_label}
                                                onChange={(e) => setData('canva_label', e.target.value)}
                                                placeholder="Canva Portfolio"
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-400">Tautan Website Canva</label>
                                            <input
                                                type="text"
                                                value={data.canva_url}
                                                onChange={(e) => setData('canva_url', e.target.value)}
                                                placeholder="https://portoraflipradipta.my.canva.site/"
                                                className="w-full px-3.5 py-2 text-xs bg-[#1a1d2e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 2: DISPLAY & NEON CURSOR
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === 'display' && (
                        <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-xl space-y-6">
                            <div className="border-b border-white/5 pb-4">
                                <h2 className="text-base font-bold text-white">
                                    Pengaturan Efek Visual & Neon Cursor
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Atur perilaku efek visual kursor neon di layar komputer pengunjung.
                                </p>
                            </div>

                            {/* Toggle Neon Cursor */}
                            <div className="p-5 rounded-xl border border-white/10 bg-[#0f1117] flex items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-semibold text-white">
                                            Aktifkan Efek Kursor Pita Neon (WebGL)
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                                        Menampilkan jejak pita cahaya neon halus yang cepat menghilang saat mouse bergerak di layar pengunjung.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={data.enable_neon_cursor}
                                        onChange={(e) => setData('enable_neon_cursor', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-zinc-600 peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>

                            {/* Color Selector */}
                            <div className="space-y-3 pt-2">
                                <label className="block text-xs font-semibold text-zinc-200">
                                    Pilihan Nuansa Warna Neon
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {neonColors.map((color) => {
                                        const isSelected = data.neon_cursor_color === color.id;
                                        return (
                                            <button
                                                key={color.id}
                                                type="button"
                                                onClick={() => setData('neon_cursor_color', color.id)}
                                                className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                                                    isSelected
                                                        ? `${color.border} ring-2 ring-indigo-500/30 bg-indigo-500/10 shadow-md`
                                                        : 'border-white/5 bg-[#0f1117] hover:bg-white/5'
                                                }`}
                                            >
                                                <span
                                                    className="w-4 h-4 rounded-full shadow-sm shrink-0"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                                <span className="text-xs font-medium text-zinc-200">
                                                    {color.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Bottom Sticky Action Bar ─────────────────────────── */}
                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#1a1d2e]/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Perubahan akan langsung aktif di seluruh halaman website.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition transform active:scale-95"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Semua Konfigurasi'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
