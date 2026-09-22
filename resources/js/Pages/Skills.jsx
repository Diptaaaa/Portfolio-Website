import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import TechIcon from '@/Components/TechIcon';
import { Award, BarChart3, CheckCircle2, ShieldCheck, Sparkles, Eye, X, ExternalLink, Code2, Users, Globe, Cpu, BookOpen, Layers, List, LayoutGrid, Check } from 'lucide-react';

const ICON_MAP = {
    Code2,
    Users,
    Globe,
    Cpu,
    BookOpen,
    Layers,
    Award,
    Sparkles,
};

export default function Skills({ 
    certifications = [], 
    keySkills = [], 
    skillCategories = [] 
}) {
    const [selectedCert, setSelectedCert] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedCert(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Split keySkills for the 2 marquee rows
    const half = Math.max(1, Math.ceil(keySkills.length / 2));
    const row1 = keySkills.slice(0, half);
    const row2 = keySkills.slice(half);
    const displayRow1 = row1.length > 0 ? [...row1, ...row1] : [];
    const displayRow2 = row2.length > 0 ? [...row2, ...row2] : [];

    const displayCategories = skillCategories.length > 0 ? [...skillCategories, ...skillCategories] : [];

    return (
        <>
            <Head title="Skills & Certifications - Muhammad Rafli Pradipta" />

            <div className="space-y-12">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1 subtitle-interactive">
                        <Award className="w-4 h-4" />
                        <span>Competencies & Credentials</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 heading-interactive">
                        Skills & Certifications
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed text-interactive">
                        Technical analytical toolsets, domain competencies, and verified professional certificates.
                    </p>
                </div>

                {/* Analytical Tools - Marquee Carousel */}
                <section className="space-y-4">
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 heading-interactive">
                        <BarChart3 className="w-4 h-4 text-indigo-500" />
                        <span>Core Tools & Platforms</span>
                    </h2>

                    {/* Row 1 — scrolls left */}
                    <div className="marquee-container rounded-lg -mx-6">
                        <div className="flex animate-marquee-left w-max">
                            {displayRow1.map((skill, idx) => (
                                <div
                                    key={`r1-${idx}`}
                                    className="flex-shrink-0 w-56 mx-1.5 p-3.5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition flex items-center gap-3 shadow-sm group"
                                >
                                    <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700/70 flex-shrink-0 group-hover:scale-105 transition-transform">
                                        <TechIcon name={skill.icon} className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {skill.name}
                                        </h3>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                            {skill.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — scrolls right */}
                    <div className="marquee-container rounded-lg -mx-6">
                        <div className="flex animate-marquee-right w-max">
                            {displayRow2.map((skill, idx) => (
                                <div
                                    key={`r2-${idx}`}
                                    className="flex-shrink-0 w-56 mx-1.5 p-3.5 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition flex items-center gap-3 shadow-sm group"
                                >
                                    <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700/70 flex-shrink-0 group-hover:scale-105 transition-transform">
                                        <TechIcon name={skill.icon} className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {skill.name}
                                        </h3>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                            {skill.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Detailed Skills Categories - Auto-scrolling Carousel */}
                <section className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-indigo-500" />
                            <span>Core Competencies & Taxonomy</span>
                        </h2>
                        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline-block">
                            Auto-scrolling • Hover to pause
                        </span>
                    </div>

                    <div className="marquee-container rounded-lg -mx-6">
                        <div className="flex animate-marquee-right w-max py-2">
                            {displayCategories.map((cat, idx) => {
                                const IconComponent = typeof cat.icon === 'string' ? (ICON_MAP[cat.icon] || Layers) : (cat.icon || Layers);
                                const skillList = Array.isArray(cat.items) 
                                    ? cat.items 
                                    : (Array.isArray(cat.skills) 
                                        ? cat.skills 
                                        : (typeof cat.items === 'string' ? (()=>{ try { return JSON.parse(cat.items); } catch(e) { return []; } })() : []));

                                return (
                                    <div
                                        key={idx}
                                        className="flex-shrink-0 w-72 sm:w-80 mx-2 p-4 rounded-lg bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                                            {cat.name || cat.title}
                                                        </h3>
                                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                            {cat.category || cat.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                {cat.badge && (
                                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${cat.badge_color || cat.badgeColor || 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800'}`}>
                                                        {cat.badge}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {skillList.map((skill, sIdx) => (
                                                    <span
                                                        key={sIdx}
                                                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 tool-tag badge-interactive"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Verified Certifications */}
                <section className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="space-y-0.5 min-w-0">
                            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span>Verified Certifications</span>
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Klik salah satu sertifikat untuk melihat tampilan penuh
                            </p>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:emerald-400 border border-emerald-200 dark:border-emerald-800 hidden sm:inline-block">
                                {certifications.length} Credential Records
                            </span>

                            {/* View Mode Toggle Pill Button */}
                            <div className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-0.5 shadow-xs">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                        viewMode === 'list'
                                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300/70 dark:border-sky-800 shadow-xs'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                    }`}
                                    title="Tampilan List"
                                    aria-label="Tampilan List"
                                >
                                    {viewMode === 'list' && <Check className="w-3.5 h-3.5 stroke-[2.5] text-sky-700 dark:text-sky-300" />}
                                    <List className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300/70 dark:border-sky-800 shadow-xs'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                    }`}
                                    title="Tampilan Grid"
                                    aria-label="Tampilan Grid"
                                >
                                    {viewMode === 'grid' && <Check className="w-3.5 h-3.5 stroke-[2.5] text-sky-700 dark:text-sky-300" />}
                                    <LayoutGrid className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Container (Visible height: 2 rows) */}
                    <div className="max-h-[535px] overflow-y-auto overscroll-contain pr-1 sm:pr-2 py-1 custom-scrollbar">
                        {viewMode === 'grid' ? (
                            /* Grid View */
                            <div className="grid sm:grid-cols-2 gap-4">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedCert(cert)}
                                        className="group cursor-pointer rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col overflow-hidden"
                                    >
                                        {/* Certificate Image Preview */}
                                        <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-950 overflow-hidden border-b border-zinc-100 dark:border-zinc-800/80">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 text-xs font-medium shadow-lg">
                                                    <Eye className="w-3.5 h-3.5 text-indigo-500" />
                                                    <span>Lihat Sertifikat</span>
                                                </span>
                                            </div>
                                            {/* Year badge */}
                                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono shadow-sm border border-zinc-200/60 dark:border-zinc-700/60">
                                                {cert.year}
                                            </span>
                                        </div>

                                        {/* Certificate Details Footer */}
                                        <div className="p-3.5 flex items-start gap-3 flex-1">
                                            <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex-shrink-0 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors">
                                                <TechIcon name={cert.icon} className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {cert.title}
                                                </h3>
                                                <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                    <span className="truncate">{cert.issuer}</span>
                                                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 flex-shrink-0">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-2.5">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedCert(cert)}
                                        className="group cursor-pointer p-3 sm:p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                                            {/* Thumbnail */}
                                            <div className="relative w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-950 flex-shrink-0">
                                                <img
                                                    src={cert.image}
                                                    alt={cert.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Title, Issuer & Details */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                        {cert.title}
                                                    </h3>
                                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                                                        {cert.year}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 flex-wrap">
                                                    <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                                                        <TechIcon name={cert.icon} className="w-3.5 h-3.5" />
                                                        <span>{cert.issuer}</span>
                                                    </span>
                                                    {(cert.cred_id || cert.credId) && (
                                                        <>
                                                            <span>&middot;</span>
                                                            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                                                                ID: {cert.cred_id || cert.credId}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right status & action */}
                                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                            <span className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                <span className="hidden sm:inline">Verified</span>
                                            </span>
                                            <div className="p-1.5 rounded-lg text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition">
                                                <Eye className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Certificate Modal Lightbox */}
            {selectedCert && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-150"
                    onClick={() => setSelectedCert(null)}
                >
                    <div 
                        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 bg-zinc-50/70 dark:bg-zinc-950/40">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <TechIcon name={selectedCert.icon} className="w-4 h-4 flex-shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                        {selectedCert.title}
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {selectedCert.issuer} • Issued {selectedCert.year}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                                aria-label="Tutup"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body: Certificate Image Display */}
                        <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-950/60">
                            <div className="w-full shadow-lg rounded-lg overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-white">
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900">
                            <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                <span>ID: {selectedCert.cred_id || selectedCert.credId || 'VERIFIED-CREDENTIAL'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={selectedCert.image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition"
                                >
                                    <span>Buka Gambar Penuh</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

Skills.layout = (page) => <PortfolioLayout>{page}</PortfolioLayout>;
