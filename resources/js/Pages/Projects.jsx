import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import MediaGallery from '@/Components/MediaGallery';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Projects({ projects = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categoryTabs = useMemo(() => {
        const cats = [...new Set(projects.map(p => p.category))];
        const labelMap = {
            data:    'Data Analytics',
            edtech:  'EdTech & Digital Systems',
            general: 'General',
            web:     'Web Development',
            design:  'Design',
        };
        const tabs = [{ id: 'all', label: `All Projects (${projects.length})` }];
        cats.forEach(c => tabs.push({ id: c, label: labelMap[c] ?? c }));
        return tabs;
    }, [projects]);

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <PortfolioLayout>
            <Head title="Projects - Muhammad Rafli Pradipta" />
            <div className="space-y-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">
                        <FolderGit2 className="w-4 h-4" />
                        <span>Showcase</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Project Experience
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        Data analytics capstones, institutional EdTech implementations, and multimedia learning engineering.
                    </p>
                </div>

                {categoryTabs.length > 1 && (
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 flex-wrap">
                        {categoryTabs.map((tab) => {
                            const active = selectedCategory === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedCategory(tab.id)}
                                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                                        active
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 dark:border dark:border-zinc-700 shadow-sm'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400 dark:text-zinc-500 text-sm">
                        Belum ada proyek dalam kategori ini.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredProjects.map((proj) => (
                            <article
                                key={proj.id}
                                className="p-6 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-sm space-y-4"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                                                {proj.title}
                                            </h2>
                                            {proj.link_url && (
                                                <a href={proj.link_url} target="_blank" rel="noopener noreferrer"
                                                    className="text-indigo-500 hover:text-indigo-600 flex-shrink-0" title="Lihat Proyek">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                            {proj.subtitle && <span className="font-medium text-zinc-700 dark:text-zinc-300">{proj.subtitle}</span>}
                                            {proj.subtitle && proj.period && <span>&middot;</span>}
                                            {proj.period && <span className="font-mono">{proj.period}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-start flex-shrink-0 flex-wrap">
                                        {proj.badge && (
                                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                                                {proj.badge}
                                            </span>
                                        )}
                                        {proj.metrics && (
                                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                {proj.metrics}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {proj.points && proj.points.length > 0 && (
                                    <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                        {proj.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
                                    </ul>
                                )}

                                {proj.images && proj.images.length > 0 && (
                                    <div className="pt-2">
                                        <MediaGallery images={proj.images} maxVisible={6} />
                                    </div>
                                )}

                                {proj.tools && proj.tools.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                                        {proj.tools.map((t, idx) => (
                                            <span key={idx} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
