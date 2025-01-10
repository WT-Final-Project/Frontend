<template>
    <header class="main-header">
      <nav>
        <ul>
          <li><NuxtLink to="/proyecto">PROJECT</NuxtLink></li>
          <li><NuxtLink to="/mis-tareas">TASKS</NuxtLink></li>
          <li><NuxtLink to="/participantes">PARTICIPANTS</NuxtLink></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
.main-header {
  background-color: #ff7f00;
  padding: 1rem;
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
  color: #fff;
  font-weight: bold;
  font-family: "Georgia", serif;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #f2f2f2;
}
  </style>
  