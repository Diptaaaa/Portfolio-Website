import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Settings, 
    ExternalLink, 
    User, 
    Users,
    GraduationCap,
    Briefcase,
    FolderGit2,
    Award,
    Sparkles, 
    Share2, 
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';

export default function Dashboard({ 
    settings = {}, 
    adminCount = 1, 
    educationCount = 1, 
    projectCount = 0, 
    experienceCount = 0,
    certificationCount = 0,
    skillCount = 0 
}) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* Welcome Card */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-indigo-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-medium border border-indigo-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Sistem Aktif & Siap Dikelola</span>
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                            {settings.full_name || 'Muhammad Rafli Pradipta'}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                            {settings.job_title || 'Data Analyst & Information Technology Education Graduate'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={route('admin.config')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 shadow-sm transition"
                        >
                            <User className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Pengaturan Profil</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700 transition"
                        >
                            <span>Lihat Website</span>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                    </div>
                </div>

                {/* Configuration Shortcuts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Profil Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-indigo-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-mono text-zinc-500">Biodata</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Profil & Bio
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    {settings.bio_summary || 'Kelola nama, status ketersediaan, IPK, dan ringkasan profil.'}
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.config')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Atur Profil</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Socials Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-pink-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-mono text-zinc-500">5 Saluran</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Kontak & Medsos
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    WhatsApp, Instagram, LinkedIn, Canva, dan Email.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.config')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Atur Kontak</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Neon Cursor Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-emerald-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                                    {settings.enable_neon_cursor === '0' ? 'Nonaktif' : 'Aktif'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Neon Cursor
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Pita cahaya kursor neon WebGL warna ({settings.neon_cursor_color || 'magenta'}).
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.config')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Atur Tampilan</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Admin Management Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-violet-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-medium">
                                    {adminCount} Admin
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Kelola Admin
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Manajemen akun administrator dan kredensial login.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.users.index')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Kelola Pengguna</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Education Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-blue-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                                    {educationCount} Riwayat
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Riwayat Pendidikan
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Kelola universitas, logo, IPK, dan coursework.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.education.index')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Kelola Pendidikan</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Project Experience Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-indigo-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <FolderGit2 className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium">
                                    {projectCount} Proyek
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Project Experience
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Kelola judul, deskripsi, tools, dan galeri foto proyek.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.projects.index')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Kelola Proyek</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Experience Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-emerald-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                                    {experienceCount} Pengalaman
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Pengalaman Kerja & Organisasi
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Kelola riwayat kerja, peran organisasi, dan dokumentasi.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.experience.index')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Kelola Pengalaman</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Skills & Certifications Quick Card */}
                    <div className="p-5 rounded-xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-3 hover:border-amber-500/20 transition-colors flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                                    {certificationCount} Sertifikat • {skillCount} Keahlian
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-100">
                                    Skills & Sertifikasi
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                    Kelola sertifikat terverifikasi, core tools, dan taksonomi keahlian.
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <Link
                                href={route('admin.skills.index')}
                                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition-colors"
                            >
                                <span>Kelola Skills & Sertifikat</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
