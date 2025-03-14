document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutBtn = document.getElementById("logout-btn");

  // Obtener el token desde el localStorage
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Si no hay token, redirigir al login
    window.location.href = "/frontend/login.html";
    return;
  }

  try {
    // Decodificar el token para obtener el usuario
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar JWT
    const username = payload.usuario; // Extraer el nombre de usuario

    // Personalizar mensaje de bienvenida
    welcomeMessage.textContent = `Bienvenido, ${username}`;
  } catch (error) {
    console.error("Error al leer el token:", error);
    localStorage.removeItem("authToken");
    window.location.href = "/frontend/login.html";
  }

  // Cerrar sesión
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken"); // Eliminar token
    window.location.href = "/frontend/login.html"; // Redirigir al login
  });
});
