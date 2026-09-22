import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    GraduationCap,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    Upload,
    Image as ImageIcon,
    Calendar,
    Award,
    BookOpen,
    Eye,
    Sparkles,
    Check,
} from 'lucide-react';

export default function Education({ educations = [] }) {
    const { flash } = usePage().props;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [deletingEducation, setDeletingEducation] = useState(null);
    const [logoPreview, setLogoPreview] = useState('/images/ub-logo.svg');
    const [courseworkInput, setCourseworkInput] = useState('');

    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    // Form for creating new education
    const createForm = useForm({
        institution: '',
        degree: '',
        period: '',
        gpa: '',
        logo_url: '/images/ub-logo.svg',
        logo_file: null,
        coursework: '',
        order: educations.length + 1,
        is_active: true,
    });

    // Form for editing existing education
    const editForm = useForm({
        institution: '',
        degree: '',
        period: '',
        gpa: '',
        logo_url: '',
        logo_file: null,
        coursework: '',
        order: 1,
        is_active: true,
    });

    // Handle Create Submit
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('admin.education.store'), {
            forceFormData: true,
            onSuccess: () => {
                createForm.reset();
                setIsCreateModalOpen(false);
                setLogoPreview('/images/ub-logo.svg');
            },
        });
    };

    // Open Edit Modal
    const openEditModal = (item) => {
        setEditingEducation(item);
        const cwText = Array.isArray(item.coursework) ? item.coursework.join(', ') : (item.coursework || '');
        setCourseworkInput(cwText);
        editForm.setData({
            institution: item.institution || '',
            degree: item.degree || '',
            period: item.period || '',
            gpa: item.gpa || '',
            logo_url: item.logo_url || '/images/ub-logo.svg',
            logo_file: null,
            coursework: cwText,
            order: item.order || 1,
            is_active: item.is_active ?? true,
        });
        setLogoPreview(item.logo_url || '/images/ub-logo.svg');
        editForm.clearErrors();
    };

    // Handle Edit Submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingEducation) return;
        editForm.post(route('admin.education.update', editingEducation.id), {
            forceFormData: true,
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
            onSuccess: () => {
                setEditingEducation(null);
                editForm.reset();
            },
        });
    };

    // Handle Delete Submit
    const handleDeleteSubmit = () => {
        if (!deletingEducation) return;
        router.delete(route('admin.education.destroy', deletingEducation.id), {
            onSuccess: () => setDeletingEducation(null),
        });
    };

    // Helper for logo upload
    const handleLogoFileChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
            if (isEdit) {
                editForm.setData('logo_file', file);
            } else {
                createForm.setData('logo_file', file);
            }
        }
    };

    return (
        <AdminLayout title="Manajemen Pendidikan">
            <Head title="Manajemen Pendidikan - Admin Panel" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* ── Page Header ─────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                Manajemen Pendidikan
                            </h1>
                            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                                Kelola riwayat pendidikan, logo institusi, IPK, dan daftar mata kuliah relevan.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            createForm.reset();
                            createForm.setData({
                                institution: '',
                                degree: '',
                                period: '',
                                gpa: '',
                                logo_url: '/images/ub-logo.svg',
                                logo_file: null,
                                coursework: '',
                                order: educations.length + 1,
                                is_active: true,
                            });
                            setLogoPreview('/images/ub-logo.svg');
                            setIsCreateModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Pendidikan</span>
                    </button>
                </div>

                {/* ── Flash Messages ───────────────────────────────────── */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-3 text-sm animate-fadeIn">
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-3 text-sm animate-fadeIn">
                        <div className="flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>{flash.error}</span>
                        </div>
                    </div>
                )}

                {/* ── LIVE PREVIEW CARD (MATCHES USER SCREENSHOT) ──────── */}
                <div className="rounded-2xl bg-[#090a0f] border border-white/10 p-5 sm:p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                                Live Preview Tampilan Kartu Education di Website
                            </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ● Pratinjau Website
                        </span>
                    </div>

                    <p className="text-sm font-semibold text-white tracking-tight">
                        Education
                    </p>

                    {educations.length > 0 ? (
                        educations.map((item) => {
                            const courses = Array.isArray(item.coursework) 
                                ? item.coursework 
                                : (typeof item.coursework === 'string' ? item.coursework.split(',').map(s => s.trim()).filter(Boolean) : []);

                            return (
                                <div
                                    key={item.id}
                                    className="p-5 rounded-xl border border-zinc-800/90 bg-[#12141c] space-y-4 shadow-md"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-11 h-11 rounded-lg bg-zinc-900 border border-white/5 p-1 flex items-center justify-center shrink-0">
                                                <img
                                                    src={item.logo_url || '/images/ub-logo.svg'}
                                                    alt={item.institution}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Logo_Universitas_Brawijaya.svg';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-white tracking-tight">
                                                    {item.institution}
                                                </h3>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    {item.degree}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:text-right">
                                            <span className="text-xs font-mono text-zinc-400 block">
                                                {item.period}
                                            </span>
                                            {item.gpa && (
                                                <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                                                    {item.gpa.startsWith('GPA') ? item.gpa : `GPA ${item.gpa}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {courses.length > 0 && (
                                        <div className="pt-3 border-t border-white/5 space-y-2">
                                            <span className="text-xs font-medium text-zinc-400 block">
                                                Relevant Coursework:
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {courses.map((course, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-200 border border-white/5 font-medium"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-zinc-500 rounded-xl bg-zinc-900/40 border border-zinc-800">
                            Belum ada data pendidikan. Klik tombol "Tambah Pendidikan" di atas untuk menambahkan.
                        </div>
                    )}
                </div>

                {/* ── EDUCATION ITEMS CRUD LIST ─────────────────────────── */}
                <div className="rounded-2xl bg-[#1a1d2e] border border-white/5 overflow-hidden shadow-xl">
                    <div className="p-5 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-white">
                                Daftar Riwayat Pendidikan ({educations.length})
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Klik tombol edit untuk memperbarui atau hapus data pendidikan.
                            </p>
                        </div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {educations.map((item, index) => {
                            const courses = Array.isArray(item.coursework) 
                                ? item.coursework 
                                : (typeof item.coursework === 'string' ? item.coursework.split(',').map(s => s.trim()).filter(Boolean) : []);

                            return (
                                <div
                                    key={item.id}
                                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                                >
                                    <div className="flex items-start gap-4 min-w-0 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-[#0f1117] border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                                            <img
                                                src={item.logo_url || '/images/ub-logo.svg'}
                                                alt={item.institution}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Logo_Universitas_Brawijaya.svg';
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2.5 flex-wrap">
                                                <h3 className="text-sm sm:text-base font-bold text-white">
                                                    {item.institution}
                                                </h3>
                                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                                                    Urutan #{item.order}
                                                </span>
                                                {item.is_active ? (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400">
                                                        Nonaktif
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-xs text-zinc-300">
                                                {item.degree}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-0.5 flex-wrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                                    <span>{item.period}</span>
                                                </div>
                                                {item.gpa && (
                                                    <div className="flex items-center gap-1 font-semibold text-emerald-400">
                                                        <Award className="w-3.5 h-3.5" />
                                                        <span>{item.gpa}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {courses.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {courses.slice(0, 5).map((c, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#0f1117] text-zinc-300 border border-white/5"
                                                        >
                                                            {c}
                                                        </span>
                                                    ))}
                                                    {courses.length > 5 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0f1117] text-zinc-400 border border-white/5">
                                                            +{courses.length - 5} lainnya
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-200 transition"
                                        >
                                            <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => setDeletingEducation(item)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs font-medium text-rose-400 transition"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Hapus</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                MODAL: TAMBAH PENDIDIKAN BARU
            ═════════════════════════════════════════════════════════ */}
            {isCreateModalOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1a1d2e] z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                                <h3 className="text-base font-bold text-white">Tambah Riwayat Pendidikan</h3>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                            {/* Institution */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Nama Institusi / Universitas <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.institution}
                                    onChange={(e) => createForm.setData('institution', e.target.value)}
                                    placeholder="Contoh: Universitas Brawijaya"
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                                />
                                {createForm.errors.institution && (
                                    <p className="text-[11px] text-rose-400">{createForm.errors.institution}</p>
                                )}
                            </div>

                            {/* Degree / Major */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Fakultas / Program Studi / Gelar <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.degree}
                                    onChange={(e) => createForm.setData('degree', e.target.value)}
                                    placeholder="Contoh: Faculty of Computer Science · Bachelor's in IT Education"
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                                />
                                {createForm.errors.degree && (
                                    <p className="text-[11px] text-rose-400">{createForm.errors.degree}</p>
                                )}
                            </div>

                            {/* Period & GPA */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Periode Waktu <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.period}
                                        onChange={(e) => createForm.setData('period', e.target.value)}
                                        placeholder="Contoh: Aug 2022 - Aug 2026"
                                        className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        IPK (GPA)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.gpa}
                                        onChange={(e) => createForm.setData('gpa', e.target.value)}
                                        placeholder="Contoh: GPA 3.75 / 4.00"
                                        className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Logo: File or URL */}
                            <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 space-y-3">
                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>Logo Institusi</span>
                                </label>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0">
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*,.svg"
                                            onChange={(e) => handleLogoFileChange(e, false)}
                                            className="block w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={createForm.data.logo_url}
                                            onChange={(e) => {
                                                createForm.setData('logo_url', e.target.value);
                                                setLogoPreview(e.target.value);
                                            }}
                                            placeholder="Atau tautan URL logo (cth: /images/ub-logo.svg)"
                                            className="w-full px-3 py-1.5 text-xs bg-[#1a1d2e] border border-white/10 rounded-lg text-white placeholder-zinc-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Relevant Coursework */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Mata Kuliah Relevan (Relevant Coursework)
                                    </label>
                                    <span className="text-[10px] text-zinc-500">
                                        Pisahkan dengan tanda koma (,)
                                    </span>
                                </div>
                                <textarea
                                    rows="3"
                                    value={createForm.data.coursework}
                                    onChange={(e) => createForm.setData('coursework', e.target.value)}
                                    placeholder="Data Analytics, Information Systems Analysis & Design, Database Management Systems, Operating Systems..."
                                    className="w-full p-3 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                                />
                            </div>

                            {/* Order & Active Switch */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-white/5">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Urutan Tampilan
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={createForm.data.order}
                                        onChange={(e) => createForm.setData('order', e.target.value)}
                                        className="w-full px-3.5 py-2 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0f1117] border border-white/5 mt-3 sm:mt-0">
                                    <span className="text-xs font-semibold text-zinc-300">
                                        Tampilkan di Website
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={createForm.data.is_active}
                                            onChange={(e) => createForm.setData('is_active', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-zinc-600 peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 disabled:opacity-50 transition"
                                >
                                    {createForm.processing ? 'Menyimpan...' : 'Simpan Pendidikan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ═════════════════════════════════════════════════════════
                MODAL: EDIT PENDIDIKAN
            ═════════════════════════════════════════════════════════ */}
            {editingEducation && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1a1d2e] z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                <h3 className="text-base font-bold text-white">Edit Riwayat Pendidikan</h3>
                            </div>
                            <button
                                onClick={() => setEditingEducation(null)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            {/* Institution */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Nama Institusi / Universitas <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.institution}
                                    onChange={(e) => editForm.setData('institution', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                />
                                {editForm.errors.institution && (
                                    <p className="text-[11px] text-rose-400">{editForm.errors.institution}</p>
                                )}
                            </div>

                            {/* Degree / Major */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Fakultas / Program Studi / Gelar <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.degree}
                                    onChange={(e) => editForm.setData('degree', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                />
                                {editForm.errors.degree && (
                                    <p className="text-[11px] text-rose-400">{editForm.errors.degree}</p>
                                )}
                            </div>

                            {/* Period & GPA */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Periode Waktu <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.period}
                                        onChange={(e) => editForm.setData('period', e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        IPK (GPA)
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.gpa}
                                        onChange={(e) => editForm.setData('gpa', e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Logo: File or URL */}
                            <div className="p-4 rounded-xl bg-[#0f1117] border border-white/5 space-y-3">
                                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>Logo Institusi</span>
                                </label>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0">
                                        <img
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <input
                                            ref={editFileInputRef}
                                            type="file"
                                            accept="image/*,.svg"
                                            onChange={(e) => handleLogoFileChange(e, true)}
                                            className="block w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.data.logo_url}
                                            onChange={(e) => {
                                                editForm.setData('logo_url', e.target.value);
                                                setLogoPreview(e.target.value);
                                            }}
                                            className="w-full px-3 py-1.5 text-xs bg-[#1a1d2e] border border-white/10 rounded-lg text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Relevant Coursework */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Mata Kuliah Relevan (Relevant Coursework)
                                    </label>
                                    <span className="text-[10px] text-zinc-500">
                                        Pisahkan dengan tanda koma (,)
                                    </span>
                                </div>
                                <textarea
                                    rows="3"
                                    value={editForm.data.coursework}
                                    onChange={(e) => editForm.setData('coursework', e.target.value)}
                                    className="w-full p-3 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                                />
                            </div>

                            {/* Order & Active Switch */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-white/5">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Urutan Tampilan
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editForm.data.order}
                                        onChange={(e) => editForm.setData('order', e.target.value)}
                                        className="w-full px-3.5 py-2 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0f1117] border border-white/5 mt-3 sm:mt-0">
                                    <span className="text-xs font-semibold text-zinc-300">
                                        Tampilkan di Website
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editForm.data.is_active}
                                            onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-zinc-600 peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setEditingEducation(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 disabled:opacity-50 transition"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ═════════════════════════════════════════════════════════
                MODAL: KONFIRMASI HAPUS PENDIDIKAN
            ═════════════════════════════════════════════════════════ */}
            {deletingEducation && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-sm rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl p-6 text-center animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>

                        <h3 className="text-base font-bold text-white">Hapus Data Pendidikan?</h3>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                            Apakah Anda yakin ingin menghapus data pendidikan{' '}
                            <span className="text-white font-semibold">{deletingEducation.institution}</span>?
                            Tindakan ini tidak dapat dibatalkan.
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingEducation(null)}
                                className="w-full py-2.5 rounded-xl text-xs font-medium text-zinc-300 hover:bg-white/5 border border-white/10 transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteSubmit}
                                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </AdminLayout>
    );
}
