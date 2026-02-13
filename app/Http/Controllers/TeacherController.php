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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'specialization' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $user = \App\Models\User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => \Illuminate\Support\Facades\Hash::make($validated['password']),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'specialization' => $validated['specialization'] ?? null,
            'phone' => $validated['phone'] ?? null,
        ]);

        return response()->json($teacher->load('user'), 201);
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
