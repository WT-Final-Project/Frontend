<template>
  <div>
    <Cabecera />
    <form @submit.prevent="joinProject">
      <div class="container">
        <h2 class="title">JOIN THE PROJECT</h2>

        <div class="form-row">
          <label for="accessCode">Enter the access code here:</label>
        </div>

        <input
          id="accessCode"
          type="text"
          v-model="dataForm.accessCode"
          required
          placeholder="Código de acceso"
          class="access-input"
        />

        <div class="button-wrapper">
          <button type="submit" class="join-button">Join</button>
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

const dataForm = ref({
  accessCode: "",
});

const joinProject = async () => {
  try {
    const result = await $fetch("http://localhost:3001/participate", {
      method: "post",
      body: {
        projectId: dataForm.value.accessCode,
        username: userId,
      },
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      navigateTo("/pantalla-inicio");
    }
  } catch (error) {
    console.error(error);
    alert("Error joining the project");
  }
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
  text-transform: uppercase;
  font-family: "Georgia", serif;
}

.form-row {
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: bold;
}

.access-input {
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: inherit;
}

.access-input:focus {
  outline: none;
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.5);
}

.button-wrapper {
  text-align: center;
}

.join-button {
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

.join-button:hover {
  background-color: #e56f00;
  transform: scale(1.02);
}
</style>
