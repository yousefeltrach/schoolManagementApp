<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::with(['user', 'schoolClass'])->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'class_id' => 'nullable|exists:school_classes,id',
            'parent_name' => 'nullable|string',
            'address' => 'nullable|string',
            'dob' => 'nullable|date',
        ]);

        $student = Student::create($validated);
        return response()->json($student, 201);
    }

    public function show(Student $student)
    {
        return $student->load(['user', 'schoolClass', 'attendances', 'grades']);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'class_id' => 'nullable|exists:school_classes,id',
            'parent_name' => 'nullable|string',
            'address' => 'nullable|string',
            'dob' => 'nullable|date',
        ]);

        $student->update($validated);
        return response()->json($student);
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return response()->json(null, 204);
    }
}
