<template>
    <div class="container">
      <div class="close-button">
      <BackButton :to="'/proyecto'"/>
      </div>
      <div class="task-form">
        <h1 class="title">{{ task.titulo }}</h1>
        <div class="container2">
          <div class="form-group">
            <label class="negrita">Descripción:</label>
            <p>{{ task.descripcion }}</p>
          </div>

          <div class="form-group">
            <label class="negrita">Fecha vencimiento:</label>
            <p>{{ task.fechavencimineto }}</p>
          </div>

          <div class="form-group" v-if="user.rango === 'lider'">
            <label class="negrita">Estado:</label>
            <p>{{ task.completada === 1 ? 'Completada' : 'Pendiente' }}</p>
          </div>
        </div>

        <div class="form-group" v-if="user.rango === 'lider' && task.completada === 1">
          <label class="negrita">Archivos adjuntos:</label>
          <p>{{ fichero.nombre }}</p>
        </div> 

        <div class="form-group" v-if="userId === task.nombreusuario && task.completada === 0">
          <label for="file" class="negrita">Archivos adjuntos:</label>
          <input type="file" id="file" @change="handleFileUpload">
        </div>

        <button @click="submitTask" class="submit-button" v-if="userId === task.nombreusuario && task.completada === 0">Completar tarea</button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCookieStore } from "~/stores";

const store = useCookieStore();
const tareaId = store.tareaId;
const proyId = store.proyId;
const userId = store.userId;
let hasFile = false;

const fileData = ref({
  filename: ''
})

const file =ref({
  fichero:''
})

const {data : task} = await useFetch('http://localhost:3001/tarea/obtener/'+tareaId)

const {data : user } = await useFetch('http://localhost:3001/participan/obtener/'+proyId+'/'+userId)

const {data : fichero} = await useFetch('http://localhost:3001/fichero/obtenerPorTarea/'+tareaId);  //hacer esto aqui podria dar algun problema los vacios 


/*watchEffect(async () => {
  if (user.value && user.value.rango === 'lider' && task.completada === 1) {
    const {data : fichero} = await useFetch('http://localhost:3001/fichero/obtenerPorTarea/'+tareaId);
    file.value.fichero = fichero.nombre
  }
});*/

const submitTask = async () => {
  if(userId == task._value.nombreusuario) {
    try {
      const result = await useFetch('http://localhost:3001/tarea/completar/'+tareaId, {
        method: 'post',
        body: {
          idTarea: tareaId
        }
      });
      
      if(result.data._value != null) {
        
        if(hasFile) {
          const subir = await useFetch('http://localhost:3001/fichero/crear', {
          method: 'post',
          body: {
            idTarea: tareaId,
            nombre: fileData.value.filename
          }
          });

          if(subir.data._value != null) 
          {
            navigateTo('/proyecto');
          } else {
            alert("¡Ha ocurrido un error!");
          }

          console.log(subir);


        } else {
        navigateTo('/proyecto');
        }
      } else {
        alert("¡Ha ocurrido un error!");
      }

    } catch (error) {
      console.error(error);
      alert("¡Ha ocurrido un error!");
    }

  } else {
    alert('La tarea no está asignada a este usuario.');
  }
}

function handleFileUpload(event) {
  if (event.target.files.length > 0) {
    const uploadedFile = event.target.files[0];
    fileData.value.filename = uploadedFile.name;
    hasFile = true;
  }
}

</script>

<style scoped>
.title {
    font-size: 55px;
    margin-bottom: 30px;
  }

.container {
    background-color: #f5f5f5; 
    padding: 40px; 
    margin: 50px auto; 
    max-width: 750px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }

.container2 {
    position: relative;
    background-color: silver; 
    padding: 20px; 
    margin: 20px auto; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 2px solid; 
    border-color: #000; 
}

.form-group{
  font-size: 20px;
  margin-bottom: 15px;
}

.submit-button{
  font-size: 20px;
  margin-top: 35px;
  cursor: pointer;
}

.negrita {
  font-weight: bold;
}

</style>
