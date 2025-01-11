export default defineNuxtPlugin(() => {
  let isZoomed = false;

  const toggleZoom = () => {
    if (isZoomed) {
      document.body.style.transform = "scale(1)";
      document.body.style.transformOrigin = "center center";
    } else {
      document.body.style.transform = "scale(1.5)";
      document.body.style.transformOrigin = "center center";
    }
    isZoomed = !isZoomed;
  };

  const handleKeydown = (event) => {
    if (event.ctrlKey && event.key === "m") {
      toggleZoom();
    }
  };

  // Agrega el evento global de teclado
  window.addEventListener("keydown", handleKeydown);

  // Retorna las funciones disponibles para el proyecto
  return {
    provide: {
      toggleZoom,
    },
  };
});

