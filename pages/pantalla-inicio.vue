<template>
  <div>
    <Cabecera />
    <div class="container">
      <Projects />
    </div>
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";

const store = useCookieStore();

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setProyId(undefined); 
  store.setTareaId(undefined);
});
</script>

<style scoped>

.container {
    background-color: #f5f5f5; 
    padding: 20px; 
    margin: 50px auto; 
    max-width: 1100px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }

</style>
