    <?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\AuthController;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\PageController;
    use App\Http\Controllers\BookingController;
    use App\Http\Controllers\ServiceController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/profile', [UserController::class, 'profile']);

Route::get('/categories', [ServiceController::class, 'getCategories']);
Route::get('/categories/{id}', [ServiceController::class, 'getCategoryDetail']);
Route::get('/categories/{id}/services', [ServiceController::class, 'getServicesByCategory']);
Route::get('/services', [ServiceController::class, 'getAllServices']);

Route::post('/p/{slug}/book', [BookingController::class, 'store']);
Route::get('/p/{slug}', [PageController::class, 'showPublic']);

// Protected routes 
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Update user's profile information (name, email, photo)
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    // Change user's password 
    Route::put('/user/password', [UserController::class, 'changePassword']);
    // Delete account permanently
    Route::delete('/user/account', [UserController::class, 'deleteAccount']);

    // List all pages created by authenticated user
    Route::get('/pages', [PageController::class, 'index']);
    Route::post('/pages', [PageController::class, 'store']);
    Route::get('/pages/{id}', [PageController::class, 'show']);
    Route::put('/pages/{id}', [PageController::class, 'update']);
    Route::delete('/pages/{id}', [PageController::class, 'destroy']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
});
