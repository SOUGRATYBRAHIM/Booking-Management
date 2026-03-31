<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'page_id',
        'categ_service_id',
        'client_name',
        'client_phone',
        'notes',
        'booking_time',
        'status',
    ];

    protected $casts = [
        'booking_time' => 'datetime',
        'status' => 'string',
    ];

    // Booking appartient à une page
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    // Booking appartient à un service de categorie
    public function categService()
    {
        return $this->belongsTo(CategService::class, 'categ_service_id');
    }


}