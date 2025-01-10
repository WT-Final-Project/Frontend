<template>
  <div class="login-container">
     <div class="header-bar">
      <div class="logo">
        <img src="/logo.png" alt="Tasktable Logo" />
      </div>
       <h2 class="login-title">Sing in</h2>
       <BackButton to="/" />
    </div>
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
          >CREATE ACCOUNT</main-button
        >
        <main-button class="btn-black" type="submit">SIGN IN</main-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { errorMessages } from "vue/compiler-sfc";
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
  // try {
  //   const { data, error } = await $fetch("http://localhost:3001/user/signin", {
  //     method: "post",
  //     body: {
  //       email: email.value,
  //       password: password.value,
  //     },
  //   });

  //   if (error) {
  //     console.error(error);
  //   }

  //   if (data) {
  //     store.setUserId(data);
  //     navigateTo("/pantalla-inicio");
  //   }
  // } catch (error) {
  //   console.error("Something went wrong on the signin: ", error);
  //   alert("¡Something went wrong!");
  // }
  try {
    const { success, error } = await store.signin(email.value, password.value);

    if (success) {
      navigateTo("/pantalla-inicio");
    } else if (error) {
      console.error(error);
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

.login-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-family: "Georgia", serif;
}


.login-container {
  background-color: #f5f5f5;
  padding: 50px;
  margin: 150px auto;
  max-width: 700px;
  border-radius: 20px;
  border: 4px solid silver;
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  font-family: "Georgia", serif;
}

.login-container:hover {
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


.form-group {
  margin-bottom: 20px;
}


.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}


.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-family: inherit;
}

.form-group input[type="email"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.5);
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
  border-radius: 30px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}


.btn-black:hover,
.btn-white:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>
