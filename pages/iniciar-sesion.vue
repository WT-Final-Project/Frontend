<template>
  <div class="login-container">
    <BackButton to="/" />
    <h2 class="login-title">INICIAR SESION</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="buttons-wrapper">
        <main-button class="btn-white" @click="createAccount"
          >CREAR CUENTA</main-button
        >
        <main-button class="btn-black" type="submit"
          >INICIAR SESIÓN</main-button
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";

const store = useCookieStore();

const email = ref("");
const password = ref("");

onMounted(() => {
  store.setProyId(undefined);
  store.setUserId(undefined);
  store.setTareaId(undefined);
});

const login = async () => {
  try {
    const { data, error } = await $fetch("http://localhost:3001/user/signin", {
      method: "post",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (error) {
      console.error(error);
    }

    if (data) {
      store.setUserId(data);
      navigateTo("/pantalla-inicio");
    }
  } catch (error) {
    console.error("Something went wrong on the signin: ", error);
    alert("¡Something went wrong!");
  }
};

const createAccount = () => {
  navigateTo("/registrarse");
};
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 160px;
  right: 580px;
  cursor: pointer;
  font-size: 2em;
}
.login-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.login-container {
  background-color: #f5f5f5;
  padding: 50px;
  margin: 150px auto;
  max-width: 640px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 4px solid;
  border-color: silver;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  width: calc(100%);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

a {
  display: block;
  text-align: right;
  margin-bottom: 20px;
  color: #000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.buttons-wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}

.btn-black,
.btn-white {
  flex: 1;
  margin: 0 10px;
}
</style>
