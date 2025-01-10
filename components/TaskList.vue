<template>
    <div class="task-list">
        <ul>
          <li v-for="task in tasks" :key="task.id" class="task">
            <div class="container">
              <div @click="() => goToTaskDetails(task.id)">
                <strong>{{ task.titulo }}</strong>
                <p>Assigned to: {{ task.username }}</p>
                <p>Due date: {{ task.due }}</p>
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
  background-color: #fff;
  padding: 15px;
  margin: 15px auto;
  max-width: 640px;
  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  font-family: "Georgia", serif;
}
.container:hover {
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}

  
  </style>
  