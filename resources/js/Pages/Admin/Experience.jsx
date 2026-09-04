import { useState, useRef, useMemo } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Briefcase,
    Building2,
    Users2,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    Upload,
    Image as ImageIcon,
    ChevronUp,
    ChevronDown,
    Check,
    Link as LinkIcon,
    Loader2,
    MapPin,
    Calendar,
    Award,
    Sparkles,
} from 'lucide-react';

/* ── Interactive Image Gallery Manager ───────────────────────── */
function ExperienceGalleryManager({ images = [], onChange }) {
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
                const res = await window.axios.post(route('admin.experience.upload-image'), formData, {
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
                        Galeri Foto & Dokumentasi Kegiatan
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
                            Sedang mengunggah foto ke server...
                        </p>
                    ) : (
                        <div>
                            <p className="text-xs font-semibold text-zinc-200 group-hover:text-indigo-300 transition">
                                Klik untuk upload foto baru (bisa pilih banyak sekaligus)
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
                        <span>Input URL Foto Manual</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                            type="text"
                            placeholder="URL Foto (/images/... atau https://)"
                            value={urlInput.src}
                            onChange={(e) => setUrlInput({ ...urlInput, src: e.target.value })}
                            className="admin-input-dark w-full px-3 py-2 text-xs rounded-lg placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Alt text (opsional)"
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
                                        placeholder="Alt text (e.g. Sesi Mengajar)"
                                        className="admin-input-dark w-full px-2.5 py-1.5 text-xs rounded-lg placeholder-zinc-500"
                                    />
                                    <input
                                        type="text"
                                        value={img.caption || ''}
                                        onChange={(e) => handleUpdateItem(idx, 'caption', e.target.value)}
                                        placeholder="Keterangan / Caption foto"
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
                    Belum ada foto dokumentasi. Upload foto di atas untuk melengkapi riwayat kegiatan.
                </div>
            )}
        </div>
    );
}

/* ── Main Experience Page ────────────────────────────────────── */
export default function ExperiencePage({ experiences = [] }) {
    const { flash } = usePage().props;

    const [activeTab, setActiveTab] = useState('all'); // 'all', 'work', 'organization'
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [deletingExperience, setDeletingExperience] = useState(null);
    const [showSuccess, setShowSuccess] = useState(!!flash?.success);

    /* ── helpers ─────────────────────────────────────── */
    const arrToText = (arr) => Array.isArray(arr) ? arr.join('\n') : (arr || '');

    /* ── Filtered list ───────────────────────────────── */
    const filteredExperiences = useMemo(() => {
        if (activeTab === 'all') return experiences;
        return experiences.filter(exp => exp.type === activeTab);
    }, [experiences, activeTab]);

    const workCount = useMemo(() => experiences.filter(e => e.type === 'work').length, [experiences]);
    const orgCount  = useMemo(() => experiences.filter(e => e.type === 'organization').length, [experiences]);

    /* ── create form ─────────────────────────────────── */
    const createForm = useForm({
        type: 'work',
        company: '',
        role: '',
        location: '',
        period: '',
        badge: '',
        points: '',
        images: [],
        order: experiences.length + 1,
        is_active: true,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.experience.store'), {
            onSuccess: () => {
                createForm.reset();
                setIsCreateModalOpen(false);
                setShowSuccess(true);
            },
        });
    };

    /* ── edit form ───────────────────────────────────── */
    const editForm = useForm({
        type: 'work',
        company: '',
        role: '',
        location: '',
        period: '',
        badge: '',
        points: '',
        images: [],
        order: 1,
        is_active: true,
    });

    const openEdit = (exp) => {
        setEditingExperience(exp);
        editForm.setData({
            type: exp.type || 'work',
            company: exp.company || '',
            role: exp.role || '',
            location: exp.location || '',
            period: exp.period || '',
            badge: exp.badge || '',
            points: arrToText(exp.points),
            images: Array.isArray(exp.images) ? exp.images : [],
            order: exp.order ?? 1,
            is_active: exp.is_active ?? true,
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.experience.update', editingExperience.id), {
            onSuccess: () => {
                editForm.reset();
                setEditingExperience(null);
                setShowSuccess(true);
            },
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.experience.destroy', deletingExperience.id), {
            onSuccess: () => setDeletingExperience(null),
        });
    };

    /* ── high-contrast styling constants ─────────────── */
    const inputCls = 'admin-input-dark w-full !bg-[#0c0e17] !text-white !border-white/15 rounded-xl px-3.5 py-2.5 text-sm placeholder-zinc-500 focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/30 transition';
    const labelCls = 'block text-xs font-semibold text-zinc-200 mb-1.5';

    /* ── shared modal form ───────────────────────────── */
    const ExperienceForm = ({ form, onSubmit, onClose, isEdit = false }) => (
        <form onSubmit={onSubmit} className="space-y-5">
            {/* Tipe Pengalaman Selector */}
            <div className="space-y-2">
                <label className={labelCls}>Tipe Pengalaman *</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => form.setData('type', 'work')}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                            form.data.type === 'work'
                                ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                                : 'border-white/10 bg-[#0c0e17] text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                        }`}
                    >
                        <Building2 className={`w-5 h-5 ${form.data.type === 'work' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                        <div>
                            <div className="text-xs font-bold text-white">Pengalaman Kerja</div>
                            <div className="text-[10px] text-zinc-400">Professional Work</div>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => form.setData('type', 'organization')}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                            form.data.type === 'organization'
                                ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                                : 'border-white/10 bg-[#0c0e17] text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                        }`}
                    >
                        <Users2 className={`w-5 h-5 ${form.data.type === 'organization' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                        <div>
                            <div className="text-xs font-bold text-white">Organisasi & Kepemimpinan</div>
                            <div className="text-[10px] text-zinc-400">Leadership & Community</div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>
                        {form.data.type === 'work' ? 'Nama Perusahaan / Sekolah *' : 'Nama Organisasi / Komunitas *'}
                    </label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.company}
                        onChange={(e) => form.setData('company', e.target.value)}
                        placeholder={form.data.type === 'work' ? 'Contoh: Brawijaya Smart School (BSS)' : 'Contoh: Asrama Banua Malang'}
                        required
                    />
                    {form.errors.company && <p className="text-rose-400 text-xs mt-1">{form.errors.company}</p>}
                </div>

                <div>
                    <label className={labelCls}>Posisi / Jabatan (Role) *</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.role}
                        onChange={(e) => form.setData('role', e.target.value)}
                        placeholder={form.data.type === 'work' ? 'Contoh: Teacher Intern – Informatics' : 'Contoh: Dormitory President'}
                        required
                    />
                    {form.errors.role && <p className="text-rose-400 text-xs mt-1">{form.errors.role}</p>}
                </div>

                <div>
                    <label className={labelCls}>Periode Waktu</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.period}
                        onChange={(e) => form.setData('period', e.target.value)}
                        placeholder="Contoh: Aug - Oct 2025 atau Jan 2024 - Present"
                    />
                </div>

                <div>
                    <label className={labelCls}>Lokasi</label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.location}
                        onChange={(e) => form.setData('location', e.target.value)}
                        placeholder="Contoh: Malang, East Java"
                    />
                </div>

                <div>
                    <label className={labelCls}>
                        Badge Label {form.data.type === 'organization' ? '(Disarankan)' : '(Opsional)'}
                    </label>
                    <input
                        type="text"
                        className={inputCls}
                        value={form.data.badge}
                        onChange={(e) => form.setData('badge', e.target.value)}
                        placeholder="Contoh: Executive Leadership atau Media Outreach"
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
                        Poin Deskripsi & Pencapaian <span className="font-normal text-zinc-400">(satu baris = satu poin bullet)</span>
                    </label>
                    <textarea
                        className={inputCls + ' resize-y min-h-[110px]'}
                        value={form.data.points}
                        onChange={(e) => form.setData('points', e.target.value)}
                        placeholder={"Poin pertama deskripsi tanggung jawab & program...\nPoin kedua pencapaian terukur & teknologi yang digunakan...\nPoin ketiga hasil & dampak positif..."}
                        rows={4}
                    />
                </div>

                {/* Gallery Manager */}
                <div className="sm:col-span-2 pt-2 border-t border-white/10">
                    <ExperienceGalleryManager
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
                            <p className="text-[11px] text-zinc-500">Jika dinonaktifkan, pengalaman ini hanya terlihat di panel admin.</p>
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
                            <span>{isEdit ? 'Simpan Perubahan' : 'Tambah Pengalaman'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );

    return (
        <AdminLayout title="Manajemen Pengalaman">
            <Head title="Pengalaman Kerja & Organisasi — Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">

                {/* Flash Success Banner */}
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
                            <Briefcase className="w-4 h-4" />
                            <span>Career & Leadership</span>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-100">Pengalaman Kerja & Organisasi</h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            {experiences.length} pengalaman tersimpan ({workCount} Pengalaman Kerja, {orgCount} Organisasi)
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
                        <span>Tambah Pengalaman</span>
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                            activeTab === 'all'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-zinc-200 hover:bg-[#202438]'
                        }`}
                    >
                        <span>Semua</span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/10">
                            {experiences.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('work')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                            activeTab === 'work'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-zinc-200 hover:bg-[#202438]'
                        }`}
                    >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Pengalaman Kerja</span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/10">
                            {workCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('organization')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                            activeTab === 'organization'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-[#1a1d2e] text-zinc-400 hover:text-zinc-200 hover:bg-[#202438]'
                        }`}
                    >
                        <Users2 className="w-3.5 h-3.5" />
                        <span>Organisasi & Kepemimpinan</span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/10">
                            {orgCount}
                        </span>
                    </button>
                </div>

                {/* Empty State */}
                {filteredExperiences.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl bg-[#1a1d2e]/30">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
                        <p className="text-base font-medium text-zinc-300">Belum ada pengalaman dalam kategori ini.</p>
                        <p className="text-xs text-zinc-500 mt-1">Klik tombol "Tambah Pengalaman" di atas untuk menambahkan data baru.</p>
                    </div>
                )}

                {/* Experience Cards List */}
                <div className="space-y-4">
                    {filteredExperiences.map((exp) => (
                        <div
                            key={exp.id}
                            className={`rounded-2xl border bg-[#1a1d2e] p-5 sm:p-6 space-y-4 transition shadow-sm ${
                                exp.is_active ? 'border-white/10 hover:border-white/20' : 'border-zinc-800 opacity-60'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-base font-bold text-zinc-100 leading-snug">
                                            {exp.role}
                                        </h3>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                            exp.type === 'work'
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                        }`}>
                                            {exp.type === 'work' ? 'Pengalaman Kerja' : 'Organisasi'}
                                        </span>
                                        {exp.badge && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-700/60">
                                                {exp.badge}
                                            </span>
                                        )}
                                        {!exp.is_active && (
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                Nonaktif
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-400">
                                        <span className="text-indigo-400 font-semibold">{exp.company}</span>
                                        {exp.location && (
                                            <>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-zinc-500" />
                                                    {exp.location}
                                                </span>
                                            </>
                                        )}
                                        {exp.period && (
                                            <>
                                                <span>·</span>
                                                <span className="font-mono text-zinc-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-zinc-500" />
                                                    {exp.period}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Points preview */}
                            {exp.points && exp.points.length > 0 && (
                                <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-outside pl-4 marker:text-zinc-500">
                                    {exp.points.slice(0, 3).map((pt, i) => (
                                        <li key={i} className="line-clamp-2">{pt}</li>
                                    ))}
                                    {exp.points.length > 3 && (
                                        <li className="text-zinc-500 font-medium">+{exp.points.length - 3} poin lainnya…</li>
                                    )}
                                </ul>
                            )}

                            {/* Gallery Preview Thumbnails */}
                            {exp.images && exp.images.length > 0 && (
                                <div className="flex items-center gap-2 overflow-x-auto py-1">
                                    {exp.images.slice(0, 6).map((img, i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0"
                                            title={img.alt || img.caption || 'Foto dokumentasi'}
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
                                    {exp.images.length > 6 && (
                                        <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-400 flex-shrink-0">
                                            +{exp.images.length - 6}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Actions & Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                                <span className="text-zinc-500 font-mono text-[11px]">
                                    #{exp.id} · Urutan: {exp.order} · {exp.images?.length ?? 0} Foto dokumentasi
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEdit(exp)}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition border border-white/5"
                                    >
                                        <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeletingExperience(exp)}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition border border-rose-500/20"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                <span>Tambah Pengalaman Baru</span>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ExperienceForm
                                form={createForm}
                                onSubmit={handleCreate}
                                onClose={() => setIsCreateModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ──────────────────────────────── */}
            {editingExperience && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#13151f] border border-white/15 rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171a27]">
                            <div className="flex items-center gap-2 text-zinc-100 font-bold">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                <span>Edit Pengalaman: {editingExperience.role}</span>
                            </div>
                            <button
                                onClick={() => setEditingExperience(null)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ExperienceForm
                                form={editForm}
                                onSubmit={handleEdit}
                                onClose={() => setEditingExperience(null)}
                                isEdit
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE CONFIRM MODAL ────────────────────── */}
            {deletingExperience && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#13151f] border border-white/15 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
                        <div className="flex items-center gap-3 text-rose-400">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-100">Hapus Pengalaman?</h3>
                                <p className="text-xs text-zinc-400">Tindakan ini tidak dapat dibatalkan</p>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            Yakin ingin menghapus <span className="font-semibold text-white">"{deletingExperience.role} - {deletingExperience.company}"</span> dari database?
                        </p>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeletingExperience(null)}
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
