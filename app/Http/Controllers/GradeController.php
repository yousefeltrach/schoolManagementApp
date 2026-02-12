<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Grade;

class GradeController extends Controller
{
    public function index()
    {
        return Grade::with(['student', 'subject'])->paginate(20);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'marks' => 'required|integer|min:0|max:100',
            'term' => 'nullable|string',
        ]);

        $grade = Grade::create($validated);
        return response()->json($grade, 201);
    }

    public function show(Grade $grade)
    {
        return $grade->load(['student', 'subject']);
    }

    public function update(Request $request, Grade $grade)
    {
        $validated = $request->validate([
            'marks' => 'integer|min:0|max:100',
            'term' => 'nullable|string',
        ]);

        $grade->update($validated);
        return response()->json($grade);
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(null, 204);
    }
}
