<template>
  <div>
    <Cabecera />
    <div class="config-container">
      <div class="container">
        <form @submit.prevent="submitAccountInfo">
          <h2 class="title">CONFIGURE ACCOUNT</h2>
          <div class="form-row">
            <div class="input-group">
                 <label for="username">User name:</label>
                    <input
                      type="text"
                      id="username"
                      v-model="accountData.username"
                      placeholder="Usuario"
                      required
                    />
            </div>
            <div class="input-group">
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                v-model="accountData.name"
                placeholder="Nombre Usuario"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label for="lastName">Surname:</label>
              <input
                type="text"
                id="lastName"
                v-model="accountData.lastName"
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <button class="submit-button" type="submit">
            Save Account Info
          </button>
        </form>
      </div>

      <div class="container">
        <form @submit.prevent="submitEmailChange">
          <h2 class="title">CHANGE EMAIL</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="email">New Email:</label>
              <input
                type="email"
                id="email"
                v-model="emailData.newEmail"
                placeholder="Nuevo correo"
                required
              />
            </div>
          </div>
          <button class="submit-button" type="submit">
            Change Email
          </button>
        </form>
      </div>

      <div class="container">
        <form @submit.prevent="submitPasswordChange">
          <h2 class="title">CHANGE PASSWORD</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="password">New Password:</label>
              <input
                type="password"
                id="password"
                v-model="passwordData.newPassword"
                placeholder="Nueva contraseña"
                required
              />
            </div>
            <div class="input-group">
              <label for="confirmPassword">Repeat Password:</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="passwordData.confirmPassword"
                placeholder="Repetir contraseña"
                required
              />
              <span
                v-if="!passwordsMatch && passwordData.confirmPassword"
                class="error"
                >Passwords don't match</span
              >
            </div>
          </div>
          <button
            class="submit-button"
            type="submit"
            :disabled="!passwordsMatch"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>

    <div class="button-container">
      <button class="logout-button" @click="logout">Close session</button>
    </div>
     <div class="bottom-bar-container">
      <BottonBar />
     </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useCookieStore } from "~/stores";
import Cabecera from "~/components/Cabecera.vue";

definePageMeta({
  middleware: ["auth"],
});

const store = useCookieStore();
onMounted(() => {
  store.setProyId(undefined);
  store.setTareaId(undefined);
});

const userId = store.userId;

const accountData = ref({
  username: "",
  name: "",
  lastName: "",
});

const emailData = ref({
  newEmail: "",
});

const passwordData = ref({
  newPassword: "",
  confirmPassword: "",
});

const passwordsMatch = computed(() => {
  return passwordData.value.newPassword === passwordData.value.confirmPassword;
});

const submitAccountInfo = async () => {
  try {
    const response = await $fetch("http://localhost:3001/user/" + userId, {
      method: "put",
      body: {
        username: accountData.value.username,
        name: accountData.value.name,
        lastName: accountData.value.lastName,
      },
    });
    if (response?.error) {
      console.error(response.error);
    } else {
      console.log("Account information updated successfully");
    }
  } catch (error) {
    console.error("Error saving account information:", error);
    alert("Error saving account information");
  }
};

const submitEmailChange = async () => {
  try {
    const { error, success } = await store.changeEmail(emailData.value.newEmail);
    if (success) {
      alert("Check your email box to complete the change");
      store.logout();
    } else if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    alert("Error changing email");
  }
};

const submitPasswordChange = async () => {
  if (passwordsMatch.value) {
    try {
      const { error, success } = await store.changePassword(
        passwordData.value.newPassword
      );
      if (success) {
        alert("Password changed successfully!");
        store.logout();
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      alert("Error changing password");
    }
  }
};

const logout = () => {
  store.logout();
};
</script>

<style scoped>
.page-container {
  position: relative;
  min-height: 1200px;
}


.container {
  background-color: #fff;
  padding: 30px;
  margin: 40px auto;
  max-width: 850px;
  border-radius: 20px;
  border: 4px solid silver;
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.7);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}
.container:hover {
  box-shadow: 0 0 35px rgba(255, 165, 0, 0.9);
  transform: scale(1.01);
}


.title {
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
  text-transform: uppercase;
}
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: bold;
}
.input-group {
  margin-right: 20px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  margin-left: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: inherit;
}
input:focus {
  outline: none;
  border-color: #ff7f00;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.4);
}

.submit-button {
  padding: 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 200px;
  font-size: 15px;
  background-color: #000;
  color: white;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s;
}
.submit-button:hover {
  background-color: #333;
  transform: scale(1.02);
}


.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}


.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
.logout-button {
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
  background-color: #ff6666;
  color: white;
  transition: background-color 0.3s, transform 0.3s;
}
.logout-button:hover {
  background-color: #e05a5a;
  transform: scale(1.02);
}


.bottom-bar-container {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
