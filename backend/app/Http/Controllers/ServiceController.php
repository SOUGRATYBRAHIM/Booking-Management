<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\CategService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
  
    public function getCategories()
    {
       
        $categories = Categorie::where('is_active', true)
                        ->orderBy('name', 'asc')
                        ->get();

        return response()->json([
            'categories' => $categories,
        ], 200);
    }


    public function getServicesByCategory($id)
    {
        $category = Categorie::findOrFail($id);

        $services = CategService::where('category_id', $id)
                        ->where('is_active', true)
                        ->orderBy('name', 'asc')
                        ->get();

        return response()->json([
            'category' => $category,
            'services' => $services,
        ], 200);
    }

  
    public function getAllServices()
    {

        $services = CategService::where('is_active', true)
                        ->with('category')
                        ->orderBy('name', 'asc')
                        ->get();

        return response()->json([
            'services' => $services,
        ], 200);
    }

    public function getCategoryDetail($id)
    {
        $category = Categorie::with('services')
                    ->findOrFail($id);

        return response()->json([
            'category' => $category,
        ], 200);
    }
}
