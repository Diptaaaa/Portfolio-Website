import { useState, useEffect } from 'react';
import { Home, FlaskConical, Briefcase, Moon, Sun, FileText } from 'lucide-react';

export default function PortfolioLayout({ children, activeTab = 'home', onTabChange }) {
    const [theme, setTheme] = useState('light');
    const [currentTab, setCurrentTab] = useState(activeTab);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
            {/* Main Centered Content */}
            <main className="max-w-2xl mx-auto px-6 pt-16 sm:pt-20 pb-36">
                {children}
            </main>

            {/* Bottom Floating Navigation Dock */}
            <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" aria-label="Navigation dock">
                <nav 
                    role="navigation"
                    aria-label="Main menu"
                    className="flex items-center gap-1 px-3 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 dark:shadow-black/50"
                >
                    <button
                        onClick={() => handleTabClick('home')}
                        className={`p-2.5 rounded-xl transition-all duration-150 ${
                            currentTab === 'home'
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                        }`}
                        title="Home"
                        aria-label="Home"
                    >
                        <Home className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => handleTabClick('labs')}
                        className={`p-2.5 rounded-xl transition-all duration-150 ${
                            currentTab === 'labs'
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                        }`}
                        title="Labs"
                        aria-label="Labs"
                    >
                        <FlaskConical className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => handleTabClick('projects')}
                        className={`p-2.5 rounded-xl transition-all duration-150 ${
                            currentTab === 'projects'
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                        }`}
                        title="Projects"
                        aria-label="Projects"
                    >
                        <Briefcase className="w-4 h-4" />
                    </button>

                    <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-150"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-4 h-4" />
                        ) : (
                            <Sun className="w-4 h-4" />
                        )}
                    </button>
                </nav>
            </aside>

            {/* Bottom Right Floating Resume / PDF Button */}
            <aside className="fixed bottom-6 right-6 z-40" aria-label="Resume download">
                <a
                    href="#resume"
                    onClick={(e) => {
                        e.preventDefault();
                        alert('Resume PDF download dapat dihubungkan ke file CV Anda di public/cv.pdf');
                    }}
                    className="w-10 h-10 rounded-full border-2 border-red-500/80 hover:border-red-600 bg-white dark:bg-zinc-900 flex items-center justify-center text-red-500 hover:text-red-600 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                    title="Download Resume / CV"
                    aria-label="Download Resume / CV"
                >
                    <FileText className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                </a>
            </aside>
        </div>
    );
}
