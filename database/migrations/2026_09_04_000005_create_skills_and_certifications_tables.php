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
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->string('year')->nullable();
            $table->string('icon')->default('google'); // 'google', 'microsoft', 'meta', 'nvidia', 'ai', etc.
            $table->string('image')->nullable();
            $table->string('cred_id')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('tool'); // 'tool' or 'competency'
            $table->string('name'); // Tool name or Competency category title
            $table->string('category')->nullable(); // Tool category or Competency subtitle
            $table->string('icon')->nullable(); // TechIcon name or Lucide icon name
            $table->string('badge')->nullable(); // e.g. 'Technical', 'Methodology'
            $table->string('badge_color')->nullable();
            $table->json('items')->nullable(); // Array of skills for competency category
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ── Seed 13 Default Certifications ───────────────────
        $initialCertifications = [
            [
                'title' => 'Google Data Analytics Professional',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-data-analytics.svg',
                'cred_id' => 'GDA-2026-984210',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Microsoft Office Desktop Application',
                'issuer' => 'Trust Training Partners (Microsoft Partner)',
                'year' => '2026',
                'icon' => 'microsoft',
                'image' => '/images/certificates/microsoft-office.svg',
                'cred_id' => 'MOS-2026-441293',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Introduction to Data Analysis Using Python',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-python-data-analysis.svg',
                'cred_id' => 'GPY-2026-781290',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Share Data Through the Art of Visualization',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-data-visualization.svg',
                'cred_id' => 'GDV-2026-651230',
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Process Data from Dirty to Clean',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-clean-data.svg',
                'cred_id' => 'GDC-2026-512984',
                'order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Ask Questions to Make Data-Driven Decisions',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-data-driven-decisions.svg',
                'cred_id' => 'GDD-2026-391824',
                'order' => 6,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Foundations: Data, Data, Everywhere',
                'issuer' => 'Google',
                'year' => '2026',
                'icon' => 'google',
                'image' => '/images/certificates/google-data-foundations.svg',
                'cred_id' => 'GDF-2026-102948',
                'order' => 7,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Introduction to Front-End Development',
                'issuer' => 'Meta',
                'year' => '2026',
                'icon' => 'meta',
                'image' => '/images/certificates/meta-frontend-dev.svg',
                'cred_id' => 'MFD-2026-884102',
                'order' => 8,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Programming with JavaScript',
                'issuer' => 'Meta',
                'year' => '2026',
                'icon' => 'meta',
                'image' => '/images/certificates/meta-javascript.svg',
                'cred_id' => 'MJS-2026-664210',
                'order' => 9,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => "ICP HUB Indonesia Builder's Day",
                'issuer' => 'ICP Indonesia',
                'year' => '2025',
                'icon' => 'meta',
                'image' => '/images/certificates/icp-builders-day.svg',
                'cred_id' => 'ICP-2025-559124',
                'order' => 10,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Color and Typography',
                'issuer' => 'MySkill',
                'year' => '2024',
                'icon' => 'meta',
                'image' => '/images/certificates/myskill-typography.svg',
                'cred_id' => 'MSK-2024-332187',
                'order' => 11,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'AI Jumpstart Programme Roadshow',
                'issuer' => 'Instellar',
                'year' => '2024',
                'icon' => 'ai',
                'image' => '/images/certificates/instellar-ai-roadshow.svg',
                'cred_id' => 'INS-2024-219483',
                'order' => 12,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Training AI Model With GPU',
                'issuer' => 'NVIDIA',
                'year' => '2022',
                'icon' => 'nvidia',
                'image' => '/images/certificates/nvidia-ai-gpu.svg',
                'cred_id' => 'NVD-2022-108273',
                'order' => 13,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('certifications')->insert($initialCertifications);

        // ── Seed 8 Default Core Tools ─────────────────────────
        $initialTools = [
            [
                'type' => 'tool',
                'name' => 'Python (Pandas)',
                'category' => 'Data Analysis & Manipulation',
                'icon' => 'python',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'SQL & DBMS',
                'category' => 'Database Querying & Modeling',
                'icon' => 'sql',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Microsoft Excel',
                'category' => 'Advanced Formulas & Analytics',
                'icon' => 'excel',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Tableau',
                'category' => 'Data Visualization & BI',
                'icon' => 'tableau',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Claude AI Platform',
                'category' => 'AI Analytics & Prompt Engineering',
                'icon' => 'ai',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Data Wrangling',
                'category' => 'Cleaning, Structuring & ETL',
                'icon' => 'database',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 6,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Data Storytelling',
                'category' => 'Infographics & Executive Decks',
                'icon' => 'excel',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 7,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tool',
                'name' => 'Web Fundamentals',
                'category' => 'HTML, CSS & JS Core',
                'icon' => 'meta',
                'badge' => null,
                'badge_color' => null,
                'items' => null,
                'order' => 8,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('skills')->insert($initialTools);

        // ── Seed 5 Default Skill Competencies / Taxonomies ───
        $initialCompetencies = [
            [
                'type' => 'competency',
                'name' => 'Hard Skills',
                'category' => 'Technical Analytical Toolsets',
                'icon' => 'Code2',
                'badge' => 'Technical',
                'badge_color' => 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
                'items' => json_encode([
                    'Data Analysis',
                    'Querying & DBMS',
                    'Statistical Analysis',
                    'Data Visualization & Reporting',
                    'AI-Assisted Analytics',
                    'Web Fundamentals',
                ]),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'competency',
                'name' => 'Soft Skills',
                'category' => 'Professional & Interpersonal',
                'icon' => 'Users',
                'badge' => 'Interpersonal',
                'badge_color' => 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
                'items' => json_encode([
                    'Communication',
                    'Problem-Solving',
                    'Adaptability',
                    'Attention to Detail',
                    'Stakeholder Coordination',
                    'Time Management',
                ]),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'competency',
                'name' => 'Languages',
                'category' => 'Global & Working Fluency',
                'icon' => 'Globe',
                'badge' => 'Fluency',
                'badge_color' => 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
                'items' => json_encode([
                    'Indonesian: Native',
                    'English: Limited Working / Intermediate',
                    'Technical Documentation',
                    'Executive Presentations',
                ]),
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'competency',
                'name' => 'Data & AI Workflows',
                'category' => 'End-to-End Modern Pipelines',
                'icon' => 'Cpu',
                'badge' => 'Methodology',
                'badge_color' => 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
                'items' => json_encode([
                    'Data Wrangling & Cleaning',
                    'Exploratory Data Analysis',
                    'Prompt Engineering',
                    'Actionable Business Insights',
                ]),
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'competency',
                'name' => 'EdTech & Learning',
                'category' => 'Instructional Engineering',
                'icon' => 'BookOpen',
                'badge' => 'Domain',
                'badge_color' => 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
                'items' => json_encode([
                    'Moodle LMS Deployment',
                    'Instructional Media Design',
                    'Kurikulum Merdeka Framework',
                    'Gamified Learning Modules',
                ]),
                'order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('skills')->insert($initialCompetencies);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('certifications');
    }
};
