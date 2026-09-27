import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            username: user.username || '',
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-zinc-100">
                    Informasi Akun Admin
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Perbarui nama lengkap dan username akun administrator Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap Admin" className="!text-zinc-300 text-xs font-semibold" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full !bg-[#0c0e17] !text-white !border-white/15 focus:!border-indigo-500 focus:!ring-indigo-500/30 rounded-xl"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username Login" className="!text-zinc-300 text-xs font-semibold" />

                    <TextInput
                        id="username"
                        type="text"
                        className="mt-1 block w-full !bg-[#0c0e17] !text-white !border-white/15 focus:!border-indigo-500 focus:!ring-indigo-500/30 rounded-xl"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <p className="text-[11px] text-zinc-500 mt-1">
                        Username digunakan untuk login ke sistem admin (huruf kecil, angka, tanda hubung dan garis bawah).
                    </p>

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="!bg-indigo-600 hover:!bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-xs font-semibold">
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs text-emerald-400 font-medium">
                            ✓ Berhasil disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
