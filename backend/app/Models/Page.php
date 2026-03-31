<?php
// app/Models/Page.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'content',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'content' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Page appartient à un user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Page a plusieurs bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Page appartient à une categorie
    public function category()
    {
        return $this->belongsTo(Categorie::class);
    }
}