document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-container");
  const msg = document.getElementById("login-msg");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const credenciales = {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-pass").value
    };

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credenciales)
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.role;

        localStorage.removeItem("role");
        localStorage.setItem("role", role);

        if (role === 'ADMIN') {
          window.location.href = 'catalogo.html';
        } else if (role === 'USUARIO') {
          window.location.href = 'carrito.html';
        } else {
          msg.textContent = 'Rol no reconocido';
        }

      } else {
        const error = await response.json();
        msg.textContent = error.mensaje || "Error en el inicio de sesión";
      }

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      msg.textContent = "Error del servidor. Intente más tarde.";
    }
  });
});
