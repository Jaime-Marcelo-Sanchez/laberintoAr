document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    window.location.href = "/frontend/login.html";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del perfil");
    }

    const data = await response.json();

    // Mostrar datos del usuario
    document.getElementById("username").textContent = data.usuario;

    // Referencias a elementos
    const partidasList = document.getElementById("partidas-list");
    const tablaPartidas = document.getElementById("tabla-partidas");
    const sinPartidas = document.getElementById("sin-partidas");
    const estadisticas = document.getElementById("estadisticas");

    partidasList.innerHTML = "";

    if (data.partidas.length === 0) {
      sinPartidas.classList.remove("d-none"); // Mostrar mensaje
    } else {
      tablaPartidas.classList.remove("d-none"); // Mostrar tabla

      data.partidas.forEach((partida) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${partida.nivel_nombre}</td>
          <td>${partida.dificultad}</td>
          <td>${new Date(partida.fecha_juego).toLocaleDateString()}</td>
          <td>${partida.duracion} seg</td>
          <td>${partida.resultado}</td>
        `;
        partidasList.appendChild(row);
      });

      // Calcular estadísticas
      const totalPartidas = data.partidas.length;
      const victorias = data.partidas.filter(
        (p) => p.resultado === "Victoria"
      ).length;
      const derrotas = totalPartidas - victorias;
      const tiempoPromedio =
        totalPartidas > 0
          ? (
              data.partidas.reduce((acc, p) => acc + p.duracion, 0) /
              totalPartidas
            ).toFixed(2)
          : 0;

      document.getElementById("total-partidas").textContent = totalPartidas;
      document.getElementById("victorias").textContent = victorias;
      document.getElementById("derrotas").textContent = derrotas;
      document.getElementById("tiempo-promedio").textContent = tiempoPromedio;

      estadisticas.classList.remove("d-none"); // Mostrar estadísticas
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "/frontend/login.html";
  }
});
