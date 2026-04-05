<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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
                'photo_url'  => $user->photo_url ? asset('storage/' . $user->photo_url) : null,
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
            'photo'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ], [
            // Custom error messages shown to user if validation fails
            'name.required'      => 'Le nom est obligatoire.',
            'name.string'        => 'Le nom doit être du texte.',
            'name.max'           => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required'     => 'L\'email est obligatoire.',
            'email.email'        => 'L\'email doit être valide.',
            'email.unique'       => 'Cet email est déjà utilisé par un autre compte.',
            'photo.image'        => 'Le fichier doit être une image.',
            'photo.mimes'        => 'L\'image doit être au format: jpeg, png, jpg, gif.',
            'photo.max'          => 'L\'image ne peut pas dépasser 5MB.',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->photo_url && Storage::disk('public')->exists($user->photo_url)) {
                Storage::disk('public')->delete($user->photo_url);
            }
            
            // Store new photo
            $photoPath = $request->file('photo')->store("users/{$user->id}", 'public');
            $validated['photo_url'] = $photoPath;
        }

        // Update the user with validated data
        $user->update($validated);

        // Return success response with updated user data
        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
            'user' => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'photo_url'  => $user->photo_url ? asset('storage/' . $user->photo_url) : null,
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

        // This will delete: bookings, calendar entries, and all page images
        $userPages = $user->pages()->get();
        foreach ($userPages as $page) {

        Storage::disk('public')->deleteDirectory("pages/{$page->id}");
            $page->delete();
        }

        // Delete user's photo if exists
        if ($user->photo_url && Storage::disk('public')->exists($user->photo_url)) {
            Storage::disk('public')->delete($user->photo_url);
        }

        // Delete user's directory from storage
        Storage::disk('public')->deleteDirectory("users/{$userId}");

        // Delete the user account
        $user->delete();

        return response()->json([
            'message' => 'Compte et toutes les données associées sont supprimés.',
        ], 200);
    }
}
