// Mostrar el año dinámicamente en el footer
const anio = new Date().getFullYear();
const anioElemento = document.getElementById("anio-actual");
if (anioElemento) anioElemento.textContent = anio;

// -------------------------
// Datos de los paquetes
// -------------------------
const paquetes = [
  {
    tipo: "Entrenamiento en casa",
    subpaquetes: [
      { nivel: "Principiante", descripcion: "Ideal para empezar desde cero sin equipamiento.", precio: "$12.000", imagen: "/casa-principiante.jpg" },
      { nivel: "Intermedio", descripcion: "Rutina con algo de carga y progresión semanal.", precio: "$15.000", imagen: "/casa-intermedio.jpg" },
      { nivel: "Avanzado", descripcion: "Entrenamiento intenso para resultados rápidos.", precio: "$18.000", imagen: "/casa-avanzado.jpg" }
    ]
  },
  {
    tipo: "Entrenamiento en gimnasio",
    subpaquetes: [
      { nivel: "Principiante", descripcion: "Uso básico de máquinas y técnica segura.", precio: "$13.000", imagen: "/gym-principiante.jpg" },
      { nivel: "Intermedio", descripcion: "Pesas y cardio estructurado.", precio: "$17.000", imagen: "/gym-intermedio.jpg" },
      { nivel: "Avanzado", descripcion: "Hipertrofia y control total.", precio: "$20.000", imagen: "/gym-avanzado.jpg" }
    ]
  },
  {
    tipo: "Entrenamiento presencial",
    subpaquetes: [
      {
        nivel: "Presencial",
        descripcion: "Entrenamiento 100% presencial con seguimiento personalizado. Organizamos una entrevista para conocernos y planificar juntos.",
        precio: "Consultar",
        imagen: "/presencial.jpg"
      }
    ]
  }
];

// -------------------------
// Variables de carrito y contenedor principal
// -------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cardsContainer = document.getElementById("cards");

// -------------------------
// Renderizar los paquetes
// -------------------------
paquetes.forEach((categoria, i) => {
  const card = document.createElement("div");
  card.className = "bg-white w-full max-w-2xl text-[#0C2C40] rounded-2xl shadow-lg p-6 text-center";

  // Título de la categoría
  const titulo = document.createElement("h3");
  titulo.className = "text-2xl font-bold text-[#F47C20] mb-4 cursor-pointer";
  titulo.textContent = categoria.tipo;

  // Agregar evento para mostrar los detalles
  titulo.addEventListener("click", () => mostrarDetalle(i));

  // Contenedor para los subpaquetes (oculto al inicio)
  const detalleDiv = document.createElement("div");
  detalleDiv.id = `detalle-${i}`;
  detalleDiv.className = "hidden transition-all duration-500 mt-4 space-y-6";

  card.appendChild(titulo);
  card.appendChild(detalleDiv);
  cardsContainer.appendChild(card);
});

// -------------------------
// Mostrar detalles al hacer clic
// -------------------------
function mostrarDetalle(index) {
  const detalle = document.getElementById(`detalle-${index}`);
  detalle.classList.toggle("hidden");

  // Si ya hay contenido, no volver a renderizar
  if (detalle.hasChildNodes()) return;

  const cat = paquetes[index];

  // Si es presencial, mostrar solo 1 tarjeta con botón a WhatsApp
  if (cat.tipo === "Entrenamiento presencial") {
    const info = cat.subpaquetes[0];
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${info.imagen}" alt="${info.nivel}" class="w-full h-48 object-cover rounded mb-4" />
      <p class="mb-4">${info.descripcion}</p>
      <a href="https://wa.me/5491133076763" target="_blank"
        class="bg-[#39C0C8] hover:bg-[#2aa1a8] text-white font-bold py-2 px-4 rounded transition">
        Coordinar entrevista
      </a>
    `;
    detalle.appendChild(div);
  } else {
    // Para casa y gimnasio: mostrar los subpacks
    cat.subpaquetes.forEach((pack, subIndex) => {
      const div = document.createElement("div");
      div.className = "border-t pt-4";
      div.innerHTML = `
        <img src="${pack.imagen}" alt="${pack.nivel}" class="w-full h-40 object-cover rounded mb-2" />
        <h4 class="text-xl font-semibold text-[#39C0C8]">${pack.nivel}</h4>
        <p class="mb-2">${pack.descripcion}</p>
        <span class="block mb-3 font-bold">${pack.precio}</span>
        <button 
          class="agregar-carrito bg-[#F47C20] hover:bg-[#e06b10] text-white font-bold py-2 px-4 rounded transition" 
          data-cat-index="${index}" 
          data-sub-index="${subIndex}">
          Agregar al carrito
        </button>
      `;
      detalle.appendChild(div);
    });
  }
}

// -------------------------
// Event delegation: Agregar al carrito
// -------------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const catIndex = parseInt(e.target.dataset.catIndex);
    const subIndex = parseInt(e.target.dataset.subIndex);
    const item = paquetes[catIndex].subpaquetes[subIndex];

    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    mostrarToast(`${item.nivel} agregado al carrito ✅`);
  }
});

// -------------------------
// Renderizar el carrito
// -------------------------
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
    li.textContent = `${item.nivel} - ${item.precio}`;
    listaCarrito.appendChild(li);

    // Si el precio es "Consultar", no se suma
    if (item.precio !== "Consultar") {
      total += parseInt(item.precio.replace("$", "").replace(/\./g, ""));
    }
  });

  totalCarrito.textContent = total
    ? `Total estimado: $${total.toLocaleString("es-AR")}`
    : "Total estimado: a consultar";

  // Link a WhatsApp con carrito
  const btnWhatsapp = document.getElementById("btn-whatsapp-carrito");
  if (btnWhatsapp) {
    const mensaje = `Hola Emanuel, estoy interesado en los siguientes planes: ${carrito.map(p => p.nivel).join(", ")}. Total estimado: ${total ? "$" + total.toLocaleString("es-AR") : "Consultar"}`;
    const link = `https://wa.me/5491133076763?text=${encodeURIComponent(mensaje)}`;
    btnWhatsapp.href = link;
  }
}

// -------------------------
// Toast informativo
// -------------------------
function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.className = "fixed bottom-4 right-4 bg-[#39C0C8] text-white py-2 px-4 rounded shadow-lg z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// -------------------------
// Cerrar carrito al hacer clic fuera
// -------------------------
document.addEventListener("click", (e) => {
  if (
    panelCarrito &&
    !panelCarrito.contains(e.target) &&
    e.target !== abrirCarritoBtn
  ) {
    panelCarrito.classList.add("hidden");
  }
});

// -------------------------
// WhatsApp directo (botón general)
const botonWhatsapp = document.getElementById("btn-whatsapp");
if (botonWhatsapp) {
  const mensaje = "Hola Emanuel, quiero saber más sobre tus planes de entrenamiento 💪";
  const link = `https://wa.me/5491133076763?text=${encodeURIComponent(mensaje)}`;
  botonWhatsapp.href = link;
}

// Render inicial del carrito (si hay items guardados)
renderizarCarrito();
