<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendars';

    protected $fillable = [
        'page_id',
        'day_of_week',
        'specific_date',
        'start_time',
        'end_time',
        'weekly_hours',
        'daily_capacity',
        'is_day_off',
    ];

    protected $casts = [
        'specific_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'weekly_hours' => 'decimal:2',
        'is_day_off' => 'boolean',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

   
    public function getDayNameAttribute()
    {
        if ($this->day_of_week !== null) {
            $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return $days[$this->day_of_week];
        }
        return null;
    }

  
    public function isRecurringSchedule()
    {
        return $this->day_of_week !== null && $this->specific_date === null;
    }

    /**
     * Check if the calendar entry is for a specific date
     */
    public function isSpecificDateOverride()
    {
        return $this->specific_date !== null;
    }
}
