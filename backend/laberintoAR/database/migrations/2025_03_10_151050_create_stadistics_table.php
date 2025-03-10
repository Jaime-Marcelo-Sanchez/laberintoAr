<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stadistics', function (Blueprint $table) {
            $table->id();
            $table->integer('partidas_jugadas');
            $table->integer('partidas_ganadas');
            $table->time('promedio');
            $table->timestamps();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stadistics');
    }
};
