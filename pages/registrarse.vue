<template>
  <div class="container">
     <div class="header-bar">
      <div class="logo">
        <img src="/logo.png" alt="Tasktable Logo" />
      </div>
       <h2 class ="create-account">Create Account</h2>
       <BackButton to="/" />
    </div>
    <form @submit.prevent="register" class="registration-form">
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
            ><br />The passwords dont match</span
          >
        </div>
      </div>
      <div class="buttons-wrapper">
        <main-button class="btn-black" type="button" @click="login"
          >Sign in
        </main-button>
        <main-button class="btn-white" type="submit">Create</main-button>
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
      const data = await $fetch("http://localhost:3001/user/signup", {
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

.create-account {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-family: "Georgia", serif;
}

.container {
  background-color: #f5f5f5;
  padding: 50px;
  margin: 150px auto;
  max-width: 700px;
  border-radius: 20px;
  border: 4px solid silver;

  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.container:hover {
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.9);
  transform: scale(1.01);
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}


.logo img {
  height: 50px;
  width: auto;
}


.registration-form h2 {
  text-align: center;
  font-size: 2em;
  font-family: "Georgia", serif;
  margin-bottom: 30px;
}


.registration-form {
  display: flex;
  flex-direction: column;
  font-family: "Georgia", serif;
}


.form-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}

.input-group {
  margin-bottom: 10px;
  flex: 1;
}
.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.5);
}


.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
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
  border-radius: 30px;
}

.btn-black:hover,
.btn-white:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>
