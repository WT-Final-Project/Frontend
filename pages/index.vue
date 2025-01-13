<template>
  <div>
    <header class="header">
      <div class="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div class="button-group">
        <MainButton class="btn-black" @click="login">Sign in</MainButton>
        <MainButton class="btn-white" @click="createAccount"
          >Create account</MainButton
        >
      </div>
    </header>

    <main>
      <div class="container">
        <div class="text-container">
          <p class="central-text-principal">
            ¡¡ WELCOME TO TASKTABLE !!
          </p>
          <p class="central-text-contenido">
            At Taskable, we are committed to making projects more
            efficient and successful for your team. <br />
            Our intuitive and comprehensive platform allows you to plan,
            collaborate, and effectively track your <br />projects,
            providing you with the necessary tools to achieve your goals.
          </p>
          <p class="central-text-contenido">
            Log in or create an account to access all our services.
          </p>
        </div>
        <div class="button-group-inferior">
          <MainButton class="btn-black" @click="login">Sign In</MainButton>
          <MainButton class="btn-white" @click="createAccount"
            >Create account</MainButton
          >
        </div>
      </div>
    </main>
    <BottonBar />
  </div>
</template>


<script setup>
import { useCookieStore } from "~/stores";
import BottonBar from "~/components/BottonBar.vue";

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(90deg, #ff7f00, #ff9f3f);
  border:4px solid #414141;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 35px rgba(239, 236, 236, 0.7);

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

.container {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 80px auto;
  max-width: 1100px;
  border-radius: 20px;
  border: 4px solid silver;

  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.container:hover {
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.9);
  transform: scale(1.01);
}


.text-container {
  text-align: center;
  max-width: 900px;
  margin: 40px auto;
  font-family: "Georgia", serif;
}

.central-text-principal {
  font-family: "Merriweather", serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  text-transform: uppercase;
  transition: transform 0.4s;
}

.central-text-principal:hover {

  transform: scale(1.1);

}

.central-text-contenido {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 25px;
}


.button-group-inferior {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
}


.btn-black{
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
.btn-white {
  background-color: #fff;
  color: #000;
  padding: 12px 24px;
  border: 2px solid #000;
  border-radius: 30px;
  transition: background-color 0.3s ease , transform 0.3s ease , box-shadow 0.3s ease;
}

.btn-black:hover{
  background-color: #333;
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15)
}
.btn-white:hover {
  background-color: #f7f7f7;
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>

