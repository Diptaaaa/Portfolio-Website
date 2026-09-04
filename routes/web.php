<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


Route::get('/projects', function () {
    return Inertia::render('Projects', [
        'projects' => \App\Models\Project::where('is_active', true)
            ->orderBy('order')
            ->get(),
    ]);
})->name('projects');

Route::get('/experience', function () {
    return Inertia::render('Experience', [
        'workExperiences' => \App\Models\Experience::work()->active()->orderBy('order', 'asc')->get(),
        'organizationalExperiences' => \App\Models\Experience::organization()->active()->orderBy('order', 'asc')->get(),
    ]);
})->name('experience');

Route::get('/skills', function () {
    return Inertia::render('Skills', [
        'certifications' => \App\Models\Certification::active()->orderBy('order', 'asc')->get(),
        'keySkills' => \App\Models\Skill::tool()->active()->orderBy('order', 'asc')->get(),
        'skillCategories' => \App\Models\Skill::competency()->active()->orderBy('order', 'asc')->get(),
    ]);
})->name('skills');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

use App\Http\Controllers\AdminConfigController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminEducationController;
use App\Http\Controllers\AdminProjectController;
use App\Http\Controllers\AdminExperienceController;
use App\Http\Controllers\AdminSkillController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'settings' => \App\Models\PortfolioSetting::getAllAsKeyValue(),
            'adminCount' => \App\Models\User::count(),
            'educationCount' => \App\Models\Education::count(),
            'projectCount' => \App\Models\Project::count(),
            'experienceCount' => \App\Models\Experience::count(),
            'certificationCount' => \App\Models\Certification::count(),
            'skillCount' => \App\Models\Skill::count(),
        ]);
    })->name('dashboard');

    Route::get('/admin/config', [AdminConfigController::class, 'index'])->name('admin.config');
    Route::post('/admin/config', [AdminConfigController::class, 'update'])->name('admin.config.update');

    // Admin User Management
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users', [AdminUserController::class, 'store'])->name('admin.users.store');
    Route::put('/admin/users/{user}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{user}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');

    // Admin Education CRUD
    Route::get('/admin/education', [AdminEducationController::class, 'index'])->name('admin.education.index');
    Route::post('/admin/education', [AdminEducationController::class, 'store'])->name('admin.education.store');
    Route::put('/admin/education/{education}', [AdminEducationController::class, 'update'])->name('admin.education.update');
    Route::delete('/admin/education/{education}', [AdminEducationController::class, 'destroy'])->name('admin.education.destroy');

    // Admin Experience CRUD
    Route::get('/admin/experience', [AdminExperienceController::class, 'index'])->name('admin.experience.index');
    Route::post('/admin/experience', [AdminExperienceController::class, 'store'])->name('admin.experience.store');
    Route::post('/admin/experience/upload-image', [AdminExperienceController::class, 'uploadImage'])->name('admin.experience.upload-image');
    Route::put('/admin/experience/{experience}', [AdminExperienceController::class, 'update'])->name('admin.experience.update');
    Route::delete('/admin/experience/{experience}', [AdminExperienceController::class, 'destroy'])->name('admin.experience.destroy');

    // Admin Skills & Certifications CRUD
    Route::get('/admin/skills', [AdminSkillController::class, 'index'])->name('admin.skills.index');
    Route::post('/admin/skills/upload-certificate', [AdminSkillController::class, 'uploadCertificateImage'])->name('admin.skills.upload-certificate');
    Route::post('/admin/skills/certifications', [AdminSkillController::class, 'storeCertification'])->name('admin.skills.certifications.store');
    Route::put('/admin/skills/certifications/{certification}', [AdminSkillController::class, 'updateCertification'])->name('admin.skills.certifications.update');
    Route::delete('/admin/skills/certifications/{certification}', [AdminSkillController::class, 'destroyCertification'])->name('admin.skills.certifications.destroy');
    Route::post('/admin/skills/items', [AdminSkillController::class, 'storeSkill'])->name('admin.skills.items.store');
    Route::put('/admin/skills/items/{skill}', [AdminSkillController::class, 'updateSkill'])->name('admin.skills.items.update');
    Route::delete('/admin/skills/items/{skill}', [AdminSkillController::class, 'destroySkill'])->name('admin.skills.items.destroy');

    // Admin Project CRUD
    Route::get('/admin/projects', [AdminProjectController::class, 'index'])->name('admin.projects.index');
    Route::post('/admin/projects', [AdminProjectController::class, 'store'])->name('admin.projects.store');
    Route::post('/admin/projects/upload-image', [AdminProjectController::class, 'uploadImage'])->name('admin.projects.upload-image');
    Route::put('/admin/projects/{project}', [AdminProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/admin/projects/{project}', [AdminProjectController::class, 'destroy'])->name('admin.projects.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
