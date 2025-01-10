<template>
    <div>
      <CabeceraPr />
        <NuxtLink v-if="userRango === 'lider'" to="/modificar-proyecto">
            <img class="settings" src="/conf.png" alt="Settings" />
        </NuxtLink>
      <div class="container">
        <BackButton :to="'/pantalla-inicio'" />

        <h1 class ="title"> {{ project.name }}</h1>
        <p class=" desc">{{project.description}}</p>
        <div v-if="userRango === 'lider'">
          <NuxtLink to="/crear-tarea">
            <MainButton class="custom-button">ADD TASK</MainButton>
          </NuxtLink>
        </div>
        
        <div v-if="userRango === 'lider'">
        <h2>Project task:</h2>
        </div>
        <div v-if="userRango === 'participante'">
        <h2>Pending project tasks:</h2>
        </div>

        <TaskList :tasks="tasksAll" v-if="userRango === 'lider'"/>
        <TaskList :tasks="tasks" v-else/>
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
  

  const { data: project } = await useFetch('http://localhost:3001/'+proyId);

  const { data: tasks } = await useFetch('http://localhost:3001/uncompleted/'+proyId);
  
  const { data: tasksAll } = await useFetch('http://localhost:3001/all/'+proyId);

  const { data: userRoleResponse } = await useFetch('http://localhost:3001/all/'+proyId+'/'+userId);

  const userRango = ref(userRoleResponse._value.rank);

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

.settings {
  position: fixed;
  z-index: 9999;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: transparent;
  top: 20px;
  right: 20px;
  transition: box-shadow 0.3s, transform 0.3s;
}
.settings:hover {
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.4);
  transform: scale(1.05);
}


.container {
  background-color: #fff;
  padding: 40px;
  margin: 50px auto;
  max-width: 750px;
  border: 4px solid silver;           /
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
  