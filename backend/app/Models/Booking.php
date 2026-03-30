<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'page_id',
        'service_id',
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

    // Booking appartient à un service
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}