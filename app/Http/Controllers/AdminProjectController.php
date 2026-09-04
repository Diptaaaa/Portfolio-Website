<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(): Response
    {
        $projects = Project::orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Projects', [
            'projects' => $projects,
        ]);
    }

    /**
     * Upload an image for project gallery.
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
        $uploadDir = public_path('images/projects');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'proj_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadDir, $filename);

        return response()->json([
            'success'       => true,
            'url'           => '/images/projects/' . $filename,
            'filename'      => $filename,
            'original_name' => $file->getClientOriginalName(),
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'    => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'period'   => ['nullable', 'string', 'max:100'],
            'badge'    => ['nullable', 'string', 'max:100'],
            'metrics'  => ['nullable', 'string', 'max:100'],
            'points'   => ['nullable'],
            'tools'    => ['nullable'],
            'images'   => ['nullable'],
            'link_url' => ['nullable', 'string', 'max:1000'],
            'order'    => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'title.required'    => 'Judul proyek wajib diisi.',
            'category.required' => 'Kategori proyek wajib dipilih.',
        ]);

        Project::create([
            'title'    => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'category' => $validated['category'],
            'period'   => $validated['period'] ?? null,
            'badge'    => $validated['badge'] ?? null,
            'metrics'  => $validated['metrics'] ?? null,
            'points'   => $this->parseLines($request->input('points')),
            'tools'    => $this->parseComma($request->input('tools')),
            'images'   => $this->parseImages($request->input('images')),
            'link_url' => $validated['link_url'] ?? null,
            'order'    => (int) ($validated['order'] ?? (Project::max('order') + 1)),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek baru berhasil ditambahkan!');
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title'    => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'period'   => ['nullable', 'string', 'max:100'],
            'badge'    => ['nullable', 'string', 'max:100'],
            'metrics'  => ['nullable', 'string', 'max:100'],
            'points'   => ['nullable'],
            'tools'    => ['nullable'],
            'images'   => ['nullable'],
            'link_url' => ['nullable', 'string', 'max:1000'],
            'order'    => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'title.required'    => 'Judul proyek wajib diisi.',
            'category.required' => 'Kategori proyek wajib dipilih.',
        ]);

        $project->update([
            'title'    => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'category' => $validated['category'],
            'period'   => $validated['period'] ?? null,
            'badge'    => $validated['badge'] ?? null,
            'metrics'  => $validated['metrics'] ?? null,
            'points'   => $this->parseLines($request->input('points')),
            'tools'    => $this->parseComma($request->input('tools')),
            'images'   => $this->parseImages($request->input('images')),
            'link_url' => $validated['link_url'] ?? null,
            'order'    => isset($validated['order']) ? (int) $validated['order'] : $project->order,
            'is_active' => filter_var($request->input('is_active', $project->is_active), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.projects.index')->with('success', "Proyek \"{$project->title}\" berhasil diperbarui!");
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $title = $project->title;
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', "Proyek \"{$title}\" berhasil dihapus!");
    }

    /**
     * Parse newline-separated text into an array of strings.
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
     * Parse comma-separated text into an array of strings.
     */
    private function parseComma(mixed $input): array
    {
        if (is_array($input)) {
            return array_values(array_filter(array_map('trim', $input)));
        }
        if (is_string($input)) {
            $items = preg_split('/[,\n]+/', $input);
            return array_values(array_filter(array_map('trim', $items)));
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
