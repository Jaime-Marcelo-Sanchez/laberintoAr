<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/partidas', [PartidaController::class, 'index']);
    Route::get('/partidas/{id}', [PartidaController::class, 'show']);
    Route::post('/partidas', [PartidaController::class, 'store']);
    Route::put('/partidas/{id}', [PartidaController::class, 'update']);
    Route::delete('/partidas/{id}', [PartidaController::class, 'destroy']);

    Route::get('/levels', [LevelController::class, 'index']);
    Route::get('/levels/{id}', [LevelController::class, 'show']);
    Route::post('/levels', [LevelController::class, 'store']);
    Route::put('/levels/{id}', [LevelController::class, 'update']);
    Route::delete('/levels/{id}', [LevelController::class, 'destroy']);

    Route::get('/statistics', [StatisticsController::class, 'index']);
    Route::get('/statistics/{id}', [StatisticsController::class, 'show']);
    Route::post('/statistics', [StatisticsController::class, 'store']);
    Route::put('/statistics/{id}', [StatisticsController::class, 'update']);
    Route::delete('/statistics/{id}', [StatisticsController::class, 'destroy']);
});