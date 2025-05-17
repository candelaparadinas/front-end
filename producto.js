document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((producto) => {
            document.getElementById("producto-titulo").textContent = producto.title;
            document.getElementById("producto-imagen").src = producto.thumbnail;
            document.getElementById("producto-imagen").alt = producto.title;
            document.getElementById("producto-precio").textContent = producto.price;
            document.getElementById("producto-descripcion").textContent = producto.description;
            document.getElementById("producto-marca").textContent = producto.brand;

            document.getElementById("add-to-cart").addEventListener("click", async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/carrito', {
                        method: "POST",
                        credentials: "include", // Importante para enviar la cookie de sesión
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            productoId: producto.id,
                            nombre: producto.title,
                            imagenUrl: producto.thumbnail,
                            precio: producto.price,
                            cantidad: 1
                        })
                    });

                    if (response.ok) {
                        alert("Producto añadido al carrito.");
                    } else if (response.status === 401) {
                        alert("Debes iniciar sesión para añadir productos al carrito.");
                    } else {
                        const errorText = await response.text();
                        alert("Error al añadir al carrito: " + errorText);
                    }

                } catch (error) {
                    console.error("Error al añadir al carrito", error);
                    alert("Error al añadir al carrito");
                }
            });
        })
        .catch((error) => {
            console.error("Error al cargar el producto:", error);
            document.getElementById("producto-detalle").innerHTML = "<p>Error al cargar el producto.</p>";
        });
});


