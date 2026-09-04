<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'category',
        'period',
        'badge',
        'metrics',
        'points',
        'tools',
        'images',
        'link_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'points'    => 'array',
        'tools'     => 'array',
        'images'    => 'array',
        'is_active' => 'boolean',
        'order'     => 'integer',
    ];
}
