# 💪 Emanuel Spahn - Landing Page de Entrenador Personal

Sitio web profesional para Emanuel Spahn, entrenador personal y coach online. Esta landing page presenta sus planes de entrenamiento, una sección "Sobre mí", y un carrito de compras simple con integración a WhatsApp para finalizar la compra.

## 🌐 Tecnologías utilizadas

- **HTML5**
- **CSS3 / TailwindCSS**
- **JavaScript (Vanilla)**
- **LocalStorage**
- **Vite** (para desarrollo local y build)

## 📦 Estructura del proyecto

/public
├── paquete-inicio.jpg
├── paquete-fuerza.jpg
├── paquete-elite.jpg
└── hero.jpg

/src
├── main.js → Lógica de paquetes, carrito y WhatsApp
└── style.css → Estilos principales con Tailwind



## 🛒 Funcionalidades

- Visualización dinámica de planes de entrenamiento
- Carrito con almacenamiento en `localStorage`
- Animaciones de interacción
- Botón flotante 🛒 para abrir/cerrar el carrito
- Botón de finalizar compra que abre WhatsApp con el resumen
- Responsive y optimizado para móviles

## 🧑‍💻 Cómo editar y correr localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AxelElHilon/emanuel-personaltrainer.git
   cd emanuel-landing
Instalar dependencias y correr:

bash
Copiar
Editar
npm install
npm run dev
Build para producción:

bash
Copiar
Editar
npm run build