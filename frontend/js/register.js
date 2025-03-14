const form = document.getElementById("form__register");
const errorMsg = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const userpassword = document.getElementById("userpassword").value;

  errorMsg.innerHTML = "";

  if (username.trim() === "") {
    errorMsg.innerHTML = "El nombre de usuario es obligatorio.";
    return;
  }

  if (userpassword.trim() === "") {
    errorMsg.innerHTML = "La contraseña es obligatoria.";
    return;
  } else if (userpassword.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/auth/register", {
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
      throw new Error(data.message || "Error al registrarse");
    }

    window.location.href = "/frontend/login.html";
  } catch (error) {
    errorMsg.innerHTML = error.message;
  }
});
