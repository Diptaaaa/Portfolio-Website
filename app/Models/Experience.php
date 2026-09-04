<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'company',
        'role',
        'location',
        'period',
        'badge',
        'points',
        'images',
        'order',
        'is_active',
    ];

    protected $casts = [
        'points' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope for active experiences.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for professional work experiences.
     */
    public function scopeWork(Builder $query): Builder
    {
        return $query->where('type', 'work');
    }

    /**
     * Scope for organizational & leadership experiences.
     */
    public function scopeOrganization(Builder $query): Builder
    {
        return $query->where('type', 'organization');
    }
}
