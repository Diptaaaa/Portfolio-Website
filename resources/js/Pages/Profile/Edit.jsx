import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, Shield, KeyRound, AlertTriangle } from 'lucide-react';

export default function Edit({ status }) {
    return (
        <AdminLayout title="Profil & Keamanan Akun">
            <Head title="Profil & Keamanan Akun — Admin" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-100">Profil & Keamanan Akun</h1>
                        <p className="text-xs text-zinc-400">Kelola kredensial login, kata sandi, dan keamanan akun Anda</p>
                    </div>
                </div>

                {/* Profile Info Card */}
                <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
                        <Shield className="w-4 h-4" />
                        <span>Kredensial Akun Administrator</span>
                    </div>
                    <UpdateProfileInformationForm
                        status={status}
                        className="max-w-2xl"
                    />
                </div>

                {/* Password Update Card */}
                <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-white/5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                        <KeyRound className="w-4 h-4" />
                        <span>Perbarui Kata Sandi</span>
                    </div>
                    <UpdatePasswordForm className="max-w-2xl" />
                </div>

                {/* Delete Account Card */}
                <div className="p-6 rounded-2xl bg-[#1a1d2e] border border-rose-500/20 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Hapus Akun</span>
                    </div>
                    <DeleteUserForm className="max-w-2xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
