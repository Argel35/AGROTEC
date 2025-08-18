// script.js

// Selecciona el elemento del encabezado
const header = document.querySelector('header');

// Define el umbral de scroll en píxeles.
// Cuando el usuario baje más allá de esta cantidad, el header cambiará.
const scrollThreshold = 100; // Puedes ajustar este valor: 50, 150, etc.

// Esta función se ejecuta cada vez que el usuario hace scroll
function handleScroll() {
  // window.scrollY devuelve el número de píxeles que la página ha sido desplazada verticalmente.
  if (window.scrollY > scrollThreshold) {
    // Si la posición de scroll es mayor que el umbral, añade la clase 'scrolled'
    header.classList.add('scrolled');
  } else {
    // Si la posición de scroll es menor o igual al umbral (estamos arriba), quita la clase 'scrolled'
    header.classList.remove('scrolled');
  }
}

// Añade un "escuchador de eventos" al objeto 'window' para el evento 'scroll'
window.addEventListener('scroll', handleScroll);

// También ejecuta la función una vez cuando el DOM esté completamente cargado.
// Esto es importante para que el header tenga el estilo correcto si el usuario recarga la página
// y ya estaba en una posición de scroll, o si la página es muy corta y ya está "scrolleada" al inicio.
document.addEventListener('DOMContentLoaded', handleScroll);