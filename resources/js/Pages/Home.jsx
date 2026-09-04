import { Head, Link, usePage } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import TechIcon from '@/Components/TechIcon';
import { getAvatarStyle } from '@/Utils/avatarHelper';
import { 
    Mail, 
    Phone, 
    ExternalLink, 
    MapPin, 
    Sparkles, 
    ArrowRight,
    FolderGit2,
    Briefcase,
    Award
} from 'lucide-react';

export default function Home() {
    const { props } = usePage();
    const settings = props.portfolio_settings || {};

    const contactLinks = [
        {
            label: 'WhatsApp',
            value: settings.whatsapp_number || '+62 877 7375 9636',
            href: settings.whatsapp_url || 'https://wa.me/qr/OR62X7KAFNBEF1',
            icon: Phone,
            color: 'hover:text-emerald-500 dark:hover:text-emerald-400'
        },
        {
            label: 'Email',
            value: settings.email || 'raflipradipta321@gmail.com',
            href: `mailto:${settings.email || 'raflipradipta321@gmail.com'}`,
            icon: Mail,
            color: 'hover:text-red-500 dark:hover:text-red-400'
        },
        {
            label: 'LinkedIn',
            value: settings.linkedin_username || 'muhammad-rafli-pradipta',
            href: settings.linkedin_url || 'https://www.linkedin.com/in/muhammad-rafli-pradipta-45b165288/',
            techIcon: 'linkedin',
            color: 'hover:text-blue-500 dark:hover:text-blue-400'
        },
        {
            label: 'Instagram',
            value: settings.instagram_username || '@rrafli.pd',
            href: settings.instagram_url || 'https://www.instagram.com/rrafli.pd?igsi=MXJrZTJzeTZpeWRiMQ==',
            techIcon: 'instagram',
            color: 'hover:text-pink-500 dark:hover:text-pink-400'
        },
        {
            label: settings.canva_label || 'Canva Portfolio',
            value: 'portoraflipradipta.my.canva.site',
            href: settings.canva_url || 'https://portoraflipradipta.my.canva.site/',
            icon: ExternalLink,
            color: 'hover:text-purple-500 dark:hover:text-purple-400'
        }
    ];

    const coursework = [
        'Data Analytics',
        'Information Systems Analysis & Design',
        'Database Management Systems',
        'Educational Technology',
        'Instructional Design',
        'Operating Systems',
        'Computer Networks'
    ];

    const quickLinks = [
        {
            title: 'Project Showcase',
            desc: 'Google Capstone (5.5M+ records), Moodle LMS (1,100+ students), and interactive suites.',
            href: '/projects',
            icon: FolderGit2,
            action: 'Explore Projects'
        },
        {
            title: 'Professional Experience',
            desc: 'Informatics instruction at BSS, EdTech deployment, and student executive leadership.',
            href: '/experience',
            icon: Briefcase,
            action: 'View Timeline'
        },
        {
            title: 'Skills & 13 Certifications',
            desc: 'Python, SQL, Excel, Tableau, plus verified credentials from Google, Meta, and Microsoft.',
            href: '/skills',
            icon: Award,
            action: 'Check Credentials'
        }
    ];

    return (
        <PortfolioLayout>
            <Head title="Muhammad Rafli Pradipta - Data Analyst & IT Graduate" />

            <div className="space-y-12">
                {/* Profile Header */}
                <header className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md flex-shrink-0">
                        <img
                            src={settings.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"}
                            alt={settings.full_name || "Muhammad Rafli Pradipta"}
                            className="w-full h-full"
                            style={getAvatarStyle(settings)}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(settings.full_name || 'Rafli Pradipta')}`;
                            }}
                        />
                    </div>

                    <div className="space-y-1 flex-1">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
                            {settings.full_name || 'Muhammad Rafli Pradipta'}
                        </h1>
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            {settings.job_title || 'Data Analyst & Information Technology Education Graduate'}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{settings.location || 'Malang, East Java, Indonesia'}</span>
                        </div>
                    </div>
                </header>

                {/* Contact Badges Row */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {contactLinks.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={idx}
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 transition-colors shadow-sm ${item.color}`}
                            >
                                {item.techIcon ? (
                                    <TechIcon name={item.techIcon} className="w-3.5 h-3.5" />
                                ) : (
                                    <Icon className="w-3.5 h-3.5" />
                                )}
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Profile Summary */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{settings.summary_title || 'PROFILE SUMMARY'}</span>
                    </div>
                    <div className="p-5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                            {settings.bio_summary || 'Detail-oriented Data Analyst and Information Technology Education graduate (GPA 3.75/4.00) with strong expertise in end-to-end data processing, exploratory analysis, and data visualization. Proficient in Python (Pandas), SQL, and Microsoft Excel to clean complex datasets, query relational databases, and extract actionable business insights. Skilled in leveraging modern AI analytics workflows to optimize data processing pipelines and streamline reporting. Adept at translating complex data findings into data-backed strategic recommendations and communicating effectively with technical and non-technical stakeholders.'}
                        </p>
                    </div>
                </section>

                {/* Education */}
                <section className="space-y-3">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Education
                    </h2>

                    <div className="space-y-3">
                        {(props.educations && props.educations.length > 0 ? props.educations : [
                            {
                                id: 'default',
                                institution: 'Universitas Brawijaya',
                                degree: "Faculty of Computer Science · Bachelor's in IT Education",
                                period: 'Aug 2022 - Aug 2026',
                                gpa: 'GPA 3.75 / 4.00',
                                logo_url: '/images/ub-logo.svg',
                                coursework: coursework,
                            }
                        ]).map((item, index) => {
                            const courses = Array.isArray(item.coursework)
                                ? item.coursework
                                : (typeof item.coursework === 'string' ? item.coursework.split(',').map(s => s.trim()).filter(Boolean) : []);

                            return (
                                <div 
                                    key={item.id || index}
                                    className="p-5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 space-y-3 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.logo_url || "/images/ub-logo.svg"}
                                                alt={`Logo ${item.institution}`}
                                                className="w-10 h-10 object-contain flex-shrink-0"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Logo_Universitas_Brawijaya.svg";
                                                }}
                                            />
                                            <div>
                                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {item.institution}
                                                </h3>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {item.degree}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block">
                                                {item.period}
                                            </span>
                                            {item.gpa && (
                                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                    {item.gpa.startsWith('GPA') ? item.gpa : `GPA ${item.gpa}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {courses.length > 0 && (
                                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                                            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block mb-2">
                                                Relevant Coursework:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {courses.map((course, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Explore Portfolio Sections */}
                <section className="space-y-4 pt-2">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Explore Sections
                    </h2>

                    <div className="grid gap-3">
                        {quickLinks.map((link, idx) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/80 transition group flex items-center justify-between shadow-sm"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {link.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                {link.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition flex-shrink-0 ml-2" />
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </PortfolioLayout>
    );
}
