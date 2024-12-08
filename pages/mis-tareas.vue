<template>
    <div>
      <CabeceraPr />
      <div class="container">
        <MyTaskList :tasks="tasks" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCookieStore } from '~/stores';

  definePageMeta({
    middleware: ["auth"],
  });

  onMounted(() => {
  store.setTareaId(undefined);
});
  
  const store = useCookieStore();
  const userId = store.userId
  const proyId = store.proyId
  
  const { data: tasks } = await useFetch('http://localhost:3001/tarea/obtenerTareasNoCompletadasUsuario/'+proyId+'/'+userId);
  </script>
  
  <style scoped>
  .container {
    background-color: #f5f5f5; 
    padding: 40px; 
    margin: 50px auto; 
    max-width: 750px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }
  .project-details {
    margin-bottom: 20px;
  }
  
  </style>
  