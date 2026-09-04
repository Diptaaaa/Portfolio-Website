import fs from 'fs';
import path from 'path';

const certificates = [
    {
        id: 'google-data-analytics',
        title: 'Google Data Analytics',
        type: 'Professional Certificate',
        issuer: 'Google Career Certificates',
        year: '2026',
        color: '#4285F4',
        accent: '#EA4335',
        iconType: 'google',
        credId: 'GDA-2026-984210'
    },
    {
        id: 'microsoft-office',
        title: 'Microsoft Office Desktop Application',
        type: 'Certified Associate',
        issuer: 'Trust Training Partners (Microsoft Partner)',
        year: '2026',
        color: '#00A4EF',
        accent: '#7FBA00',
        iconType: 'microsoft',
        credId: 'MOS-2026-441293'
    },
    {
        id: 'google-python-data-analysis',
        title: 'Introduction to Data Analysis Using Python',
        type: 'Course Certificate',
        issuer: 'Google',
        year: '2026',
        color: '#34A853',
        accent: '#4285F4',
        iconType: 'google',
        credId: 'GPY-2026-781290'
    },
    {
        id: 'google-data-visualization',
        title: 'Share Data Through the Art of Visualization',
        type: 'Course Certificate',
        issuer: 'Google',
        year: '2026',
        color: '#FBBC05',
        accent: '#EA4335',
        iconType: 'google',
        credId: 'GDV-2026-651230'
    },
    {
        id: 'google-clean-data',
        title: 'Process Data from Dirty to Clean',
        type: 'Course Certificate',
        issuer: 'Google',
        year: '2026',
        color: '#4285F4',
        accent: '#34A853',
        iconType: 'google',
        credId: 'GDC-2026-512984'
    },
    {
        id: 'google-data-driven-decisions',
        title: 'Ask Questions to Make Data-Driven Decisions',
        type: 'Course Certificate',
        issuer: 'Google',
        year: '2026',
        color: '#EA4335',
        accent: '#FBBC05',
        iconType: 'google',
        credId: 'GDD-2026-391824'
    },
    {
        id: 'google-data-foundations',
        title: 'Foundations: Data, Data, Everywhere',
        type: 'Course Certificate',
        issuer: 'Google',
        year: '2026',
        color: '#34A853',
        accent: '#4285F4',
        iconType: 'google',
        credId: 'GDF-2026-102948'
    },
    {
        id: 'meta-frontend-dev',
        title: 'Introduction to Front-End Development',
        type: 'Course Certificate',
        issuer: 'Meta',
        year: '2026',
        color: '#0668E1',
        accent: '#0081FB',
        iconType: 'meta',
        credId: 'MFD-2026-884102'
    },
    {
        id: 'meta-javascript',
        title: 'Programming with JavaScript',
        type: 'Course Certificate',
        issuer: 'Meta',
        year: '2026',
        color: '#0668E1',
        accent: '#F7DF1E',
        iconType: 'meta',
        credId: 'MJS-2026-664210'
    },
    {
        id: 'icp-builders-day',
        title: "ICP HUB Indonesia Builder's Day",
        type: 'Certificate of Achievement',
        issuer: 'ICP Indonesia',
        year: '2025',
        color: '#ED1E79',
        accent: '#29ABE2',
        iconType: 'icp',
        credId: 'ICP-2025-559124'
    },
    {
        id: 'myskill-typography',
        title: 'Color and Typography',
        type: 'Certificate of Completion',
        issuer: 'MySkill.id',
        year: '2024',
        color: '#FF6B00',
        accent: '#FF8A00',
        iconType: 'myskill',
        credId: 'MSK-2024-332187'
    },
    {
        id: 'instellar-ai-roadshow',
        title: 'AI Jumpstart Programme Roadshow',
        type: 'Certificate of Attendance',
        issuer: 'Instellar Indonesia',
        year: '2024',
        color: '#6366F1',
        accent: '#8B5CF6',
        iconType: 'instellar',
        credId: 'INS-2024-219483'
    },
    {
        id: 'nvidia-ai-gpu',
        title: 'Training AI Model With GPU',
        type: 'Deep Learning Institute Certificate',
        issuer: 'NVIDIA DLI',
        year: '2022',
        color: '#76B900',
        accent: '#1A1A1A',
        iconType: 'nvidia',
        credId: 'NVD-2022-108273'
    }
];

function getLogoSvg(iconType) {
    if (iconType === 'google') {
        return `
        <g transform="scale(0.8)">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </g>`;
    } else if (iconType === 'microsoft') {
        return `
        <g transform="scale(0.8)">
            <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
            <rect x="13" y="0" width="11" height="11" fill="#7FBA00"/>
            <rect x="0" y="13" width="11" height="11" fill="#00A4EF"/>
            <rect x="13" y="13" width="11" height="11" fill="#FFB900"/>
        </g>`;
    } else if (iconType === 'meta') {
        return `
        <g transform="scale(0.8)">
            <path fill="#0668E1" d="M16.7 4.2C14.5 4.2 12.7 5.7 12 7.6 11.3 5.7 9.5 4.2 7.3 4.2 3.7 4.2 1 7.1 1 11.2c0 5 4.2 9.6 10.3 12.4.4.2 1 .2 1.4 0 6.1-2.8 10.3-7.4 10.3-12.4 0-4.1-2.7-7-6.3-7zm-4.7 12.3c-3.7-2.3-6.6-5.4-6.6-8.3 0-2 1.3-3.3 2.9-3.3 1.8 0 3.2 1.6 3.7 3.8l.1.5.1-.5c.5-2.2 1.9-3.8 3.7-3.8 1.6 0 2.9 1.3 2.9 3.3 0 2.9-2.9 6-6.8 8.3z"/>
        </g>`;
    } else if (iconType === 'nvidia') {
        return `
        <g transform="scale(0.8)">
            <path fill="#76B900" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-3.04 0-5.5-2.46-5.5-5.5S9.96 5.5 13 5.5c1.84 0 3.47.9 4.47 2.3l-2.02 1.52C14.88 8.44 14 7.9 13 7.9c-1.71 0-3.1 1.39-3.1 3.1s1.39 3.1 3.1 3.1c1 0 1.88-.54 2.45-1.42l2.02 1.52c-1 1.4-2.63 2.3-4.47 2.3z"/>
        </g>`;
    } else {
        return `
        <g transform="scale(0.8)">
            <circle cx="12" cy="12" r="10" fill="#6366F1"/>
            <path d="M12 6v6l4 2" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </g>`;
    }
}

function generateSvg(cert) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad-${cert.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>

    <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="70%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <linearGradient id="ribbon-red" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.1"/>
    </filter>

    <filter id="seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect x="0" y="0" width="840" height="560" rx="16" fill="url(#bg-grad-${cert.id})"/>

  <!-- Outer Fine Frame -->
  <rect x="18" y="18" width="804" height="524" rx="12" fill="none" stroke="#0f172a" stroke-width="2" stroke-opacity="0.85"/>
  <rect x="26" y="26" width="788" height="508" rx="8" fill="none" stroke="${cert.color}" stroke-width="1" stroke-opacity="0.4"/>
  <rect x="30" y="30" width="780" height="500" rx="6" fill="none" stroke="#e2e8f0" stroke-width="1"/>

  <!-- Corner Vintage Flourishes -->
  <path d="M26 44 C26 34 34 26 44 26" fill="none" stroke="${cert.color}" stroke-width="3"/>
  <path d="M814 44 C814 34 806 26 796 26" fill="none" stroke="${cert.color}" stroke-width="3"/>
  <path d="M26 516 C26 526 34 534 44 534" fill="none" stroke="${cert.color}" stroke-width="3"/>
  <path d="M814 516 C814 526 806 534 796 534" fill="none" stroke="${cert.color}" stroke-width="3"/>

  <!-- Subtle Top Decorative Banner -->
  <rect x="360" y="18" width="120" height="4" fill="${cert.color}" rx="2"/>

  <!-- Top Header Issuer Row -->
  <g transform="translate(60, 52)">
    <g transform="translate(0, 0)">
      ${getLogoSvg(cert.iconType)}
    </g>
    <text x="32" y="18" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#0f172a" letter-spacing="0.5">
      ${cert.issuer.toUpperCase()}
    </text>
  </g>

  <!-- Certificate Watermark / Badge in Top-Right -->
  <g transform="translate(710, 48)">
    <rect x="0" y="0" width="68" height="24" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <circle cx="12" cy="12" r="4" fill="${cert.color}"/>
    <text x="22" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#475569" letter-spacing="0.5">
      ${cert.year}
    </text>
  </g>

  <!-- Title Section -->
  <text x="420" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle" letter-spacing="3">
    ${cert.type.toUpperCase()}
  </text>
  <line x1="320" y1="145" x2="520" y2="145" stroke="#cbd5e1" stroke-width="1"/>

  <text x="420" y="180" font-family="Georgia, serif" font-size="15" font-style="italic" fill="#64748b" text-anchor="middle">
    This certificate is proudly presented to
  </text>

  <!-- Recipient Name -->
  <text x="420" y="235" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="800" fill="#0f172a" text-anchor="middle" letter-spacing="0.5">
    MUHAMMAD RAFLI PRADIPTA
  </text>
  <line x1="220" y1="255" x2="620" y2="255" stroke="${cert.color}" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Achievement Description -->
  <text x="420" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">
    for successfully completing and demonstrating mastery in
  </text>

  <!-- Certificate Course Name -->
  <g transform="translate(420, 345)">
    <rect x="-310" y="-32" width="620" height="52" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#0f172a" text-anchor="middle">
      ${cert.title}
    </text>
  </g>

  <!-- Gold Seal with Ribbons -->
  <g transform="translate(685, 410)" filter="url(#seal-shadow)">
    <!-- Ribbon tails -->
    <polygon points="-8,25 0,68 -24,82 -12,35" fill="url(#ribbon-red)"/>
    <polygon points="8,25 24,82 0,68 12,35" fill="url(#ribbon-red)"/>
    <!-- Seal body -->
    <circle cx="0" cy="20" r="32" fill="url(#gold-seal)"/>
    <circle cx="0" cy="20" r="28" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="3,2"/>
    <circle cx="0" cy="20" r="24" fill="none" stroke="#78350f" stroke-width="1" stroke-opacity="0.3"/>
    <!-- Seal Star / Icon -->
    <path d="M0 6 L4 16 L15 17 L7 24 L10 35 L0 29 L-10 35 L-7 24 L-15 17 L-4 16 Z" fill="#ffffff" opacity="0.95"/>
    <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="6.5" font-weight="900" fill="#78350f" text-anchor="middle" letter-spacing="1">
      VERIFIED
    </text>
  </g>

  <!-- Bottom Details: Signatures and Credential ID -->
  <g transform="translate(70, 435)">
    <!-- Signature Line 1 -->
    <path d="M0 25 Q30 5 60 22 T120 18 T160 28" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
    <line x1="0" y1="35" x2="170" y2="35" stroke="#cbd5e1" stroke-width="1"/>
    <text x="0" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#334155">
      Authorized Signature
    </text>
    <text x="0" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="9" fill="#94a3b8">
      ${cert.issuer}
    </text>
  </g>

  <!-- Center Credential Verification Info -->
  <g transform="translate(320, 460)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="600" fill="#475569">
      Credential ID: <tspan font-family="monospace" fill="#0f172a">${cert.credId}</tspan>
    </text>
    <text x="0" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="9" fill="#94a3b8">
      Verify authenticity at issuer credential portal • Issued ${cert.year}
    </text>
  </g>
</svg>`;
}

const outDir = path.resolve('public/images/certificates');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

certificates.forEach((cert) => {
    const filePath = path.join(outDir, `${cert.id}.svg`);
    fs.writeFileSync(filePath, generateSvg(cert), 'utf8');
    console.log(`Generated: ${filePath}`);
});

console.log('All 13 certificates generated successfully!');
