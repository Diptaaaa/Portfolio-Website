<?php

namespace App\Helpers;

class MediaHelper
{
    /**
     * Convert any Google Drive sharing URL into a direct CDN image URL.
     * If the URL is not a Google Drive link, return it unchanged.
     */
    public static function formatImageUrl(?string $url): ?string
    {
        if (empty($url)) {
            return $url;
        }

        $url = trim($url);

        // Pattern matching Google Drive file IDs across various URL structures:
        // - https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
        // - https://drive.google.com/open?id={FILE_ID}
        // - https://drive.google.com/uc?id={FILE_ID}&export=view
        // - https://docs.google.com/file/d/{FILE_ID}
        if (preg_match('#(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]+)#i', $url, $matches)) {
            $fileId = $matches[1];
            return "https://lh3.googleusercontent.com/d/{$fileId}";
        }

        return $url;
    }

    /**
     * Format an array of images (each containing 'src', 'alt', 'caption').
     */
    public static function formatImages(array $images): array
    {
        return array_map(function ($img) {
            if (is_array($img) && isset($img['src'])) {
                $img['src'] = self::formatImageUrl($img['src']);
            }
            return $img;
        }, $images);
    }
}
