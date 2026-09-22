import { Head, usePage } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import TechIcon from '@/Components/TechIcon';
import { getAvatarStyle } from '@/Utils/avatarHelper';
import {
    Mail,
    Phone,
    ExternalLink,
    MapPin,
    GraduationCap,
    Briefcase,
    FolderGit2,
    Award,
    MessageSquare,
    Send,
    Calendar,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    BarChart3,
    Database,
    FileSpreadsheet,
    BrainCircuit,
    ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const { props } = usePage();
    const settings = props.portfolio_settings || {};
    const [filterCategory, setFilterCategory] = useState('all');

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

    const projects = [
        {
            id: 'cyclistic',
            title: 'Cyclistic Bike-Share: Maximizing Annual Memberships',
            subtitle: 'Google Capstone Project',
            category: 'data',
            period: 'Aug 2026',
            badge: 'Google Certified',
            metrics: '5.5M+ Records',
            tools: ['Python', 'SQL', 'Excel', 'Tableau'],
            points: [
                'Processed, cleaned, and structured over 5.5 million historical bike trip records from Chicago\'s Cyclistic program using Python (Pandas) and SQL.',
                'Discovered distinct user behaviors: casual riders averaged twice the duration during weekend leisure hours (27.2 mins), whereas annual members dominated peak weekday commute times (8:00 AM & 5:00 PM, 13.6 mins).',
                'Formulated 3 data-backed marketing strategies aimed at converting high-volume casual weekend riders into long-term annual members.'
            ]
        },
        {
            id: 'moodle',
            title: 'Moodle LMS Development & Digital Learning Integration',
            subtitle: 'SMA Negeri 1 Sooko Mojokerto',
            category: 'tech',
            period: 'Jun - Aug 2025',
            badge: 'Institutional Scale',
            metrics: '1,100+ Students',
            tools: ['Moodle LMS', 'Database', 'Server Infra', 'UX Design'],
            points: [
                'Engineered and deployed an institutional Moodle LMS onto school server infrastructure using the SAM (Successive Approximations Model) framework, scaling digital learning for 1,100+ students.',
                'Customized platform UI/UX, built structured course environments, and integrated digital assessment pipelines (Blackboard Quiz Generator) across a 2-month hybrid development setup.',
                'Streamlined e-learning workflows and user access architecture under Kurikulum Merdeka guidelines.'
            ]
        },
        {
            id: 'interactive-media',
            title: 'Interactive Digital Media Integration for History Learning',
            subtitle: 'SMAN 1 Kedungwaru',
            category: 'tech',
            period: 'Mar - Jun 2025',
            badge: 'Agile SAM Prototyping',
            metrics: '3 Core Suites',
            tools: ['Canva', 'PowerPoint', 'AI Tools', 'Video Editing'],
            points: [
                'Co-developed an interactive digital learning suite for 10th-grade Indonesian History (Hindu-Buddhist and Islamic Era modules) aligned with Kurikulum Merdeka.',
                'Served as Video Editor & Lead Media Designer, producing 3 core deliverables: storytelling videos (CapCut), interactive slide modules with TTS AI and quizzes (PowerPoint), and visual infographics (Canva).',
                'Executed an agile 4-month media prototyping and testing workflow in collaboration with 1 faculty subject-matter expert.',
                'Utilized the Successive Approximations Model (SAM) for agile media prototyping, testing, and continuous refinement.'
            ]
        }
    ];

    const workExperiences = [
        {
            company: 'Brawijaya Smart School (BSS)',
            location: 'Malang, East Java',
            role: 'Teacher Intern – Informatics & School Observer',
            period: 'Aug - Oct 2025',
            highlights: [
                'Designed and executed Grade 10 Informatics lesson plans under Kurikulum Merdeka, focusing on Computer Systems and OS architecture for classes of 30–32 students.',
                'Engineered interactive instructional materials across 3 platforms (Canva, Google Forms, Wayground) and integrated gamified learning systems (Blooket) in classes X-1 and X-2.',
                'Supported daily academic administration, student discipline protocols (weekly 5S routine), community outreach supervision ("Brascho Nyantrik"), and videotron content creation.'
            ]
        },
        {
            company: 'SMA Negeri 1 Sooko',
            location: 'Mojokerto, East Java',
            role: 'Educational Technology Intern',
            period: 'Jun - Aug 2025',
            highlights: [
                'Configured, customized, and deployed a Moodle-based LMS directly onto school server infrastructure, scaling centralized digital learning for 1,100+ students.',
                'Streamlined digital learning workflows and user access control, ensuring seamless platform adoption across teaching staff and students.',
                'Executed the project over 2 months through a hybrid setup (on-site server hosting and remote LMS UI/UX design) under school IT faculty supervision.'
            ]
        },
        {
            company: 'SMAN 1 Kedungwaru',
            location: 'Tulungagung, East Java',
            role: 'Instructional Media Developer',
            period: 'Mar - Jun 2025',
            highlights: [
                'Produced 3 core deliverables: interactive presentation suites, visual infographics, and instructional videos tailored for Grade 10 Indonesian History.',
                'Collaborated closely with a Grade 10 History teacher to restructure digital learning materials and improve student comprehension.',
                'Engaged in a 4-month project development cycle under faculty mentorship specializing in multimodal learning frameworks.'
            ]
        },
        {
            company: 'TIKI (HANI & HANUM Outlets)',
            location: 'Berau, East Kalimantan',
            role: 'Shipping Clerk',
            period: 'Feb - Aug 2022',
            highlights: [
                'Processed daily shipping operations, package intake, data entry, and waybill generation within logistics systems with high accuracy.',
                'Ensured outgoing shipments strictly complied with logistics safety standards regarding weight, volume, and packaging integrity.',
                'Provided front-desk customer support to assist clients with service selection and shipment tracking while preparing daily dispatch manifests.'
            ]
        }
    ];

    const organizationalExperiences = [
        {
            org: 'Asrama Banua Malang',
            role: 'Dormitory President',
            period: 'Jan 2024 - Present',
            badge: 'Leadership',
            points: [
                'Led and managed dormitory operations, executive board activities, and student development programs across 3 consecutive terms.',
                'Spearheaded the Dormitory Orientation Program (PEKA) for incoming freshman residents, facilitating onboarding and community integration.',
                'Designed and executed leadership development initiatives for new residents to foster strong community values and succession.'
            ]
        },
        {
            org: 'Unit Mahasiswa Masjid Raden Patah (UMAR)',
            role: 'Public Relations Staff',
            period: 'Nov 2024 - Jul 2025',
            badge: 'PR & Media',
            points: [
                'Served as primary liaison between mosque administration, congregation, and external stakeholders to strengthen institutional partnerships.',
                'Initiated and produced the "SIRAH" Podcast (Siaran Inspirasi Masjid Raden Patah) held at Malang Creative Center (MCC) in 2025 to expand digital outreach.',
                'Organized a comparative study program with external mosque executive boards at Permata Jingga Mosque in 2025.'
            ]
        },
        {
            org: 'MindCare',
            role: 'Event Staff',
            period: 'Jan - Dec 2023',
            badge: 'Community',
            points: [
                'Created and curated educational content on mental health to promote emotional well-being and drive advocacy against stigma.',
                'Facilitated peer support initiatives and assisted community members in navigating personal challenges within a supportive discussion environment.'
            ]
        }
    ];

    const keySkills = [
        { name: 'Python (Pandas)', category: 'Analytics', icon: 'python' },
        { name: 'SQL & DBMS', category: 'Database', icon: 'sql' },
        { name: 'Microsoft Excel', category: 'Analytics', icon: 'excel' },
        { name: 'Tableau', category: 'Visualization', icon: 'tableau' },
        { name: 'Claude AI Platform', category: 'AI Analytics', icon: 'ai' },
        { name: 'Data Wrangling', category: 'Data Prep', icon: 'database' },
        { name: 'Data Storytelling', category: 'Reporting', icon: 'excel' },
        { name: 'Web Fundamentals', category: 'Development', icon: 'meta' }
    ];

    const certifications = [
        { title: 'Google Data Analytics Professional', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Microsoft Office Desktop Application', issuer: 'Trust Training Partners (Microsoft Partner)', year: '2026', icon: 'microsoft' },
        { title: 'Introduction to Data Analysis Using Python', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Share Data Through the Art of Visualization', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Process Data from Dirty to Clean', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Ask Questions to Make Data-Driven Decisions', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Foundations: Data, Data, Everywhere', issuer: 'Google', year: '2026', icon: 'google' },
        { title: 'Introduction to Front-End Development', issuer: 'Meta', year: '2026', icon: 'meta' },
        { title: 'Programming with JavaScript', issuer: 'Meta', year: '2026', icon: 'meta' },
        { title: 'ICP HUB Indonesia Builder\'s Day', issuer: 'ICP Indonesia', year: '2025', icon: 'meta' },
        { title: 'Color and Typography', issuer: 'MySkill', year: '2024', icon: 'meta' },
        { title: 'AI Jumpstart Programme Roadshow', issuer: 'Instellar', year: '2024', icon: 'ai' },
        { title: 'Training AI Model With GPU', issuer: 'NVIDIA', year: '2022', icon: 'nvidia' },
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

    return (
        <PortfolioLayout>
            <Head title="Muhammad Rafli Pradipta - Data Analyst & IT Graduate" />

            <div className="space-y-16">
                {/* Profile Header & Contact Info */}
                <section id="about" className="space-y-6 scroll-mt-24">
                    <header className="flex flex-col sm:flex-row sm:items-center gap-5">
                        {/* Interactive Animated Avatar */}
                        <div className="relative avatar-group cursor-pointer flex-shrink-0 select-none group/avatar">
                            {/* Ambient Glow Aura Behind Avatar */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-40 blur-md group-hover/avatar:opacity-90 group-hover/avatar:blur-lg transition-all duration-300 pointer-events-none" />

                            {/* Premium Gradient Ring (Non-rotating) */}
                            <div className="relative p-[2.5px] rounded-full avatar-gradient-ring transition-transform duration-300 ease-out group-hover/avatar:scale-105">
                                {/* Inner Avatar Frame */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-2 border-white dark:border-zinc-950 relative shadow-inner">
                                    <img
                                        src={settings.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"}
                                        alt={settings.full_name || "Muhammad Rafli Pradipta"}
                                        className="w-full h-full transition-transform duration-500 ease-out group-hover/avatar:scale-105"
                                        style={getAvatarStyle(settings)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(settings.full_name || 'Rafli Pradipta')}`;
                                        }}
                                    />
                                    {/* Holographic Light Sheen / Glass Sweep Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover/avatar:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                </div>
                            </div>

                            {/* Active Online Indicator Pulse Badge */}
                            <span
                                className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950 shadow-md flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover/avatar:scale-110"
                                title="Active / Available"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping opacity-75" />
                            </span>
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

                    {/* Profile Summary Card */}
                    <div className="p-5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{settings.summary_title || 'Profile Summary'}</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {settings.bio_summary || 'Detail-oriented Data Analyst and Information Technology Education graduate (GPA 3.75/4.00) with strong expertise in end-to-end data processing, exploratory analysis, and data visualization. Proficient in Python (Pandas), SQL, and Microsoft Excel to clean complex datasets, query relational databases, and extract actionable business insights. Skilled in leveraging modern AI analytics workflows to optimize data processing pipelines and streamline reporting. Adept at translating complex data findings into data-backed strategic recommendations and communicating effectively with technical and non-technical stakeholders.'}
                        </p>
                    </div>

                    {/* Education Card */}
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
                                        <div className="flex items-center gap-2.5">
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

                {/* Project Experience Section */}
                <section id="projects" className="space-y-6 scroll-mt-24">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <FolderGit2 className="w-4 h-4 text-indigo-500" />
                                <span>Project Experience</span>
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                High-impact projects in data analytics, e-learning platforms, and digital media
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <article
                                key={proj.id}
                                className="p-5 sm:p-6 rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-sm space-y-4"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-sm sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                                                {proj.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                            <span className="font-medium text-zinc-700 dark:text-zinc-300">{proj.subtitle}</span>
                                            <span>&middot;</span>
                                            <span className="font-mono">{proj.period}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-start">
                                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                                            {proj.badge}
                                        </span>
                                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                            {proj.metrics}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                    {proj.points.map((pt, idx) => (
                                        <li key={idx}>{pt}</li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                                    {proj.tools.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Work Experience Section */}
                <section id="experience" className="space-y-6 scroll-mt-24">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-indigo-500" />
                            <span>Work Experience</span>
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Professional internships in informatics instruction, EdTech, and operational systems
                        </p>
                    </div>

                    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 space-y-8 pl-6">
                        {workExperiences.map((work, index) => (
                            <div key={index} className="relative group">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                                <div className="space-y-1.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            {work.role}
                                        </h3>
                                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                                            {work.period}
                                        </span>
                                    </div>

                                    <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                        <span>{work.company}</span>
                                        <span>&middot;</span>
                                        <span className="text-zinc-500 dark:text-zinc-400 font-normal">{work.location}</span>
                                    </div>

                                    <ul className="space-y-1.5 pt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                        {work.highlights.map((h, idx) => (
                                            <li key={idx}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Organizational Experience Section */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Award className="w-4 h-4 text-indigo-500" />
                            <span>Organizational Experience</span>
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Executive leadership, community outreach, and digital communication initiatives
                        </p>
                    </div>

                    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 space-y-8 pl-6">
                        {organizationalExperiences.map((org, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                {org.role}
                                            </h3>
                                            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                                {org.badge}
                                            </span>
                                        </div>
                                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                                            {org.period}
                                        </span>
                                    </div>

                                    <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                        {org.org}
                                    </div>

                                    <ul className="space-y-1.5 pt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside pl-4 marker:text-zinc-400">
                                        {org.points.map((p, idx) => (
                                            <li key={idx}>{p}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills & Tools Section */}
                <section id="skills" className="space-y-6 scroll-mt-24">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-indigo-500" />
                            <span>Skills & Analytical Tools</span>
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Core technical competencies, tools, and languages used in data workflows
                        </p>
                    </div>

                    {/* Featured Tool Badges */}
                    <div className="flex flex-wrap gap-2">
                        {keySkills.map((skill, idx) => (
                            <div
                                key={idx}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm transition group"
                            >
                                <TechIcon name={skill.icon} className="w-4 h-4" />
                                <div>
                                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block leading-tight">
                                        {skill.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                        {skill.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skill Breakdown Categories */}
                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80">
                            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                                Hard Skills
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Data Analysis, Querying & DBMS, Statistical Analysis, Data Visualization & Reporting, AI-Assisted Analytics, Web Fundamentals.
                            </p>
                        </div>

                        <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80">
                            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                                Soft Skills
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Communication, Problem-Solving, Adaptability, Attention to Detail, Stakeholder Coordination, Time Management.
                            </p>
                        </div>

                        <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80">
                            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                                Languages
                            </h4>
                            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                                <div><strong className="text-zinc-800 dark:text-zinc-200">Indonesian:</strong> Native</div>
                                <div><strong className="text-zinc-800 dark:text-zinc-200">English:</strong> Limited Working / Intermediate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications Section */}
                <section id="certifications" className="space-y-6 scroll-mt-24">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Award className="w-4 h-4 text-emerald-500" />
                                <span>Certifications & Verified Credentials</span>
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Verified professional certificates from Google, Microsoft, Meta, and NVIDIA
                            </p>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            13 Credentials
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition flex items-start gap-3 shadow-sm"
                            >
                                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex-shrink-0">
                                    <TechIcon name={cert.icon} className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center justify-between gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                        <span className="truncate">{cert.issuer}</span>
                                        <span className="font-mono text-zinc-400 flex-shrink-0">{cert.year}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="space-y-6 pt-4 scroll-mt-24 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-indigo-500" />
                            <span>Let's Connect</span>
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Open to data analyst roles, educational technology collaborations, or professional discussions
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        <a
                            href="https://wa.me/qr/OR62X7KAFNBEF1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        WhatsApp
                                    </span>
                                    <span className="text-xs text-zinc-500 font-mono">
                                        +62 877 7375 9636
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>

                        <a
                            href="mailto:raflipradipta321@gmail.com"
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-red-500/5 hover:border-red-500/30 transition flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        Email
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        raflipradipta321@gmail.com
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/muhammad-rafli-pradipta-45b165288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-blue-500/5 hover:border-blue-500/30 transition flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <TechIcon name="linkedin" className="w-4 h-4 text-[#0A66C2]" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        LinkedIn
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        muhammad-rafli-pradipta
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>

                        <a
                            href="https://www.instagram.com/rrafli.pd?igsi=MXJrZTJzeTZpeWRiMQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-pink-500/5 hover:border-pink-500/30 transition flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                                    <TechIcon name="instagram" className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        Instagram
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        @rrafli.pd
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>

                        <a
                            href="https://portoraflipradipta.my.canva.site/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-purple-500/5 hover:border-purple-500/30 transition flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                                        Canva Portfolio
                                    </span>
                                    <span className="text-xs text-zinc-500 truncate max-w-[170px] block">
                                        portoraflipradipta.my.canva.site
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                    </div>
                </section>
            </div>
        </PortfolioLayout>
    );
}
