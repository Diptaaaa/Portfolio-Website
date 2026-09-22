import { Head, usePage } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import TechIcon from '@/Components/TechIcon';
import { 
    MessageSquare, 
    Phone, 
    Mail, 
    ExternalLink, 
    MapPin, 
    ArrowUpRight, 
    Copy, 
    Check, 
    Sparkles 
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { props } = usePage();
    const settings = props.portfolio_settings || {};
    const [copiedEmail, setCopiedEmail] = useState(false);

    const emailAddress = settings.email || 'raflipradipta321@gmail.com';

    const handleCopyEmail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(emailAddress);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <>
            <Head title="Contact - Muhammad Rafli Pradipta" />

            <div className="space-y-10">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1 subtitle-interactive">
                        <MessageSquare className="w-4 h-4" />
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 heading-interactive">
                        Let's Connect
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed text-interactive">
                        Open to Data Analyst opportunities, educational technology initiatives, or discussing data-driven projects.
                    </p>
                </div>

                {/* Main Contact Cards Grid */}
                <div className="grid gap-3">
                    {/* WhatsApp */}
                    <a
                        href={settings.whatsapp_url || "https://wa.me/qr/OR62X7KAFNBEF1"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-emerald-500/50 hover:bg-emerald-500/[0.03] transition flex items-center justify-between group shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    WhatsApp
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                                    {settings.whatsapp_number || "+62 877 7375 9636"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                Chat Directly
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </div>
                    </a>

                    {/* Email */}
                    <div className="p-5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-red-500/50 hover:bg-red-500/[0.03] transition flex items-center justify-between group shadow-sm">
                        <a
                            href={`mailto:${emailAddress}`}
                            className="flex items-center gap-4 flex-1 min-w-0"
                        >
                            <div className="w-11 h-11 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    Email
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                    {emailAddress}
                                </p>
                            </div>
                        </a>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopyEmail}
                                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                                title="Copy Email Address"
                            >
                                {copiedEmail ? (
                                    <Check className="w-4 h-4 text-emerald-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                            <a
                                href={`mailto:${emailAddress}`}
                                className="text-zinc-400 group-hover:text-red-500 p-1"
                            >
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                            </a>
                        </div>
                    </div>

                    {/* LinkedIn */}
                    <a
                        href={settings.linkedin_url || "https://www.linkedin.com/in/muhammad-rafli-pradipta-45b165288/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-blue-500/50 hover:bg-blue-500/[0.03] transition flex items-center justify-between group shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-blue-500/10 text-[#0A66C2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <TechIcon name="linkedin" className="w-5 h-5 text-[#0A66C2]" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    LinkedIn
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {settings.linkedin_username || "muhammad-rafli-pradipta"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                View Profile
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </div>
                    </a>

                    {/* Instagram */}
                    <a
                        href={settings.instagram_url || "https://www.instagram.com/rrafli.pd?igsi=MXJrZTJzeTZpeWRiMQ=="}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-pink-500/50 hover:bg-pink-500/[0.03] transition flex items-center justify-between group shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <TechIcon name="instagram" className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    Instagram
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {settings.instagram_username || "@rrafli.pd"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block text-xs font-medium text-pink-600 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                Follow
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </div>
                    </a>

                    {/* Canva Portfolio */}
                    <a
                        href={settings.canva_url || "https://portoraflipradipta.my.canva.site/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-purple-500/50 hover:bg-purple-500/[0.03] transition flex items-center justify-between group shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    Canva Web Portfolio
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    portoraflipradipta.my.canva.site
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block text-xs font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                Visit Site
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </div>
                    </a>
                </div>

                {/* Location & Status Card */}
                <div className="p-5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Location & Availability
                        </h2>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                            Based in <strong>Malang, East Java, Indonesia</strong>. Available for on-site, hybrid, or remote full-time / internship opportunities in Data Analytics, Educational Technology, and IT systems.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page) => <PortfolioLayout>{page}</PortfolioLayout>;
