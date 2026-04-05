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
        Schema::table('pages', function (Blueprint $table) {
            // Branding & Images (file paths stored in storage)
            $table->string('logo')->nullable()->after('slug')->comment('Logo file path');
            $table->string('hero_image')->nullable()->after('logo')->comment('Hero image file path');
            $table->string('cover_image')->nullable()->after('hero_image')->comment('Cover image file path');
            $table->string('favicon')->nullable()->after('cover_image')->comment('Favicon file path');

            // Business Information
            $table->string('business_name')->nullable()->after('favicon');
            $table->text('description')->nullable()->after('business_name');
            $table->text('business_address')->nullable()->after('description');
            $table->string('business_phone')->nullable()->after('business_address');
            $table->string('business_email')->nullable()->after('business_phone');

            // Gallery & Multimedia (JSON array of file paths)
            $table->json('gallery')->nullable()->comment('Array of image file paths')->after('business_email');
            $table->json('slides')->nullable()->comment('Array of slide objects with image path, title, and description')->after('gallery');

            // Branding Colors
            $table->string('primary_color')->default('#000000')->after('slides');
            $table->string('secondary_color')->default('#ffffff')->after('primary_color');
            $table->string('accent_color')->nullable()->after('secondary_color');

            // Social Media & Links
            $table->json('social_links')->nullable()->comment('JSON: facebook, instagram, twitter, linkedin, youtube, etc.')->after('accent_color');
            $table->string('website_url')->nullable()->after('social_links');

            // SEO & Metadata
            $table->string('meta_title')->nullable()->after('website_url');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->text('meta_keywords')->nullable()->after('meta_description');

            // Call to Action
            $table->string('cta_button_text')->nullable()->after('meta_keywords');
            $table->string('cta_button_link')->nullable()->after('cta_button_text');

            // Testimonials & Reviews
            $table->json('testimonials')->nullable()->comment('Array of client testimonials')->after('cta_button_link');

            // Features/Services
            $table->json('features')->nullable()->comment('Key features/highlights')->after('testimonials');

            // Settings
            $table->json('settings')->nullable()->comment('Additional JSON settings')->after('features');
            
            // Page Customization
            $table->string('font_family')->default('default')->after('settings');
            $table->string('layout_type')->default('standard')->comment('standard, minimal, modern, etc.')->after('font_family');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn([
                'logo',
                'hero_image',
                'cover_image',
                'favicon',
                'business_name',
                'description',
                'business_address',
                'business_phone',
                'business_email',
                'gallery',
                'slides',
                'primary_color',
                'secondary_color',
                'accent_color',
                'social_links',
                'website_url',
                'meta_title',
                'meta_description',
                'meta_keywords',
                'cta_button_text',
                'cta_button_link',
                'testimonials',
                'features',
                'settings',
                'font_family',
                'layout_type',
            ]);
        });
    }
};
