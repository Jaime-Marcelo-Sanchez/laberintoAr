<?php

namespace App\Http\Controllers;

use App\Models\Statistics;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    // Obtener todas las estadísticas
    public function index()
    {
        return response()->json(Statistics::all());
    }

    // Obtener estadísticas de un usuario
    public function show($id)
    {
        $statistics = Statistics::where('usuario_id', $id)->first();

        if (!$statistics) {
            return response()->json(['message' => 'Estadísticas no encontradas'], 404);
        }

        return response()->json($statistics);
    }

    // Crear estadísticas para un usuario
    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'partidas_jugadas' => 'required|integer',
            'partidas_ganadas' => 'required|integer',
            'promedio' => 'required|time',
        ]);

        $statistics = Statistics::create($request->all());

        return response()->json(['message' => 'Estadísticas creadas', 'statistics' => $statistics], 201);
    }

    // Actualizar estadísticas de un usuario
    public function update(Request $request, $id)
    {
        $statistics = Statistics::where('usuario_id', $id)->first();

        if (!$statistics) {
            return response()->json(['message' => 'Estadísticas no encontradas'], 404);
        }

        $statistics->update($request->all());

        return response()->json(['message' => 'Estadísticas actualizadas', 'statistics' => $statistics]);
    }

    // Eliminar estadísticas de un usuario
    public function destroy($id)
    {
        $statistics = Statistics::where('usuario_id', $id)->first();

        if (!$statistics) {
            return response()->json(['message' => 'Estadísticas no encontradas'], 404);
        }

        $statistics->delete();

        return response()->json(['message' => 'Estadísticas eliminadas']);
    }
}
