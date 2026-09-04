<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Seed the admin account.
     *
     * Credentials:
     *   username : admin
     *   password : admin123
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name'     => 'Admin',
                'username' => 'admin',
                'password' => Hash::make('admin123'),
            ]
        );

        $this->command->info('✅  Admin account seeded — username: admin | password: admin123');
    }
}
