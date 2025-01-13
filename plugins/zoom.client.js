export default defineNuxtPlugin(() => {
  let isZoomed = false;

  const toggleZoom = () => {
    if (isZoomed) {
      document.body.style.transform = "scale(1)";
      document.body.style.transformOrigin = "0 0";
      document.body.style.overflow = "auto";
    } else {
      document.body.style.transform = "scale(1.5)";
      document.body.style.transformOrigin = "0 0";
      document.body.style.overflow = "auto";
    }
    isZoomed = !isZoomed;
  };

  const handleKeydown = (event) => {
    if (event.ctrlKey && event.key === "m") {
      toggleZoom();
    }
  };

  if (process.client) {
    window.addEventListener("keydown", handleKeydown);
  }

  return {
    provide: {
      toggleZoom,
    },
  };
});
