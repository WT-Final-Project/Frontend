<template>
  <div class="bottom-right-bar">
    <button id="zoom-btn" @click="toggleZoom"><i class="fas fa-search"></i></button>
    <button id="speak-btn" @click="speakTasks"><i class="fas fa-volume-up"></i></button>
    <button id="toggle-theme-btn" @click="toggleTheme"><i class="fas fa-adjust"></i></button>
  </div>
</template>

<script setup>
import { toggleTheme, toggleZoom, speakTasks } from "assets/js/funciones.js";
</script>

<style scoped>

.bottom-right-bar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  z-index: 9999;
}


button {
  border: 2px solid #ccc;
  background-color: #fff;
  color: #000;
  border-radius: 30px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #eee;
}
</style>
