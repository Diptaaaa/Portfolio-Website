export default function TechIcon({ name, className = "w-4 h-4" }) {
    switch (name.toLowerCase()) {
        case 'typescript':
        case 'ts':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#3178C6" />
                    <path
                        d="M11.5 8H6.5V10H8V17H10V10H11.5V8ZM14.3 12.8C14.8 12.9 15.3 13.1 15.7 13.4C16.1 13.7 16.3 14.2 16.3 14.8C16.3 15.4 16 16 15.5 16.4C15 16.8 14.3 17 13.5 17C12.6 17 11.9 16.8 11.3 16.4L12.1 14.8C12.5 15.1 13 15.3 13.5 15.3C13.8 15.3 14.1 15.2 14.3 15.1C14.4 14.9 14.5 14.8 14.5 14.6C14.5 14.4 14.4 14.3 14.3 14.2C14.1 14.1 13.8 14 13.3 13.8C12.7 13.6 12.2 13.3 11.8 13C11.5 12.6 11.3 12.1 11.3 11.6C11.3 10.9 11.6 10.4 12.1 10C12.6 9.6 13.3 9.4 14.1 9.4C14.8 9.4 15.5 9.6 16 9.9L15.3 11.5C14.9 11.3 14.5 11.1 14.1 11.1C13.8 11.1 13.6 11.2 13.4 11.3C13.3 11.4 13.2 11.6 13.2 11.7C13.2 11.9 13.3 12 13.4 12.1C13.6 12.2 13.9 12.3 14.3 12.5V12.8Z"
                        fill="white"
                    />
                </svg>
            );
        case 'java':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8.5 17.5C8.5 17.5 10.5 18 12.5 18C14.5 18 16 17.5 16 17.5C16 17.5 15 19 12.5 19C10 19 8.5 17.5 8.5 17.5Z"
                        fill="#E76F00"
                    />
                    <path
                        d="M7.5 15.5C7.5 15.5 10 16.2 12.5 16.2C15 16.2 17.5 15.5 17.5 15.5C17.5 15.5 16.5 17.2 12.5 17.2C8.5 17.2 7.5 15.5 7.5 15.5Z"
                        fill="#5382A1"
                    />
                    <path
                        d="M12.8 3C12.8 3 13.8 5 11.8 6.5C9.8 8 10.8 10 10.8 10C10.8 10 12.3 8.5 12.8 7.5C13.3 6.5 14.8 5 12.8 3Z"
                        fill="#E76F00"
                    />
                    <path
                        d="M15 5.5C15 5.5 16.5 7.5 14.5 9C12.5 10.5 13.5 12 13.5 12C13.5 12 15 10.5 15.5 9.5C16 8.5 17 7 15 5.5Z"
                        fill="#5382A1"
                    />
                    <path
                        d="M5 21C5 21 8.5 22.5 12.5 22.5C16.5 22.5 20 21 20 21C18 22.8 14.5 23.5 12.5 23.5C10.5 23.5 6.5 22.8 5 21Z"
                        fill="#5382A1"
                    />
                </svg>
            );
        case 'swift':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#F05138" />
                    <path
                        d="M18.5 17C15.8 18.5 12 17.8 9.5 15.5C12 16.8 14.8 16.5 16.5 15C13.5 15.5 10.5 13.5 9 10.8C10.2 12 12 12.8 13.5 12.8C10.5 11.5 8.5 8.8 8 5.5C8 5.5 6.5 8.5 7 12C5.5 9.8 5.5 7.5 5.5 7.5C4.5 11 6.5 14.5 9 16.5C11.5 18.5 15 19.5 18.5 17Z"
                        fill="white"
                    />
                </svg>
            );
        case 'kotlin':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none">
                    <defs>
                        <linearGradient id="kotlinGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7F52FF" />
                            <stop offset="50%" stopColor="#C711E1" />
                            <stop offset="100%" stopColor="#E24462" />
                        </linearGradient>
                    </defs>
                    <path d="M20 20H4V4H20L12 12L20 20Z" fill="url(#kotlinGrad)" />
                    <path d="M12 12L4 20V12L12 12Z" fill="#7F52FF" />
                </svg>
            );
        default:
            return (
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
            );
    }
}
