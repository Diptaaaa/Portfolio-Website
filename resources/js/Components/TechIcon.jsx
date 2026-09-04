export default function TechIcon({ name, className = "w-3.5 h-3.5" }) {
    switch (name.toLowerCase()) {
        case 'python':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M11.9 2C8.3 2 8.5 3.6 8.5 3.6L8.5 5.2H12.1V5.7H5.2C5.2 5.7 2 5.3 2 9C2 12.6 4.8 12.4 4.8 12.4H6.3V10.8C6.3 9 7.8 9 7.8 9H11.5C13.2 9 13.2 7.5 13.2 7.5V3.8C13.2 3.8 13.4 2 11.9 2ZM9.8 3.5C10.3 3.5 10.7 3.9 10.7 4.4C10.7 4.9 10.3 5.3 9.8 5.3C9.3 5.3 8.9 4.9 8.9 4.4C8.9 3.9 9.3 3.5 9.8 3.5Z"
                        fill="#387EB8"
                    />
                    <path
                        d="M12.1 22C15.7 22 15.5 20.4 15.5 20.4L15.5 18.8H11.9V18.3H18.8C18.8 18.3 22 18.7 22 15C22 11.4 19.2 11.6 19.2 11.6H17.7V13.2C17.7 15 16.2 15 16.2 15H12.5C10.8 15 10.8 16.5 10.8 16.5V20.2C10.8 20.2 10.6 22 12.1 22ZM14.2 20.5C13.7 20.5 13.3 20.1 13.3 19.6C13.3 19.1 13.7 18.7 14.2 18.7C14.7 18.7 15.1 19.1 15.1 19.6C15.1 20.1 14.7 20.5 14.2 20.5Z"
                        fill="#FFE052"
                    />
                </svg>
            );
        case 'sql':
        case 'database':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
            );
        case 'excel':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#107C41" />
                    <path
                        d="M15.5 6L13.2 11.9L15.6 18H13.6L12.1 13.8L10.6 18H8.5L11 11.9L8.7 6H10.8L12.1 10.1L13.5 6H15.5Z"
                        fill="white"
                    />
                </svg>
            );
        case 'tableau':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#E97627" />
                    <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            );
        case 'google':
            return (
                <svg className={className} viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                </svg>
            );
        case 'meta':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 15.3C10.2 11.2 8.7 8.5 6.6 8.5C4.5 8.5 3 10.1 3 12.3C3 14.8 4.7 16.5 7.1 16.5C8.9 16.5 10.6 15 12 12.7C13.4 15 15.1 16.5 16.9 16.5C19.3 16.5 21 14.8 21 12.3C21 10.1 19.5 8.5 17.4 8.5C15.3 8.5 13.8 11.2 12 15.3Z"
                        stroke="#0668E1"
                        strokeWidth="2.5"
                    />
                </svg>
            );
        case 'microsoft':
            return (
                <svg className={className} viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M1 13h10v10H1z" />
                    <path fill="#7FBA00" d="M13 1h10v10H13z" />
                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
            );
        case 'nvidia':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#76B900" />
                    <path
                        d="M7 8.5C9.5 7 14.5 7 17 9.5C15 11 11.5 11 9.5 12.5C12 13 15 13 16 15.5C13.5 17 8.5 16.5 7 14V8.5Z"
                        fill="white"
                    />
                </svg>
            );
        case 'instagram':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <defs>
                        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFDC80" />
                            <stop offset="25%" stopColor="#F77737" />
                            <stop offset="50%" stopColor="#E1306C" />
                            <stop offset="75%" stopColor="#C13584" />
                            <stop offset="100%" stopColor="#833AB4" />
                        </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad)" strokeWidth="2" />
                    <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                </svg>
            );
        case 'ai':
        case 'claude':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#D97706" />
                    <path d="M12 4L14 9.5L19.5 11.5L14 13.5L12 19L10 13.5L4.5 11.5L10 9.5L12 4Z" fill="white" />
                </svg>
            );
        default:
            return (
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
            );
    }
}
