document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#hiroMarker");
  const resetButton = document.querySelector("#resetButton");
  const camera = document.querySelector("a-scene").camera;

  function adjustCamera() {
    if (AFRAME.utils.device.isMobile()) {
      camera.position.set(-2, 5, 30); // Posición más alta y alejada en móviles
    } else {
      camera.position.set(0, 4, 20); // Posición normal en PC
    }
  }

  adjustCamera();

  // Definimos el laberinto: '#' = pared, ' ' = camino, 'S' = inicio, 'E' = meta
  const maze = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "S", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", "#", " ", " ", "#", " ", "#", " ", "#"],
    ["#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", " ", "#", " ", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", "#", "#", "#", " ", "#", "#", "#", " ", "#", " ", "#"],
    ["#", " ", " ", " ", " ", "#", "E", " ", " ", " ", "#", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ];

  const blockSize = 1; // Tamaño de cada bloque
  const wallHeight = 1; // Altura de las paredes
  const baseHeight = -2; // Ajuste de altura para paredes

  let sphere = null;
  const startPosition = { x: -4, z: -4, y: -2 }; // Posición inicial de la esfera

  // Crear suelo verde
  const floor = document.createElement("a-plane");
  floor.setAttribute("position", "0 -1 -1");
  floor.setAttribute("width", maze[0].length);
  floor.setAttribute("height", maze.length + 2);
  floor.setAttribute("rotation", "180 0 0");
  floor.setAttribute("color", "green");
  floor.setAttribute("static-body", "");
  marker.appendChild(floor);

  // Crear techo transparente
  const ceiling = document.createElement("a-plane");
  ceiling.setAttribute("position", "0 -1 -3");
  ceiling.setAttribute("width", maze[0].length);
  ceiling.setAttribute("height", maze.length + 2);
  ceiling.setAttribute("rotation", "180 0 0");
  ceiling.setAttribute("color", "white");
  ceiling.setAttribute("material", "opacity: 0.2; transparent: true");
  ceiling.setAttribute("static-body", "");
  marker.appendChild(ceiling);

  for (let x = 0; x < maze.length; x++) {
    for (let z = 0; z < maze[x].length; z++) {
      const char = maze[x][z];
      const posX = x - 5;
      const posZ = -z + 5;
      const posY = baseHeight;

      if (char === "#") {
        const wall = document.createElement("a-box");
        wall.setAttribute("position", `${posX} ${posZ} ${posY}`);
        wall.setAttribute("width", blockSize);
        wall.setAttribute("height", wallHeight);
        wall.setAttribute("depth", blockSize);
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
        goal.setAttribute("position", `${posX} ${posZ} ${baseHeight}`);
        goal.setAttribute("width", blockSize);
        goal.setAttribute("height", 0.5);
        goal.setAttribute("depth", blockSize);
        goal.setAttribute("color", "yellow");
        goal.setAttribute("static-body", "");
        goal.setAttribute("id", "goal");
        marker.appendChild(goal);
      }
    }
  }

  function resetSpherePosition() {
    if (sphere) {
      // Desactiva las físicas antes de mover la esfera
      sphere.removeAttribute("dynamic-body");

      // Reinicia la posición dentro del laberinto
      sphere.setAttribute(
        "position",
        `${startPosition.x} ${startPosition.z} ${startPosition.y}`
      );

      // Reactiva las físicas después de un pequeño retraso
      setTimeout(() => {
        sphere.setAttribute("dynamic-body", "shape: sphere; mass: 2000");
      }, 100);
    }
  }

  marker.addEventListener("markerFound", () => {
    if (sphere) {
      sphere.setAttribute("dynamic-body", "shape: sphere; mass: 2000");
    }
  });

  marker.addEventListener("markerLost", () => {
    resetSpherePosition();
  });

  sphere.addEventListener("collide", (event) => {
    if (event.detail.body.el.id === "goal") {
      alert("¡Has llegado a la meta!");
    }
  });

  resetButton.addEventListener("click", resetSpherePosition);
});
