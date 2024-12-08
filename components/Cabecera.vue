<template>
  <header class="main-header">
    <nav>
      <ul>
        <li><NuxtLink to="/pantalla-inicio">MIS PROYECTOS</NuxtLink></li>
        <li><NuxtLink to="/crear-proyecto">CREAR UN PROYECTO</NuxtLink></li>
        <li><NuxtLink to="/unirse-proyecto">UNIRSE A UN PROYECTO</NuxtLink></li>
        <li><NuxtLink to="/configurar-cuenta">CONFIGURAR CUENTA</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style scoped>
.main-header {
  background-color: #f5f5f5; 
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  position: sticky; 
  top: 0; 
  z-index: 1000; 
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}

nav li {
  margin: 0;
}

nav a {
  text-decoration: none;
  color: #333; 
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #000; 
}
</style>
