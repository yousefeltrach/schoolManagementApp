<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SchoolClass;

class SchoolClassController extends Controller
{
    public function index()
    {
        return SchoolClass::with('teacher')->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'nullable|exists:teachers,id',
        ]);

        $class = SchoolClass::create($validated);
        return response()->json($class, 201);
    }

    public function show(SchoolClass $class)
    {
        return $class->load(['teacher', 'students']);
    }

    public function update(Request $request, SchoolClass $class)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'teacher_id' => 'nullable|exists:teachers,id',
        ]);

        $class->update($validated);
        return response()->json($class);
    }

    public function destroy(SchoolClass $class)
    {
        $class->delete();
        return response()->json(null, 204);
    }
}
