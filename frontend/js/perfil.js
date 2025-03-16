import { PerfilController } from "./controllers/PerfilController.js";

document.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("partidaIniciada") ||
    localStorage.getItem("contadorTiempo")
  ) {
    localStorage.removeItem("partidaIniciada");
    localStorage.removeItem("contadorTiempo");
  }

  const perfilController = new PerfilController();
  perfilController.cargarPerfil();
});
