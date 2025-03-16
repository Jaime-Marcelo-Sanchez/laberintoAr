import { HomeController } from "./controllers/HomeController.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (
    localStorage.getItem("partidaIniciada") ||
    localStorage.getItem("contadorTiempo")
  ) {
    localStorage.removeItem("partidaIniciada");
    localStorage.removeItem("contadorTiempo");
  }

  await HomeController.cargarPerfilYMostrar();
  HomeController.cargarNiveles();

  document.getElementById("jugar-btn").addEventListener("click", () => {
    HomeController.jugarNivel();
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    HomeController.cerrarSesion();
  });
});
