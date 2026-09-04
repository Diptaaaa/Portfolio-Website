<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminEducationController extends Controller
{
    /**
     * Display a listing of education items.
     */
    public function index(): Response
    {
        $educations = Education::orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Education', [
            'educations' => $educations,
        ]);
    }

    /**
     * Store a newly created education item in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'period' => ['required', 'string', 'max:255'],
            'gpa' => ['nullable', 'string', 'max:100'],
            'logo_url' => ['nullable', 'string', 'max:1000'],
            'logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'coursework' => ['nullable'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'institution.required' => 'Nama institusi / universitas wajib diisi.',
            'degree.required' => 'Fakultas / gelar / program studi wajib diisi.',
            'period.required' => 'Periode tahun / bulan pendidikan wajib diisi.',
        ]);

        $logoUrl = $validated['logo_url'] ?? '/images/ub-logo.svg';

        if ($request->hasFile('logo_file')) {
            $file = $request->file('logo_file');
            $uploadDir = public_path('images/education');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $filename = 'edu_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            $logoUrl = '/images/education/' . $filename;
        }

        $coursework = $this->parseCoursework($request->input('coursework'));

        Education::create([
            'institution' => $validated['institution'],
            'degree' => $validated['degree'],
            'period' => $validated['period'],
            'gpa' => $validated['gpa'] ?? null,
            'logo_url' => $logoUrl,
            'coursework' => $coursework,
            'order' => (int) ($validated['order'] ?? (Education::max('order') + 1)),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.education.index')->with('success', 'Data pendidikan baru berhasil ditambahkan!');
    }

    /**
     * Update the specified education item in storage.
     */
    public function update(Request $request, Education $education): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'period' => ['required', 'string', 'max:255'],
            'gpa' => ['nullable', 'string', 'max:100'],
            'logo_url' => ['nullable', 'string', 'max:1000'],
            'logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'coursework' => ['nullable'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable'],
        ], [
            'institution.required' => 'Nama institusi / universitas wajib diisi.',
            'degree.required' => 'Fakultas / gelar / program studi wajib diisi.',
            'period.required' => 'Periode tahun / bulan pendidikan wajib diisi.',
        ]);

        $logoUrl = $validated['logo_url'] ?? $education->logo_url;

        if ($request->hasFile('logo_file')) {
            $file = $request->file('logo_file');
            $uploadDir = public_path('images/education');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $filename = 'edu_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            $logoUrl = '/images/education/' . $filename;
        }

        $coursework = $this->parseCoursework($request->input('coursework'));

        $education->update([
            'institution' => $validated['institution'],
            'degree' => $validated['degree'],
            'period' => $validated['period'],
            'gpa' => $validated['gpa'] ?? null,
            'logo_url' => $logoUrl,
            'coursework' => $coursework,
            'order' => isset($validated['order']) ? (int) $validated['order'] : $education->order,
            'is_active' => filter_var($request->input('is_active', $education->is_active), FILTER_VALIDATE_BOOLEAN),
        ]);

        return redirect()->route('admin.education.index')->with('success', "Data pendidikan {$education->institution} berhasil diperbarui!");
    }

    /**
     * Remove the specified education item from storage.
     */
    public function destroy(Education $education): RedirectResponse
    {
        $name = $education->institution;
        $education->delete();

        return redirect()->route('admin.education.index')->with('success', "Data pendidikan {$name} berhasil dihapus!");
    }

    /**
     * Parse coursework input (array or newline/comma-separated string) into a clean string array.
     */
    private function parseCoursework(mixed $input): array
    {
        if (is_array($input)) {
            return array_values(array_filter(array_map('trim', $input)));
        }

        if (is_string($input)) {
            // Split by newline or comma
            $items = preg_split('/[\r\n,]+/', $input);
            return array_values(array_filter(array_map('trim', $items)));
        }

        return [];
    }
}
