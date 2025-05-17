document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("destacados");

  try {
    const [shirtsResp, shoesResp] = await Promise.all([
      fetch('https://dummyjson.com/products/category/mens-shirts?limit=2'),
      fetch('https://dummyjson.com/products/category/mens-shoes?limit=1')
    ]);

    const shirtsData = await shirtsResp.json();
    const shoesData = await shoesResp.json();

    const productos = [...shirtsData.products, ...shoesData.products];

    productos.forEach(producto => {
      const div = document.createElement("div");
      div.className = "producto";


      div.innerHTML = `
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <p>${producto.title}</p>
      `;

      div.addEventListener("click", () => {
        window.location.href = `producto.html?id=${producto.id}`;
      });

      contenedor.appendChild(div);
    });

  } catch (error) {
    console.error("Error al cargar productos destacados:", error);
    contenedor.innerHTML = "<p>Error al cargar productos destacados.</p>";
  }

});
document.addEventListener("DOMContentLoaded",async()=>{
  const botonRegistro=document.getElementById("botonRegistro");
  const formularioLogin=document.getElementById("login-container");
  const botonesSesion=document.getElementById("botones-sesion");

  try{
    const response=await fetch("http://localhost:8080/api/perfil",{
      method:"GET",
      credentials: "include"
    });
    if(response.ok){
      formularioLogin.style.display="none";
      botonRegistro.style.display="none";
      botonesSesion.style.display="block";

      document.getElementById("btn-carrito").addEventListener("click", () => {
        window.location.href = "carrito.html";
      });

      document.getElementById("btn-borrar-cuenta").addEventListener("click", async () => {
        if (confirm("¿Estás seguro de borrar tu cuenta?")) {
          const res = await fetch("http://localhost:8080/api/borrarCuenta", {
            method: "DELETE",
            credentials: "include"
          });
          if (res.ok) {
            alert("Cuenta eliminada.");
            location.reload();
            loginForm.style.display = "block";
            crearCuentaBtn.style.display = "inline-block";
            botonesSesion.style.display = "none";
          } else {
            alert("Error al borrar cuenta.");
          }
        }
      });

      document.getElementById("btn-logout").addEventListener("click", async () => {
        await fetch("http://localhost:8080/api/logout", {
          method: "POST",
          credentials: "include"
        });
        location.reload();
      });

    } else {
      loginForm.style.display = "block";
      crearCuentaBtn.style.display = "inline-block";
      botonesSesion.style.display = "none";
    }

  } catch (err) {
    console.error("Error al verificar sesión:", err);
    loginForm.style.display = "block";
    crearCuentaBtn.style.display = "inline-block";
    botonesSesion.style.display = "none";
  }
});







