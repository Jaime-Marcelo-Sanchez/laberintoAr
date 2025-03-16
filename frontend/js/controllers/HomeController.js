import { HomeService } from "../services/HomeService.js";
import { PerfilService } from "../services/PerfilService.js";
import { niveles } from "../niveles.js";

export class HomeController {
  static async cargarPerfilYMostrar() {
    const usuario = PerfilService.obtenerUsuarioDesdeToken();
    if (!usuario) {
      window.location.href = "/frontend/login.html";
      return;
    }

    document.getElementById(
      "welcome-message"
    ).textContent = `Bienvenido, ${usuario.usuario}`;
  }

  static cargarNiveles() {
    const nivelSelect = document.getElementById("nivelSelect");

    Object.values(niveles).forEach((nivel) => {
      const option = document.createElement("option");
      option.value = nivel.id;
      option.textContent = `${nivel.nombre} (${nivel.dificultad})`;
      nivelSelect.appendChild(option);
    });
  }

  static async jugarNivel() {
    const nivelId = document.getElementById("nivelSelect").value;
    if (!nivelId) {
      alert("Por favor, selecciona un nivel antes de jugar.");
      return;
    }

    const resultado = await HomeService.registrarInicioJuego(nivelId);

    if (resultado.success !== false) {
      const nivelSeleccionado = Object.values(niveles).find(
        (n) => n.id == nivelId
      );
      localStorage.setItem("partidaIniciada", nivelId);
      window.location.href = `/frontend/${nivelSeleccionado.url}`;
    } else {
      alert("Error al iniciar el juego.");
    }
  }

  static cerrarSesion() {
    localStorage.removeItem("authToken");
    window.location.href = "/frontend/login.html";
  }
}
