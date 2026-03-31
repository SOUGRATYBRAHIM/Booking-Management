<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // GET /api/bookings — tous les bookings du user connecté
    public function index(Request $request)
    {
        $bookings = Booking::whereHas('page', function ($query) use ($request) {
                        $query->where('user_id', $request->user()->id);
                    })
                    ->with(['page', 'categService'])
                    ->latest()
                    ->get();

        return response()->json(['bookings' => $bookings]);
    }

    // GET /api/bookings/{id} — détail d'un booking
    public function show(Request $request, $id)
    {
        $booking = Booking::whereHas('page', function ($query) use ($request) {
                        $query->where('user_id', $request->user()->id);
                    })
                    ->with(['page', 'categService'])
                    ->findOrFail($id);

        return response()->json(['booking' => $booking]);
    }

    // PUT /api/bookings/{id}/status — confirmer ou annuler
    public function updateStatus(Request $request, $id)
    {
        $booking = Booking::whereHas('page', function ($query) use ($request) {
                        $query->where('user_id', $request->user()->id);
                    })->findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ], [
            'status.required' => 'Le statut est obligatoire.',
            'status.in'       => 'Statut invalide. Choisissez: pending, confirmed, cancelled.',
        ]);

        $booking->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Statut mis à jour avec succès.',
            'booking' => $booking,
        ]);
    }

    // POST /api/p/{slug}/book — client externe kaydir booking
    public function store(Request $request, $slug)
    {
        $page = Page::where('slug', $slug)
                    ->where('is_published', true)
                    ->firstOrFail();

        $request->validate([
            'categ_service_id' => 'required|exists:categ-services,id',
            'client_name'      => 'required|string|max:255',
            'client_phone'     => 'required|string|max:20',
            'booking_time'     => 'required|date|after:now',
            'notes'            => 'nullable|string',
        ], [
            'categ_service_id.required' => 'Veuillez choisir un service.',
            'categ_service_id.exists'   => 'Service introuvable.',
            'client_name.required'      => 'Le nom est obligatoire.',
            'client_phone.required'     => 'Le numéro de téléphone est obligatoire.',
            'booking_time.required'     => 'La date et l\'heure sont obligatoires.',
            'booking_time.after'        => 'La date doit être dans le futur.',
        ]);

        $booking = Booking::create([
            'page_id'          => $page->id,
            'categ_service_id' => $request->categ_service_id,
            'client_name'      => $request->client_name,
            'client_phone'     => $request->client_phone,
            'booking_time'     => $request->booking_time,
            'notes'            => $request->notes,
            'status'           => 'pending',
        ]);

        return response()->json([
            'message' => 'Votre réservation a été enregistrée avec succès.',
            'booking' => $booking,
        ], 201);
    }
}