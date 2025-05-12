// src/main/resources/static/login.js
document.addEventListener('DOMContentLoaded', initLogin);

function initLogin() {
  // Usuarios de ejemplo
  const users = {
    'admin@site.com':     { password: 'admin123',     role: 'admin' },
    'comprador@site.com': { password: 'comprador123', role: 'comprador' },
    'vendedor@site.com':  { password: 'vendedor123',  role: 'vendedor' },
  };

  // Inyectamos el formulario en cada página
  const container = document.createElement('div');
  container.id = 'login-container';
  container.innerHTML = `
    <input type="email" id="login-email" placeholder="usuario@..." required>
    <input type="password" id="login-pass" placeholder="contraseña" required>
    <button id="login-btn">Entrar</button>
    <p id="login-msg" style="color:red; font-size:0.9em;"></p>
  `;
  document.body.appendChild(container);

  document.getElementById('login-btn').onclick = () => {
    const email = document.getElementById('login-email').value;
    const pass  = document.getElementById('login-pass').value;
    const msg   = document.getElementById('login-msg');

    if (!users[email] || users[email].password !== pass) {
      msg.textContent = 'Credenciales incorrectas';
      return;
    }
    // Redirigir según rol
    const role = users[email].role;
    switch (role) {
      case 'admin':      window.location.href = 'admin.html'; break;
      case 'comprador':  window.location.href = 'comprador.html'; break;
      case 'vendedor':   window.location.href = 'vendedor.html'; break;
    }
  };
}
