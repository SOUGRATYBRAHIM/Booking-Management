<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    // GET /api/pages — liste des pages du user connecté
    public function index(Request $request)
    {
        $pages = $request->user()->pages()->latest()->get();

        return response()->json(['pages' => $pages]);
    }

    // POST /api/pages — créer une nouvelle page
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ], [
            'title.required' => 'Le titre est obligatoire.',
        ]);

        $page = Page::create([
            'user_id'      => $request->user()->id,
            'title'        => $request->title,
            'slug'         => Str::slug($request->title) . '-' . Str::random(6),
            'content'      => $request->content ?? [],
            'is_published' => false,
        ]);

        return response()->json([
            'message' => 'Page créée avec succès.',
            'page'    => $page,
        ], 201);
    }

    // GET /api/pages/{id} — détail d'une page (user connecté)
    public function show(Request $request, $id)
    {
        $page = $request->user()->pages()->with('category')->findOrFail($id);

        return response()->json(['page' => $page]);
    }

    // PUT /api/pages/{id} — modifier une page
    public function update(Request $request, $id)
    {
        $page = $request->user()->pages()->findOrFail($id);

        $request->validate([
            'title'        => 'sometimes|string|max:255',
            'content'      => 'sometimes|array',
            'is_published' => 'sometimes|boolean',
            'business_name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'business_address' => 'sometimes|string',
            'business_phone' => 'sometimes|string',
            'business_email' => 'sometimes|email',
            'primary_color' => 'sometimes|string',
            'secondary_color' => 'sometimes|string',
            'accent_color' => 'sometimes|string',
            'social_links' => 'sometimes|array',
            'website_url' => 'sometimes|url',
            'meta_title' => 'sometimes|string|max:255',
            'meta_description' => 'sometimes|string',
            'meta_keywords' => 'sometimes|string',
            'cta_button_text' => 'sometimes|string|max:255',
            'cta_button_link' => 'sometimes|string',
            'testimonials' => 'sometimes|array',
            'features' => 'sometimes|array',
            'settings' => 'sometimes|array',
            'font_family' => 'sometimes|string',
            'layout_type' => 'sometimes|string',
            // Image uploads
            'logo' => 'sometimes|image|max:5120',
            'hero_image' => 'sometimes|image|max:5120',
            'cover_image' => 'sometimes|image|max:5120',
            'favicon' => 'sometimes|image|max:1024',
        ]);

        $data = $request->only([
            'title', 'content', 'is_published', 'business_name', 'description',
            'business_address', 'business_phone', 'business_email', 'primary_color',
            'secondary_color', 'accent_color', 'social_links', 'website_url',
            'meta_title', 'meta_description', 'meta_keywords', 'cta_button_text',
            'cta_button_link', 'testimonials', 'features', 'settings', 'font_family',
            'layout_type'
        ]);

        // Handle image uploads
        $imageFields = ['logo', 'hero_image', 'cover_image', 'favicon'];
        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                // Delete old file if exists
                if ($page->$field && Storage::disk('public')->exists($page->$field)) {
                    Storage::disk('public')->delete($page->$field);
                }
                
                // Store new file
                $path = $request->file($field)->store("pages/{$page->id}", 'public');
                $data[$field] = $path;
            }
        }

        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store("pages/{$page->id}/gallery", 'public');
                $galleryPaths[] = $path;
            }
            $data['gallery'] = $galleryPaths;
        }

        // Handle slides (array of image files)
        if ($request->hasFile('slides')) {
            $slides = [];
            foreach ($request->file('slides') as $index => $file) {
                $path = $file->store("pages/{$page->id}/slides", 'public');
                $slides[] = [
                    'image' => $path,
                    'title' => $request->input("slides_title.$index"),
                    'description' => $request->input("slides_description.$index")
                ];
            }
            $data['slides'] = $slides;
        }

        $page->update($data);

        return response()->json([
            'message' => 'Page mise à jour avec succès.',
            'page'    => $page->fresh(),
        ]);
    }

    // DELETE /api/pages/{id} — supprimer une page
    public function destroy(Request $request, $id)
    {
        $page = $request->user()->pages()->findOrFail($id);
        
        // Delete all page images
        Storage::disk('public')->deleteDirectory("pages/{$page->id}");
        
        $page->delete();

        return response()->json([
            'message' => 'Page supprimée avec succès.',
        ]);
    }

    // GET /api/p/{slug} — landing page publique (client externe)
    public function showPublic($slug)
    {
        $page = Page::where('slug', $slug)
                    ->where('is_published', true)
                    ->with('category')
                    ->firstOrFail();

        return response()->json(['page' => $page]);
    }
}