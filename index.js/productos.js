const openProductos = document.querySelector("#open-productos");
const closeProductos = document.querySelector("#close-productos");
const aside = document.querySelector("aside");

openProductos.addEventListener("click", () => {
  aside.classList.add("aside-visible");
});

closeProductos.addEventListener("click", () => {
  aside.classList.remove("aside-visible");
});
