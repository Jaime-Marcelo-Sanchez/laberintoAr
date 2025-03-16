const pool = require("../config/database");

const crearPartida = async (req, res) => {
  try {
    const { nivel_id } = req.body;
    const usuario_id = req.user.id;
    const fecha_juego = new Date();

    const [result] = await pool.query(
      "INSERT INTO partida (usuario_id, nivel_id, fecha_juego, duracion, resultado) VALUES (?, ?, ?, ?, ?)",
      [usuario_id, nivel_id, fecha_juego, 0, "En progreso"]
    );

    res.status(201).json({
      message: "Partida creada exitosamente",
      partida_id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la partida:", error);
    res.status(500).json({ message: "Error al crear la partida" });
  }
};

const actualizarPartida = async (req, res) => {
  try {
    const { usuario_id, resultado, duracion } = req.body;

    // Validaciones
    if (
      !usuario_id ||
      !resultado ||
      duracion === undefined ||
      isNaN(duracion)
    ) {
      return res
        .status(400)
        .json({ error: "Faltan datos requeridos o datos inválidos" });
    }

    const query = `
      UPDATE partida 
      SET resultado = ?, duracion = ? 
      WHERE usuario_id = ? 
      ORDER BY fecha_juego DESC 
      LIMIT 1
    `;

    const [result] = await pool.query(query, [resultado, duracion, usuario_id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró una partida para actualizar" });
    }

    res.json({ message: "Partida actualizada correctamente" });
  } catch (error) {
    console.error("Error en actualizarPartida:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar la partida" });
  }
};

module.exports = { crearPartida, actualizarPartida };
