document.addEventListener("DOMContentLoaded", () => {
    fetch("https://dummyjson.com/products/category/mens-shirts")
        .then(res => res.json())
        .then(data => {
            const destacados = document.getElementById("destacados");
            const productos = data.products.slice(0, 3); // 3 primeros

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
                destacados.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error cargando productos destacados:", err);
        });
});
