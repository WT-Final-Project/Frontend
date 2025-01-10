   // Función para cambiar entre temas claro y oscuro
export function toggleTheme() {
        body.classList.toggle("dark-mode");

        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    }

    // Función para cambiar el zoom
 export function toggleZoom() {
        if (!body.classList.contains("zoomed")) {
            body.classList.add("zoomed");
            document.addEventListener("mousemove", handleMouseMove);
        } else {
            body.classList.remove("zoomed");
            document.removeEventListener("mousemove", handleMouseMove);
            resetZoom();
        }
    }

    // Función para manejar el movimiento del ratón durante el zoom
    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const scaleFactor = 2;
        document.body.style.transformOrigin = `${mouseX}px ${mouseY}px`;
        document.body.style.transform = `scale(${scaleFactor})`;
    }

    // Función para restablecer el zoom
    function resetZoom() {
        document.body.style.transformOrigin = "center center";
        document.body.style.transform = "scale(1)";
    }

    // Función para leer las tareas en voz alta
export function speakTasks() {
    const pendingTasks = Array.from(document.querySelectorAll("#pending-list li")).map(getTaskDetails);
    const completedTasks = Array.from(document.querySelectorAll("#completed-list li")).map(getTaskDetails);

    // Mensaje antes de leer las tareas pendientes
    const pendingMessage = "Tareas pendientes: ";
    const pendingTextToSpeak = pendingTasks.length > 0 ? pendingTasks.join(". ") : "No hay tareas pendientes.";

    // Mensaje antes de leer las tareas completadas
    const completedMessage = "Tareas completadas: ";
    const completedTextToSpeak = completedTasks.length > 0 ? completedTasks.join(". ") : "No hay tareas completadas.";

    // Combinar mensajes
    const textToSpeak = pendingMessage + pendingTextToSpeak + ". " + completedMessage + completedTextToSpeak;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        speechSynthesis.speak(utterance);
    } else {
        alert("La síntesis de voz no es compatible con este navegador. Por favor, utiliza un navegador compatible.");
    }
}