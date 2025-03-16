import { RegisterService } from "../services/RegisterService.js";

export class RegisterController {
  constructor() {
    this.form = document.getElementById("form__register");
    this.errorMsg = document.getElementById("error-message");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("userpassword").value.trim();

      this.errorMsg.innerHTML = "";

      if (!username) {
        this.errorMsg.innerHTML = "El nombre de usuario es obligatorio.";
        return;
      }

      if (!password) {
        this.errorMsg.innerHTML = "La contraseña es obligatoria.";
        return;
      }

      if (password.length < 6) {
        this.errorMsg.innerHTML =
          "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      try {
        await RegisterService.register(username, password);
        window.location.href = "/frontend/login.html";
      } catch (error) {
        this.errorMsg.innerHTML = error.message;
      }
    });
  }
}
