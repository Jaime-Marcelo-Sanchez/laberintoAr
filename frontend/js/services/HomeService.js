export class HomeService {
  static async registrarInicioJuego(nivelId) {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No estás autenticado.");
      window.location.href = "/frontend/login.html";
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/partida/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nivel_id: nivelId }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error al registrar la partida:", error);
      return { success: false };
    }
  }
}
