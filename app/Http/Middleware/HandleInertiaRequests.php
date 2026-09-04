<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = [];
        $educations = [];
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('portfolio_settings')) {
                $settings = \App\Models\PortfolioSetting::getAllAsKeyValue();
            }
            if (\Illuminate\Support\Facades\Schema::hasTable('educations')) {
                $educations = \App\Models\Education::where('is_active', true)
                    ->orderBy('order', 'asc')
                    ->orderBy('id', 'desc')
                    ->get();
            }
        } catch (\Throwable $e) {
            // fallback if DB connection fails
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'portfolio_settings' => $settings,
            'educations' => $educations,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
