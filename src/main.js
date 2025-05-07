// Mostrar año dinámico
const anio = new Date().getFullYear();
const anioElemento = document.getElementById("anio-actual");
if (anioElemento) anioElemento.textContent = anio;

// Paquetes
const paquetes = [
  {
    nombre: "Inicio Fit",
    descripcion: "Plan de 4 semanas para principiantes. Incluye PDF + asesoría.",
    precio: "$15.000",
    imagen: "/paquete-inicio.jpg"
  },
  {
    nombre: "Full Fuerza",
    descripcion: "8 semanas con rutina personalizada y seguimiento.",
    precio: "$25.000",
    imagen: "/paquete-fuerza.jpg"
  },
  {
    nombre: "Elite Total",
    descripcion: "Incluye dieta, rutina y videollamadas semanales.",
    precio: "$40.000",
    imagen: "/paquete-elite.jpg"
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cardsContainer = document.getElementById("cards");
if (cardsContainer) {
  paquetes.forEach((paquete, index) => {
    const card = document.createElement("div");
    card.className = "bg-white text-[#0C2C40] rounded-2xl shadow-lg p-6 w-80 text-center";
    card.innerHTML = `
      <img src="${paquete.imagen}" alt="${paquete.nombre}" class="w-full h-40 object-cover rounded-md mb-4" />
      <h3 class="text-xl font-bold text-[#F47C20]">${paquete.nombre}</h3>
      <p class="my-4">${paquete.descripcion}</p>
      <span class="block font-semibold mb-4">${paquete.precio}</span>
      <button class="bg-[#39C0C8] hover:bg-[#2aa1a8] text-white font-bold py-2 px-4 rounded transition agregar-carrito" data-index="${index}">
        Agregar al carrito
      </button>
    `;
    cardsContainer.appendChild(card);
  });
}

// Botones y panel
const abrirCarritoBtn = document.getElementById("abrir-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

if (abrirCarritoBtn && panelCarrito) {
  abrirCarritoBtn.addEventListener("click", () => {
    panelCarrito.classList.toggle("hidden");
    renderizarCarrito();
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const index = e.target.dataset.index;
    carrito.push(paquetes[index]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    mostrarToast(`${paquetes[index].nombre} agregado al carrito ✅`);
  }
});

if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  });
}

function renderizarCarrito() {
    if (!listaCarrito || !totalCarrito) return;
  
    listaCarrito.innerHTML = "";
    let total = 0;
  
    carrito.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - ${item.precio}`;
      listaCarrito.appendChild(li);
      total += parseInt(item.precio.replace("$", "").replace(/\./g, ""));
    });
  
    totalCarrito.textContent = `Total estimado: $${total.toLocaleString("es-AR")}`;
  
    // 🔁 Actualizar el link de WhatsApp cada vez que cambia el carrito
    const btnWhatsapp = document.getElementById("btn-whatsapp-carrito");
    if (btnWhatsapp) {
      const mensaje = `Hola Emanuel, estoy interesado en los siguientes planes: ${carrito.map(p => p.nombre).join(", ")}. Total estimado: $${total.toLocaleString("es-AR")}`;
      const telefono = "5491133076763";
      const link = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
      btnWhatsapp.href = link;
      
    }
  }
  

function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.className = "fixed bottom-4 right-4 bg-[#39C0C8] text-white py-2 px-4 rounded shadow-lg z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

renderizarCarrito();

document.addEventListener("click", (e) => {
    if (
      panelCarrito &&
      !panelCarrito.contains(e.target) &&
      e.target !== abrirCarritoBtn
    ) {
      panelCarrito.classList.add("hidden");
    }
  });

  const botonWhatsapp = document.getElementById("btn-whatsapp");
if (botonWhatsapp) {
  const mensaje = "Hola Emanuel, quiero saber más sobre tus planes de entrenamiento 💪";
  const telefono = "5491133076763"; // ← reemplazá con el número real si cambia
  const link = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  botonWhatsapp.href = link;
}