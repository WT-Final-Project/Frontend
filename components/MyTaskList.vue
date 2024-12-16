<template>
  <div class="task-list">
    <h2 class="title">My tasks:</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="task">
        <div class="task-details" @click="() => goToTaskDetails(task.idtarea)">
          <div class="container">
            <strong class="form-group">{{ task.titulo }}</strong>
            <p class="form-group">Due date: {{ task.fechavencimineto }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
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

.title {
    font-size: 55px;
    margin-bottom: 30px;
  }


.form-group{
  font-size: 25px;
  margin-bottom: 20px;
}

.container {
    background-color: silver; 
    padding: 15px; 
    margin: 10px auto; 
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
 
  .task-list {
    padding: 1rem;
    background-color: #f5f5f5; 
    border-radius: 8px; 
  }
  
  .task {
    border-bottom: 1px solid #eaeaea; 
    padding: 0.5rem 0;
    list-style: none;
  }
  
  .task-details {
    margin: 0.5rem 0;
  }
  
  .task-details strong {
    display: block; 
    color: #333; 
    margin-bottom: 0.25rem;
  }
  
  .task-details p {
    font-size: 0.875rem; 
    color: #000; 
  }
  </style>
  