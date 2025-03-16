import { PerfilService } from "./PerfilService.js";

export class PartidaService {
  async actualizarPartida(resultado, duracion) {
    const token = localStorage.getItem("authToken");
    const usuario = PerfilService.obtenerUsuarioDesdeToken();

    if (!token || !usuario) {
      console.error("Faltan datos para actualizar la partida");
      return;
    }

    if (typeof duracion !== "number" || isNaN(duracion) || duracion < 0) {
      console.error("Duración inválida, se establecerá en 0");
      duracion = 0;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/partida/actualizar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ usuario_id: usuario.id, resultado, duracion }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error en la solicitud: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Partida actualizada correctamente:", data);

      // Limpiar el tiempo del localStorage después de enviar los datos
      localStorage.removeItem("contadorTiempo");
    } catch (error) {
      console.error("Error al actualizar la partida:", error.message);
    }
  }
}
