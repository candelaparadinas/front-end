document.addEventListener("DOMContentLoaded", () => {
    let paginaActual = 1;
    const productosPorPagina = 9;

    function cargarPagina(pagina) {
        const skip = (pagina - 1) * productosPorPagina;
        fetch(`https://dummyjson.com/products?limit=${productosPorPagina}&skip=${skip}`)
            .then((res) => res.json())
            .then((data) => {
                const contenedor = document.getElementById("catalogo-container");
                contenedor.innerHTML = ""; // Limpiar antes de cargar nuevos

                data.products.forEach((producto) => {
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
                    contenedor.appendChild(card);
                });

                // Actualizar botones
                const paginacion = document.getElementById("paginacion");
                paginacion.innerHTML = "";

                const btnAnterior = document.createElement("button");
                btnAnterior.textContent = "Anterior";
                btnAnterior.disabled = pagina === 1;
                btnAnterior.onclick = () => {
                    paginaActual--;
                    cargarPagina(paginaActual);
                };

                const btnSiguiente = document.createElement("button");
                btnSiguiente.textContent = "Siguiente";
                btnSiguiente.disabled = (pagina * productosPorPagina >= data.total);
                btnSiguiente.onclick = () => {
                    paginaActual++;
                    cargarPagina(paginaActual);
                };

                paginacion.appendChild(btnAnterior);
                paginacion.appendChild(document.createTextNode(` Página ${pagina} `));
                paginacion.appendChild(btnSiguiente);
            });
    }

    cargarPagina(paginaActual);
});
