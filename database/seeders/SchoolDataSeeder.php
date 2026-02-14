<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\SchoolClass;

class SchoolDataSeeder extends Seeder
{
    public function run()
    {
    
        $subjects = [
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'English Literature',
            'History',
            'Geography',
            'Computer Science',
            'Art',
            'Physical Education'
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(['name' => $subject, 'code' => strtoupper(substr($subject, 0, 3)) . rand(100, 999)]);
        }

        
        $classes = [
            'Grade 10-A', 'Grade 10-B', 'Grade 10-C',
            'Grade 11-A', 'Grade 11-B', 'Grade 11-C',
            'Grade 12-A', 'Grade 12-B', 'Grade 12-C'
        ];

        foreach ($classes as $className) {
            SchoolClass::firstOrCreate([
                'name' => $className
            ]);
        }
    }
}
