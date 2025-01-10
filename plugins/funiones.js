 defineNuxtPlugin(() => {
  if (process.client) {

    document.addEventListener("DOMContentLoaded", () => {
      const body = document.body;
      const toggleThemeBtn = document.getElementById("toggle-theme-btn");
      const zoomBtn = document.getElementById("zoom-btn");
      const speakBtn = document.getElementById("speak-btn");


      const isDarkModeStored = localStorage.getItem("darkMode") === "true";
      if (isDarkModeStored) {
        body.classList.add("dark-mode");
      }

      if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener("click", () => {
          body.classList.toggle("dark-mode");
          const isDark = body.classList.contains("dark-mode");
          localStorage.setItem("darkMode", isDark);
        });
      }


      if (zoomBtn) {
        zoomBtn.addEventListener("click", () => {
          if (!body.classList.contains("zoomed")) {
            body.classList.add("zoomed");
            document.addEventListener("mousemove", handleMouseMove);
          } else {
            body.classList.remove("zoomed");
            document.removeEventListener("mousemove", handleMouseMove);
            resetZoom();
          }
        });
      }

      function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const scaleFactor = 2;
        document.body.style.transformOrigin = `${mouseX}px ${mouseY}px`;
        document.body.style.transform = `scale(${scaleFactor})`;
      }

      function resetZoom() {
        document.body.style.transformOrigin = "center center";
        document.body.style.transform = "scale(1)";
      }


      if (speakBtn) {
        speakBtn.addEventListener("click", speakText);
      }
      function speakText() {
        const text = "Hello from Tasktable!";
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
        } else {
          alert("La síntesis de voz no es compatible con este navegador.");
        }
      }

    });
  }
});
