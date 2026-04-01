<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
                'photo_url'  => $user->photo_url, // User's profile picture URL
                'created_at' => $user->created_at->toDateTimeString(),
            ],
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user('sanctum');
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255|unique:users,email,' . $user->id,
            'photo_url' => 'nullable|string|max:255',
        ], [
            // Custom error messages shown to user if validation fails
            'name.required'      => 'Le nom est obligatoire.',
            'name.string'        => 'Le nom doit être du texte.',
            'name.max'           => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required'     => 'L\'email est obligatoire.',
            'email.email'        => 'L\'email doit être valide.',
            'email.unique'       => 'Cet email est déjà utilisé par un autre compte.',
            'photo_url.string'   => 'L\'URL de la photo doit être du texte.',
            'photo_url.max'      => 'L\'URL de la photo ne peut pas dépasser 255 caractères.',
        ]);

        // Update the user with validated data
        $user->update($validated);

        // Return success response with updated user data
        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
            'user' => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'photo_url'  => $user->photo_url,
                'created_at' => $user->created_at->toDateTimeString(),
            ],
        ], 200);
    }

   
    public function changePassword(Request $request)
    {
        $user = $request->user('sanctum');

        $validated = $request->validate([
            'current_password' => 'required|string',
            'password'=> 'required|string|min:8|confirmed', 
        ], [
            // Custom error messages
            'current_password.required'=> 'Veuillez entrer votre mot de passe actuel.',
            'password.required'=> 'Le nouveau mot de passe est obligatoire.',
            'password.min'=> 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed'=> 'Les mots de passe ne correspondent pas.',
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect.',
            ], 403);
        }

        $user->update([
            'password' => $validated['password'],
        ]);

        // Return success response
        return response()->json([
            'message' => 'Mot de passe changé avec succès.',
        ], 200);
    }


    public function deleteAccount(Request $request)
    {
        $user = $request->user('sanctum');

       
        $validated = $request->validate([
            'password' => 'required|string',
        ], [
            'password.required' => 'Le mot de passe est obligatoire pour confirmer la suppression.',
        ]);

        if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe est incorrect.',
            ], 403);
        }

        // Store user ID before deletion (for logging if needed)
        $userId = $user->id;

       
        $user->delete();

        return response()->json([
            'message' => 'Compte supprimé avec succès.',
        ], 200);
    }
}
