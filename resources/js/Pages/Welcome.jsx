import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import TechIcon from '@/Components/TechIcon';
import { ArrowRight, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [activeTab, setActiveTab] = useState('home');

    const skills = [
        { name: 'Typescript', icon: 'typescript' },
        { name: 'Java', icon: 'java' },
        { name: 'Swift', icon: 'swift' },
        { name: 'Kotlin', icon: 'kotlin' },
        { name: 'Typescript', icon: 'typescript' },
        { name: 'Java', icon: 'java' },
    ];

    const labExperiments = [
        {
            title: 'KMP Architecture Sandbox',
            tag: 'Kotlin Multiplatform',
            desc: 'Exploring clean architecture and state management across Android & iOS native targets.',
            stars: '42',
        },
        {
            title: 'SwiftUI Dynamic Island Widget',
            tag: 'iOS / SwiftUI',
            desc: 'Interactive live activity widgets with smooth haptic feedback and animations.',
            stars: '28',
        }
    ];

    return (
        <PortfolioLayout activeTab={activeTab} onTabChange={setActiveTab}>
            <Head title="M Vigi - Software Engineer" />

            <div className="space-y-12">
                {/* Profile Header */}
                <header className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
                                alt="Profile avatar"
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    // Fallback if network image is blocked
                                    e.target.onerror = null;
                                    e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=Vigi";
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                            M Vigi
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Software Engineer
                        </p>
                    </div>
                </header>

                {/* About Me Section */}
                <section aria-labelledby="about-heading" className="space-y-3">
                    <h2 id="about-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        About Me
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        Hey there! 👋 I'm a passionate Mobile Developer, specializing in cross-platform and native development using Kotlin Multiplatform, SwiftUI, and Jetpack Compose. Experienced in building scalable mobile applications with shared business logic and fully native user interfaces.
                    </p>
                </section>

                {/* Me / Skills Section */}
                <section aria-labelledby="me-heading" className="space-y-4">
                    <h2 id="me-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Me
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        I bring a wide range of skills and tools. Throughout the years, I've engaged with various technologies and platforms. My curiosity and passion for building products inspire me to consistently refine and broaden my expertise.
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors duration-150 group cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                            >
                                <TechIcon name={skill.icon} className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest from Labs Section */}
                <section aria-labelledby="labs-heading" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 id="labs-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Latest from Labs
                        </h2>
                        <a
                            href="#labs"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab('labs');
                            }}
                            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1"
                            aria-label="View all labs"
                            title="View all labs"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Card with subtle dot pattern */}
                    <div className="relative w-full min-h-[220px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-6 overflow-hidden shadow-sm">
                        {/* Dot Pattern Background */}
                        <div 
                            className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-25"
                            style={{
                                backgroundImage: `radial-gradient(#a1a1aa 0.75px, transparent 0.75px)`,
                                backgroundSize: '16px 16px',
                            }}
                        />

                        {/* Interactive Content inside Labs Card */}
                        <div className="relative z-10 grid sm:grid-cols-2 gap-4 h-full">
                            {labExperiments.map((lab, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/70 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                {lab.tag}
                                            </span>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                        <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {lab.title}
                                        </h3>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                                            {lab.desc}
                                        </p>
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                                        <span>Active Experiment</span>
                                        <span>★ {lab.stars}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PortfolioLayout>
    );
}
