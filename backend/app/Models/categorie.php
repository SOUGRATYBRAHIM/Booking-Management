<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Category a plusieurs pages
    public function pages()
    {
        return $this->hasMany(Page::class, 'category_id');
    }

    // Category a plusieurs services
    public function services()
    {
        return $this->hasMany(CategService::class, 'category_id');
    }
}
