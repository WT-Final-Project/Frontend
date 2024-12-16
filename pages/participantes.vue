<template>
  <CabeceraPr />
  <div class="container">
    <h2 class="title">PARTICIPANTS</h2>
      
    <ParticipantList :participants="participants"/>
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";
import { ref, onMounted } from "vue"; 

const store = useCookieStore();
const proyId = store.proyId

const { data: participants } = await useFetch('http://localhost:3001/participan/usuariosProyecto/'+proyId)

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setTareaId(undefined);
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-bottom: 50px;
}

.container {
  background-color: #f5f5f5; 
  padding: 40px; 
  margin: 50px auto; 
  max-width: 750px; 
  border-radius: 10px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
}

.container-participante {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: silver; 
  padding: 20px; 
  margin: 30px auto; 
  max-width: 640px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  border: 2px solid; 
  border-color: #000; 
}

.participant-info {
  flex-grow: 1;
  font-size: 18px;
}

.delete-box {
  width: 35px;  
  height: 35px;
  background-color: #585858; 
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid; 
  border-color: #000;
  border-radius: 10px; 
  transition: background-color 0.3s ease; 
}
.delete-box:hover {
  background-color: rgb(128, 125, 125); 
}

.close-icon {
  color: #ff0000; 
  font-size: 30px; 
  cursor: pointer;
}
</style>
