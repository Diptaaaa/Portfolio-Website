<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('institution');
            $table->string('degree');
            $table->string('period');
            $table->string('gpa')->nullable();
            $table->string('logo_url')->nullable()->default('/images/ub-logo.svg');
            $table->json('coursework')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Seed default education (Universitas Brawijaya)
        DB::table('educations')->insert([
            'institution' => 'Universitas Brawijaya',
            'degree' => "Faculty of Computer Science · Bachelor's in IT Education",
            'period' => 'Aug 2022 - Aug 2026',
            'gpa' => 'GPA 3.75 / 4.00',
            'logo_url' => '/images/ub-logo.svg',
            'coursework' => json_encode([
                'Data Analytics',
                'Information Systems Analysis & Design',
                'Database Management Systems',
                'Educational Technology',
                'Instructional Design',
                'Operating Systems',
                'Computer Networks',
            ]),
            'order' => 1,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
