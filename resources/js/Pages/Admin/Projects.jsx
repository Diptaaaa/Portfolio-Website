import { useState, useRef, useMemo, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    FolderGit2,
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
    Link as LinkIcon,
    Loader2,
    Sparkles,
} from 'lucide-react';

const CATEGORIES = [
    { value: 'data',    label: 'Data Analytics' },
    { value: 'edtech',  label: 'EdTech & Digital Systems' },
    { value: 'web',     label: 'Web Development' },
    { value: 'design',  label: 'Design' },
    { value: 'general', label: 'General' },
];

/* ── Interactive Image Gallery Manager ───────────────────────── */
function ProjectGalleryManager({ images = [], onChange }) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [showUrlAdd, setShowUrlAdd] = useState(false);
    const [urlInput, setUrlInput] = useState({ src: '', alt: '', caption: '' });
    const fileInputRef = useRef(null);

    const handleFilesSelected = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        setUploadError('');

        const newImages = [...images];
        let errorCount = 0;

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await window.axios.post(route('admin.projects.upload-image'), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (res.data?.success) {
                    const fallbackAlt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                    newImages.push({
                        src: res.data.url,
                        alt: fallbackAlt,
                        caption: '',
                    });
                }
            } catch (err) {
                console.error('Upload error:', err);
                errorCount++;
            }
        }

        onChange(newImages);
        setUploading(false);
        if (errorCount > 0) {
            setUploadError(`Gagal mengupload ${errorCount} file. Pastikan format gambar valid (JPG, PNG, WebP, SVG) dan ukuran < 10MB.`);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddUrl = (e) => {
        e.preventDefault();
        if (!urlInput.src.trim()) return;
        onChange([...images, { src: urlInput.src.trim(), alt: urlInput.alt.trim(), caption: urlInput.caption.trim() }]);
        setUrlInput({ src: '', alt: '', caption: '' });
        setShowUrlAdd(false);
    };

    const handleUpdateItem = (index, field, value) => {
        const next = [...images];
        next[index] = { ...next[index], [field]: value };
        onChange(next);
    };

    const handleRemoveItem = (index) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const handleMove = (index, direction) => {
        const target = index + direction;
        if (target < 0 || target >= images.length) return;
        const next = [...images];
        const temp = next[index];
        next[index] = next[target];
        next[target] = temp;
        onChange(next);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <label className="block text-xs font-semibold text-zinc-200">
                        Galeri Foto & Dokumentasi Proyek
                    </label>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                        Upload foto dari komputer atau tambahkan via URL. Tersimpan langsung di database.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowUrlAdd(!showUrlAdd)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>{showUrlAdd ? 'Tutup Input URL' : '+ Tambah via URL'}</span>
                </button>
            </div>

            {/* Upload Dropzone / Button */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 hover:border-indigo-500/60 bg-[#0c0e17] rounded-xl p-5 text-center cursor-pointer transition group"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif"
                    className="hidden"
                    onChange={handleFilesSelected}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition">
                        {uploading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Upload className="w-5 h-5" />
                        )}
                    </div>
                    {uploading ? (
                        <p className="text-xs font-medium text-indigo-300 animate-pulse">
                            Sedang mengunggah gambar ke server...
                        </p>
                    ) : (
                        <div>
                            <p className="text-xs font-semibold text-zinc-200 group-hover:text-indigo-300 transition">
                                Klik untuk upload gambar baru (bisa pilih banyak sekaligus)
                            </p>
                            <p className="text-[11px] text-zinc-500 mt-0.5">
                                Format: PNG, JPG, WebP, SVG (Maks. 10MB per file)
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Error Banner */}
            {uploadError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
                    <span>{uploadError}</span>
                    <button type="button" onClick={() => setUploadError('')} className="text-rose-400 hover:text-rose-200">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Add via URL Form */}
            {showUrlAdd && (
                <div className="p-3.5 rounded-xl bg-[#0c0e17] border border-white/10 space-y-2.5">
                    <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Input URL Gambar Manual</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                            type="text"
                            placeholder="URL Gambar (/images/... atau https://)"
                            value={urlInput.src}
                            onChange={(e) => setUrlInput({ ...urlInput, src: e.target.value })}
                            className="admin-input-dark w-full px-3 py-2 text-xs rounded-lg placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Alt text gambar (opsional)"
                            value={urlInput.alt}
                            onChange={(e) => setUrlInput({ ...urlInput, alt: e.target.value })}
                            className="admin-input-dark w-full px-3 py-2 text-xs rounded-lg placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Keterangan / Caption (opsional)"
                            value={urlInput.caption}
                            onChange={(e) => setUrlInput({ ...urlInput, caption: e.target.value })}
                            className="admin-input-dark w-full px-3 py-2 text-xs rounded-lg placeholder-zinc-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowUrlAdd(false)}
                            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleAddUrl}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                        >
                            Tambahkan
                        </button>
                    </div>
                </div>
            )}

            {/* Image List Preview */}
            {images.length > 0 ? (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-[#0c0e17] border border-white/10 hover:border-white/20 transition"
                        >
                            {/* Thumbnail */}
                            <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={img.src}
                                    alt={img.alt || 'Preview'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150?text=Error';
                                    }}
                                />
                            </div>

                            {/* Inputs */}
                            <div className="flex-1 space-y-1.5 min-w-0">
                                <div className="text-[11px] font-mono text-zinc-400 truncate" title={img.src}>
                                    {img.src}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={img.alt || ''}
                                        onChange={(e) => handleUpdateItem(idx, 'alt', e.target.value)}
                                        placeholder="Alt text (e.g. Dashboard Chart)"
                                        className="admin-input-dark w-full px-2.5 py-1.5 text-xs rounded-lg placeholder-zinc-500"
                                    />
                                    <input
                                        type="text"
                                        value={img.caption || ''}
                                        onChange={(e) => handleUpdateItem(idx, 'caption', e.target.value)}
                                        placeholder="Caption / Keterangan foto"
                                        className="admin-input-dark w-full px-2.5 py-1.5 text-xs rounded-lg placeholder-zinc-500"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 self-end sm:self-center">
                                <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMove(idx, -1)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-30"
                                    title="Pindah ke atas"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    disabled={idx === images.length - 1}
                                    onClick={() => handleMove(idx, 1)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-30"
                                    title="Pindah ke bawah"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(idx)}
                                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition ml-1"
                                    title="Hapus foto ini"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 px-3 rounded-xl bg-[#0c0e17]/50 border border-white/5 text-zinc-500 text-xs">
                    <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-30 text-zinc-400" />
                    Belum ada foto dalam galeri. Upload foto dokumentasi proyek di atas.
                </div>
            )}
        </div>
    );
}

/* ── Dynamic Category Selector ──────────────────────────────── */
function CategorySelectInput({ value, onChange, projects = [] }) {
    const knownCategories = useMemo(() => {
        const list = [...CATEGORIES];
        const knownValues = new Set(CATEGORIES.map(c => c.value));

        projects.forEach(p => {
            if (p.category && !knownValues.has(p.category)) {
                knownValues.add(p.category);
                list.push({ value: p.category, label: p.category });
            }
        });
        return list;
    }, [projects]);

    const isKnown = knownCategories.some(c => c.value === value);
    const [isManual, setIsManual] = useState(!isKnown && !!value);
    const [manualValue, setManualValue] = useState(!isKnown ? (value || '') : '');

    const inputCls = 'admin-input-dark w-full !bg-[#0c0e17] !text-white !border-white/15 rounded-xl px-3.5 py-2.5 text-sm placeholder-zinc-500 focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/30 transition';
    const labelCls = 'block text-xs font-semibold text-zinc-200 mb-1.5';

    useEffect(() => {
        const known = knownCategories.some(c => c.value === value);
        if (!known && value) {
            setIsManual(true);
            setManualValue(value);
        } else if (known) {
            setIsManual(false);
        }
    }, [value, knownCategories]);

    const handleSelectChange = (e) => {
        const val = e.target.value;
        if (val === '__manual__') {
            setIsManual(true);
            // Do NOT call onChange yet — wait for user to type in the input field
        } else {
            setIsManual(false);
            onChange(val);
        }
    };

    const handleManualInputChange = (e) => {
        const val = e.target.value;
        setManualValue(val);
        onChange(val);
    };

    return (
        <div>
            <label className={labelCls}>Kategori *</label>
            <select
                className={inputCls}
                value={isManual ? '__manual__' : value}
                onChange={handleSelectChange}
                required={!isManual}
            >
                {knownCategories.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[#13151f] text-white">
                        {c.label}
                    </option>
                ))}
                <option value="__manual__" className="bg-[#1a1d2e] text-indigo-400 font-semibold">
                    + Tambah Kategori Manual...
                </option>
            </select>

            {isManual && (
                <div className="mt-2.5 p-3 rounded-xl bg-[#0c0e17] border border-indigo-500/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-indigo-400 font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Ketik Nama Kategori Baru:
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsManual(false);
                                setManualValue('');
                                onChange('data');
                            }}
                            className="text-zinc-400 hover:text-zinc-200 text-[11px] underline transition"
                        >
                            Batal / Pilih dari daftar
                        </button>
                    </div>
                    <input
                        type="text"
                        className={inputCls}
                        value={manualValue}
                        onChange={handleManualInputChange}
                        placeholder="Contoh: Mobile Apps, Artificial Intelligence, IoT..."
                        autoFocus
                        required
                    />
                    <p className="text-[10px] text-zinc-400">
                        Kategori ini akan tersimpan dan otomatis menjadi tab filter di portofolio.
                    </p>
                </div>
            )}
        </div>
    );
}

/* ── Main Admin Projects Page ────────────────────────────────── */
export default function Projects({ projects = [] }) {
    const { flash } = usePage().props;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingProject,    setEditingProject]    = useState(null);
    const [deletingProject,   setDeletingProject]   = useState(null);
    const [showSuccess,       setShowSuccess]       = useState(!!flash?.success);

    /* ── helpers ─────────────────────────────────────── */
    const arrToText  = (arr) => Array.isArray(arr) ? arr.join('\n') : (arr || '');
    const arrToComma = (arr) => Array.isArray(arr) ? arr.join(', ')  : (arr || '');

    /* ── create form ─────────────────────────────────── */
    const createForm = useForm({
        title: '', subtitle: '', category: 'data', period: '',
        badge: '', metrics: '', points: '', tools: '',
        images: [], link_url: '', order: projects.length + 1, is_active: true,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.projects.store'), {
            onSuccess: () => {
                createForm.reset();
                setIsCreateModalOpen(false);
                setShowSuccess(true);
            },
        });
    };

    /* ── edit form ───────────────────────────────────── */
    const editForm = useForm({
        title: '', subtitle: '', category: 'data', period: '',
        badge: '', metrics: '', points: '', tools: '',
        images: [], link_url: '', order: 1, is_active: true,
    });

    const openEdit = (proj) => {
        setEditingProject(proj);
        editForm.setData({
            title:    proj.title    || '',
            subtitle: proj.subtitle || '',
            category: proj.category || 'data',
            period:   proj.period   || '',
            badge:    proj.badge    || '',
            metrics:  proj.metrics  || '',
            points:   arrToText(proj.points),
            tools:    arrToComma(proj.tools),
            images:   Array.isArray(proj.images) ? proj.images : [],
            link_url: proj.link_url || '',
            order:    proj.order    ?? 1,
            is_active: proj.is_active ?? true,
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.projects.update', editingProject.id), {
            onSuccess: () => {
                editForm.reset();
                setEditingProject(null);
                setShowSuccess(true);
            },
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.projects.destroy', deletingProject.id), {
            onSuccess: () => setDeletingProject(null),
        });
    };

    /* ── category colors ─────────────────────────────── */
    const catColor = {
        data:    'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        edtech:  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        web:     'text-blue-400 bg-blue-500/10 border-blue-500/20',
        design:  'text-pink-400 bg-pink-500/10 border-pink-500/20',
        general: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
    };

    /* ── high-contrast styling constants ─────────────── */
    const inputCls = 'admin-input-dark w-full !bg-[#0c0e17] !text-white !border-white/15 rounded-xl px-3.5 py-2.5 text-sm placeholder-zinc-500 focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/30 transition';
    const labelCls = 'block text-xs font-semibold text-zinc-200 mb-1.5';

    /* ── shared modal form ───────────────────────────── */
    const ProjectForm = ({ form, onSubmit, onClose, isEdit = false }) => (
        <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                    <label className={labelCls}>Judul Proyek *</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.title}
                        onChange={(e) => form.setData('title', e.target.value)}
                        placeholder="Contoh: Cyclistic Bike-Share: Maximizing Annual Memberships"
                        required
                    />
                    {form.errors.title && <p className="text-rose-400 text-xs mt-1">{form.errors.title}</p>}
                </div>

                <div>
                    <label className={labelCls}>Subtitle / Institusi</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.subtitle}
                        onChange={(e) => form.setData('subtitle', e.target.value)}
                        placeholder="Contoh: Google Capstone Project"
                    />
                </div>

                <CategorySelectInput
                    value={form.data.category}
                    onChange={(val) => form.setData('category', val)}
                    projects={projects}
                />

                <div>
                    <label className={labelCls}>Periode</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.period}
                        onChange={(e) => form.setData('period', e.target.value)}
                        placeholder="Contoh: Aug 2026 atau Jun 2025 - Sekarang"
                    />
                </div>

                <div>
                    <label className={labelCls}>Badge Label</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.badge}
                        onChange={(e) => form.setData('badge', e.target.value)}
                        placeholder="Contoh: Google Capstone atau Featured"
                    />
                </div>

                <div>
                    <label className={labelCls}>Metrik Singkat</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.metrics}
                        onChange={(e) => form.setData('metrics', e.target.value)}
                        placeholder="Contoh: 5.5M+ Records atau 1,200+ Active Users"
                    />
                </div>

                <div>
                    <label className={labelCls}>URL Tautan (opsional)</label>
                    <input
                        type="url"
                        className={inputCls}
                        value={form.data.link_url}
                        onChange={(e) => form.setData('link_url', e.target.value)}
                        placeholder="https://github.com/... atau https://..."
                    />
                </div>

                <div>
                    <label className={labelCls}>Urutan Tampilan</label>
                    <input
                        type="number"
                        className={inputCls}
                        value={form.data.order}
                        onChange={(e) => form.setData('order', parseInt(e.target.value) || 1)}
                        min="1"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className={labelCls}>
                        Poin Deskripsi <span className="font-normal text-zinc-400">(satu baris = satu poin bullet)</span>
                    </label>
                    <textarea
                        className={inputCls + ' resize-y min-h-[110px]'}
                        value={form.data.points}
                        onChange={(e) => form.setData('points', e.target.value)}
                        placeholder={"Poin pertama deskripsi proyek...\nPoin kedua capaian & metodologi...\nPoin ketiga hasil & dampak..."}
                        rows={4}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className={labelCls}>
                        Tools / Teknologi <span className="font-normal text-zinc-400">(pisahkan dengan koma)</span>
                    </label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.tools}
                        onChange={(e) => form.setData('tools', e.target.value)}
                        placeholder="Python (Pandas), SQL, Tableau, React, Docker"
                    />
                </div>

                {/* Gallery Manager Section */}
                <div className="sm:col-span-2 pt-2 border-t border-white/10">
                    <ProjectGalleryManager
                        images={form.data.images || []}
                        onChange={(imgs) => form.setData('images', imgs)}
                    />
                </div>

                <div className="sm:col-span-2 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div
                            onClick={() => form.setData('is_active', !form.data.is_active)}
                            className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${form.data.is_active ? 'bg-indigo-600' : 'bg-zinc-700'}`}
                        >
                            <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.data.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <div>
                            <span className="text-sm font-medium text-zinc-200">Tampilkan di website publik</span>
                            <p className="text-[11px] text-zinc-500">Jika dinonaktifkan, proyek ini hanya terlihat oleh admin.</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={form.processing}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-60"
                >
                    {form.processing ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan ke database…</span>
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4" />
                            <span>{isEdit ? 'Simpan Perubahan' : 'Tambah Proyek'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );

    return (
        <AdminLayout title="Project Experience">
            <Head title="Project Experience — Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">

                {/* Flash / Success Message */}
                {(flash?.success || showSuccess) && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span>{flash?.success || 'Berhasil menyimpan perubahan ke database!'}</span>
                        <button onClick={() => setShowSuccess(false)} className="ml-auto text-emerald-400 hover:text-emerald-200">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
                            <FolderGit2 className="w-4 h-4" />
                            <span>Manajemen Proyek</span>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-100">Project Experience</h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            {projects.length} proyek tersimpan · Kelola deskripsi, galeri foto, dan urutan proyek
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            createForm.reset();
                            setIsCreateModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-lg shadow-indigo-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Proyek</span>
                    </button>
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl bg-[#1a1d2e]/30">
                        <FolderGit2 className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
                        <p className="text-base font-medium text-zinc-300">Belum ada proyek.</p>
                        <p className="text-xs text-zinc-500 mt-1">Klik tombol "Tambah Proyek" di atas untuk menambahkan pengalaman proyek.</p>
                    </div>
                )}

                {/* Project Cards */}
                <div className="space-y-4">
                    {projects.map((proj) => {
                        const cc = catColor[proj.category] || 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
                        return (
                            <div
                                key={proj.id}
                                className={`rounded-2xl border bg-[#1a1d2e] p-5 sm:p-6 space-y-4 transition shadow-sm ${proj.is_active ? 'border-white/10 hover:border-white/20' : 'border-zinc-800 opacity-60'}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base font-bold text-zinc-100 leading-snug">{proj.title}</h3>
                                            {proj.link_url && (
                                                <a
                                                    href={proj.link_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-400 hover:text-indigo-300"
                                                    title="Buka tautan proyek"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            {!proj.is_active && (
                                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-400">
                                            {proj.subtitle && <span className="text-zinc-300 font-medium">{proj.subtitle}</span>}
                                            {proj.period && <><span>·</span><span className="font-mono text-zinc-400">{proj.period}</span></>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cc}`}>
                                            {CATEGORIES.find((c) => c.value === proj.category)?.label ?? proj.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Badges row */}
                                {(proj.badge || proj.metrics) && (
                                    <div className="flex flex-wrap gap-2">
                                        {proj.badge && (
                                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-700/60">
                                                {proj.badge}
                                            </span>
                                        )}
                                        {proj.metrics && (
                                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                                                {proj.metrics}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Points preview */}
                                {proj.points && proj.points.length > 0 && (
                                    <ul className="space-y-1 text-xs text-zinc-300 list-disc list-outside pl-4 marker:text-zinc-500">
                                        {proj.points.slice(0, 2).map((pt, i) => (
                                            <li key={i} className="line-clamp-1">{pt}</li>
                                        ))}
                                        {proj.points.length > 2 && (
                                            <li className="text-zinc-500 font-medium">+{proj.points.length - 2} poin lainnya…</li>
                                        )}
                                    </ul>
                                )}

                                {/* Gallery Thumbnails Preview in Admin List */}
                                {proj.images && proj.images.length > 0 && (
                                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                                        {proj.images.slice(0, 5).map((img, i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0"
                                                title={img.alt || img.caption || 'Foto proyek'}
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt || 'Foto'}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/100?text=Img';
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        {proj.images.length > 5 && (
                                            <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-400 flex-shrink-0">
                                                +{proj.images.length - 5}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tools */}
                                {proj.tools && proj.tools.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {proj.tools.map((t, i) => (
                                            <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Card Footer Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                                    <span className="text-zinc-500 font-mono text-[11px]">
                                        #{proj.id} · Urutan: {proj.order} · {proj.images?.length ?? 0} Foto di database
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEdit(proj)}
                                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition border border-white/5"
                                        >
                                            <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeletingProject(proj)}
                                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition border border-rose-500/20"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── CREATE MODAL ────────────────────────────── */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#13151f] border border-white/15 rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171a27]">
                            <div className="flex items-center gap-2 text-zinc-100 font-bold">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <span>Tambah Proyek Baru</span>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ProjectForm
                                form={createForm}
                                onSubmit={handleCreate}
                                onClose={() => setIsCreateModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ──────────────────────────────── */}
            {editingProject && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#13151f] border border-white/15 rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171a27]">
                            <div className="flex items-center gap-2 text-zinc-100 font-bold">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                <span>Edit Proyek: {editingProject.title}</span>
                            </div>
                            <button
                                onClick={() => setEditingProject(null)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ProjectForm
                                form={editForm}
                                onSubmit={handleEdit}
                                onClose={() => setEditingProject(null)}
                                isEdit
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE CONFIRMATION MODAL ───────────────── */}
            {deletingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#13151f] border border-white/15 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
                        <div className="flex items-center gap-3 text-rose-400">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-100">Hapus Proyek?</h3>
                                <p className="text-xs text-zinc-400">Tindakan ini tidak dapat dibatalkan</p>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            Yakin ingin menghapus proyek <span className="font-semibold text-white">"{deletingProject.title}"</span> dari database?
                        </p>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeletingProject(null)}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition shadow-lg shadow-rose-600/20"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
