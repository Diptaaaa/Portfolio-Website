import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function MediaGallery({ images = [], maxVisible = 6, className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

    if (!images || images.length === 0) return null;

    // Normalize images format (handles either array of strings or array of objects)
    const normalizedImages = images.map((item, index) => {
        if (typeof item === 'string') {
            return { src: item, alt: `Documentation Image ${index + 1}`, caption: '' };
        }
        return {
            src: item.src,
            alt: item.alt || `Documentation Image ${index + 1}`,
            caption: item.caption || ''
        };
    });

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsCaptionExpanded(false);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
        setIsCaptionExpanded(false);
    };

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
        setIsCaptionExpanded(false);
    }, [normalizedImages.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
        setIsCaptionExpanded(false);
    }, [normalizedImages.length]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, nextImage, prevImage]);

    // Reset expanded caption state whenever index changes
    useEffect(() => {
        setIsCaptionExpanded(false);
    }, [currentIndex]);

    // Helper to render URLs as clickable links
    const renderCaptionWithLinks = (text) => {
        if (!text) return null;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline break-all font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const visibleThumbnails = normalizedImages.slice(0, maxVisible);
    const remainingCount = normalizedImages.length - maxVisible;

    const currentItem = normalizedImages[currentIndex] || {};
    const rawCaption = currentItem.caption || currentItem.alt || '';
    const isLongCaption = rawCaption.length > 50;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {visibleThumbnails.map((img, idx) => {
                    const isLastAndHasMore = idx === maxVisible - 1 && remainingCount > 0;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => openLightbox(idx)}
                            className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 group focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-zinc-400 dark:hover:border-zinc-600 transition shadow-sm"
                            aria-label={`View ${img.alt}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* +N Overlay on the last thumbnail */}
                            {isLastAndHasMore ? (
                                <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center text-white font-bold text-sm sm:text-base group-hover:bg-black/75 transition-colors">
                                    +{remainingCount + 1}
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="w-4 h-4 text-white drop-shadow-md" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {isOpen && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Lightbox Header */}
                        <div className="w-full flex items-start justify-between text-white/80 pb-3 px-2 gap-3 relative">
                            <div className="text-xs font-mono pt-1 shrink-0">
                                {currentIndex + 1} / {normalizedImages.length}
                            </div>

                            {/* Caption with collapsible 'more' / 'less' */}
                            <div className={`text-xs sm:text-sm font-medium text-white text-center transition-all duration-200 ${
                                isCaptionExpanded
                                    ? 'max-w-[85%] break-all bg-zinc-900/90 backdrop-blur-md rounded-lg p-2.5 shadow-xl border border-white/15 z-30 max-h-40 overflow-y-auto'
                                    : 'max-w-[70%] truncate'
                            }`}>
                                {isLongCaption ? (
                                    isCaptionExpanded ? (
                                        <span>
                                            {renderCaptionWithLinks(rawCaption)}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsCaptionExpanded(false);
                                                }}
                                                className="ml-2 text-indigo-400 hover:text-indigo-300 font-bold text-xs underline cursor-pointer inline-flex items-center"
                                            >
                                                less
                                            </button>
                                        </span>
                                    ) : (
                                        <span>
                                            <span className="opacity-95">{rawCaption.slice(0, 48)}...</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsCaptionExpanded(true);
                                                }}
                                                className="ml-1.5 text-indigo-400 hover:text-indigo-300 font-bold text-xs underline cursor-pointer inline-flex items-center"
                                            >
                                                more
                                            </button>
                                        </span>
                                    )
                                ) : (
                                    <span>{renderCaptionWithLinks(rawCaption)}</span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={closeLightbox}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition shrink-0"
                                aria-label="Close image viewer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Main Image Stage */}
                        <div className="relative w-full flex items-center justify-center my-auto overflow-hidden rounded-lg bg-zinc-950/60 border border-white/10 shadow-2xl">
                            <img
                                src={normalizedImages[currentIndex].src}
                                alt={normalizedImages[currentIndex].alt}
                                className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain select-none"
                            />

                            {/* Previous Arrow */}
                            {normalizedImages.length > 1 && (
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm border border-white/10"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}

                            {/* Next Arrow */}
                            {normalizedImages.length > 1 && (
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm border border-white/10"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Thumbnail Selector Strip */}
                        {normalizedImages.length > 1 && (
                            <div className="w-full flex items-center justify-center gap-1.5 pt-3 overflow-x-auto max-w-full py-1">
                                {normalizedImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-12 h-8 sm:w-14 sm:h-9 rounded-md overflow-hidden flex-shrink-0 transition-all border ${
                                            idx === currentIndex
                                                ? 'border-indigo-400 scale-105 ring-2 ring-indigo-500/50'
                                                : 'border-white/20 opacity-50 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img.src} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}