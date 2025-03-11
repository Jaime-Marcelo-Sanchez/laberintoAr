<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    use HasFactory;

    protected $table = 'partidas';

    protected $fillable = [
        'usuario_id',
        'level_id',
        'fecha_juego',
        'duracion',
        'resultado'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function nivel()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
}
