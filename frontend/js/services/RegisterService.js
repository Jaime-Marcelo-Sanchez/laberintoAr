export class RegisterService {
  static async register(usuario, clave) {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
