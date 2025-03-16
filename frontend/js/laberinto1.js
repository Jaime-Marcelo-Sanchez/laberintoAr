import { niveles } from "./niveles.js";
import { PartidaService } from "./services/PartidaService.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const partidaIniciada = localStorage.getItem("partidaIniciada");

  const partidaService = new PartidaService();

  if (!token || partidaIniciada !== "1") {
    window.location.href = "/frontend/login.html";
    return;
  }

  const marker = document.querySelector("#hiroMarker");
  const resetButton = document.querySelector("#resetButton");
  const camera = document.querySelector("a-scene").camera;

  function adjustCamera() {
    camera.position.set(AFRAME.utils.device.isMobile() ? -2 : 0, 5, 30);
  }
  adjustCamera();

  try {
    const nivel = niveles.nivelFacil;
    generarLaberinto(nivel.estructura);
  } catch (error) {
    console.error(error);
    alert("Error al cargar el laberinto");
    window.location.href = "/frontend/home.html";
  }

  let tiempo = parseInt(localStorage.getItem("contadorTiempo")) || 0;
  const contadorElemento = document.querySelector("#contador h1");

  function actualizarContador() {
    contadorElemento.textContent = `Tiempo: ${tiempo} s`;
  }

  actualizarContador();

  const intervalo = setInterval(() => {
    tiempo++;
    actualizarContador();
  }, 1000);

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("contadorTiempo", tiempo);
  });

  resetButton.addEventListener("click", resetSpherePosition);

  document.getElementById("homeBtn").addEventListener("click", async () => {
    clearInterval(intervalo);
    await partidaService.actualizarPartida("Sin terminar", tiempo);
    localStorage.removeItem("contadorTiempo");
    window.location.href = "/frontend/home.html";
  });

  marker.addEventListener("markerFound", () => {
    document
      .getElementById("sphere")
      ?.setAttribute("dynamic-body", "shape: sphere; mass: 2000");
  });

  marker.addEventListener("markerLost", resetSpherePosition);

  function generarLaberinto(estructura) {
    const marker = document.querySelector("#hiroMarker");
    const startPosition = { x: -4, z: -4, y: -2 };

    const floor = document.createElement("a-plane");
    floor.setAttribute("position", "0 -1 -1");
    floor.setAttribute("width", estructura[0].length);
    floor.setAttribute("height", estructura.length + 2);
    floor.setAttribute("rotation", "180 0 0");
    floor.setAttribute("color", "green");
    floor.setAttribute("static-body", "");
    marker.appendChild(floor);

    const ceiling = document.createElement("a-plane");
    ceiling.setAttribute("position", `0 -1 -3`);
    ceiling.setAttribute("width", estructura[0].length);
    ceiling.setAttribute("height", estructura.length + 2);
    ceiling.setAttribute("rotation", "180 0 0");
    ceiling.setAttribute(
      "material",
      "opacity: 0.3; transparent: true; color: white"
    );
    ceiling.setAttribute("static-body", "");
    marker.appendChild(ceiling);

    let sphere = null;

    for (let x = 0; x < estructura.length; x++) {
      for (let z = 0; z < estructura[x].length; z++) {
        const char = estructura[x][z];
        const posX = x - 5,
          posZ = -z + 5,
          posY = -2;

        if (char === "#") {
          const wall = document.createElement("a-box");
          wall.setAttribute("position", `${posX} ${posZ} ${posY}`);
          wall.setAttribute("width", "1");
          wall.setAttribute("height", "1");
          wall.setAttribute("depth", "1");
          wall.setAttribute("color", "saddlebrown");
          wall.setAttribute("static-body", "");
          marker.appendChild(wall);
        } else if (char === "S") {
          sphere = document.createElement("a-sphere");
          sphere.setAttribute("id", "sphere");
          sphere.setAttribute("radius", "0.45");
          sphere.setAttribute("color", "yellow");
          sphere.setAttribute(
            "position",
            `${startPosition.x} ${startPosition.z} ${startPosition.y}`
          );
          sphere.setAttribute("dynamic-body", "shape: sphere; mass: 2000");
          marker.appendChild(sphere);
        } else if (char === "E") {
          const goal = document.createElement("a-box");
          goal.setAttribute("position", `${posX} ${posZ} ${posY}`);
          goal.setAttribute("width", "1");
          goal.setAttribute("height", "0.5");
          goal.setAttribute("depth", "1");
          goal.setAttribute("color", "yellow");
          goal.setAttribute("static-body", "");
          goal.setAttribute("id", "goal");
          marker.appendChild(goal);
        }
      }
    }

    if (sphere) {
      sphere.addEventListener("collide", async (event) => {
        if (event.detail.body.el.id === "goal") {
          clearInterval(intervalo);
          await partidaService.actualizarPartida("Victoria", tiempo);
          localStorage.removeItem("contadorTiempo");
          alert("¡Has llegado a la meta!");
          setTimeout(() => {
            window.location.href = "/frontend/home.html";
          }, 2000);
        }
      });
    }
  }

  function resetSpherePosition() {
    const sphere = document.getElementById("sphere");
    if (sphere) {
      sphere.removeAttribute("dynamic-body");
      sphere.setAttribute("position", "-4 -4 -2");
      setTimeout(() => {
        sphere.setAttribute("dynamic-body", "shape: sphere; mass: 2000");
      }, 100);
    }
  }
});
