<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Pendaftaran akun publik dinonaktifkan - seluruh akun dikelola melalui panel admin
    Route::get('register', function () {
        return redirect()->route('login');
    })->name('register');

    Route::post('register', function () {
        abort(403, 'Pendaftaran akun publik dinonaktifkan. Akun hanya dapat dibuat oleh Admin melalui sistem admin.');
    });

    // Reset password publik dinonaktifkan - password dikelola oleh admin
    Route::get('forgot-password', function () {
        return redirect()->route('login');
    })->name('password.request');

    Route::post('forgot-password', function () {
        abort(403, 'Fitur reset password mandiri dinonaktifkan. Silakan hubungi Administrator.');
    })->name('password.email');

    Route::get('reset-password/{token}', function () {
        return redirect()->route('login');
    })->name('password.reset');

    Route::post('reset-password', function () {
        abort(403, 'Fitur reset password mandiri dinonaktifkan.');
    })->name('password.store');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
