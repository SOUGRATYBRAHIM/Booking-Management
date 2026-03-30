<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController; 

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [UserController::class, 'profile']);
  //pages
    Route::get('/pages', [PageController::class, 'index']);
    Route::post('/pages', [PageController::class, 'store']);
    Route::get('/pages/{id}', [PageController::class, 'show']);
    Route::put('/pages/{id}', [PageController::class, 'update']);
    Route::delete('/pages/{id}', [PageController::class, 'destroy']);

    //services
    Route::get('/pages/{pageId}/services', [ServiceController::class, 'index']);
    Route::post('/pages/{pageId}/services', [ServiceController::class, 'store']);
    Route::put('/pages/{pageId}/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/pages/{pageId}/services/{id}', [ServiceController::class, 'destroy']);

    //bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);    

    //client 
    Route::post('/p/{slug}/services', [ServiceController::class, 'publicList']);
    Route::post('/p/{slug}/book', [BookingController::class, 'store']);


});
