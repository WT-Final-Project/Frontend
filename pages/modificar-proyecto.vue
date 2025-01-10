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
      "http://localhost:3001/" + proyId,
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
      "http://localhost:3001/" + proyId,
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
  font-size: 40px;
  margin-bottom: 40px;
  color: #000;
  font-family: "Georgia", serif;
  text-transform: uppercase;
}

.container {
  background-color: #fff;
  padding: 20px;
  margin: 150px auto;
  max-width: 640px;
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


.form-group {
  margin-bottom: 20px;
  color: #333;
  font-family: inherit;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}


.form-group input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input[type="text"]:focus {
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.4);
  outline: none;
}


.buttons-wrapper {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
}


.btn-black {
  padding: 12px 24px;
  border: 2px solid #000;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}


.btn-black:hover {
  background-color: #333;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


.btn-red {
  padding: 12px 24px;
  border: 2px solid #b00000;
  background-color: red;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}


.btn-red:hover {
  background-color: #cc0000;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}
</style>
