<template>
  <div class="create-task">
    <form @submit.prevent="submitTask">
      <div class="container">
        <div class="close-button">
          <BackButton :to="'/proyecto'" />
        </div>

        <div class="create-task-header">
          <label for="taskName">CREATE TASK</label>
        </div>

        <div class="form-group">
          <label for="taskName">Task name</label>
          <input type="text" id="taskName" v-model="dataForm.name" required />
        </div>

        <div class="form-group">
          <label for="descripcion">Description</label>
          <input
            type="descripcion"
            id="taskName"
            v-model="dataForm.description"
            required
          />
        </div>

        <div class="form-group">
          <label for="fechavencimineto">Due date</label>
          <input
            type="date"
            id="fechavencimineto"
            v-model="dataForm.due"
            required
          />
        </div>

        <div class="form-group">
          <label for="nombreusuario">Assign to</label>
          <select id="nombreusuario" v-model="dataForm.username" required>
            <option v-for="user in users" :value="user.username">
              {{ user.name }}
            </option>
          </select>
        </div>
        <div>
          <FileUpload />
        </div>

        <MainButton class="custom-button" type="submit">Create task</MainButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFetch } from "nuxt/app";
import { useCookieStore } from "~/stores";

import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const store = useCookieStore();
const proyId = store.proyId;

const dataForm = ref({
  nombre: "",
  descripcion: "",
  nombreUsuario: "",
  fechavencimineto: "",
});

const { data: users } = await useFetch(
  "http://localhost:3001/all/" + proyId
);

const submitTask = async () => {
  try {
    const result = await useFetch("http://localhost:3001/task/", {
      method: "post",
      body: {
        idProyecto: proyId,
        nombreUsuario: dataForm.value.nombreUsuario,
        titulo: dataForm.value.nombre,
        descripcion: dataForm.value.descripcion,
        fechaVencimiento: dataForm.value.fechavencimineto,
      },
    });

    if (result.data._value != null) {
      navigateTo("/project");
    } else {
      alert("¡Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    alert("¡Something went wrong!");
  }
};
</script>

<style scoped>
.close-button {
  position: absolute;
  cursor: pointer;
  font-size: 2em;
  top: 20px;      /* Ajusta según donde quieras ubicar el botón */
  right: 20px;
  color: #ff0000; /* Botón de cierre en rojo */
}

/* Encabezado para "Create Task" */
.create-task-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px;
  font-size: 40px;
  height: 100px;
  font-family: "Georgia", serif;
  color: #000; /* Texto oscuro */
}

/* Contenedor principal con glow naranja y esquinas redondeadas */
.container {
  background-color: #fff;
  padding: 40px;
  margin: 150px auto;
  max-width: 550px;

  border: 4px solid silver; /* Borde plateado */
  border-radius: 20px;      /* Esquinas redondeadas */
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}

.container:hover {
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}

/* Grupos de formulario */
.form-group {
  margin-bottom: 30px;
  font-family: inherit; /* Hereda la misma fuente del contenedor */
  color: #333;
}

.form-group label {
  display: block;
  font-weight: bold;
}

</style>
