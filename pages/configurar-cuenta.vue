<template>
  <div>
    <Cabecera />
    <div class="config-container">
      <div class="container">
        <form @submit.prevent="submitForm">
          <h2 class="title">CONFIGUERE ACCOUNT</h2>
          <div class="form-row">
            <div class="input-group">
              <label for="user">User name: {{ userId }}</label>
            </div>
            <div>
              <label for="email">Email: </label>
              <input type="email" id="email" v-model="formData.email" placeholder="Correo" required />
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label for="user">Name: </label>
              <input type="text" id=user v-model="formData.name" placeholder="Nombre Usuario" required />
            </div>
            <div>
              <label for="email">Surname: </label>
              <input type="email" id="email" v-model="formData.lastName" placeholder="Correo" required />
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label for="password">Password: </label>
              <input type="password" id="password" v-model="formData.newPassword" placeholder="Nueva contraseña" required />
            </div>
            <div>
              <label for="confirmPassword">Repeat Password: </label>
              <input type="password" if="confirmPassword" v-model="formData.confirmPassword" placeholder="Repetir contraseña" required />
              <span v-if="!passwordsMatch && formData.confirmPassword" class="error">Passwords dont match</span>
            </div>
          </div>
        </form>
        <div class="button-container">
          <button class="logout-button" @click="logout">Close session</button>
          <button class="submit-button" @click="submitForm" :disabled="!passwordsMatch">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, computed } from 'vue';
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
    email: '',
    newPassword: '',
    name: '',
    lastName:'',
    confirmPassword: ''
  });
  
  const passwordsMatch = computed(() => {
    return formData.value.newPassword === formData.value.confirmPassword;
  });
  
  const submitForm = async () => {
    if (passwordsMatch.value) {
      try {
        const result = await useFetch('http://localhost:3001/usuario/actualizar/'+userId, {
          method: 'post',
          body: {
            correo: formData.value.email,
            nombre: formData.value.name,
            apellidos: formData.value.lastName,
            contrasenya: formData.value.newPassword
          }
        });
        console.log(result);
        if(result.data._value != null){
          navigateTo("/pantalla-inicio");
        } else {
          alert("¡An error has occur!");
        }
      } catch (error){
        console.error(error);
        alert("Error modifying the account");
      }
      
    }
  };
  
  const logout = () => {
    navigateTo("/")
  };
  </script>
  
  <style scoped>

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-top: 40px;
  text-align: center; 
}

.logout-button,
.submit-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px; 
  margin: 0 auto; 
  margin-top: 20px;
  font-size: 15px;
}

.logout-button {
  background-color: #ff6666; 
  color: white;
}

.submit-button {
  background-color: #000000; 
  color: white;
}

.title {
    text-align: center;
    font-size: 55px;
    margin-bottom: 40px;
  }
  .container {
    background-color: #f5f5f5; 
    padding: 20px; 
    margin: 150px auto; 
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
  