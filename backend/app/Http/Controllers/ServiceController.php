<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // GET /api/pages/{pageId}/services — liste des services d'une page
    public function index(Request $request, $pageId)
    {
        $page = $request->user()->pages()->findOrFail($pageId);

        return response()->json(['services' => $page->services]);
    }

    // POST /api/pages/{pageId}/services — créer un service
    public function store(Request $request, $pageId)
    {
        $page = $request->user()->pages()->findOrFail($pageId);

        $request->validate([
            'name'             => 'required|string|max:255',
            'description'      => 'nullable|string',
            'price'            => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:1',
        ], [
            'name.required'             => 'Le nom du service est obligatoire.',
            'price.required'            => 'Le prix est obligatoire.',
            'duration_minutes.required' => 'La durée est obligatoire.',
            'duration_minutes.min'      => 'La durée doit être au moins 1 minute.',
        ]);

        $service = $page->services()->create([
            'name'             => $request->name,
            'description'      => $request->description,
            'price'            => $request->price,
            'duration_minutes' => $request->duration_minutes,
            'is_active'        => true,
        ]);

        return response()->json([
            'message' => 'Service créé avec succès.',
            'service' => $service,
        ], 201);
    }

    // PUT /api/pages/{pageId}/services/{id} — modifier un service
    public function update(Request $request, $pageId, $id)
    {
        $page    = $request->user()->pages()->findOrFail($pageId);
        $service = $page->services()->findOrFail($id);

        $request->validate([
            'name'             => 'sometimes|string|max:255',
            'description'      => 'nullable|string',
            'price'            => 'sometimes|numeric|min:0',
            'duration_minutes' => 'sometimes|integer|min:1',
            'is_active'        => 'sometimes|boolean',
        ]);

        $service->update($request->only([
            'name', 'description', 'price', 'duration_minutes', 'is_active'
        ]));

        return response()->json([
            'message' => 'Service mis à jour avec succès.',
            'service' => $service,
        ]);
    }

    // DELETE /api/pages/{pageId}/services/{id} — supprimer un service
    public function destroy(Request $request, $pageId, $id)
    {
        $page    = $request->user()->pages()->findOrFail($pageId);
        $service = $page->services()->findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service supprimé avec succès.',
        ]);
    }

    // GET /api/p/{slug}/services — liste publique (client externe)
    public function publicList($slug)
    {
        $page = Page::where('slug', $slug)
                    ->where('is_published', true)
                    ->firstOrFail();

        $services = $page->services()->where('is_active', true)->get();

        return response()->json(['services' => $services]);
    }
}