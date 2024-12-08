<template>
  <div class="projects-container">
    <div class="header">
      <h1>MIS PROYECTOS</h1>
    </div>
      <div class="project" v-for="project in projects" :key="project.idproyecto" @click="selectProject(project.idproyecto)">
        <nav>
          
            <h2>{{ project.nombre }}</h2>
            <p>{{ project.descripcion }}</p>
            <span class="role">{{ project.rango }}</span>
          
        </nav>
      </div>
    </div>
</template>

<script setup>
  import { useCookieStore } from "~/stores";

  const store = useCookieStore();
  const userId = store.userId;

  const { data: projects } = await useFetch('http://localhost:3001/participan/proyectosUsuario/'+userId)

  const selectProject = (projectId) => {
    store.setProyId(projectId.toString());
    navigateTo('/proyecto')
  };
</script>

<style scoped>
.projects-container {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 30px;

}

.header h1 {
  margin: 0;
}


.project {
    position: relative;
    background-color: silver; 
    padding: 20px; 
    margin: 20px auto; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 2px solid; 
    border-color: #000; 
    transition: background-color 0.3s ease; 
    cursor: pointer;
}
.project:hover {
  background-color: lightgray; 
}
 


.project:last-child {
  border-bottom: none;
}

.project h2 {
  margin: 0;
  font-size: 1.2em;
}

.project p {
  font-size: 0.9em;
}

.role {
    position: absolute;
    top: 10px; 
    right: 10px;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
}

nav a {
    text-decoration: none;
    color: #333; 
    font-weight: bold;
    transition: color 0.3s ease;
  }
</style>
