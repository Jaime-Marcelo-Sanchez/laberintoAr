<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Level::insert([
            [
                'nombre' => 'Nivel 1',
                'dificultad' => 'Fácil',
                'modelo3d' => 'nivel1.obj',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Nivel 2',
                'dificultad' => 'Media',
                'modelo3d' => 'nivel2.obj',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Nivel 3',
                'dificultad' => 'Difícil',
                'modelo3d' => 'nivel3.obj',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Nivel 4',
                'dificultad' => 'Experto',
                'modelo3d' => 'nivel4.obj',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
