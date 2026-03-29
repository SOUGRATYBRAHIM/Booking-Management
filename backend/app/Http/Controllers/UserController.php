<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller{

public function profile(Request $request)
{
    $user = $request->user();

    return response()->json([
        'user' => [
            'id'         => $user->id,
            'name'       => $user->name,
            'email'      => $user->email,
            'created_at' => $user->created_at->toDateTimeString(),
        ],
    ]);
}
}