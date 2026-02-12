<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::with('user')->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialization' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $teacher = Teacher::create($validated);
        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        return $teacher->load(['user', 'classes']);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'specialization' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $teacher->update($validated);
        return response()->json($teacher);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response()->json(null, 204);
    }
}
