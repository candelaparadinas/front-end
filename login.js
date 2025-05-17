// src/main/resources/static/login.js
document.getElementById("login-container").addEventListener("submit", async function (event) {
  event.preventDefault();

  const credenciales = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-pass").value
  };

  const msg = document.getElementById("login-msg");

  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credenciales)
    });

    if (response.ok) {
      const data = await response.json();
      const role = data.role;

      // Redirigir según el rol
      switch (role) {
        case 'ADMIN':
          localStorage.setItem("role", "ADMIN"); // Guarda el rol en localStorage
          window.location.href = 'catalogo.html';
          break;
        case 'USUARIO':
          window.location.href = 'carrito.html';
          break;
        default:
          msg.textContent = 'Rol no reconocido';
      }
    }else {
      const error = await response.json();
      msg.textContent = error.mensaje || "Error en el inicio de sesión";
    }

  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    msg.textContent = "Error del servidor. Intente más tarde.";
  }
});
