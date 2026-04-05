<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Models\Page;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    /**
     * Get all calendar entries for a page
     */
    public function index(Page $page)
    {
        // Check if user owns this page
        if ($page->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($page->calendars()->orderBy('day_of_week')->get());
    }

  
    public function store(Request $page, Request $request)
    {
        if ($page->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'day_of_week' => 'nullable|integer|between:0,6',
            'specific_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'weekly_hours' => 'nullable|numeric|min:0',
            'daily_capacity' => 'integer|min:1|default:10',
            'is_day_off' => 'boolean|default:false',
        ]);

        // Ensure either day_of_week or specific_date is provided
        if (!$validated['day_of_week'] && !$validated['specific_date']) {
            return response()->json([
                'message' => 'Either day_of_week or specific_date must be provided'
            ], 422);
        }

        $validated['page_id'] = $page->id;

        $calendar = Calendar::create($validated);

        return response()->json($calendar, 201);
    }

  
    public function show(Page $page, Calendar $calendar)
    {
        // Check if calendar belongs to this page and user owns the page
        if ($calendar->page_id !== $page->id || $page->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($calendar);
    }

 
    public function update(Page $page, Calendar $calendar, Request $request)
    {
        if ($calendar->page_id !== $page->id || $page->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'day_of_week' => 'nullable|integer|between:0,6',
            'specific_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'weekly_hours' => 'nullable|numeric|min:0',
            'daily_capacity' => 'integer|min:1',
            'is_day_off' => 'boolean',
        ]);

        $calendar->update($validated);

        return response()->json($calendar);
    }

 
    public function destroy(Page $page, Calendar $calendar)
    {
        if ($calendar->page_id !== $page->id || $page->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $calendar->delete();

        return response()->json(['message' => 'Calendar entry deleted successfully']);
    }
}
