<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('page_id');
            $table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');
            
            // Day of week (0 = Sunday, 1 = Monday...)
            $table->tinyInteger('day_of_week')->nullable();
            
            // For specific date overrides
            $table->date('specific_date')->nullable();
            
            // Working hours
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            
            $table->decimal('weekly_hours', 5, 2)->nullable();
            
            $table->unsignedInteger('daily_capacity')->default(10);
            
            $table->boolean('is_day_off')->default(false);
            
            $table->timestamps();
            
            // Unique constraint: Only one entry per page per day_of_week (for recurring schedule)
            $table->unique(['page_id', 'day_of_week'], 'unique_page_day_schedule');
            
            // Index for efficient date queries
            $table->index('specific_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendars');
    }
};
