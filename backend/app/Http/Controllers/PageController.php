<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
        ]);

        $page->update($request->only(['title', 'content', 'is_published']));

        return response()->json([
            'message' => 'Page mise à jour avec succès.',
            'page'    => $page,
        ]);
    }

    // DELETE /api/pages/{id} — supprimer une page
    public function destroy(Request $request, $id)
    {
        $page = $request->user()->pages()->findOrFail($id);
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