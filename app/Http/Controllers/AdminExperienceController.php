<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminExperienceController extends Controller
{
    /**
     * Display a listing of experiences.
     */
    public function index(): Response
    {
        $experiences = Experience::orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Experience', [
            'experiences' => $experiences,
        ]);
    }

    /**
     * Upload an image for experience gallery.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpeg,png,jpg,webp,svg,gif', 'max:10240'],
        ], [
            'image.required' => 'File gambar wajib dipilih.',
            'image.image'    => 'File harus berupa gambar yang valid.',
            'image.max'      => 'Ukuran gambar maksimal 10MB.',
        ]);

        $file = $request->file('image');
        $uploadDir = public_path('images/experience');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'exp_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadDir, $filename);

        return response()->json([
            'success'       => true,
            'url'           => '/images/experience/' . $filename,
            'filename'      => $filename,
            'original_name' => $file->getClientOriginalName(),
        ]);
    }

    /**
     * Store a newly created experience.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type'      => ['required', 'string', 'in:work,organization'],
            'company'   => ['required', 'string', 'max:255'],
            'role'      => ['required', 'string', 'max:255'],
            'location'  => ['nullable', 'string', 'max:255'],
            'period'    => ['nullable', 'string', 'max:100'],
            'badge'     => ['nullable', 'string', 'max:100'],
            'points'    => ['nullable'],
            'images'    => ['nullable'],
            'order'     => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'type.required'    => 'Tipe pengalaman (Kerja / Organisasi) wajib dipilih.',
            'company.required' => 'Nama institusi, perusahaan, atau organisasi wajib diisi.',
            'role.required'    => 'Posisi / jabatan wajib diisi.',
        ]);

        Experience::create([
            'type'      => $validated['type'],
            'company'   => $validated['company'],
            'role'      => $validated['role'],
            'location'  => $validated['location'] ?? null,
            'period'    => $validated['period'] ?? null,
            'badge'     => $validated['badge'] ?? null,
            'points'    => $this->parseLines($request->input('points')),
            'images'    => $this->parseImages($request->input('images')),
            'order'     => (int) ($validated['order'] ?? (Experience::max('order') + 1)),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.experience.index')->with('success', 'Pengalaman baru berhasil ditambahkan!');
    }

    /**
     * Update the specified experience.
     */
    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'type'      => ['required', 'string', 'in:work,organization'],
            'company'   => ['required', 'string', 'max:255'],
            'role'      => ['required', 'string', 'max:255'],
            'location'  => ['nullable', 'string', 'max:255'],
            'period'    => ['nullable', 'string', 'max:100'],
            'badge'     => ['nullable', 'string', 'max:100'],
            'points'    => ['nullable'],
            'images'    => ['nullable'],
            'order'     => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'type.required'    => 'Tipe pengalaman (Kerja / Organisasi) wajib dipilih.',
            'company.required' => 'Nama institusi, perusahaan, atau organisasi wajib diisi.',
            'role.required'    => 'Posisi / jabatan wajib diisi.',
        ]);

        $experience->update([
            'type'      => $validated['type'],
            'company'   => $validated['company'],
            'role'      => $validated['role'],
            'location'  => $validated['location'] ?? null,
            'period'    => $validated['period'] ?? null,
            'badge'     => $validated['badge'] ?? null,
            'points'    => $this->parseLines($request->input('points')),
            'images'    => $this->parseImages($request->input('images')),
            'order'     => isset($validated['order']) ? (int) $validated['order'] : $experience->order,
            'is_active' => filter_var($request->input('is_active', $experience->is_active), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.experience.index')->with('success', "Pengalaman \"{$experience->role} - {$experience->company}\" berhasil diperbarui!");
    }

    /**
     * Remove the specified experience.
     */
    public function destroy(Experience $experience): RedirectResponse
    {
        $title = "{$experience->role} ({$experience->company})";
        $experience->delete();

        return redirect()->route('admin.experience.index')->with('success', "Pengalaman \"{$title}\" berhasil dihapus!");
    }

    /**
     * Parse newline-separated text or array into an array of strings.
     */
    private function parseLines(mixed $input): array
    {
        if (is_array($input)) {
            return array_values(array_filter(array_map('trim', $input)));
        }
        if (is_string($input)) {
            $lines = preg_split('/[\r\n]+/', $input);
            return array_values(array_filter(array_map('trim', $lines)));
        }
        return [];
    }

    /**
     * Parse images input — accepts JSON string, array of objects, or pipe-delimited string.
     */
    private function parseImages(mixed $input): array
    {
        $items = [];
        if (is_array($input)) {
            $items = $input;
        } elseif (is_string($input) && !empty($input)) {
            $decoded = json_decode($input, true);
            if (is_array($decoded)) {
                $items = $decoded;
            } else {
                $lines = preg_split('/[\r\n]+/', $input);
                foreach ($lines as $line) {
                    $parts = array_map('trim', explode('|', $line));
                    if (!empty($parts[0])) {
                        $items[] = [
                            'src'     => $parts[0],
                            'alt'     => $parts[1] ?? '',
                            'caption' => $parts[2] ?? '',
                        ];
                    }
                }
            }
        }

        $result = [];
        foreach ($items as $img) {
            if (is_string($img) && !empty(trim($img))) {
                $result[] = ['src' => trim($img), 'alt' => '', 'caption' => ''];
            } elseif (is_array($img) && !empty($img['src'])) {
                $result[] = [
                    'src'     => (string) $img['src'],
                    'alt'     => (string) ($img['alt'] ?? ''),
                    'caption' => (string) ($img['caption'] ?? ''),
                ];
            }
        }

        return $result;
    }
}
