import { useState, useEffect } from 'react';
import { 
    Home, 
    BarChart3, 
    Briefcase, 
    Award, 
    MessageSquare, 
    Moon, 
    Sun, 
    FileText,
    ArrowUp
} from 'lucide-react';

export default function PortfolioLayout({ children, activeSection = 'about', onSectionChange }) {
    const [theme, setTheme] = useState('light');
    const [currentSection, setCurrentSection] = useState(activeSection);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
        setTheme(isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }

            // Auto-detect current active section on scroll
            const sections = ['about', 'projects', 'experience', 'skills', 'certifications', 'contact'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 100) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const scrollToSection = (sectionId) => {
        setCurrentSection(sectionId);
        if (onSectionChange) onSectionChange(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 40;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { id: 'about', label: 'About', icon: Home },
        { id: 'projects', label: 'Projects', icon: BarChart3 },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'skills', label: 'Skills & Certs', icon: Award },
        { id: 'contact', label: 'Contact', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
            {/* Top Subtle Status Bar */}
            <div className="border-b border-zinc-100 dark:border-zinc-900 py-2.5 px-6 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-30">
                <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">Available for Opportunities</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 font-mono text-[11px]">
                        <span>Data Analyst & IT</span>
                        <span>•</span>
                        <span>Malang, Indonesia</span>
                    </div>
                </div>
            </div>

            {/* Main Centered Content */}
            <main className="max-w-2xl mx-auto px-6 pt-12 sm:pt-16 pb-36">
                {children}
            </main>

            {/* Bottom Floating Navigation Dock */}
            <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" aria-label="Navigation dock">
                <nav 
                    role="navigation"
                    aria-label="Main menu"
                    className="flex items-center gap-1 sm:gap-1.5 px-3 py-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-black/60"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentSection === item.id || (item.id === 'skills' && currentSection === 'certifications');
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`group relative p-2.5 rounded-xl transition-all duration-150 ${
                                    isActive
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                }`}
                                title={item.label}
                                aria-label={item.label}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}

                    <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                    <button
                        onClick={toggleTheme}
                        className="group relative p-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-150"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-4 h-4" />
                        ) : (
                            <Sun className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                    </button>
                </nav>
            </aside>

            {/* Bottom Right Floating Action / PDF Resume */}
            <aside className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2" aria-label="Quick Actions">
                {showScrollTop && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-md hover:scale-105 transition-all flex items-center justify-center"
                        title="Back to Top"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                )}

                <a
                    href="https://portoraflipradipta.my.canva.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-red-500/80 hover:border-red-600 bg-white dark:bg-zinc-900 flex items-center justify-center text-red-500 hover:text-red-600 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group relative"
                    title="View Canva Portfolio / CV"
                    aria-label="View Canva Portfolio / CV"
                >
                    <FileText className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                        Canva Portfolio
                    </span>
                </a>
            </aside>
        </div>
    );
}
