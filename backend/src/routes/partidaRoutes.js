const express = require("express");
const {
  crearPartida,
  actualizarPartida,
} = require("../controllers/partidaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/crear", authMiddleware, crearPartida);
router.put("/actualizar", authMiddleware, actualizarPartida);

module.exports = router;
