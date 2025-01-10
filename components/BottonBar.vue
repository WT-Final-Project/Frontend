<template>
  <div class="bottom-right-bar">>
    <button id="zoom-btn" class="btn-white">Zoom</button>
    <button id="toggle-theme-btn" class="btn-white">Cambiar Tema</button>
    <button id="speak-btn" class="btn-white">Speak</button>
  </div>
</template>

<script setup>

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
