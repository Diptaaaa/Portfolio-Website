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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('work'); // 'work' or 'organization'
            $table->string('company'); // Company or Organization name
            $table->string('role'); // Job title or Position role
            $table->string('location')->nullable();
            $table->string('period')->nullable();
            $table->string('badge')->nullable(); // e.g. 'Executive Leadership'
            $table->json('points')->nullable(); // Bullet point highlights
            $table->json('images')->nullable(); // Gallery images [{ src, alt, caption }]
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Seed initial experiences
        $initialData = [
            // ── Professional Work Experience ──────────────────
            [
                'type' => 'work',
                'company' => 'Brawijaya Smart School (BSS)',
                'role' => 'Teacher Intern – Informatics & School Observer',
                'location' => 'Malang, East Java',
                'period' => 'Aug - Oct 2025',
                'badge' => null,
                'points' => json_encode([
                    'Designed and executed Grade 10 Informatics lesson plans under the Kurikulum Merdeka framework, focusing on Computer Systems and Operating System architecture for classes averaging 30–32 students.',
                    'Engineered interactive instructional materials across 3 platforms (Canva, Google Forms, and Wayground) and integrated gamified learning systems (Blooket) in classes X-1 and X-2, driving student engagement and concept retention.',
                    'Supported daily academic administration, student discipline protocols (weekly 5S routine), community outreach supervision for the "Brascho Nyantrik" program (Oct 7–10, 2025), and digital videotron content creation on waste sorting awareness.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/bss-1.svg', 'alt' => 'Videotron Video Editing', 'caption' => 'Educational videotron content editing on waste sorting awareness'],
                    ['src' => '/images/experience/bss-2.svg', 'alt' => 'Blooket Gamified Session', 'caption' => 'Gamified learning session using Blooket (Block Rush & Crypto Hack)'],
                    ['src' => '/images/experience/bss-3.svg', 'alt' => 'Interactive Learning Quiz', 'caption' => 'Interactive instructional modules on Wayground platform'],
                    ['src' => '/images/experience/bss-4.svg', 'alt' => 'Google Forms Assessment', 'caption' => 'Student evaluation and concept retention check via Google Forms'],
                    ['src' => '/images/experience/bss-5.svg', 'alt' => 'Classroom Informatics Teaching', 'caption' => 'Grade 10 Informatics instruction on Computer Systems & OS Architecture'],
                    ['src' => '/images/experience/bss-6.svg', 'alt' => 'Brascho Nyantrik Community', 'caption' => 'Community outreach supervision for Brascho Nyantrik in partner villages'],
                    ['src' => '/images/experience/bss-7.svg', 'alt' => 'Daily School Administration', 'caption' => 'Weekly 5S routine and academic administration supervision'],
                    ['src' => '/images/experience/bss-8.svg', 'alt' => 'Computer Hardware Workshop', 'caption' => 'Hands-on hardware and system architecture exercise'],
                    ['src' => '/images/experience/bss-9.svg', 'alt' => 'Operating Systems Architecture', 'caption' => 'Interactive slide deck and discussion on OS fundamentals'],
                    ['src' => '/images/experience/bss-10.svg', 'alt' => 'Student Team Collaboration', 'caption' => 'Collaborative student problem-solving group activity'],
                    ['src' => '/images/experience/bss-11.svg', 'alt' => 'Waste Sorting Videotron', 'caption' => 'Digital videotron broadcast on campus waste management'],
                ]),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'work',
                'company' => 'SMA Negeri 1 Sooko',
                'role' => 'Educational Technology Intern',
                'location' => 'Mojokerto, East Java',
                'period' => 'Jun - Aug 2025',
                'badge' => null,
                'points' => json_encode([
                    'Configured, customized, and deployed a Moodle-based Learning Management System (LMS) directly onto the school server infrastructure, scaling centralized digital learning for 1,100+ students.',
                    'Streamlined digital learning workflows and user access control, ensuring seamless platform adoption across teaching staff and students.',
                    'Executed the project over 2 months through a hybrid setup (on-site server hosting and remote LMS UI/UX design) under the approval and supervision of the school IT faculty.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/sooko-1.svg', 'alt' => 'Server Configuration', 'caption' => 'On-site Moodle LMS hosting and server configuration'],
                    ['src' => '/images/experience/sooko-2.svg', 'alt' => 'User Access Control', 'caption' => 'Role mapping and user access architecture for 1,100+ students'],
                    ['src' => '/images/experience/sooko-3.svg', 'alt' => 'Teacher Workshop', 'caption' => 'Teacher training and Kurikulum Merdeka e-learning adoption'],
                    ['src' => '/images/experience/sooko-4.svg', 'alt' => 'Learning Portal Interface', 'caption' => 'Centralized school LMS portal interface'],
                ]),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'work',
                'company' => 'SMAN 1 Kedungwaru',
                'role' => 'Instructional Media Developer',
                'location' => 'Tulungagung, East Java',
                'period' => 'Mar - Jun 2025',
                'badge' => null,
                'points' => json_encode([
                    'Produced 3 core deliverables: interactive presentation suites, visual infographics, and instructional videos tailored for Grade 10 Indonesian History under Kurikulum Merdeka.',
                    'Collaborated closely with a Grade 10 History teacher to restructure digital learning materials and improve student comprehension.',
                    'Engaged in a 4-month project development cycle (Mar–Jun 2025) under faculty mentorship specializing in multimodal learning frameworks.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/kedungwaru-1.svg', 'alt' => 'History Media Storyboard', 'caption' => 'Multimodal history learning media storyboard'],
                    ['src' => '/images/experience/kedungwaru-2.svg', 'alt' => 'Teacher Review Session', 'caption' => 'Faculty collaboration on digital curriculum restructuring'],
                    ['src' => '/images/experience/kedungwaru-3.svg', 'alt' => 'Canva Educational Slides', 'caption' => 'Interactive visual infographic slides for 10th grade'],
                ]),
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'work',
                'company' => 'TIKI (HANI & HANUM Outlets)',
                'role' => 'Shipping Clerk',
                'location' => 'Berau, East Kalimantan',
                'period' => 'Feb - Aug 2022',
                'badge' => null,
                'points' => json_encode([
                    'Processed daily shipping operations, package intake, data entry, and waybill generation within the logistics system with high accuracy.',
                    'Ensured outgoing shipments strictly complied with logistics safety standards regarding weight, volume, and packaging integrity.',
                    'Provided front-desk customer support to assist clients with service selection and shipment tracking while preparing daily dispatch manifests.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/tiki-1.svg', 'alt' => 'Logistics Manifest Entry', 'caption' => 'Daily waybill entry and dispatch manifest verification'],
                    ['src' => '/images/experience/tiki-2.svg', 'alt' => 'Package Intake Operations', 'caption' => 'Logistics safety inspection and weight-volume measurement'],
                ]),
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ── Organizational & Leadership Experience ────────
            [
                'type' => 'organization',
                'company' => 'Asrama Banua Malang',
                'role' => 'Dormitory President',
                'location' => 'Malang, East Java',
                'period' => 'Jan 2024 - Present',
                'badge' => 'Executive Leadership',
                'points' => json_encode([
                    'Led and managed dormitory operations, executive board activities, and student development programs across 3 consecutive terms.',
                    'Spearheaded the Dormitory Orientation Program (PEKA) for incoming freshman residents (3–5 students per batch), facilitating smooth onboarding and community integration.',
                    'Designed and executed leadership development initiatives for new residents to foster strong community values and organizational succession.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/banua-1.svg', 'alt' => 'Executive Board Assembly', 'caption' => 'Dormitory operations strategy and executive board leadership'],
                    ['src' => '/images/experience/banua-2.svg', 'alt' => 'PEKA Orientation Program', 'caption' => 'Dormitory Orientation Program for incoming freshmen'],
                    ['src' => '/images/experience/banua-3.svg', 'alt' => 'Leadership Training', 'caption' => 'Resident leadership development and community succession seminar'],
                    ['src' => '/images/experience/banua-4.svg', 'alt' => 'Community Gathering', 'caption' => 'Banua Malang annual resident gathering and cohesion event'],
                ]),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'organization',
                'company' => 'Unit Mahasiswa Masjid Raden Patah (UMAR)',
                'role' => 'Public Relations Staff',
                'location' => 'Malang, East Java',
                'period' => 'Nov 2024 - Jul 2025',
                'badge' => 'Media Outreach',
                'points' => json_encode([
                    'Served as the primary liaison between the mosque administration, the congregation, and external stakeholders to strengthen communication and institutional partnerships.',
                    'Initiated and produced the "SIRAH" Podcast (Siaran Inspirasi Masjid Raden Patah) held at Malang Creative Center (MCC) in 2025 to expand digital outreach.',
                    'Organized a comparative study program with external mosque executive boards at Permata Jingga Mosque in 2025, facilitating organizational benchmarking and knowledge exchange.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/umar-1.svg', 'alt' => 'SIRAH Podcast Live Production', 'caption' => 'SIRAH Podcast production live at Malang Creative Center (MCC)'],
                    ['src' => '/images/experience/umar-2.svg', 'alt' => 'Permata Jingga Comparative Study', 'caption' => 'Comparative study and institutional benchmarking at Permata Jingga Mosque'],
                    ['src' => '/images/experience/umar-3.svg', 'alt' => 'Digital Outreach Coordination', 'caption' => 'Public relations and digital media broadcast initiatives'],
                ]),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'organization',
                'company' => 'MindCare',
                'role' => 'Event Staff',
                'location' => 'Malang, East Java',
                'period' => 'Jan - Dec 2023',
                'badge' => 'Community & Health',
                'points' => json_encode([
                    'Created and curated educational content on mental health to promote emotional well-being and drive advocacy against mental health stigma.',
                    'Facilitated peer support initiatives and assisted community members in navigating personal challenges within a safe and supportive discussion environment.',
                ]),
                'images' => json_encode([
                    ['src' => '/images/experience/mindcare-1.svg', 'alt' => 'Mental Health Workshop', 'caption' => 'Educational campaign on emotional well-being and destigmatization'],
                    ['src' => '/images/experience/mindcare-2.svg', 'alt' => 'Peer Support Discussion', 'caption' => 'Facilitated safe-space peer support and open discussion forum'],
                ]),
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('experiences')->insert($initialData);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
