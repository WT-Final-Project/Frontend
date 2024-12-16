<template>
  <div>
    <Cabecera />

    <form @submit.prevent="createProject">
      <div class="container">
        <h1 class="title">CREATE PROJECT</h1>
        <div class="form-row">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="form-row">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            required
          ></textarea>
        </div>

        <div class="MainButton">
          <MainButton class="custom-button" type="submit">Create project</MainButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCookieStore } from "~/stores";

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setProyId(undefined); 
  store.setTareaId(undefined);
});

const store = useCookieStore();
const userId = store.userId;


const formData = ref({
  name: "",
  description: "",
});

// Function to create project
const createProject = async () => {

  try{
    const result = await useFetch('http://localhost:3001/proyecto/crear', {
    method: 'post',
    body: {
      nombreUsuario: userId,
      nombre:formData.value.name,
      descripcion:formData.value.description
    }
  });
  navigateTo("/pantalla-inicio")

  } catch(error) {
    console.error(error);
    alert("Error creating");
  }
  console.log("Project data:", formData.value);
};
</script>

<style scoped>

.MainButton {
  margin-top: 30px;
  text-align: center;
}


.title {
    text-align: center;
    font-size: 55px;
    margin-bottom: 40px;
  }

.container {
    background-color: #f5f5f5;
    padding: 20px; 
    margin: 150px auto; 
    max-width: 850px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    margin-top: 30px;
  }

</style>
