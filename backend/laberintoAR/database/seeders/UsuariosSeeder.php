<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsuariosSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'username' => 'admin',
            'name' => 'Angel Bustamante',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
        ]);

        User::create([
            'username' => 'usuario1',
            'name' => 'Jaime Marcelo',
            'email' => 'jaime@example.com',
            'password' => Hash::make('password123'),
        ]);

        User::create([
            'username' => 'usuario2',
            'name' => 'Maria López',
            'email' => 'maria@example.com',
            'password' => Hash::make('password123'),
        ]);
    }
}

