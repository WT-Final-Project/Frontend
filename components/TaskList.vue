<template>
    <div class="task-list">
        <ul>
          <li v-for="task in tasks" :key="task.idtarea" class="task">
            <div class="container">
              <div @click="() => goToTaskDetails(task.idtarea)">
                <strong>{{ task.titulo }}</strong>
                <p>Asignado a: {{ task.nombreusuario }}</p>
                <p>Fecha Vencimiento: {{ task.fechavencimineto }}</p>
              </div>
            </div>
          </li>
        </ul>
    </div>
  </template>
  
  <script setup>
  import { useCookieStore } from "~/stores";

  const store = useCookieStore();
  
  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const goToTaskDetails = (taskId) => {
    store.setTareaId(taskId)
    navigateTo(`/completar-tarea`);
  };
  </script>
  
  <style scoped>

  .container {
    background-color: silver; 
    padding: 15px; 
    margin: 15px auto; 
    max-width: 640px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    border: 2px solid; 
    cursor: pointer;
    border-color: #000; 
    transition: background-color 0.3s ease; 
}
.container:hover {
  background-color: lightgray; 
}
 
  
  </style>
  