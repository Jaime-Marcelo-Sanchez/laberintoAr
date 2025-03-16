import { LoginService } from "../services/LoginService.js";

export class LoginController {
  constructor() {
    this.form = document.getElementById("form__login");
    this.errorMsg = document.getElementById("error-message");

    this.init();
  }

  init() {
    const token = localStorage.getItem("authToken");
    if (token) {
      window.location.href = "/frontend/home.html";
      return;
    }

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("userpassword").value.trim();

      this.errorMsg.innerHTML = "";

      if (!username || !password) {
        this.errorMsg.innerHTML = "Todos los campos son obligatorios.";
        return;
      }

      if (password.length < 6) {
        this.errorMsg.innerHTML =
          "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      try {
        const token = await LoginService.login(username, password);
        localStorage.setItem("authToken", token);
        window.location.href = "/frontend/home.html";
      } catch (error) {
        this.errorMsg.innerHTML = error.message;
      }
    });
  }
}
