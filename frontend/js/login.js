const form = document.getElementById("form__login");
const errorMsg = document.getElementById("error-message");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    window.location.href = "/frontend/home.html";
    return;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const userpassword = document.getElementById("userpassword").value;

  errorMsg.innerHTML = "";

  if (!username || !userpassword) {
    errorMsg.innerHTML = "Todos los campos son obligatorios.";
    return;
  }

  if (userpassword.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: username,
        clave: userpassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      window.location.href = "/frontend/home.html";
    } else {
      throw new Error("No se recibió un token de autenticación.");
    }
  } catch (error) {
    errorMsg.innerHTML = error.message;
  }
});
