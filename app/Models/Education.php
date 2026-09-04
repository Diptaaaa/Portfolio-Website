<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'institution',
        'degree',
        'period',
        'gpa',
        'logo_url',
        'coursework',
        'order',
        'is_active',
    ];

    protected $casts = [
        'coursework' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
