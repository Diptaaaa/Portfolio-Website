import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Settings,
    Users,
    GraduationCap,
    Briefcase,
    FolderGit2,
    Award,
    ExternalLink,
    LogOut,
    Menu,
    X,
    ChevronRight,
    User,
    Shield,
    Globe,
    ChevronDown,
} from 'lucide-react';

/* ─── Navigation items ─────────────────────────────────────── */
const navItems = [
    {
        label: 'Dashboard',
        href: 'dashboard',
        icon: LayoutDashboard,
        desc: 'Ringkasan & status',
    },
    {
        label: 'Pengaturan Profil',
        href: 'admin.config',
        icon: User,
        desc: 'Edit profil, foto & bio',
    },
    {
        label: 'Pendidikan',
        href: 'admin.education.index',
        icon: GraduationCap,
        desc: 'Riwayat studi & IPK',
    },
    {
        label: 'Pengalaman',
        href: 'admin.experience.index',
        icon: Briefcase,
        desc: 'Riwayat kerja & organisasi',
    },
    {
        label: 'Project Experience',
        href: 'admin.projects.index',
        icon: FolderGit2,
        desc: 'Kelola proyek portofolio',
    },
    {
        label: 'Skills & Sertifikasi',
        href: 'admin.skills.index',
        icon: Award,
        desc: 'Keahlian, tools & sertifikat',
    },
    {
        label: 'Kelola Admin',
        href: 'admin.users.index',
        icon: Users,
        desc: 'Manajemen akun admin',
    },
];

/* ─── Main Layout ───────────────────────────────────────────── */
export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen]   = useState(true);
    const [mobileOpen, setMobileOpen]     = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    /* close mobile sidebar on route change */
    useEffect(() => {
        const removeHandler = router.on('navigate', () => setMobileOpen(false));
        return () => removeHandler();
    }, []);

    /* close user menu on outside click */
    useEffect(() => {
        if (!userMenuOpen) return;
        const handler = () => setUserMenuOpen(false);
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [userMenuOpen]);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-[#0f1117] text-zinc-100 flex font-sans antialiased">

            {/* ── Mobile Overlay ─────────────────────────────── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ═══════════════════════════════════════════════
                SIDEBAR
            ═══════════════════════════════════════════════ */}
            <aside
                className={[
                    'fixed top-0 left-0 z-40 h-full flex flex-col',
                    'bg-[#13151f] border-r border-white/5',
                    'transition-all duration-300 ease-in-out',
                    sidebarOpen ? 'lg:w-60' : 'lg:w-16',
                    mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
                ].join(' ')}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0">
                    <Link href={route('dashboard')} className="flex items-center gap-3 min-w-0">
                        <svg className="w-7 h-7 shrink-0" viewBox="0 0 36 36" fill="none">
                            <path
                                d="M7 18C7 13.58 10.58 10 15 10C18.2 10 20.9 11.9 22.1 14.6L24.4 20C25.4 22.3 27.6 23.8 30.1 23.8C33.4 23.8 36 21.2 36 17.9C36 14.6 33.4 12 30.1 12"
                                stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round"
                            />
                            <path
                                d="M29 18C29 22.42 25.42 26 21 26C17.8 26 15.1 24.1 13.9 21.4L11.6 16C10.6 13.7 8.4 12.2 5.9 12.2C2.6 12.2 0 14.8 0 18.1C0 21.4 2.6 24 5.9 24"
                                stroke="#818cf8" strokeWidth="3.5" strokeLinecap="round"
                            />
                        </svg>
                        {(sidebarOpen || mobileOpen) && (
                            <div className="truncate">
                                <p className="text-sm font-bold text-white tracking-tight leading-none">
                                    Porto<span className="text-indigo-400">Dipta</span>
                                </p>
                                <p className="text-[10px] text-zinc-500 mt-0.5 leading-none">Admin Panel</p>
                            </div>
                        )}
                    </Link>

                    {/* Collapse toggle — desktop only */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hidden lg:flex ml-auto w-6 h-6 items-center justify-center rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition shrink-0"
                        title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                    {(sidebarOpen || mobileOpen) && (
                        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                            Menu
                        </p>
                    )}
                    {navItems.map((item) => {
                        const Icon    = item.icon;
                        const isActive = route().current(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={route(item.href)}
                                title={!sidebarOpen && !mobileOpen ? item.label : undefined}
                                className={[
                                    'group flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition-all duration-150',
                                    isActive
                                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border border-transparent',
                                ].join(' ')}
                            >
                                <Icon
                                    className={`shrink-0 ${isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                {(sidebarOpen || mobileOpen) && (
                                    <div className="truncate min-w-0">
                                        <p className="font-medium leading-none truncate">{item.label}</p>
                                        <p className="text-[10px] mt-0.5 text-zinc-500 truncate">{item.desc}</p>
                                    </div>
                                )}
                                {isActive && (sidebarOpen || mobileOpen) && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="my-3 border-t border-white/5" />

                    {(sidebarOpen || mobileOpen) && (
                        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                            Website
                        </p>
                    )}

                    {/* View website link */}
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={!sidebarOpen && !mobileOpen ? 'Lihat Website' : undefined}
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border border-transparent transition-all"
                    >
                        <Globe
                            className="shrink-0 text-zinc-500 group-hover:text-emerald-400 transition-colors"
                            style={{ width: '18px', height: '18px' }}
                        />
                        {(sidebarOpen || mobileOpen) && (
                            <div className="truncate flex-1 min-w-0">
                                <p className="font-medium leading-none truncate">Lihat Website</p>
                                <p className="text-[10px] mt-0.5 text-zinc-500 truncate">Buka portfolio</p>
                            </div>
                        )}
                        {(sidebarOpen || mobileOpen) && (
                            <ExternalLink className="w-3 h-3 shrink-0 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                        )}
                    </a>
                </nav>

                {/* User card at bottom */}
                <div className="p-3 border-t border-white/5 shrink-0">
                    {(sidebarOpen || mobileOpen) ? (
                        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
                            <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center shrink-0">
                                <User className="w-3.5 h-3.5 text-indigo-300" />
                            </div>
                            <div className="truncate flex-1 min-w-0">
                                <p className="text-xs font-semibold text-zinc-200 truncate">{user?.name ?? 'Admin'}</p>
                                <p className="text-[10px] text-zinc-500 truncate">@{user?.username ?? 'admin'}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0"
                                title="Logout"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <button
                                onClick={handleLogout}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ═══════════════════════════════════════════════
                MAIN CONTENT AREA
            ═══════════════════════════════════════════════ */}
            <div
                className={[
                    'flex-1 flex flex-col min-w-0 transition-all duration-300',
                    sidebarOpen ? 'lg:ml-60' : 'lg:ml-16',
                ].join(' ')}
            >
                {/* ── Top Navbar ─────────────────────────────── */}
                <header className="h-16 shrink-0 sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 bg-[#0f1117]/80 backdrop-blur-md border-b border-white/5">
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <Shield className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span>Admin</span>
                            {title && (
                                <>
                                    <ChevronRight className="w-3 h-3 shrink-0" />
                                    <span className="text-zinc-300 font-medium truncate">{title}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Live preview pill */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Preview
                            <ExternalLink className="w-3 h-3" />
                        </a>

                        {/* User dropdown */}
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition"
                            >
                                <div className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
                                    <User className="w-3 h-3 text-indigo-300" />
                                </div>
                                <span className="text-xs font-medium text-zinc-200 hidden sm:block">
                                    {user?.name ?? 'Admin'}
                                </span>
                                <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1a1d2e] border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-xs font-semibold text-zinc-200">{user?.name ?? 'Admin'}</p>
                                        <p className="text-[11px] text-zinc-500">@{user?.username ?? 'admin'}</p>
                                    </div>
                                    <div className="p-1">
                                        <Link
                                            href={route('admin.users.index')}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-white/5 hover:text-zinc-100 transition"
                                        >
                                            <Users className="w-3.5 h-3.5 text-indigo-400" />
                                            Kelola Admin
                                        </Link>
                                        <a
                                            href="/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-white/5 hover:text-zinc-100 transition"
                                        >
                                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                            Lihat Website
                                            <ExternalLink className="w-3 h-3 ml-auto text-zinc-600" />
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── Page Content ───────────────────────────── */}
                <main className="flex-1 overflow-y-auto">
                    <div key={url} className="page-transition min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
