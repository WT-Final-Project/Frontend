<template>
  <div class="container">
    <div class="close-button">
      <BackButton :to="'/proyecto'" />
    </div>
    <div class="task-form">
      <h1 class="title">{{ task.tasktitle }}</h1>
      <div class="container2">
        <div class="form-group">
          <label class="negrita">Description:</label>
          <p>{{ task.description }}</p>
        </div>

        <div class="form-group">
          <label class="negrita">Due date:</label>
          <p>{{ task.duedate }}</p>
        </div>

        <div class="form-group">
          <label class="negrita">State:</label>
          <p>{{ task.completed === 1 ? "Completed" : "Pending" }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="negrita">Archives:</label>
        <FileVisualizer :taskId="tareaId" />
      </div>

      <div
        class="form-group"
        v-if="userId === task.username && task.completed === 0"
      >
        <FileUploader :taskId="tareaId" />
      </div>

      <button
        @click="submitTask"
        class="submit-button"
        v-if="userId === task.username && task.completed === 0"
      >
        Complete task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCookieStore } from "~/stores";

const store = useCookieStore();
const tareaId = store.tareaId;
const proyId = store.proyId;
const userId = store.userId;

const { data: task } = await $fetch("http://localhost:3001/task/" + tareaId);

const submitTask = async () => {
  if (userId == task.username) {
    try {
      const result = await $fetch(
        "http://localhost:3001/task/complete/" + tareaId,
        {
          method: "post",
        }
      );

      if (result?.error) {
        console.error(response.error);
      } else {
        navigateTo("/proyecto");
      }
    } catch (error) {
      console.error(error);
      alert("¡Something went wrong!");
    }
  } else {
    alert("The task is not assigned to this user");
  }
};
</script>

<style scoped>
.title {
  font-size: 55px;
  margin-bottom: 30px;
  color: #000;
  text-transform: uppercase;
  text-align: center;
  font-family: "Georgia", serif;
}

.container {
  background-color: #fff;
  padding: 40px;
  margin: 50px auto;
  max-width: 750px;

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

.container2 {
  position: relative;
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;

  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}

.container2:hover {
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}

.form-group {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
  font-family: inherit;
}

.submit-button {
  font-size: 20px;
  margin-top: 35px;
  cursor: pointer;
  padding: 10px 20px;
  border: 2px solid #000;
  border-radius: 30px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.submit-button:hover {
  background-color: #f2f2f2;
  transform: scale(1.03);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.negrita {
  font-weight: bold;
}
</style>
