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
                'name'     => 'Administrator',
                'username' => 'admin',
                'password' => Hash::make('admin123'),
            ]
        );

        User::updateOrCreate(
            ['username' => 'dipta'],
            [
                'name'     => 'Muhammad Rafli Pradipta',
                'username' => 'dipta',
                'password' => Hash::make('admin123'),
            ]
        );

        $this->command->info('✅  Admin accounts seeded — usernames: admin, dipta | default password: admin123');
    }
}
