<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\SchoolClass;
use App\Models\Subject;

class DashboardController extends Controller
{
    public function adminStats()
    {
        return response()->json([
            'total_students' => Student::count(),
            'total_teachers' => Teacher::count(),
            'total_classes' => SchoolClass::count(),
            'total_subjects' => Subject::count(),
        ]);
    }
}
