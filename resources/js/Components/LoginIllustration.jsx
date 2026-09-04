export default function LoginIllustration() {
    return (
        <div className="relative w-full h-full min-h-[440px] md:min-h-full overflow-hidden bg-gradient-to-br from-[#12082e] via-[#1a0b40] to-[#0f172a] flex items-center justify-center select-none">
            {/* Organic Fluid Curved Shape on Left */}
            <svg
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                viewBox="0 0 500 600"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#250e62" />
                        <stop offset="40%" stopColor="#1e0b52" />
                        <stop offset="100%" stopColor="#0f0728" />
                    </linearGradient>
                    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0077fe" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00e5ff" />
                        <stop offset="60%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1e1b4b" />
                    </linearGradient>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="screenGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
                    </linearGradient>
                    <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="15" />
                    </filter>
                </defs>

                {/* Ambient Glowing Blobs in Background */}
                <circle cx="280" cy="280" r="140" fill="#7c3aed" opacity="0.25" filter="url(#softBlur)" />
                <circle cx="340" cy="360" r="110" fill="#06b6d4" opacity="0.25" filter="url(#softBlur)" />

                {/* Left Deep Fluid Curve Cutout */}
                <path
                    d="M 0,0 
                       C 80,60 120,160 80,260 
                       C 50,340 90,420 120,480 
                       C 150,540 120,580 90,600 
                       L 500,600 L 500,0 Z"
                    fill="url(#bgGrad)"
                />
            </svg>

            {/* 3D Hologram Robot & HUD Data Stage */}
            <svg
                className="relative z-10 w-[92%] max-w-[420px] h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                viewBox="0 0 400 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 1. Bottom Hologram Teleport Pedestal */}
                <g transform="translate(200, 350)">
                    {/* Glowing light beam upwards */}
                    <ellipse cx="0" cy="10" rx="90" ry="24" fill="#06b6d4" opacity="0.2" filter="url(#glowFilter)" />
                    <ellipse cx="0" cy="10" rx="75" ry="18" fill="url(#ringGrad)" opacity="0.6" />
                    <ellipse cx="0" cy="8" rx="65" ry="14" fill="#1e105e" stroke="#00f0ff" strokeWidth="2" />
                    <ellipse cx="0" cy="5" rx="45" ry="9" fill="#ffffff" opacity="0.85" filter="url(#glowFilter)" />

                    {/* Small vertical light pillars below platform */}
                    <rect x="-45" y="16" width="4" height="25" rx="2" fill="#00f0ff" opacity="0.4" />
                    <rect x="-20" y="18" width="4" height="30" rx="2" fill="#a855f7" opacity="0.5" />
                    <rect x="15" y="18" width="4" height="28" rx="2" fill="#00f0ff" opacity="0.4" />
                    <rect x="40" y="16" width="4" height="22" rx="2" fill="#a855f7" opacity="0.4" />

                    {/* Secondary base ring */}
                    <path d="M -75,10 C -75,26 75,26 75,10 L 68,22 C 68,34 -68,34 -68,22 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                </g>

                {/* 2. Side Floating Mini-Pillars */}
                <g transform="translate(70, 330)">
                    <ellipse cx="0" cy="0" rx="25" ry="8" fill="#1e105e" stroke="#06b6d4" strokeWidth="1.5" />
                    <ellipse cx="0" cy="-2" rx="16" ry="4" fill="#00f0ff" opacity="0.6" filter="url(#glowFilter)" />
                    <rect x="-10" y="4" width="3" height="20" fill="#06b6d4" opacity="0.4" />
                    <rect x="6" y="4" width="3" height="16" fill="#a855f7" opacity="0.4" />
                </g>

                <g transform="translate(350, 340)">
                    <ellipse cx="0" cy="0" rx="28" ry="9" fill="#1e105e" stroke="#06b6d4" strokeWidth="1.5" />
                    <ellipse cx="0" cy="-2" rx="18" ry="5" fill="#00f0ff" opacity="0.5" filter="url(#glowFilter)" />
                    <rect x="-6" y="5" width="3" height="18" fill="#06b6d4" opacity="0.4" />
                </g>

                {/* 3. Back Holographic Data Screen (Top Left) */}
                <g transform="translate(130, 160)">
                    <rect
                        x="-65"
                        y="-45"
                        width="85"
                        height="60"
                        rx="8"
                        fill="url(#screenGrad1)"
                        stroke="#00f0ff"
                        strokeWidth="1.5"
                        opacity="0.85"
                        transform="rotate(-8)"
                    />
                    {/* Charts on Back Screen */}
                    <g transform="rotate(-8) translate(-60, -38)">
                        {/* Circle Metric */}
                        <circle cx="12" cy="12" r="8" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeDasharray="35 15" />
                        <circle cx="34" cy="12" r="8" stroke="#00f0ff" strokeWidth="2.5" fill="none" strokeDasharray="40 10" />

                        {/* Bar Charts */}
                        <rect x="52" y="14" width="4" height="16" rx="1" fill="#00f0ff" />
                        <rect x="59" y="8" width="4" height="22" rx="1" fill="#38bdf8" />
                        <rect x="66" y="4" width="4" height="26" rx="1" fill="#a855f7" />

                        {/* Horizontal Indicator Lines */}
                        <line x1="6" y1="34" x2="44" y2="34" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="6" y1="40" x2="38" y2="40" stroke="#a855f7" strokeWidth="1.5" />
                    </g>
                </g>

                {/* 4. Back Holographic Data Screen (Top Right) */}
                <g transform="translate(290, 175)">
                    <rect
                        x="-40"
                        y="-45"
                        width="80"
                        height="55"
                        rx="8"
                        fill="url(#screenGrad1)"
                        stroke="#00f0ff"
                        strokeWidth="1.5"
                        opacity="0.75"
                        transform="rotate(10)"
                    />
                    {/* Bar and Grid Data on Right Screen */}
                    <g transform="rotate(10) translate(-32, -38)">
                        <rect x="6" y="6" width="5" height="18" rx="1" fill="#00f0ff" />
                        <rect x="15" y="10" width="5" height="14" rx="1" fill="#a855f7" />
                        <rect x="24" y="4" width="5" height="20" rx="1" fill="#38bdf8" />
                        <rect x="33" y="12" width="5" height="12" rx="1" fill="#00f0ff" />
                        <line x1="6" y1="30" x2="48" y2="30" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="6" y1="36" x2="40" y2="36" stroke="#38bdf8" strokeWidth="1" />
                    </g>
                </g>

                {/* 5. Center 3D Astronaut Robot Analyst */}
                <g id="robot-analyst" transform="translate(200, 230)">
                    {/* Robot Shadow / Base Light on Pedestal */}
                    <ellipse cx="0" cy="70" rx="35" ry="10" fill="#000000" opacity="0.4" />

                    {/* Torso / Body */}
                    <path
                        d="M -26,15 
                           C -30,30 -28,55 -22,65 
                           C -16,72 16,72 22,65 
                           C 28,55 30,30 26,15 
                           Z"
                        fill="#f8fafc"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                    />

                    {/* Chest Armor & Hologram Emitter */}
                    <rect x="-14" y="26" width="28" height="20" rx="5" fill="#0f172a" />
                    <circle cx="0" cy="36" r="4.5" fill="#00f0ff" filter="url(#glowFilter)" />
                    <line x1="-8" y1="41" x2="8" y2="41" stroke="#38bdf8" strokeWidth="1" />

                    {/* Shoulders & Arms */}
                    <path d="M -26,18 C -36,25 -42,42 -36,54 C -33,59 -27,55 -25,48" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M 26,18 C 36,25 42,42 36,54 C 33,59 27,55 25,48" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

                    {/* Neck Ring */}
                    <ellipse cx="0" cy="12" rx="16" ry="5" fill="#334155" />

                    {/* Robot Head / Helmet */}
                    <circle cx="0" cy="-14" r="28" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

                    {/* Futuristic Curved Blue Visor */}
                    <path
                        d="M -20,-16 
                           C -20,-28 20,-28 20,-16 
                           C 20,-4 14,3 0,3 
                           C -14,3 -20,-4 -20,-16 Z"
                        fill="url(#visorGrad)"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                    />
                    {/* Visor Specular Reflection */}
                    <path d="M -13,-20 C -7,-24 7,-24 13,-20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    <circle cx="-10" cy="-14" r="2" fill="#ffffff" opacity="0.6" />

                    {/* Head Antennae / Sensors */}
                    <rect x="-30" y="-18" width="3" height="8" rx="1.5" fill="#06b6d4" />
                    <rect x="27" y="-18" width="3" height="8" rx="1.5" fill="#06b6d4" />
                </g>

                {/* 6. Front Curved Holographic UI Ribbon (Left) */}
                <g transform="translate(145, 260)">
                    <path
                        d="M -75,-35 
                           C -45,-45 10,-35 30,-15 
                           C 20,25 -25,35 -65,25 
                           C -80,5 -85,-15 -75,-35 Z"
                        fill="url(#screenGrad1)"
                        stroke="#00f0ff"
                        strokeWidth="1.5"
                        filter="url(#glowFilter)"
                    />
                    {/* Cyber Grid & Data Stream */}
                    <g transform="translate(-65, -25)">
                        <line x1="8" y1="4" x2="38" y2="4" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 3" />
                        <line x1="8" y1="12" x2="52" y2="12" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 4" />
                        <line x1="8" y1="20" x2="32" y2="20" stroke="#a855f7" strokeWidth="2" />
                        <line x1="8" y1="28" x2="48" y2="28" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="5 3" />
                        <line x1="8" y1="36" x2="25" y2="36" stroke="#38bdf8" strokeWidth="1.5" />
                    </g>
                </g>

                {/* 7. Front Curved Holographic UI Chart Screen (Right) */}
                <g transform="translate(260, 275)">
                    <path
                        d="M -35,-15 
                           C 0,-30 65,-25 80,-5 
                           C 85,25 40,45 -10,35 
                           C -35,25 -45,0 -35,-15 Z"
                        fill="url(#screenGrad1)"
                        stroke="#00f0ff"
                        strokeWidth="1.5"
                        filter="url(#glowFilter)"
                    />
                    {/* Holographic Wave Area Chart */}
                    <path
                        d="M -15,18 
                           Q 5,-8 25,6 
                           T 65,-2"
                        stroke="#a855f7"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M -15,18 
                           Q 5,-8 25,6 
                           T 65,-2 
                           L 65,22 L -15,24 Z"
                        fill="#a855f7"
                        opacity="0.2"
                    />
                    {/* Data Node Dots */}
                    <circle cx="5" cy="-8" r="3" fill="#00f0ff" filter="url(#glowFilter)" />
                    <circle cx="25" cy="6" r="3" fill="#ffffff" />
                    <circle cx="65" cy="-2" r="3" fill="#00f0ff" filter="url(#glowFilter)" />
                </g>

                {/* 8. Sparkles & Cyber Hologram Dust */}
                <circle cx="110" cy="110" r="1.5" fill="#00f0ff" opacity="0.8" />
                <circle cx="180" cy="130" r="1" fill="#ffffff" opacity="0.9" />
                <circle cx="270" cy="130" r="2" fill="#00f0ff" opacity="0.7" />
                <circle cx="330" cy="220" r="1.5" fill="#a855f7" opacity="0.8" />
                <circle cx="90" cy="240" r="1.5" fill="#38bdf8" opacity="0.7" />
            </svg>
        </div>
    );
}
