<template>
  <div class="botton-bar">
    <nuxt-link to="/aboutUs" class="button">About Us</nuxt-link>
    <nuxt-link to="/contactUs" class="button">Contact Us</nuxt-link>
  </div>
</template>

<script setup>
// Este script es opcional, pero aquí podrías añadir lógica adicional si la necesitas
</script>

<style scoped>
.botton-bar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
}

.botton-bar:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.button {
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
}
</style>
