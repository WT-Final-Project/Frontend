<template>
  <div class="container">
    <BackButton to="/" />
    <form @submit.prevent="register" class="registration-form">
      <h2>CREAR CUENTA</h2>
      <div class="form-row">
        <div class="input-group">
          <input
            type="email"
            v-model="formData.email"
            placeholder="Correo"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="text"
            v-model="formData.username"
            placeholder="Nombre de usuario"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <input
            type="text"
            v-model="formData.firstName"
            placeholder="Nombre"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="text"
            v-model="formData.lastName"
            placeholder="Apellidos"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <input
            type="password"
            v-model="formData.password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="formData.confirmPassword"
            placeholder="Repetir contraseña"
            required
          />
          <span v-if="!passwordsMatch && formData.confirmPassword" class="error"
            ><br />Las contraseñas no coinciden</span
          >
        </div>
      </div>
      <div class="buttons-wrapper">
        <main-button class="btn-black" type="button" @click="login"
          >Iniciar Sesión</main-button
        >
        <main-button class="btn-white" type="submit">Crear</main-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCookieStore } from "~/stores";

const store = useCookieStore();

onMounted(() => {
  store.setProyId(undefined);
  store.setUserId(undefined);
  store.setTareaId(undefined);
});

const formData = ref({
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
});

const passwordsMatch = computed(() => {
  return formData.value.password === formData.value.confirmPassword;
});

const register = async () => {
  try {
    if (passwordsMatch.value) {
      const data = await $fetch("http://localhost:3001/user/singup", {
        method: "post",
        body: {
          email: formData.value.email,
          username: formData.value.username,
          name: formData.value.firstName,
          lastName: formData.value.lastName,
          password: formData.value.password,
        },
      });
      navigateTo("/iniciar-sesion");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};

const login = () => {
  navigateTo("/iniciar-sesion");
};
</script>

<style scoped>
.close-button {
  position: fixed;
  top: 160px;
  right: 580px;
  cursor: pointer;
  font-size: 2em;
}
.container {
  background-color: #f5f5f5;
  padding: 50px;
  margin: 150px auto;
  max-width: 640px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 4px solid;
  border-color: silver;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.input-group {
  margin-bottom: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

h2 {
  text-align: center;
  font-size: 2em;
}

.buttons-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
}

.btn-black,
.btn-white {
  flex: 1;
  margin: 0 10px;
}
</style>
