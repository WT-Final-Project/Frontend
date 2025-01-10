<template>
  <div>
    <Cabecera />
    <div class="container">
      <Projects />
    </div>
    <BottonBar />
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";
import BottonBar from "~/components/BottonBar.vue";

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
  background-color: #fff;
  padding: 30px;
  margin: 80px auto;
  max-width: 1100px;
  border-radius: 20px;
  border: 4px solid silver;
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  font-family: "Georgia", serif;
}

.container:hover {
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.9);
  transform: scale(1.01);
}
</style>