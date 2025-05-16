document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-contenido");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "carrito-item";
      item.innerHTML = `
        <h3>${producto.title}</h3>
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <p>Precio: ${producto.price} €</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      total += producto.price;
      contenedor.appendChild(item);
    });

    const totalElem = document.createElement("h2");
    totalElem.textContent = "Total: " + total.toFixed(2) + " €";
    contenedor.appendChild(totalElem);

    document.querySelectorAll(".eliminar").forEach(boton => {
      boton.addEventListener("click", () => {
        const index = boton.getAttribute("data-index");
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      });
    });
  }

  renderCarrito();

  document.getElementById("procesar-pago-btn")?.addEventListener("click", () => {
    alert("Gracias por tu compra");
    localStorage.removeItem("carrito");
    location.reload();
  });

});
