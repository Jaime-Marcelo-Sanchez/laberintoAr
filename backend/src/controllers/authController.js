const bcrypt = require("bcryptjs");
const User = require("../models/user");
const db = require("../config/database");
const { generateToken } = require("../config/jwt");

// Registro de usuario
const register = async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const existingUser = await User.findByUsername(usuario);
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(clave, 10);
    await User.create(usuario, hashedPassword);

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const user = await User.findByUsername(usuario);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Generar token con id y usuario
    const token = generateToken({ id: user.id, usuario: user.usuario });

    res.json({ token, usuario: user.usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Obtener datos del usuario
    const userQuery = "SELECT id, usuario FROM usuarios WHERE id = ?";
    const [user] = await db.query(userQuery, [userId]);

    if (!user.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener partidas del usuario con información de nivel
    const partidasQuery = `
      SELECT p.id, p.nivel_id, n.nombre AS nivel_nombre, n.dificultad, 
             p.fecha_juego, p.duracion, p.resultado
      FROM partida p
      JOIN niveles n ON p.nivel_id = n.id
      WHERE p.usuario_id = ?
    `;
    const [partidas] = await db.query(partidasQuery, [userId]);

    res.json({
      usuario: user[0].usuario,
      partidas: partidas.length ? partidas : [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { register, login, getProfile };
