document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((producto) => {
            const div = document.getElementById("producto-detalle");

            div.innerHTML = `
                <h2>${producto.title}</h2>
                <img src="${producto.thumbnail}" alt="${producto.title}">
                <p><strong>Precio:</strong> ${producto.price} €</p>
                <p><strong>Descripción:</strong> ${producto.description}</p>
                <p><strong>Marca:</strong> ${producto.brand}</p>
                <button id="add-to-cart">Añadir al carrito</button>
            `;

            document.getElementById("add-to-cart").addEventListener("click", () => {
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                carrito.push(producto);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert("Producto añadido al carrito.");
            });
        })
        .catch((error) => {
            console.error("Error al cargar el producto:", error);
            document.getElementById("producto-detalle").innerHTML = "<p>Error al cargar el producto.</p>";
        });
});
