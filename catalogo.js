document.addEventListener("DOMContentLoaded", () => {
  let paginaActual = 1;
  const productosPorPagina = 9;
  let todosLosProductos = [];

  const categoriasRopa = ["mens-shirts", "mens-shoes", "tops",  "mens-watches", "womens-dresses", "womens-shoes", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses"];

  async function cargarProductos() {
    try {
      const peticiones = categoriasRopa.map(cat =>
        fetch(`https://dummyjson.com/products/category/${cat}?limit=100`).then(res => res.json())
      );

      const respuestas = await Promise.all(peticiones);
      todosLosProductos = respuestas.flatMap(r => r.products);

      renderPagina(paginaActual);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  function renderProducto(producto, index) {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p><strong>${producto.price} €</strong></p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `producto.html?id=${producto.id}`;
    });

    const rol = localStorage.getItem("role");
    if (rol === "ADMIN") {
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("eliminar");

      botonEliminar.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que se dispare el click del producto
        todosLosProductos.splice(index, 1); // elimina el producto
        renderPagina(paginaActual); // actualiza la vista
      });

      card.appendChild(botonEliminar);
    }

    return card;
  }

  function renderPagina(pagina) {
    const contenedor = document.getElementById("catalogo-container");
    contenedor.innerHTML = "";

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = todosLosProductos.slice(inicio, fin);

    productosPagina.forEach((producto, i) => {
      contenedor.appendChild(renderProducto(producto, inicio + i));
    });

    const rol = localStorage.getItem("role");
    if (rol === "ADMIN") {
      const nuevaCard = document.createElement("div");
      nuevaCard.className = "producto-card";
      nuevaCard.style.display = "flex";
      nuevaCard.style.alignItems = "center";
      nuevaCard.style.justifyContent = "center";
      nuevaCard.style.fontSize = "6em";
      nuevaCard.style.cursor = "pointer";
      nuevaCard.style.backgroundColor = "#f8eeb6";
      nuevaCard.style.border = "4px dashed #005f99";
      nuevaCard.style.color = "#005f99";
      nuevaCard.style.width = "300px";
      nuevaCard.style.height = "300px";
      nuevaCard.style.margin = "20px auto";
      nuevaCard.style.borderRadius = "10px";
      nuevaCard.textContent = "+";

      nuevaCard.addEventListener("click", () => {
        const productoAleatorio = todosLosProductos[Math.floor(Math.random() * todosLosProductos.length)];
        if (productoAleatorio) {
          todosLosProductos.unshift(productoAleatorio); // Añade al inicio
          renderPagina(paginaActual); // Re-renderiza
        }
      });

      contenedor.appendChild(nuevaCard);
    }

    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = pagina === 1;
    btnAnterior.onclick = () => {
      paginaActual--;
      renderPagina(paginaActual);
    };

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.disabled = fin >= todosLosProductos.length;
    btnSiguiente.onclick = () => {
      paginaActual++;
      renderPagina(paginaActual);
    };

    paginacion.appendChild(btnAnterior);
    paginacion.appendChild(document.createTextNode(` Página ${pagina} `));
    paginacion.appendChild(btnSiguiente);
  }

  cargarProductos();
});
