<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSkillController extends Controller
{
    /**
     * Display a listing of skills, tools, and certifications.
     */
    public function index(): Response
    {
        $certifications = Certification::orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $tools = Skill::tool()
            ->orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $competencies = Skill::competency()
            ->orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Skills', [
            'certifications' => $certifications,
            'tools'          => $tools,
            'competencies'   => $competencies,
        ]);
    }

    /**
     * Upload an image/file for a certificate.
     */
    public function uploadCertificateImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'mimes:jpeg,png,jpg,webp,svg,pdf', 'max:10240'],
        ], [
            'image.required' => 'File berkas sertifikat wajib dipilih.',
            'image.mimes'    => 'Format file harus berupa gambar (JPG, PNG, WebP, SVG) atau PDF.',
            'image.max'      => 'Ukuran file sertifikat maksimal 10MB.',
        ]);

        $file = $request->file('image');
        $uploadDir = public_path('images/certificates');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'cert_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadDir, $filename);

        return response()->json([
            'success'       => true,
            'url'           => '/images/certificates/' . $filename,
            'filename'      => $filename,
            'original_name' => $file->getClientOriginalName(),
        ]);
    }

    /* ─── Certification CRUD ───────────────────────────────────── */

    public function storeCertification(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'     => ['required', 'string', 'max:255'],
            'issuer'    => ['required', 'string', 'max:255'],
            'year'      => ['nullable', 'string', 'max:50'],
            'icon'      => ['nullable', 'string', 'max:50'],
            'image'     => ['nullable', 'string', 'max:1000'],
            'cred_id'   => ['nullable', 'string', 'max:100'],
            'order'     => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'title.required'  => 'Judul sertifikat wajib diisi.',
            'issuer.required' => 'Nama penerbit / organisasi penerbit wajib diisi.',
        ]);

        Certification::create([
            'title'     => $validated['title'],
            'issuer'    => $validated['issuer'],
            'year'      => $validated['year'] ?? null,
            'icon'      => $validated['icon'] ?? 'google',
            'image'     => $validated['image'] ?? null,
            'cred_id'   => $validated['cred_id'] ?? null,
            'order'     => (int) ($validated['order'] ?? (Certification::max('order') + 1)),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.skills.index')->with('success', 'Sertifikasi baru berhasil ditambahkan!');
    }

    public function updateCertification(Request $request, Certification $certification): RedirectResponse
    {
        $validated = $request->validate([
            'title'     => ['required', 'string', 'max:255'],
            'issuer'    => ['required', 'string', 'max:255'],
            'year'      => ['nullable', 'string', 'max:50'],
            'icon'      => ['nullable', 'string', 'max:50'],
            'image'     => ['nullable', 'string', 'max:1000'],
            'cred_id'   => ['nullable', 'string', 'max:100'],
            'order'     => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'title.required'  => 'Judul sertifikat wajib diisi.',
            'issuer.required' => 'Nama penerbit / organisasi penerbit wajib diisi.',
        ]);

        $certification->update([
            'title'     => $validated['title'],
            'issuer'    => $validated['issuer'],
            'year'      => $validated['year'] ?? null,
            'icon'      => $validated['icon'] ?? $certification->icon,
            'image'     => $validated['image'] ?? $certification->image,
            'cred_id'   => $validated['cred_id'] ?? null,
            'order'     => isset($validated['order']) ? (int) $validated['order'] : $certification->order,
            'is_active' => filter_var($request->input('is_active', $certification->is_active), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.skills.index')->with('success', "Sertifikasi \"{$certification->title}\" berhasil diperbarui!");
    }

    public function destroyCertification(Certification $certification): RedirectResponse
    {
        $title = $certification->title;
        $certification->delete();

        return redirect()->route('admin.skills.index')->with('success', "Sertifikasi \"{$title}\" berhasil dihapus!");
    }

    /* ─── Skill & Competency CRUD ──────────────────────────────── */

    public function storeSkill(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type'        => ['required', 'string', 'in:tool,competency'],
            'name'        => ['required', 'string', 'max:255'],
            'category'    => ['nullable', 'string', 'max:255'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'badge'       => ['nullable', 'string', 'max:100'],
            'badge_color' => ['nullable', 'string', 'max:255'],
            'items'       => ['nullable'],
            'order'       => ['nullable', 'integer'],
            'is_active'   => ['nullable'],
        ], [
            'name.required' => 'Nama skill atau kategori wajib diisi.',
        ]);

        Skill::create([
            'type'        => $validated['type'],
            'name'        => $validated['name'],
            'category'    => $validated['category'] ?? null,
            'icon'        => $validated['icon'] ?? 'database',
            'badge'       => $validated['badge'] ?? null,
            'badge_color' => $validated['badge_color'] ?? null,
            'items'       => $this->parseLines($request->input('items')),
            'order'       => (int) ($validated['order'] ?? (Skill::where('type', $validated['type'])->max('order') + 1)),
            'is_active'   => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        $label = $validated['type'] === 'tool' ? 'Tool' : 'Taksonomi keahlian';
        return redirect()->route('admin.skills.index')->with('success', "{$label} baru berhasil ditambahkan!");
    }

    public function updateSkill(Request $request, Skill $skill): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'category'    => ['nullable', 'string', 'max:255'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'badge'       => ['nullable', 'string', 'max:100'],
            'badge_color' => ['nullable', 'string', 'max:255'],
            'items'       => ['nullable'],
            'order'       => ['nullable', 'integer'],
            'is_active'   => ['nullable'],
        ], [
            'name.required' => 'Nama skill atau kategori wajib diisi.',
        ]);

        $skill->update([
            'name'        => $validated['name'],
            'category'    => $validated['category'] ?? null,
            'icon'        => $validated['icon'] ?? $skill->icon,
            'badge'       => $validated['badge'] ?? null,
            'badge_color' => $validated['badge_color'] ?? $skill->badge_color,
            'items'       => $this->parseLines($request->input('items')),
            'order'       => isset($validated['order']) ? (int) $validated['order'] : $skill->order,
            'is_active'   => filter_var($request->input('is_active', $skill->is_active), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.skills.index')->with('success', "Data \"{$skill->name}\" berhasil diperbarui!");
    }

    public function destroySkill(Skill $skill): RedirectResponse
    {
        $name = $skill->name;
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', "Data \"{$name}\" berhasil dihapus!");
    }

    /**
     * Parse newline-separated text or array into array of strings.
     */
    private function parseLines(mixed $input): ?array
    {
        if (is_array($input)) {
            return array_values(array_filter(array_map('trim', $input)));
        }
        if (is_string($input)) {
            $lines = preg_split('/[\r\n]+/', $input);
            return array_values(array_filter(array_map('trim', $lines)));
        }
        return null;
    }
}
