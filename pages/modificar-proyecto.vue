<template>
  <CabeceraPr />
  <div class="container">
    <BackButton :to="'/proyecto'" />
    <form @submit.prevent="modifyProject">
      <h2 class="title">MODIFY PROJECT</h2>
      <div class="form-group">
        <label for="nombre">Name</label>
        <input type="text" id="nombre" v-model="formData.name" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Description</label>
        <input
          type="text"
          id="descripcion"
          v-model="formData.description"
          required
        />
      </div>
      <div class="form-group">
        <p>The invitation code for the project is: {{ proyId }}</p>
      </div>
      <div class="buttons-wrapper">
        <MainButton class="btn-black" type="submit">Confirm</MainButton>
        <MainButton class="btn-red" @click="eliminar"
          >Delete Project</MainButton
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCookieStore } from "~/stores";

const store = useCookieStore();

const proyId = store.proyId;

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setTareaId(undefined);
});

const formData = ref({
  name: "",
  description: "",
});

const modifyProject = async () => {
  try {
    const result = await useFetch(
      "http://localhost:3001/proyecto/actualizar/" + proyId,
      {
        method: "post",
        body: {
          nombre: formData.value.name,
          descripcion: formData.value.description,
        },
      }
    );

    if (result.data._value != null) {
      navigateTo("/proyecto");
    } else {
      alert("¡An error has occurred!");
    }
  } catch (error) {
    console.error(error);
    alert("Error modifying the project.");
  }
};

const eliminar = async () => {
  try {
    const result = await useFetch(
      "http://localhost:3001/proyecto/borrar/" + proyId,
      {
        method: "delete",
      }
    );

    if (result.data._value != null) {
      store.setProyId(undefined);
      navigateTo("/pantalla-inicio");
    } else {
      alert("¡Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    alert("Error eliminating project.");
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
}
.container {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 150px auto;
  max-width: 640px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.buttons-wrapper {
  display: flex;
  justify-content: center;
}

.btn-black {
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 50px;
}

.btn-red {
  padding: 10px 20px;
  border: none;
  background-color: red;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  margin-left: 50px;
}
</style>
