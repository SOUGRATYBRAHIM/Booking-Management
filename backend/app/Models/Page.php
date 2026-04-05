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
        // Branding & Images
        'logo',
        'hero_image',
        'cover_image',
        'favicon',
        // Business Infos
        'business_name',
        'description',
        'business_address',
        'business_phone',
        'business_email',
        // Gallery
        'gallery',
        'slides',
        // Branding Colors
        'primary_color',
        'secondary_color',
        'accent_color',
        // Social Media & Links
        'social_links',
        'website_url',
        // SEO & Metadata
        'meta_title',
        'meta_description',
        'meta_keywords',
        // Call to Action
        'cta_button_text',
        'cta_button_link',
        // Testimonials & Reviews
        'testimonials',
        // Features/Services
        'features',
        // Settings
        'settings',
        'font_family',
        'layout_type',
    ];

    protected $casts = [
        'content' => 'array',
        'social_links' => 'array',
        'testimonials' => 'array',
        'features' => 'array',
        'settings' => 'array',
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

    // Page has many calendar entries (working hours, days off, capacity)
    public function calendars()
    {
        return $this->hasMany(Calendar::class);
    }

    // Page appartient à une categorie
    public function category()
    {
        return $this->belongsTo(Categorie::class);
    }
}