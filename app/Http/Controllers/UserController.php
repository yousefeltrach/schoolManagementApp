<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role') && $request->input('role') !== 'all') {
            $query->where('role', $request->input('role'));
        }

        // Order by newest first
        $users = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($users);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting self (optional but good practice)
        if (auth()->id() === $user->id) {
            return response()->json(['message' => 'Cannot delete your own account'], 403);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
