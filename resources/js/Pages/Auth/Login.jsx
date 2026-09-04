import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import LoginIllustration from '@/Components/LoginIllustration';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-[#e0f2fe] flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden font-sans">
            <Head title="Login Administrator - Portofolio Dipta" />

            {/* Background Decorative Fluid Shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-300/30 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none" />

            {/* Main Floating Card */}
            <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-blue-900/15 border border-white/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[530px] transition-all">
                {/* Left Column: Form Area (7 Cols) */}
                <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
                    <div>
                        {/* Brand Logo Header */}
                        <div className="flex items-center justify-between">
                            <Link href="/" className="inline-flex items-center gap-2.5 group">
                                {/* Stylized Ribbon Wave Logo */}
                                <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 36 36" fill="none">
                                    <path
                                        d="M7 18C7 13.58 10.58 10 15 10C18.2 10 20.9 11.9 22.1 14.6L24.4 20C25.4 22.3 27.6 23.8 30.1 23.8C33.4 23.8 36 21.2 36 17.9C36 14.6 33.4 12 30.1 12"
                                        stroke="#0284c7"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M29 18C29 22.42 25.42 26 21 26C17.8 26 15.1 24.1 13.9 21.4L11.6 16C10.6 13.7 8.4 12.2 5.9 12.2C2.6 12.2 0 14.8 0 18.1C0 21.4 2.6 24 5.9 24"
                                        stroke="#00c8ff"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-black tracking-tight text-[#0077c8] uppercase">
                                        PORTO DIPTA
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 transition"
                                title="Kembali ke Portofolio"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Website</span>
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="mt-8 mb-8">
                            <h1 className="text-2xl sm:text-3xl font-light text-zinc-700 tracking-tight">
                                Login Administrator
                            </h1>
                            <p className="text-xs text-zinc-400 mt-1">
                                Panel autentikasi khusus pengelola sistem
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-4 text-xs font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                                {status}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-5">
                            {/* Username Field */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1"
                                >
                                    Username:
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    placeholder="e.g. admin"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('username', e.target.value)}
                                    className="w-full border-0 border-b border-zinc-300 focus:border-[#0284c7] focus:ring-0 px-0 py-1.5 text-sm text-zinc-800 placeholder-zinc-400 bg-transparent transition-colors"
                                />
                                <InputError message={errors.username} className="mt-1 text-xs" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1"
                                >
                                    Password:
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="• • • • • •"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full border-0 border-b border-zinc-300 focus:border-[#0284c7] focus:ring-0 px-0 py-1.5 text-sm text-zinc-800 placeholder-zinc-400 bg-transparent transition-colors tracking-widest"
                                />
                                <InputError message={errors.password} className="mt-1 text-xs" />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center px-10 py-2.5 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:from-[#2563eb] hover:to-[#0891b2] text-white font-medium text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                                >
                                    {processing ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Security Notice */}
                    <div className="pt-8 text-xs text-zinc-400 text-left flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block flex-shrink-0"></span>
                        <span>Akses Terbatas • Pendaftaran akun hanya dikelola oleh Admin</span>
                    </div>
                </div>

                {/* Right Column: Holographic Cyber Illustration (5 Cols) */}
                <div className="hidden md:block md:col-span-5 relative h-full">
                    <LoginIllustration />
                </div>
            </div>
        </div>
    );
}
