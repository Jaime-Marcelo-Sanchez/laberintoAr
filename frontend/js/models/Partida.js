export class Partida {
  constructor(id, usuarioId, nivelId, fecha, duracion, resultado) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.nivel = nivelId;
    this.fecha = new Date(fecha);
    this.duracion = duracion;
    this.resultado = resultado;
  }
}
