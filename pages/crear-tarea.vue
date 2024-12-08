<template>  
    <div class="create-task">
      <form @submit.prevent="submitTask">
        <div class="container">
          <div class="close-button">
            <BackButton :to="'/proyecto'"/>
          </div>

          <div class="create-task-header">
            <label for="taskName">CREAR TAREA</label>
          </div>

          <div class="form-group">
            <label for="taskName">Nombre Tarea</label>
            <input type="text" id="taskName" v-model="dataForm.nombre" required>
          </div>
    
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="descripcion" id="taskName" v-model="dataForm.descripcion" required>
          </div>

          <div class="form-group">
            <label for="fechavencimineto">Fecha de vencimiento</label>
            <input type="date" id="fechavencimineto" v-model="dataForm.fechavencimineto" required>
          </div>
    
          <div class="form-group">
            <label for="nombreusuario">Asignar a</label>
              <select id="nombreusuario" v-model="dataForm.nombreUsuario" required >
              <option v-for="user in users" :value="user.nombreusuario">{{ user.nombre }}</option>
            </select> 
          </div>
    
          <MainButton class="custom-button" type="submit">Crear tarea</MainButton>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useFetch } from 'nuxt/app';
  import { useCookieStore } from "~/stores";

  import { ref } from 'vue';

  definePageMeta({
    middleware: ["auth"],
  });

  const store = useCookieStore();
  const proyId = store.proyId;
  
  const dataForm = ref({
    nombre: '',
    descripcion: '',
    nombreUsuario: '',
    fechavencimineto: ''
  });
  
  const { data: users } = await useFetch('http://localhost:3001/participan/usuariosProyecto/'+proyId);
  
  const submitTask = async () => {
    try {

      const result = await useFetch('http://localhost:3001/tarea/crear', {
        method: 'post',
        body: {
          idProyecto: proyId,
          nombreUsuario: dataForm.value.nombreUsuario,
          titulo: dataForm.value.nombre,
          descripcion: dataForm.value.descripcion,
          fechaVencimiento: dataForm.value.fechavencimineto
        }
      });

      if(result.data._value != null) {
        navigateTo('/proyecto');
      } else {
        alert("¡Ha ocurrido un error!");
      }

    } catch(error) {
      console.error(error);
      alert("¡Ha ocurrido un error!");
    }
  }

  </script>
  
  <style scoped>
 .close-button {
    position: absolute;
    cursor: pointer;
    font-size: 2em; 
  }

  .create-task-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 20px; 
    font-size: 40px;
    height: 100px;
  }

  .container {
    background-color: #f5f5f5; 
    padding: 40px; 
    margin: 150px auto; 
    max-width: 550px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }

  .form-group {
    margin-bottom: 30px;
  }
  .form-group label {
    display: block;
  }
  </style>
  