<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $table = 'levels';

    protected $fillable = [
        'nombre',
        'dificultad',
        'modelo3d'
    ];

    public function partidas()
    {
        return $this->hasMany(Partida::class, 'level_id');
    }
}
