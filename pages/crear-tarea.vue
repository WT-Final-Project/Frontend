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
            id="descripcion"
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
          <fileUpload />
        </div>

        <!-- Botón principal -->
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

const { data: users } = await useFetch("http://localhost:3001/participate/all/" + proyId);

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
/* 1) Importamos la fuente Poppins (opcional, si prefieres otra fuente simplemente cámbiala) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

/* 2) Contenedor principal de toda la vista */
.create-task {
  font-family: "Poppins", sans-serif;
  color: #333;
}

/* 3) Botón de retorno */
.close-button {
  position: absolute;
  cursor: pointer;
  font-size: 1.5rem;
  top: 20px;
  right: 20px;
  color: #555;
}

/* 4) Contenedor general del formulario */
.container {
  background-color: #fff;
  padding: 40px;
  margin: 120px auto;
  max-width: 600px;

  border: 3px solid #ddd;
  border-radius: 30px; /* Más redondeado */
  box-shadow: 0 0 18px rgba(255, 165, 0, 0.3);
  transition: box-shadow 0.3s, transform 0.3s;
}

/* Efecto hover */
.container:hover {
  box-shadow: 0 0 28px rgba(255, 165, 0, 0.5);
  transform: scale(1.01);
}

/* 5) Encabezado del formulario */
.create-task-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;  /* Ajusta a tu gusto */
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* 6) Grupos de formulario */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
}

/* 7) Campos de texto, fecha y select */
input[type="text"],
input[type="date"],
select,
input[type="descripcion"] {
  width: 100%;
  border: none;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 12px 16px;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  transition: box-shadow 0.2s, background-color 0.2s;
}

input[type="text"]:focus,
input[type="date"]:focus,
select:focus,
input[type="descripcion"]:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.3);
  background-color: #fffaf0; /* Pequeño cambio de color al focus */
}

/* 8) Estilo del botón principal */
.custom-button {
  display: inline-block;
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* degradado naranja */
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 20px;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(255, 165, 0, 0.3);
}
</style>
