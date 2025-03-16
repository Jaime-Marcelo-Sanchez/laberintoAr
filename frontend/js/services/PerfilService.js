import { Usuario } from "../models/Usuario.js";
import { Partida } from "../models/Partida.js";
import { Nivel } from "../models/Nivel.js";

export class PerfilService {
  async obtenerPerfil() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/frontend/login.html";
      return null;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/perfil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al obtener perfil");

      const data = await response.json();

      const usuario = new Usuario(data.id, data.usuario);
      const partidas = data.partidas.map((p) => {
        const nivel = new Nivel(p.nivel_id, p.nivel_nombre, p.dificultad); // Creamos un objeto Nivel
        return new Partida(
          p.id,
          data.id,
          nivel,
          p.fecha_juego,
          p.duracion,
          p.resultado
        );
      });
      return { usuario, partidas };
    } catch (error) {
      console.error("Error:", error.message);
      window.location.href = "/frontend/login.html";
      return null;
    }
  }

  static obtenerUsuarioDesdeToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar JWT
      return new Usuario(payload.id, payload.usuario);
    } catch (error) {
      console.error("Error al leer el token:", error);
      return null;
    }
  }
}
