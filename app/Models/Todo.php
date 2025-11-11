<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_finished',
        'cover',
    ];

    protected $casts = [
        'is_finished' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope untuk filter
    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
    }

    public function scopeFilter($query, $filter)
    {
        if ($filter === 'finished') {
            return $query->where('is_finished', true);
        } elseif ($filter === 'unfinished') {
            return $query->where('is_finished', false);
        }
        return $query;
    }
}