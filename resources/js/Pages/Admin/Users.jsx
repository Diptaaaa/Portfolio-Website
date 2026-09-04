import { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Users as UsersIcon,
    UserPlus,
    Search,
    Shield,
    ShieldCheck,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    Eye,
    EyeOff,
    KeyRound,
    UserCheck,
    Clock,
    Sparkles,
} from 'lucide-react';

export default function Users({ users = [], filters = {} }) {
    const { auth, flash } = usePage().props;
    const currentUser = auth?.user;

    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form for creating new admin
    const createForm = useForm({
        name: '',
        username: '',
        password: '',
    });

    // Form for editing existing admin
    const editForm = useForm({
        name: '',
        username: '',
        password: '',
    });

    // Filter users locally for quick real-time filtering
    const filteredUsers = users.filter((u) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
            u.name.toLowerCase().includes(query) ||
            u.username.toLowerCase().includes(query)
        );
    });

    // Handle Create Submit
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('admin.users.store'), {
            onSuccess: () => {
                createForm.reset();
                setIsCreateModalOpen(false);
                setShowPassword(false);
            },
        });
    };

    // Open Edit Modal
    const openEditModal = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            username: user.username,
            password: '',
        });
        editForm.clearErrors();
        setShowPassword(false);
    };

    // Handle Edit Submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingUser) return;
        editForm.put(route('admin.users.update', editingUser.id), {
            onSuccess: () => {
                setEditingUser(null);
                editForm.reset();
                setShowPassword(false);
            },
        });
    };

    // Handle Delete Submit
    const handleDeleteSubmit = () => {
        if (!deletingUser) return;
        router.delete(route('admin.users.destroy', deletingUser.id), {
            onSuccess: () => setDeletingUser(null),
        });
    };

    // Helper to generate avatar color gradient from initials
    const getAvatarGradient = (name = '') => {
        const charCode = name.charCodeAt(0) || 65;
        const gradients = [
            'from-indigo-500 to-violet-600',
            'from-cyan-500 to-blue-600',
            'from-emerald-500 to-teal-600',
            'from-rose-500 to-pink-600',
            'from-amber-500 to-orange-600',
            'from-purple-500 to-indigo-600',
        ];
        return gradients[charCode % gradients.length];
    };

    return (
        <AdminLayout title="Kelola Admin">
            <Head title="Manajemen Admin - Admin Panel" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* ── Page Header ─────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <UsersIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    Manajemen Admin
                                </h1>
                                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                                    Kelola akun administrator dengan akses penuh ke sistem portofolio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            createForm.reset();
                            createForm.clearErrors();
                            setShowPassword(false);
                            setIsCreateModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/35 transition-all transform active:scale-95"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Tambah Admin Baru</span>
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

                {/* ── Overview Cards ───────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Total Admins */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                            <UsersIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-400 font-medium">Total Akun Admin</p>
                            <h3 className="text-2xl font-bold text-white mt-0.5">{users.length}</h3>
                            <p className="text-[11px] text-zinc-500 mt-0.5">Memiliki izin konfigurasi</p>
                        </div>
                    </div>

                    {/* Card 2: Current Account */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-zinc-400 font-medium">Akun Anda Saat Ini</p>
                            <h3 className="text-sm font-bold text-white truncate mt-0.5">
                                {currentUser?.name || 'Admin'}
                            </h3>
                            <p className="text-[11px] text-emerald-400 font-mono truncate">
                                @{currentUser?.username || 'admin'}
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Security Status */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-400 font-medium">Tingkat Keamanan</p>
                            <h3 className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                                <span>Bcrypt Hashing</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </h3>
                            <p className="text-[11px] text-zinc-500 mt-0.5">Otentikasi aman berbasis username</p>
                        </div>
                    </div>
                </div>

                {/* ── Table & Search Container ─────────────────────────── */}
                <div className="rounded-2xl bg-[#1a1d2e] border border-white/5 overflow-hidden shadow-xl">
                    {/* Table Header Bar */}
                    <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-sm sm:text-base font-semibold text-white">
                                Daftar Administrator
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Menampilkan {filteredUsers.length} dari {users.length} total admin
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama atau username..."
                                className="w-full pl-9 pr-8 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-black/20">
                                    <th className="py-3.5 px-4 sm:px-6">Admin</th>
                                    <th className="py-3.5 px-4 sm:px-6">Username</th>
                                    <th className="py-3.5 px-4 sm:px-6">Peran</th>
                                    <th className="py-3.5 px-4 sm:px-6">Terdaftar</th>
                                    <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => {
                                        const isSelf = currentUser && currentUser.id === user.id;
                                        const initial = (user.name || 'A').charAt(0).toUpperCase();

                                        return (
                                            <tr
                                                key={user.id}
                                                className={`transition-colors hover:bg-white/[0.02] ${
                                                    isSelf ? 'bg-indigo-950/10' : ''
                                                }`}
                                            >
                                                {/* Admin info */}
                                                <td className="py-3.5 px-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarGradient(
                                                                user.name
                                                            )} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}
                                                        >
                                                            {initial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-white truncate">
                                                                    {user.name}
                                                                </span>
                                                                {isSelf && (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                                        Anda
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[11px] text-zinc-500 sm:hidden block">
                                                                @{user.username}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                <td className="py-3.5 px-4 sm:px-6 font-mono text-zinc-400">
                                                    @{user.username}
                                                </td>

                                                {/* Role */}
                                                <td className="py-3.5 px-4 sm:px-6">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-zinc-300 border border-white/10">
                                                        <Shield className="w-3 h-3 text-indigo-400" />
                                                        Super Admin
                                                    </span>
                                                </td>

                                                {/* Registered Date */}
                                                <td className="py-3.5 px-4 sm:px-6 text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                                        <span>{user.created_at}</span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 sm:px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {/* Edit Button */}
                                                        <button
                                                            onClick={() => openEditModal(user)}
                                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
                                                            title="Edit admin"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </button>

                                                        {/* Delete Button */}
                                                        {isSelf ? (
                                                            <button
                                                                disabled
                                                                className="p-1.5 rounded-lg bg-white/5 text-zinc-600 cursor-not-allowed opacity-50"
                                                                title="Tidak dapat menghapus akun Anda sendiri"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => setDeletingUser(user)}
                                                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition"
                                                                title="Hapus admin"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-zinc-500">
                                            <UsersIcon className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
                                            <p className="text-sm font-medium">Tidak ada admin yang cocok</p>
                                            <p className="text-xs mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                MODAL: TAMBAH ADMIN BARU
            ═════════════════════════════════════════════════════════ */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-md rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl overflow-hidden animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <UserPlus className="w-4 h-4" />
                                </div>
                                <h3 className="text-base font-bold text-white">Tambah Admin Baru</h3>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <form onSubmit={handleCreateSubmit} className="p-5 space-y-4">
                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Nama Lengkap <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Admin Dua"
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                />
                                {createForm.errors.name && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {createForm.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Username Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Username <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
                                        @
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.username}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'username',
                                                e.target.value.toLowerCase().replace(/\s+/g, '')
                                            )
                                        }
                                        placeholder="admindipta"
                                        className="w-full pl-8 pr-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-500">
                                    Hanya huruf, angka, tanda hubung (-) dan garis bawah (_).
                                </p>
                                {createForm.errors.username && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {createForm.errors.username}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Password <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={createForm.data.password}
                                        onChange={(e) => createForm.setData('password', e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {createForm.errors.password && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {createForm.errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2.5">
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
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 disabled:opacity-50 transition"
                                >
                                    {createForm.processing ? 'Menyimpan...' : 'Simpan Admin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                MODAL: EDIT ADMIN
            ═════════════════════════════════════════════════════════ */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-md rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl overflow-hidden animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Pencil className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Edit Admin</h3>
                                    <p className="text-[11px] text-zinc-400">
                                        Ubah profil akun @{editingUser.username}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Nama Lengkap <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                />
                                {editForm.errors.name && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {editForm.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Username Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Username <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
                                        @
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.username}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'username',
                                                e.target.value.toLowerCase().replace(/\s+/g, '')
                                            )
                                        }
                                        className="w-full pl-8 pr-3.5 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                </div>
                                {editForm.errors.username && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {editForm.errors.username}
                                    </p>
                                )}
                            </div>

                            {/* New Password (Optional) */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-zinc-300">
                                        Password Baru (Opsional)
                                    </label>
                                    <span className="text-[10px] text-zinc-500">
                                        Kosongkan jika tetap
                                    </span>
                                </div>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={editForm.data.password}
                                        onChange={(e) => editForm.setData('password', e.target.value)}
                                        placeholder="Isi jika ingin mereset password"
                                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#0f1117] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {editForm.errors.password && (
                                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {editForm.errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 disabled:opacity-50 transition"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                MODAL: KONFIRMASI HAPUS ADMIN
            ═════════════════════════════════════════════════════════ */}
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="w-full max-w-sm rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl p-6 text-center animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>

                        <h3 className="text-base font-bold text-white">Hapus Akun Admin?</h3>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                            Apakah Anda yakin ingin menghapus akun admin{' '}
                            <span className="text-white font-semibold">{deletingUser.name}</span> (@
                            {deletingUser.username})? Tindakan ini tidak dapat dibatalkan.
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingUser(null)}
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
                </div>
            )}
        </AdminLayout>
    );
}
