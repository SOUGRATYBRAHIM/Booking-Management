<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'page_id',
        'name',
        'description',
        'price',
        'duration_minutes',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'duration_minutes' => 'integer',
    ];

    // Service appartient à une page
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    // service a plusieurs bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}