<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticatedSessionController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('students', \App\Http\Controllers\StudentController::class);
    Route::apiResource('teachers', \App\Http\Controllers\TeacherController::class);
    Route::apiResource('classes', \App\Http\Controllers\SchoolClassController::class);
    Route::apiResource('subjects', \App\Http\Controllers\SubjectController::class);
    Route::apiResource('attendances', \App\Http\Controllers\AttendanceController::class);
    Route::apiResource('grades', \App\Http\Controllers\GradeController::class);
});