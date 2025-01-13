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
          <MainButton class="custom-button" type="submit">
            Create project
          </MainButton>
        </div>
      </div>
    </form>
   <BottonBar />
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

const createProject = async () => {

  try{
    const result = await $fetch('http://localhost:3001/project/', {
    method: 'post',
    body: {
      username: userId,
      name:formData.value.name,
      description:formData.value.description
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

.container {
  background-color: #fff;
  padding: 40px;
  margin: 120px auto;
  max-width: 850px;
  border-radius: 20px;
  border: 4px solid silver;
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  font-family: "Georgia", serif;
}


.container:hover {
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.9);
  transform: scale(1.01);
}


.title {
  text-align: center;
  font-size: 50px;
  margin-bottom: 40px;
  font-family: "Georgia", serif;
  text-transform: uppercase;
}


.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: bold;
}

.form-row label {
  width: 30%;
}


.form-row input[type="text"],
.form-row textarea {
  width: 65%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: normal;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: inherit;
}


.form-row input[type="text"]:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.5);
}

.MainButton {
  margin-top: 30px;
  text-align: center;
}


.custom-button {
  border-radius: 30px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  background-color: #ff7f00;
  color: #fff;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
}

.custom-button:hover {
  background-color: #e56f00;
  transform: scale(1.02);
}
</style>
