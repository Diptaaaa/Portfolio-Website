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
        Schema::create('portfolio_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('general'); // general, contact, display
            $table->string('type')->default('string');  // string, text, boolean, json
            $table->timestamps();
        });

        // Seed initial default values matching Muhammad Rafli Pradipta's portfolio
        $defaults = [
            // Profile & General
            ['key' => 'full_name', 'value' => 'Muhammad Rafli Pradipta', 'group' => 'general', 'type' => 'string'],
            ['key' => 'job_title', 'value' => 'Data Analyst & Information Technology Education Graduate', 'group' => 'general', 'type' => 'string'],
            ['key' => 'status_badge', 'value' => 'Available for Opportunities', 'group' => 'general', 'type' => 'string'],
            ['key' => 'location', 'value' => 'Malang, East Java, Indonesia', 'group' => 'general', 'type' => 'string'],
            ['key' => 'bio_summary', 'value' => 'Detail-oriented Data Analyst and Information Technology Education graduate (GPA 3.75/4.00) with strong expertise in end-to-end data processing, exploratory analysis, and data visualization. Proficient in Python (Pandas), SQL, and Microsoft Excel to clean complex datasets, query relational databases, and extract actionable business insights. Skilled in leveraging modern AI analytics workflows to optimize data processing pipelines and streamline reporting. Adept at translating complex data findings into data-backed strategic recommendations and communicating effectively with technical and non-technical stakeholders.', 'group' => 'general', 'type' => 'text'],
            ['key' => 'gpa', 'value' => '3.75 / 4.00', 'group' => 'general', 'type' => 'string'],
            ['key' => 'university', 'value' => 'Universitas Brawijaya', 'group' => 'general', 'type' => 'string'],
            ['key' => 'faculty', 'value' => 'Faculty of Computer Science · Bachelor\'s in IT Education', 'group' => 'general', 'type' => 'string'],

            // Contact & Socials
            ['key' => 'whatsapp_number', 'value' => '+62 877 7375 9636', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'whatsapp_url', 'value' => 'https://wa.me/qr/OR62X7KAFNBEF1', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'email', 'value' => 'raflipradipta321@gmail.com', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'linkedin_username', 'value' => 'muhammad-rafli-pradipta', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'linkedin_url', 'value' => 'https://www.linkedin.com/in/muhammad-rafli-pradipta-45b165288/', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'instagram_username', 'value' => '@rrafli.pd', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'instagram_url', 'value' => 'https://www.instagram.com/rrafli.pd?igsi=MXJrZTJzeTZpeWRiMQ==', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'canva_url', 'value' => 'https://portoraflipradipta.my.canva.site/', 'group' => 'contact', 'type' => 'string'],

            // Display & Neon Cursor Settings
            ['key' => 'enable_neon_cursor', 'value' => '1', 'group' => 'display', 'type' => 'boolean'],
            ['key' => 'neon_cursor_color', 'value' => 'magenta', 'group' => 'display', 'type' => 'string'], // magenta, cyan, violet, emerald
        ];

        $now = now();
        foreach ($defaults as &$item) {
            $item['created_at'] = $now;
            $item['updated_at'] = $now;
        }

        DB::table('portfolio_settings')->insert($defaults);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_settings');
    }
};
