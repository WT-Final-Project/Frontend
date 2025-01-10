<template>
    <CabeceraPr />
    <div class="container">
        <p class="header">to be done</p>
    </div>
</template>
  
<script setup>
import { useCookieStore } from "~/stores";

const store = useCookieStore();

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setTareaId(undefined);
});
  
</script>
  
<style scoped>

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px;
  font-size: 40px;
  height: 100px;
  font-family: "Georgia", serif;
  color: #000;
  text-transform: uppercase;
}

.container {
  background-color: #fff;
  padding: 75px;
  margin: 150px auto;
  max-width: 640px;
  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}

.container:hover {

  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}


</style>
  