<template>
  <div>
    <header class="header">
      <div class="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div class="button-group">
        <MainButton class="btn-black" @click="login">Sing in</MainButton>
        <MainButton class="btn-white" @click="createAccount"
          >Create account</MainButton
        >
      </div>
    </header>

    <main>
      <div class="container">
        <p class="central-text-principal">¡¡ WELCOME TO TASKTABLE !!</p>
        <br />
        <p class="central-text-contenido">
          At Taskable, we are committed to making project management more efficient and successful for your team. <br />
          Our intuitive and comprehensive platform allows you to plan, collaborate, and effectively track your projects, <br />
          providing you with the necessary tools to achieve your goals.
        </p>
        <p class="central-text-contenido">
          Log in or create an account to access all our services.
        </p>

        <div class="button-group-inferior">
          <MainButton class="btn-black" @click="login"
            >Sign In</MainButton
          >
          <MainButton class="btn-white" @click="createAccount"
            >Create account</MainButton
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";

const store = useCookieStore();

onMounted(() => {
  store.setProyId(undefined);
  store.setUserId(undefined);
  store.setTareaId(undefined);
});

const login = () => {
  navigateTo("/iniciar-sesion");
};

const createAccount = () => {
  navigateTo("/registrarse");
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 100px auto;
  max-width: 1100px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 4px solid;
  border-color: silver;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #f5f5f5;
}

.logo img {
  max-height: 50px;
  width: auto;
}

.button-group {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.button-group-inferior {
  margin-top: 50px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.central-text-principal {
  text-align: center;
  font-size: 45px;
}

.central-text-contenido {
  text-align: center;
  font-size: 22px;
  margin-top: 70px;
}
</style>
