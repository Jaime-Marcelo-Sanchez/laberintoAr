const db = require("../config/database");

class User {
  static async create(usuario, clave) {
    const [result] = await db.execute(
      "INSERT INTO usuarios (usuario, clave) VALUES (?, ?)",
      [usuario, clave]
    );
    return result;
  }

  static async findByUsername(usuario) {
    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );
    return rows[0];
  }
}

module.exports = User;
