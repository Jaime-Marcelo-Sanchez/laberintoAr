const form = document.getElementById("form__login");
const errorMsg = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido = validateForm();

  if (valido) {
    window.location.href = "/frontend/laberinto1.html";
  }
});

function validateForm() {
  const user = document.getElementById("username").value;
  const userpassword = document.getElementById("userpassword").value;

  errorMsg.innerHTML = "";

  // Validar que el nombre de usuario no esté vacío
  if (user == "") {
    errorMsg.innerHTML = "El campo de usuario es obligatorio.";
    return false;
  }

  // Validar que la contraseña no esté vacía
  if (userpassword == "") {
    errorMsg.innerHTML = "El campo de contraseña es obligatorio.";
    return false;
  }

  // Validar que la contraseña tenga al menos 6 caracteres
  if (userpassword.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  return loginUser(user, userpassword);
}

function loginUser(user, userpassword) {
  const usuario = {
    user,
    userpassword,
  };

  if (usuario.user == "jaime@gmail.com" && usuario.userpassword == "jaime132") {
    return true;
  }

  return false;
}
