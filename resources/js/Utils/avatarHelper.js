/**
 * Helper to compute responsive and adjusted avatar styling from settings
 */
export function getAvatarStyle(settings = {}) {
    const filterType = settings.avatar_filter || 'none';
    const zoom = Number(settings.avatar_zoom) || 100;
    const posX = settings.avatar_pos_x !== undefined && settings.avatar_pos_x !== '' ? Number(settings.avatar_pos_x) : 50;
    const posY = settings.avatar_pos_y !== undefined && settings.avatar_pos_y !== '' ? Number(settings.avatar_pos_y) : 50;
    const brightness = Number(settings.avatar_brightness) || 100;
    const contrast = Number(settings.avatar_contrast) || 100;

    let filterStyle = '';
    if (filterType === 'grayscale') {
        filterStyle = `grayscale(100%) brightness(${brightness}%) contrast(${contrast}%)`;
    } else if (filterType === 'contrast') {
        filterStyle = `grayscale(100%) brightness(${brightness}%) contrast(${Math.max(contrast, 130)}%)`;
    } else if (filterType === 'warm') {
        filterStyle = `sepia(35%) brightness(${brightness}%) contrast(${contrast}%)`;
    } else {
        // none (Warna asli / tanpa filter)
        if (brightness !== 100 || contrast !== 100) {
            filterStyle = `brightness(${brightness}%) contrast(${contrast}%)`;
        }
    }

    return {
        objectFit: 'cover',
        objectPosition: `${posX}% ${posY}%`,
        transform: `scale(${zoom / 100})`,
        transformOrigin: `${posX}% ${posY}%`,
        filter: filterStyle || 'none',
        transition: 'transform 0.15s ease, filter 0.15s ease, object-position 0.15s ease',
    };
}
