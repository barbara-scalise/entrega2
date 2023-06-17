let productos = [];

fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".productos-agregar");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((productos) => {
    const div = document.createElement("div");
    div.classList.add("productos");
    div.innerHTML = `
            <img class="productos-imagen" src="${productos.imagen}" alt="${productos.titulo}">
            <div class="productos-detalles">
                <h3 class="productos-titulo">${productos.titulo}</h3>
                <p class="productos-precio">$${productos.precio}</p>
                <button class="productos-agregar" id="${productos.id}">Agregar</button>
            </div>
        `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productosCategoria = productos.find(
        (productos) => productos.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productosCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (productos) => productos.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".productos-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Productos agregado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #F97B22, #cb6a24)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
    onClick: function () {},
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productosAgregado = productos.find(
    (productos) => productos.id === idBoton
  );

  if (productosEnCarrito.some((productos) => productos.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (productos) => productos.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productosAgregado.cantidad = 1;
    productosEnCarrito.push(productosAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, productos) => acc + productos.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
