<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

       
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@edumanage.com',
            'password' => 'password',
            'role' => 'admin',
        ]);

       
        $teacherUser = User::factory()->create([
            'name' => 'Teacher User',
            'email' => 'teacher@edumanage.com',
            'password' => 'password',
            'role' => 'teacher',
        ]);
        \App\Models\Teacher::create(['user_id' => $teacherUser->id]);

       
        $studentUser = User::factory()->create([
            'name' => 'yousef',
            'email' => 'yousef@gmail.com',
            'password' => '123456789',
            'role' => 'student',
        ]);
        \App\Models\Student::create(['user_id' => $studentUser->id]);

        $this->call(SchoolDataSeeder::class);
    }
}