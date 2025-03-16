import { RegisterController } from "./controllers/RegisterController.js";

document.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("partidaIniciada") ||
    localStorage.getItem("contadorTiempo")
  ) {
    localStorage.removeItem("partidaIniciada");
    localStorage.removeItem("contadorTiempo");
  }
  new RegisterController();
});
