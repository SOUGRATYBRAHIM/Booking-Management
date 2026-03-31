<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategService extends Model
{
    protected $table = 'categ-services';

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'duration_minutes',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Service appartient à une category
    public function category()
    {
        return $this->belongsTo(Categorie::class);
    }

    // Service a plusieurs bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'categ_service_id');
    }
}
