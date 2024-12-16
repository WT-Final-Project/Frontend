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
  }

  .container {
    background-color: #f5f5f5; 
    padding: 75px; 
    margin: 150px auto; 
    max-width: 640px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }

</style>
  