<template>
  <div class="task-list">
    <h2 class="title">My tasks:</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="task">
        <div class="task-details" @click="() => goToTaskDetails(task.taskid)">
          <div class="container">
            <p>{{ task.taskid }}</p>
            <strong class="form-group">{{ task.tasktitle }}</strong>
            <p class="form-group">Due date: {{ task.duedate }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useCookieStore } from "~/stores";

const store = useCookieStore();

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const goToTaskDetails = (taskId) => {
  store.setTareaId(taskId);
  navigateTo(`/completar-tarea`);
};
</script>

<style scoped>
.title {
  font-size: 55px;
  margin-bottom: 30px;
  color: #000;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-family: "Georgia", serif;
}

.form-group {
  font-size: 25px;
  margin-bottom: 20px;
  color: #333;
  font-family: "Georgia", serif;
}

.container {
  background-color: #fff;
  padding: 15px;
  margin: 10px auto;
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
