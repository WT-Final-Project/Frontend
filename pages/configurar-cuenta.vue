<template>
  <div>
    <Cabecera />
    <div class="config-container">
      <!-- Account Information Form -->
      <div class="container">
        <form @submit.prevent="submitAccountInfo">
          <h2 class="title">CONFIGURE ACCOUNT</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="user">User name: {{ userId }}</label>
            </div>
            <div>
              <label for="name">Name: </label>
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
              <label for="lastName">Surname: </label>
              <input
                type="text"
                id="lastName"
                v-model="accountData.lastName"
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <button class="submit-button" type="submit">Save Account Info</button>
        </form>
      </div>

      <!-- Email Change Form -->
      <div class="container">
        <form @submit.prevent="submitEmailChange">
          <h2 class="title">CHANGE EMAIL</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="email">New Email: </label>
              <input
                type="email"
                id="email"
                v-model="emailData.newEmail"
                placeholder="Nuevo correo"
                required
              />
            </div>
          </div>
          <button class="submit-button" type="submit">Change Email</button>
        </form>
      </div>

      <!-- Password Change Form -->
      <div class="container">
        <form @submit.prevent="submitPasswordChange">
          <h2 class="title">CHANGE PASSWORD</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="password">New Password: </label>
              <input
                type="password"
                id="password"
                v-model="passwordData.newPassword"
                placeholder="Nueva contraseña"
                required
              />
            </div>
            <div>
              <label for="confirmPassword">Repeat Password: </label>
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
  </div>
</template>

<script setup>
import { computed } from "vue";
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

// Split form data into separate refs
const accountData = ref({
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

// Compute if passwords match
const passwordsMatch = computed(() => {
  return passwordData.value.newPassword === passwordData.value.confirmPassword;
});

// Form submission handlers
const submitAccountInfo = async () => {
  try {
    const response = await $fetch("http://localhost:3001/user/" + userId, {
      method: "put",
      body: {
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
    const { error, success } = await store.changeEmail(
      emailData.value.newEmail
    );

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

// Logout handler
const logout = () => {
  store.logout();
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.logout-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  font-size: 15px;
  background-color: #ff6666;
  color: white;
}

.submit-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  font-size: 15px;
  background-color: #000000;
  color: white;
  margin-top: 20px;
}

.title {
  text-align: center;
  font-size: 55px;
  margin-bottom: 40px;
}

.container {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 20px auto;
  max-width: 850px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  font-size: 20px;
}

.input-group {
  flex: 1;
  margin-right: 10px;
}

.error {
  color: red;
  font-size: 0.8rem;
  padding-top: 5px;
}
</style>
