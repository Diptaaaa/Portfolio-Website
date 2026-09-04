import fs from 'fs';
import path from 'path';

function createMockSvg({ title, subtitle, tag, color = '#6366f1', type = 'dashboard' }) {
    let innerContent = '';

    if (type === 'video') {
        innerContent = `
            <!-- Video editor interface mockup -->
            <rect x="40" y="40" width="480" height="240" rx="8" fill="#18181b" stroke="#27272a" stroke-width="2"/>
            <rect x="540" y="40" width="220" height="240" rx="8" fill="#18181b" stroke="#27272a" stroke-width="2"/>
            <polygon points="260,140 260,180 300,160" fill="${color}"/>
            <circle cx="280" cy="160" r="36" fill="none" stroke="${color}" stroke-width="3" opacity="0.6"/>
            <!-- Timeline tracks -->
            <rect x="40" y="300" width="720" height="150" rx="8" fill="#18181b" stroke="#27272a" stroke-width="2"/>
            <rect x="60" y="320" width="220" height="30" rx="4" fill="${color}" opacity="0.85"/>
            <rect x="300" y="320" width="340" height="30" rx="4" fill="#3b82f6" opacity="0.85"/>
            <rect x="60" y="360" width="460" height="24" rx="4" fill="#10b981" opacity="0.8"/>
            <rect x="60" y="394" width="620" height="24" rx="4" fill="#f59e0b" opacity="0.8"/>
            <!-- Scrubber line -->
            <line x1="380" y1="290" x2="380" y2="460" stroke="#ef4444" stroke-width="2"/>
            <polygon points="374,290 386,290 380,300" fill="#ef4444"/>
        `;
    } else if (type === 'quiz' || type === 'game') {
        innerContent = `
            <!-- Gamified learning / quiz mockup -->
            <rect x="60" y="50" width="680" height="120" rx="10" fill="#18181b" stroke="#27272a" stroke-width="2"/>
            <text x="400" y="115" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#f4f4f5" text-anchor="middle">
                ${title}
            </text>
            <!-- 4 answer choices -->
            <rect x="60" y="190" width="330" height="110" rx="8" fill="#ef4444"/>
            <rect x="410" y="190" width="330" height="110" rx="8" fill="#3b82f6"/>
            <rect x="60" y="320" width="330" height="110" rx="8" fill="#eab308"/>
            <rect x="410" y="320" width="330" height="110" rx="8" fill="#10b981"/>
            <text x="225" y="255" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Choice A</text>
            <text x="575" y="255" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Choice B</text>
            <text x="225" y="385" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Choice C</text>
            <text x="575" y="385" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Choice D</text>
        `;
    } else if (type === 'classroom' || type === 'presentation') {
        innerContent = `
            <!-- Classroom / Presentation mockup -->
            <rect x="80" y="40" width="640" height="260" rx="10" fill="#1e293b" stroke="#334155" stroke-width="3"/>
            <rect x="120" y="70" width="560" height="20" rx="4" fill="${color}" opacity="0.8"/>
            <rect x="120" y="110" width="340" height="14" rx="3" fill="#64748b"/>
            <rect x="120" y="135" width="280" height="14" rx="3" fill="#64748b"/>
            <rect x="120" y="160" width="380" height="14" rx="3" fill="#64748b"/>
            <!-- Speaker & Audience silhouettes -->
            <circle cx="200" cy="370" r="28" fill="#38bdf8"/>
            <path d="M160 460 C160 405 240 405 240 460" fill="#38bdf8"/>
            <circle cx="420" cy="400" r="20" fill="#475569"/>
            <path d="M390 460 C390 425 450 425 450 460" fill="#475569"/>
            <circle cx="500" cy="400" r="20" fill="#475569"/>
            <path d="M470 460 C470 425 530 425 530 460" fill="#475569"/>
            <circle cx="580" cy="400" r="20" fill="#475569"/>
            <path d="M550 460 C550 425 610 425 610 460" fill="#475569"/>
        `;
    } else {
        // Dashboard / Data Charts
        innerContent = `
            <!-- Dashboard Charts & Metrics -->
            <rect x="40" y="40" width="220" height="100" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
            <rect x="280" y="40" width="220" height="100" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
            <rect x="520" y="40" width="240" height="100" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
            <text x="60" y="80" font-family="system-ui, sans-serif" font-size="14" fill="#a1a1aa">Metric Score</text>
            <text x="60" y="115" font-family="system-ui, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">98.4%</text>
            <text x="300" y="80" font-family="system-ui, sans-serif" font-size="14" fill="#a1a1aa">Processed Data</text>
            <text x="300" y="115" font-family="system-ui, sans-serif" font-size="28" font-weight="bold" fill="${color}">5.5M+</text>
            <text x="540" y="80" font-family="system-ui, sans-serif" font-size="14" fill="#a1a1aa">Adoption Rate</text>
            <text x="540" y="115" font-family="system-ui, sans-serif" font-size="28" font-weight="bold" fill="#10b981">+34.2%</text>

            <!-- Chart Bar / Heatmap -->
            <rect x="40" y="160" width="460" height="280" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
            <path d="M70 380 Q 150 280 230 320 T 350 220 T 460 190" fill="none" stroke="${color}" stroke-width="3.5"/>
            <line x1="70" y1="400" x2="470" y2="400" stroke="#3f3f46" stroke-width="1"/>
            
            <!-- Side breakdown -->
            <rect x="520" y="160" width="240" height="280" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
            <circle cx="640" cy="250" r="55" fill="none" stroke="${color}" stroke-width="16" stroke-dasharray="240 100"/>
            <circle cx="640" cy="250" r="55" fill="none" stroke="#3b82f6" stroke-width="16" stroke-dasharray="100 240" stroke-dashoffset="-240"/>
            <text x="640" y="258" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">72%</text>
        `;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="12" fill="url(#bg)"/>
  
  ${innerContent}

  <!-- Header / Badge Overlay -->
  <rect x="40" y="445" width="720" height="40" rx="6" fill="#09090b" opacity="0.9"/>
  <rect x="52" y="455" width="8" height="20" rx="2" fill="${color}"/>
  <text x="70" y="470" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff">
    ${title.replace(/&/g, '&amp;')}
  </text>
  <text x="740" y="470" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#a1a1aa" text-anchor="end">
    ${subtitle.replace(/&/g, '&amp;')}
  </text>
</svg>`;
}

const projectsImages = [
    { name: 'cyclistic-1.svg', title: 'Cyclistic Tableau Dashboard', subtitle: 'Trip Behaviors & User Types', type: 'dashboard', color: '#4285F4' },
    { name: 'cyclistic-2.svg', title: 'Ride Duration Analysis', subtitle: 'Casual vs Annual Members', type: 'dashboard', color: '#34A853' },
    { name: 'cyclistic-3.svg', title: 'Peak Commute Heatmap', subtitle: 'Weekday 8AM & 5PM Traffic', type: 'dashboard', color: '#EA4335' },
    { name: 'cyclistic-4.svg', title: 'Python Pandas Pipeline', subtitle: '5.5M+ Trip Records ETL', type: 'video', color: '#FBBC05' },
    { name: 'cyclistic-5.svg', title: 'Marketing Strategy Deck', subtitle: 'Conversion Recommendations', type: 'presentation', color: '#4285F4' },

    { name: 'moodle-1.svg', title: 'Moodle LMS Portal', subtitle: 'Institutional Course Environment', type: 'dashboard', color: '#f97316' },
    { name: 'moodle-2.svg', title: 'Server & DB Architecture', subtitle: 'School Infrastructure Deployment', type: 'video', color: '#6366f1' },
    { name: 'moodle-3.svg', title: 'Blackboard Quiz Generator', subtitle: 'Assessment Pipeline Integration', type: 'quiz', color: '#3b82f6' },
    { name: 'moodle-4.svg', title: 'Student Gradebook Analytics', subtitle: '1,100+ Enrolled Students', type: 'dashboard', color: '#10b981' },
    { name: 'moodle-5.svg', title: 'Kurikulum Merdeka Layout', subtitle: 'Hybrid UX/UI Interface', type: 'presentation', color: '#ec4899' },

    { name: 'media-1.svg', title: 'CapCut Video Editing Suite', subtitle: 'Indonesian History Modules', type: 'video', color: '#06b6d4' },
    { name: 'media-2.svg', title: 'PowerPoint Interactive Slides', subtitle: 'AI TTS & Embedded Quizzes', type: 'presentation', color: '#e11d48' },
    { name: 'media-3.svg', title: 'Canva Visual Infographics', subtitle: 'Hindu-Buddhist Era Content', type: 'quiz', color: '#8b5cf6' },
    { name: 'media-4.svg', title: 'SAM Model Prototyping', subtitle: 'Agile Evaluation & Refinement', type: 'dashboard', color: '#14b8a6' },
    { name: 'media-5.svg', title: 'Instructional Video Render', subtitle: 'Grade 10 Curriculum Deliverable', type: 'video', color: '#f59e0b' }
];

const experienceImages = [
    // BSS Internship (11 images to trigger +6 overlay)
    { name: 'bss-1.svg', title: 'Videotron Video Editing', subtitle: 'CapCut & Premiere Timeline', type: 'video', color: '#3b82f6' },
    { name: 'bss-2.svg', title: 'Blooket Gamified Session', subtitle: 'Block Rush & Crypto Hack Room', type: 'game', color: '#10b981' },
    { name: 'bss-3.svg', title: 'Interactive Learning Quiz', subtitle: 'Wayground Digital Modules', type: 'quiz', color: '#f59e0b' },
    { name: 'bss-4.svg', title: 'Google Forms Assessment', subtitle: 'Concept Retention Survey', type: 'dashboard', color: '#8b5cf6' },
    { name: 'bss-5.svg', title: 'Classroom Informatics Teaching', subtitle: 'Computer Systems & OS Lecture', type: 'classroom', color: '#ec4899' },
    { name: 'bss-6.svg', title: 'Brascho Nyantrik Community', subtitle: 'Partner Village Outreach Program', type: 'presentation', color: '#06b6d4' },
    { name: 'bss-7.svg', title: 'Daily School Administration', subtitle: 'Weekly 5S Routine Protocol', type: 'dashboard', color: '#6366f1' },
    { name: 'bss-8.svg', title: 'Computer Hardware Workshop', subtitle: 'Class X-1 Interactive Practice', type: 'classroom', color: '#14b8a6' },
    { name: 'bss-9.svg', title: 'Operating Systems Architecture', subtitle: 'Slide Deck & Student Exercise', type: 'presentation', color: '#f43f5e' },
    { name: 'bss-10.svg', title: 'Student Team Collaboration', subtitle: 'Peer Problem-Solving Session', type: 'classroom', color: '#eab308' },
    { name: 'bss-11.svg', title: 'Waste Sorting Videotron', subtitle: 'Environmental Content Broadcast', type: 'video', color: '#22c55e' },

    // SMAN 1 Sooko
    { name: 'sooko-1.svg', title: 'School Server Configuration', subtitle: 'On-site Moodle LMS Hosting', type: 'video', color: '#f97316' },
    { name: 'sooko-2.svg', title: 'User Access Control Setup', subtitle: 'Staff & Student Role Mapping', type: 'dashboard', color: '#3b82f6' },
    { name: 'sooko-3.svg', title: 'Teacher Adoption Workshop', subtitle: 'Kurikulum Merdeka Training', type: 'classroom', color: '#10b981' },
    { name: 'sooko-4.svg', title: 'Centralized Learning Portal', subtitle: '1,100+ Active Accounts', type: 'presentation', color: '#8b5cf6' },

    // SMAN 1 Kedungwaru
    { name: 'kedungwaru-1.svg', title: 'History Media Storyboard', subtitle: 'Grade 10 Visual Curriculum', type: 'presentation', color: '#e11d48' },
    { name: 'kedungwaru-2.svg', title: 'Teacher Collaborative Review', subtitle: 'Subject-Matter Expert Review', type: 'classroom', color: '#06b6d4' },
    { name: 'kedungwaru-3.svg', title: 'Canva Educational Slides', subtitle: 'Multimodal Learning Suite', type: 'quiz', color: '#8b5cf6' },

    // TIKI
    { name: 'tiki-1.svg', title: 'Logistics Manifest Entry', subtitle: 'Waybill & Safety Protocol', type: 'dashboard', color: '#f59e0b' },
    { name: 'tiki-2.svg', title: 'Package Intake Operations', subtitle: 'Weight & Volume Verification', type: 'dashboard', color: '#3b82f6' },

    // Asrama Banua
    { name: 'banua-1.svg', title: 'Executive Board Assembly', subtitle: 'Dormitory Operations Strategy', type: 'classroom', color: '#6366f1' },
    { name: 'banua-2.svg', title: 'PEKA Orientation Program', subtitle: 'Freshman Onboarding & Welcoming', type: 'presentation', color: '#ec4899' },
    { name: 'banua-3.svg', title: 'Leadership Training Seminar', subtitle: 'Organizational Succession', type: 'classroom', color: '#10b981' },
    { name: 'banua-4.svg', title: 'Resident Community Gathering', subtitle: 'Banua Malang Annual Event', type: 'presentation', color: '#f59e0b' },

    // UMAR
    { name: 'umar-1.svg', title: 'SIRAH Podcast Live Production', subtitle: 'Malang Creative Center (MCC)', type: 'video', color: '#06b6d4' },
    { name: 'umar-2.svg', title: 'Comparative Study Permata Jingga', subtitle: 'Inter-Mosque Benchmarking 2025', type: 'classroom', color: '#8b5cf6' },
    { name: 'umar-3.svg', title: 'Public Relations Broadcast', subtitle: 'Digital Community Engagement', type: 'presentation', color: '#3b82f6' },

    // MindCare
    { name: 'mindcare-1.svg', title: 'Mental Health Workshop', subtitle: 'Educational Advocacy Campaign', type: 'presentation', color: '#ec4899' },
    { name: 'mindcare-2.svg', title: 'Peer Support Discussion', subtitle: 'Safe Discussion Environment', type: 'classroom', color: '#10b981' }
];

const projDir = path.resolve('public/images/projects');
const expDir = path.resolve('public/images/experience');

if (!fs.existsSync(projDir)) fs.mkdirSync(projDir, { recursive: true });
if (!fs.existsSync(expDir)) fs.mkdirSync(expDir, { recursive: true });

projectsImages.forEach(img => {
    fs.writeFileSync(path.join(projDir, img.name), createMockSvg(img), 'utf8');
});

experienceImages.forEach(img => {
    fs.writeFileSync(path.join(expDir, img.name), createMockSvg(img), 'utf8');
});

console.log(`Generated ${projectsImages.length} project images and ${experienceImages.length} experience images!`);
