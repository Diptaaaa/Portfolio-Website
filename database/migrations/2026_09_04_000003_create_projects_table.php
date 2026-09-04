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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('category')->default('general');
            $table->string('period')->nullable();
            $table->string('badge')->nullable();
            $table->string('metrics')->nullable();
            $table->json('points')->nullable();
            $table->json('tools')->nullable();
            $table->json('images')->nullable();
            $table->string('link_url')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $projects = [
            [
                'title'    => 'Cyclistic Bike-Share: Maximizing Annual Memberships',
                'subtitle' => 'Google Capstone Project',
                'category' => 'data',
                'period'   => 'Aug 2026',
                'badge'    => 'Google Capstone',
                'metrics'  => '5.5M+ Records',
                'points'   => json_encode([
                    "Processed, cleaned, and structured over 5.5 million historical bike trip records from Chicago's Cyclistic program using Python (Pandas) and SQL.",
                    "Discovered distinct user behaviors: casual riders averaged twice the duration during weekend leisure hours (27.2 mins), whereas annual members dominated peak weekday commute times (8:00 AM & 5:00 PM, 13.6 mins).",
                    "Formulated 3 data-backed marketing strategies aimed at converting high-volume casual weekend riders into long-term annual members.",
                ]),
                'tools'    => json_encode(['Python (Pandas)', 'SQL', 'Microsoft Excel', 'Tableau']),
                'images'   => json_encode([
                    ['src' => '/images/projects/cyclistic-1.svg', 'alt' => 'Tableau Dashboard', 'caption' => 'Tableau executive dashboard: Trip behaviors and user segmentation'],
                    ['src' => '/images/projects/cyclistic-2.svg', 'alt' => 'Ride Duration Analysis', 'caption' => 'Weekend vs weekday ride duration analysis (Casual vs Annual)'],
                    ['src' => '/images/projects/cyclistic-3.svg', 'alt' => 'Peak Commute Heatmap', 'caption' => 'Hourly peak commute distribution across Chicago stations'],
                    ['src' => '/images/projects/cyclistic-4.svg', 'alt' => 'Python Pandas Pipeline', 'caption' => 'Python (Pandas) ETL pipeline processing 5.5M+ records'],
                    ['src' => '/images/projects/cyclistic-5.svg', 'alt' => 'Marketing Strategy Deck', 'caption' => 'Data-backed marketing recommendations for annual conversion'],
                ]),
                'link_url'  => null,
                'order'     => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'    => 'Moodle LMS Development & Digital Learning Integration',
                'subtitle' => 'SMA Negeri 1 Sooko Mojokerto',
                'category' => 'edtech',
                'period'   => 'Jun - Aug 2025',
                'badge'    => 'Institutional Scale',
                'metrics'  => '1,100+ Students',
                'points'   => json_encode([
                    "Engineered and deployed an institutional Moodle LMS onto school server infrastructure using the SAM (Successive Approximations Model) framework, scaling digital learning for 1,100+ students.",
                    "Customized platform UI/UX, built structured course environments, and integrated digital assessment pipelines (Blackboard Quiz Generator) across a 2-month hybrid development setup.",
                    "Streamlined e-learning workflows and user access architecture under Kurikulum Merdeka guidelines.",
                ]),
                'tools'    => json_encode(['Moodle LMS', 'Database Management', 'Server Infrastructure', 'UI/UX Design']),
                'images'   => json_encode([
                    ['src' => '/images/projects/moodle-1.svg', 'alt' => 'Moodle LMS Portal', 'caption' => 'SMA Negeri 1 Sooko digital learning and course portal'],
                    ['src' => '/images/projects/moodle-2.svg', 'alt' => 'Server Infrastructure', 'caption' => 'On-premises server hosting and database configuration'],
                    ['src' => '/images/projects/moodle-3.svg', 'alt' => 'Blackboard Quiz Generator', 'caption' => 'Automated quiz generation and assessment pipeline integration'],
                    ['src' => '/images/projects/moodle-4.svg', 'alt' => 'Gradebook Analytics', 'caption' => 'Student progress tracking and gradebook analytics'],
                    ['src' => '/images/projects/moodle-5.svg', 'alt' => 'Responsive UI Design', 'caption' => 'Customized responsive UI theme for Kurikulum Merdeka'],
                ]),
                'link_url'  => null,
                'order'     => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'    => 'Interactive Digital Media Integration for History Learning',
                'subtitle' => 'SMAN 1 Kedungwaru',
                'category' => 'edtech',
                'period'   => 'Mar - Jun 2025',
                'badge'    => 'Agile SAM Prototyping',
                'metrics'  => '3 Core Suites',
                'points'   => json_encode([
                    "Co-developed an interactive digital learning suite for 10th-grade Indonesian History (Hindu-Buddhist and Islamic Era modules) aligned with Kurikulum Merdeka.",
                    "Served as Video Editor & Lead Media Designer, producing 3 core deliverables: storytelling videos (CapCut), interactive slide modules with TTS AI and quizzes (PowerPoint), and visual infographics (Canva).",
                    "Executed an agile 4-month media prototyping and testing workflow in collaboration with 1 faculty subject-matter expert.",
                    "Utilized the Successive Approximations Model (SAM) for agile media prototyping, testing, and continuous refinement.",
                ]),
                'tools'    => json_encode(['Canva', 'PowerPoint', 'AI Video & Audio (CapCut)', 'Instructional Design']),
                'images'   => json_encode([
                    ['src' => '/images/projects/media-1.svg', 'alt' => 'CapCut Video Editing', 'caption' => 'Storytelling video production timeline for Grade 10 History'],
                    ['src' => '/images/projects/media-2.svg', 'alt' => 'PowerPoint Interactive Deck', 'caption' => 'Interactive slides with embedded AI text-to-speech voiceover'],
                    ['src' => '/images/projects/media-3.svg', 'alt' => 'Canva Visual Infographic', 'caption' => 'Visual curriculum infographics on Hindu-Buddhist and Islamic Eras'],
                    ['src' => '/images/projects/media-4.svg', 'alt' => 'SAM Model Prototyping', 'caption' => 'Successive Approximations Model agile design iterations'],
                    ['src' => '/images/projects/media-5.svg', 'alt' => 'Final Deliverable Suite', 'caption' => 'Multimodal instructional media package for SMAN 1 Kedungwaru'],
                ]),
                'link_url'  => null,
                'order'     => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('projects')->insert($projects);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
