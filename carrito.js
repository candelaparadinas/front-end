document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("carrito-contenido");
  const btnPago = document.getElementById("procesar-pago-btn");

  try {
    const response = await fetch("http://localhost:8080/api/carrito", {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      if (response.status === 401) {
        contenedor.innerHTML = "<p>Debes iniciar sesión para ver tu carrito.</p>";
      } else {
        const msg = await response.text();
        contenedor.innerHTML = `<p>Error: ${msg}</p>`;
      }
      return;
    }

    // Intenta convertir la respuesta en JSON
    let carritoItems;
    try {
      carritoItems = await response.json();
    } catch (jsonError) {
      console.error("Respuesta no es JSON válido:", jsonError);
      contenedor.innerHTML = "<p>Error de formato en la respuesta del servidor.</p>";
      return;
    }

    if (!Array.isArray(carritoItems) || carritoItems.length === 0) {
      contenedor.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }

    contenedor.innerHTML = ""; // Limpiar contenido previo
    let total = 0;

    carritoItems.forEach(item => {
      const productoElem = document.createElement("div");
      productoElem.className = "carrito-item";

      productoElem.innerHTML = `
        <h3>${item.nombre}</h3>
        <img src="${item.imagenUrl}" alt="${item.nombre}">
        <p>Precio: ${item.precio} €</p>
        <p>Cantidad: ${item.cantidad}</p>
      `;

      total += item.precio * item.cantidad;
      contenedor.appendChild(productoElem);
    });

    const totalElem = document.createElement("h2");
    totalElem.textContent = `Total: ${total.toFixed(2)} €`;
    contenedor.appendChild(totalElem);

    // Mostrar el botón de pago
    btnPago.style.display = "block";
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    contenedor.innerHTML = "<p>Error al conectar con el servidor.</p>";
  }

  btnPago?.addEventListener("click", () => {
    alert("Gracias por tu compra");
    location.reload();
  });
});



