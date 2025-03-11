<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Obtener todos los niveles
    public function index()
    {
        return response()->json(Level::all());
    }

    // Obtener un nivel específico
    public function show($id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json(['message' => 'Nivel no encontrado'], 404);
        }

        return response()->json($level);
    }

    // Crear un nuevo nivel
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'dificultad' => 'required|string',
            'modelo3d' => 'required|string'
        ]);

        $level = Level::create($request->all());

        return response()->json(['message' => 'Nivel creado', 'level' => $level], 201);
    }

    // Actualizar un nivel
    public function update(Request $request, $id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json(['message' => 'Nivel no encontrado'], 404);
        }

        $level->update($request->all());

        return response()->json(['message' => 'Nivel actualizado', 'level' => $level]);
    }

    // Eliminar un nivel
    public function destroy($id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json(['message' => 'Nivel no encontrado'], 404);
        }

        $level->delete();

        return response()->json(['message' => 'Nivel eliminado']);
    }
}
