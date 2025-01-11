<template>
  <div class="projects-container">
    <div class="header">
      <h1>MY PROJECTS</h1>
    </div>
    <div
      class="project"
      v-for="project in projects"
      :key="project.projectid"
      @click="selectProject(project.projectid)"
    >
      <nav>
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <span class="role">{{ project.userrole }}</span>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";

const store = useCookieStore();
const username = store.userId;

const { data: projects } = await $fetch(
  "http://localhost:3001/participate/user-projects/" + username
);

console.log(projects);
const selectProject = (projectId) => {
  store.setProyId(projectId.toString());
  navigateTo("/proyecto");
};
</script>

<style scoped>
.projects-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: "Georgia", serif;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 30px;
  justify-content: center;
}
.header h1 {
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
}

.project {
  position: relative;
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.project:hover {
  background-color: #eee;
  transform: scale(1.01);
}

.project:last-child {
  border-bottom: none;
}

.project h2 {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
}
.project p {
  font-size: 0.9em;
  color: #444;
}

.role {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 8px;
  border: 1px solid #888;
  border-radius: 5px;
  background-color: #fafafa;
  font-size: 0.8em;
  color: #666;
}
</style>
