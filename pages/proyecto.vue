<template>
  <div>
    <CabeceraPr />
    <div class="container">
      <BackButton :to="'/pantalla-inicio'" />
       <NuxtLink v-if=" userRoleResponse.userrole === 'leader'" to="/modificar-proyecto">
      <img class="settings" src="/conf.png" alt="Settings" />
    </NuxtLink>
      <h1 class="title">{{ project.projectname }}</h1>
      <p class="desc">{{ project.description }}</p>
      <div v-if="userRoleResponse.userrole === 'leader'">
        <NuxtLink to="/crear-tarea">
          <MainButton class="custom-button">ADD TASK</MainButton>
        </NuxtLink>
      </div>

      <div v-if="userRoleResponse.userrole === 'leader'">
        <h2>Project task:</h2>
      </div>
      <div v-if="userRoleResponse.userrole === 'participant'">
        <h2>Pending project tasks:</h2>
      </div>

      <TaskList :tasks="tasksAll" v-if="userRoleResponse.userrole === 'leader'" />
      <TaskList :tasks="tasks" v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCookieStore } from "~/stores";

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setTareaId(undefined);
});

const store = useCookieStore();
const route = useRoute();
const proyId = store.proyId;
const userId = store.userId;

const { data: project } = await $fetch(
  "http://localhost:3001/project/" + proyId
);

const { data: tasks } = await $fetch(
  "http://localhost:3001/task/uncompleted/" + proyId
);

const { data: tasksAll } = await $fetch(
  "http://localhost:3001/task/all/" + proyId
);

const { data: userRoleResponse } = await $fetch(
  "http://localhost:3001/participate/rank/" + proyId + "/" + userId
);

const userrole = ref(userRoleResponse);
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 55px;
  margin-bottom: 20px;
  color: #000;
  font-family: "Georgia", serif;
  text-transform: uppercase;
}

.desc {
  text-align: center;
  font-size: 22px;
  margin-bottom: 40px;
  color: #333;
  font-family: "Georgia", serif;
}

/* Ajusta la posición del ícono en la esquina superior derecha */
.settings {
  position: absolute; /* O relative, dependiendo de cómo esté definida tu cabecera */
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: transparent;
  transition: box-shadow 0.3s, transform 0.3s;
}

.settings:hover {
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.4);
  transform: scale(1.05);
}


.container {
  position: relative;
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
</style>
