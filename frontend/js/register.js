const form = document.getElementById("form__register");
const errorMsg = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido = validateForm();

  if (valido) {
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const userpassword = document.getElementById("userpassword").value;

    registerUser(fullname, email, username, userpassword);
  }
});

function validateForm() {
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const userpassword = document.getElementById("userpassword").value;

  errorMsg.innerHTML = "";

  if (fullname == "") {
    errorMsg.innerHTML = "El campo de nombre completo es obligatorio.";
    return false;
  }

  if (email == "") {
    errorMsg.innerHTML = "El campo de correo electrónico es obligatorio.";
    return false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errorMsg.innerHTML = "Por favor, ingresa un correo electrónico válido.";
    return false;
  }

  if (username == "") {
    errorMsg.innerHTML = "El campo de nombre de usuario es obligatorio.";
    return false;
  }

  if (userpassword == "") {
    errorMsg.innerHTML = "El campo de contraseña es obligatorio.";
    return false;
  } else if (userpassword.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  return true;
}

const registerUser = async (fullname, email, username, userpassword) => {
  const apiUrl = "http://127.0.0.1:8000/api/register";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullname,
        email: email,
        username: username,
        password: userpassword,
      }),
    });

    // Leer la respuesta como texto para ver si hay errores en formato JSON
    const text = await response.text();
    alert("Raw Response:\n" + text); // Mostrar respuesta sin procesar

    try {
      const data = JSON.parse(text);
      alert("Parsed JSON:\n" + JSON.stringify(data, null, 2)); // Mostrar JSON bien formateado

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      alert("Registro exitoso. Redirigiendo al login...");
    } catch (jsonError) {
      alert("Error al procesar JSON:\n" + jsonError.message);
    }
  } catch (error) {
    console.log(error);
    alert("Error al registrarse:\n" + error.message);
  }
};
