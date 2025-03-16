import { PerfilService } from "../services/PerfilService.js";

export class PerfilController {
  constructor() {
    this.perfilService = new PerfilService();
  }

  async cargarPerfil() {
    const perfilData = await this.perfilService.obtenerPerfil();
    if (!perfilData) return;

    const { usuario, partidas } = perfilData;

    this.mostrarUsuario(usuario);
    this.mostrarPartidas(partidas);
    this.mostrarEstadisticas(partidas);
  }

  mostrarUsuario(usuario) {
    document.getElementById("username").textContent = usuario.usuario;
  }

  mostrarPartidas(partidas) {
    const partidasList = document.getElementById("partidas-list");
    const sinPartidas = document.getElementById("sin-partidas");
    const tablaPartidas = document.getElementById("tabla-partidas");

    partidasList.innerHTML = "";

    if (partidas.length === 0) {
      sinPartidas.classList.remove("d-none");
      tablaPartidas.classList.add("d-none");
    } else {
      sinPartidas.classList.add("d-none");
      tablaPartidas.classList.remove("d-none");

      partidas.forEach(({ nivel, fecha, duracion, resultado }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${nivel.nombre}</td>
          <td>${nivel.dificultad}</td>
          <td>${new Date(fecha).toLocaleDateString()}</td>
          <td>${
            duracion ?? 0
          } seg</td> <!-- Si duracion es null/undefined, muestra 0 -->
          <td>${resultado || "En progreso"}</td>
        `;
        partidasList.appendChild(row);
      });
    }
  }

  mostrarEstadisticas(partidas) {
    if (partidas.length === 0) {
      document.getElementById("estadisticas").classList.add("d-none");
      return;
    }

    const totalPartidas = partidas.length;
    let victorias = 0,
      totalDuracion = 0;

    partidas.forEach(({ resultado, duracion }) => {
      if (resultado === "Victoria") victorias++;
      totalDuracion += duracion ?? 0; // Si duracion es null/undefined, suma 0
    });

    const derrotas = totalPartidas - victorias;
    const tiempoPromedio = (totalDuracion / totalPartidas).toFixed(2);

    document.getElementById("total-partidas").textContent = totalPartidas;
    document.getElementById("victorias").textContent = victorias;
    document.getElementById("derrotas").textContent = derrotas;
    document.getElementById("tiempo-promedio").textContent = tiempoPromedio;

    document.getElementById("estadisticas").classList.remove("d-none");
  }
}
