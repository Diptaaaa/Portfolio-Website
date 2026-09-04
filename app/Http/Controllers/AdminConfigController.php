<?php

namespace App\Http\Controllers;

use App\Models\PortfolioSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminConfigController extends Controller
{
    /**
     * Display the portfolio administration configuration page.
     */
    public function index(): Response
    {
        $settings = PortfolioSetting::getAllAsKeyValue();

        return Inertia::render('Admin/Config', [
            'settings' => $settings,
            'status' => session('success'),
        ]);
    }

    /**
     * Update the portfolio configuration settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // General / Profile & Avatar Adjustments
            'avatar_url' => ['nullable', 'string', 'max:1000'],
            'avatar_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:5120'],
            'avatar_filter' => ['nullable', 'string', 'max:50'],
            'avatar_zoom' => ['nullable', 'string', 'max:50'],
            'avatar_pos_x' => ['nullable', 'string', 'max:50'],
            'avatar_pos_y' => ['nullable', 'string', 'max:50'],
            'avatar_brightness' => ['nullable', 'string', 'max:50'],
            'avatar_contrast' => ['nullable', 'string', 'max:50'],
            'full_name' => ['nullable', 'string', 'max:255'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'status_badge' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'summary_title' => ['nullable', 'string', 'max:255'],
            'bio_summary' => ['nullable', 'string'],
            'gpa' => ['nullable', 'string', 'max:50'],
            'university' => ['nullable', 'string', 'max:255'],
            'faculty' => ['nullable', 'string', 'max:255'],

            // Contact & Socials
            'whatsapp_number' => ['nullable', 'string', 'max:100'],
            'whatsapp_url' => ['nullable', 'string', 'max:500'],
            'email' => ['nullable', 'email', 'max:255'],
            'linkedin_username' => ['nullable', 'string', 'max:255'],
            'linkedin_url' => ['nullable', 'string', 'max:500'],
            'instagram_username' => ['nullable', 'string', 'max:255'],
            'instagram_url' => ['nullable', 'string', 'max:500'],
            'canva_label' => ['nullable', 'string', 'max:255'],
            'canva_url' => ['nullable', 'string', 'max:500'],

            // Display & Neon Cursor
            'enable_neon_cursor' => ['nullable'],
            'neon_cursor_color' => ['nullable', 'string', 'max:50'],
        ]);

        // Handle avatar image file upload if uploaded
        if ($request->hasFile('avatar_file')) {
            $file = $request->file('avatar_file');
            $uploadDir = public_path('images/profile');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $filename = 'avatar_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            PortfolioSetting::set('avatar_url', '/images/profile/' . $filename, 'general', 'string');
        } elseif ($request->filled('avatar_url')) {
            PortfolioSetting::set('avatar_url', $request->input('avatar_url'), 'general', 'string');
        }

        foreach ($validated as $key => $value) {
            if (in_array($key, ['avatar_file', 'avatar_url'])) {
                continue;
            }

            $type = 'string';
            $group = 'general';

            if (str_contains($key, 'url') || in_array($key, ['email', 'whatsapp_number', 'linkedin_username', 'instagram_username', 'canva_label'])) {
                $group = 'contact';
            } elseif (in_array($key, ['enable_neon_cursor', 'neon_cursor_color'])) {
                $group = 'display';
                if ($key === 'enable_neon_cursor') {
                    $type = 'boolean';
                    $value = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? '1' : '0';
                }
            } elseif ($key === 'bio_summary') {
                $type = 'text';
            }

            PortfolioSetting::set($key, (string) ($value ?? ''), $group, $type);
        }

        return redirect()->route('admin.config')->with('success', 'Konfigurasi berhasil disimpan!');
    }
}
