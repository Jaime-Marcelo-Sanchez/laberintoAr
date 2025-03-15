const form = document.getElementById("form__login");
const errorMsg = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido = validateForm();

  if (valido) {
    const user = document.getElementById("username").value;
    const userpassword = document.getElementById("userpassword").value;

    loginUser(user, userpassword);
  }
});

function validateForm() {
  const user = document.getElementById("username").value;
  const userpassword = document.getElementById("userpassword").value;

  errorMsg.innerHTML = "";

  if (user == "") {
    errorMsg.innerHTML = "El campo de usuario es obligatorio.";
    return false;
  }

  if (userpassword == "") {
    errorMsg.innerHTML = "El campo de contraseña es obligatorio.";
    return false;
  }

  if (userpassword.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  return true;
}

const loginUser = async (user, userpassword) => {
  const apiUrl = "http://127.0.0.1:8000/api/login";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: user,
        password: userpassword
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }

    if (data.access_token) {
      localStorage.setItem("authToken", data.access_token);
      console.log("Login exitoso:", data);
      window.location.href = "laberinto1.html";
    }

  } catch (error) {
    console.error(error);
    document.getElementById("error-message").innerText = "Error: " + error.message;
  }
};