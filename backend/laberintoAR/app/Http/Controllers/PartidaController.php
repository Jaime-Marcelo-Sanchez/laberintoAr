<?php

namespace App\Http\Controllers;

use App\Models\Partida;
use Illuminate\Http\Request;

class PartidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partidas = Partida::with(['usuario', 'nivel'])->get();
        return response()->json($partidas);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'level_id' => 'required|exists:levels,id',
            'fecha_juego' => 'required|date',
            'duracion' => 'required|integer',
            'resultado' => 'required|string',
        ]);

        $partida = Partida::create($request->all());

        return response()->json([
            'message' => 'Partida creada exitosamente',
            'partida' => $partida
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $partida = Partida::with(['usuario', 'nivel'])->find($id);

        if (!$partida) {
            return response()->json(['message' => 'Partida no encontrada'], 404);
        }

        return response()->json($partida);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $partida = Partida::find($id);

        if (!$partida) {
            return response()->json(['message' => 'Partida no encontrada'], 404);
        }

        $request->validate([
            'usuario_id' => 'exists:users,id',
            'level_id' => 'exists:levels,id',
            'fecha_juego' => 'date',
            'duracion' => 'integer',
            'resultado' => 'string',
        ]);

        $partida->update($request->all());

        return response()->json([
            'message' => 'Partida actualizada correctamente',
            'partida' => $partida
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $partida = Partida::find($id);

        if (!$partida) {
            return response()->json(['message' => 'Partida no encontrada'], 404);
        }

        $partida->delete();

        return response()->json(['message' => 'Partida eliminada correctamente']);
    }

    public function partidasPorUsuario($usuario_id)
    {
        $partidas = Partida::where('usuario_id', $usuario_id)->with(['nivel'])->get();
        return response()->json($partidas);
    }
}
