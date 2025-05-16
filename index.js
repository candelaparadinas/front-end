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
