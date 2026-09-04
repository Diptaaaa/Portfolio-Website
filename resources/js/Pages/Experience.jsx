import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import MediaGallery from '@/Components/MediaGallery';
import { Briefcase, Building2, Users2 } from 'lucide-react';

export default function Experience({ workExperiences = [], organizationalExperiences = [] }) {
    const [activeTab, setActiveTab] = useState('all');

    const totalCount = workExperiences.length + organizationalExperiences.length;

    const tabs = [
        { id: 'all', label: `All Experience (${totalCount})` },
        { id: 'work', label: `Professional Work Experience (${workExperiences.length})` },
        { id: 'organization', label: `Organizational & Leadership Experience (${organizationalExperiences.length})` },
    ];

    const showWork = (activeTab === 'all' || activeTab === 'work') && workExperiences.length > 0;
    const showOrg = (activeTab === 'all' || activeTab === 'organization') && organizationalExperiences.length > 0;

    return (
        <PortfolioLayout>
            <Head title="Experience - Muhammad Rafli Pradipta" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">
                        <Briefcase className="w-4 h-4" />
                        <span>Career & Leadership</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Experience
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        Track record in educational technology, informatics teaching, logistics, and organizational leadership.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 flex-wrap">
                    {tabs.map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
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

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Work Experience Timeline */}
                    {showWork && (
                        <section className="space-y-6">
                            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-indigo-500" />
                                <span>Professional Work Experience</span>
                            </h2>

                            <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 space-y-8 pl-6">
                                {workExperiences.map((work, index) => {
                                    const points = work.points || work.highlights || [];
                                    return (
                                        <div key={work.id || index} className="relative group">
                                            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                                            <div className="space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                                        {work.role}
                                                    </h3>
                                                    {work.period && (
                                                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                                                            {work.period}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 flex-wrap">
                                                    <span>{work.company}</span>
                                                    {work.location && (
                                                        <>
                                                            <span>&middot;</span>
                                                            <span className="text-zinc-500 dark:text-zinc-400 font-normal">{work.location}</span>
                                                        </>
                                                    )}
                                                </div>

                                                {points.length > 0 && (
                                                    <ul className="space-y-1.5 pt-1 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                                        {points.map((pt, idx) => (
                                                            <li key={idx}>{pt}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Documentation Image Gallery */}
                                                {work.images && work.images.length > 0 && (
                                                    <div className="pt-2">
                                                        <MediaGallery images={work.images} maxVisible={6} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Organizational Experience */}
                    {showOrg && (
                        <section className={`space-y-6 ${activeTab === 'all' && showWork ? 'pt-6 border-t border-zinc-100 dark:border-zinc-800/80' : ''}`}>
                            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Users2 className="w-4 h-4 text-indigo-500" />
                                <span>Organizational & Leadership Experience</span>
                            </h2>

                            <div className="grid gap-4">
                                {organizationalExperiences.map((org, index) => {
                                    const points = org.points || org.highlights || [];
                                    return (
                                        <div
                                            key={org.id || index}
                                            className="p-5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-3"
                                        >
                                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                            {org.role}
                                                        </h3>
                                                        {org.badge && (
                                                            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                                                {org.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                                                        {org.company || org.org}
                                                    </p>
                                                </div>
                                                {org.period && (
                                                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                                        {org.period}
                                                    </span>
                                                )}
                                            </div>

                                            {points.length > 0 && (
                                                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                                    {points.map((p, idx) => (
                                                        <li key={idx}>{p}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Documentation Image Gallery */}
                                            {org.images && org.images.length > 0 && (
                                                <div className="pt-1">
                                                    <MediaGallery images={org.images} maxVisible={6} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Empty State when a tab has no data */}
                    {!showWork && !showOrg && (
                        <div className="py-16 text-center text-zinc-500 dark:text-zinc-400 text-sm border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                            Belum ada riwayat pengalaman pada kategori ini.
                        </div>
                    )}
                </div>
            </div>
        </PortfolioLayout>
    );
}
