<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user('sanctum');

        if (!$user) {
            return response()->json([
                'user' => null
            ], 200);
        }

        return response()->json([
            'user' => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'created_at' => $user->created_at->toDateTimeString(),
            ],
        ], 200);
    }
}