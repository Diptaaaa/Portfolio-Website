<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'category',
        'icon',
        'badge',
        'badge_color',
        'items',
        'order',
        'is_active',
    ];

    protected $casts = [
        'items'     => 'array',
        'is_active' => 'boolean',
        'order'     => 'integer',
    ];

    /**
     * Scope for active skills.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for analytical tools.
     */
    public function scopeTool(Builder $query): Builder
    {
        return $query->where('type', 'tool');
    }

    /**
     * Scope for competency categories.
     */
    public function scopeCompetency(Builder $query): Builder
    {
        return $query->where('type', 'competency');
    }
}
