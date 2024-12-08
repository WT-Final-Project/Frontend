<template>
    <div>
      <CabeceraPr />
        <NuxtLink v-if="userRango === 'lider'" to="/modificar-proyecto">
            <img class="settings" src="/conf.png" alt="Settings" />
        </NuxtLink>
      <div class="container">
        <BackButton :to="'/pantalla-inicio'" />

        <h1 class ="title"> {{ project.nombre }}</h1>
        <p class=" desc">{{project.descripcion}}</p>
        <div v-if="userRango === 'lider'">
          <NuxtLink to="/crear-tarea">
            <MainButton class="custom-button">AÑADIR TAREA</MainButton>
          </NuxtLink>
        </div>
        
        <div v-if="userRango === 'lider'">
        <h2>Tareas del proyecto:</h2>
        </div>
        <div v-if="userRango === 'participante'">
        <h2>Tareas pendientes del proyecto:</h2>
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
  

  const { data: project } = await useFetch('http://localhost:3001/proyecto/obtener/'+proyId);

  const { data: tasks } = await useFetch('http://localhost:3001/tarea/obtenerPorProyecto/'+proyId);
  
  const { data: tasksAll } = await useFetch('http://localhost:3001/tarea/obtenerPorProyectoTodas/'+proyId);

  const { data: userRoleResponse } = await useFetch('http://localhost:3001/participan/obtener/'+proyId+'/'+userId);

  const userRango = ref(userRoleResponse._value.rango);

</script>
  
<style scoped>

  .title {
    text-align: center;
    font-size: 55px;
    margin-bottom: 20px;
  }

  .desc {
    text-align: center;
    font-size: 22px;
    margin-bottom: 40px;
  }
.settings {
    position: fixed;
    z-index: 9999;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: transparent; 
}




  .container {
    background-color: #f5f5f5; 
    padding: 40px; 
    margin: 50px auto; 
    max-width: 750px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }
  </style>
  