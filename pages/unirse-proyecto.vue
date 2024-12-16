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
          />
          <button type="submit">Join</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
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
    accessCode: ''
  })
  
  const joinProject = async () => {
    try {
      
      const result = await useFetch('http://localhost:3001/participan/crear', {
        method: 'post',
        body: {
          idProyecto: dataForm.value.accessCode,
          nombreUsuario: userId
        }
      });
      console.log(result);
      if(result.data._value != null){
        store.setProyId(dataForm.value.accessCode);
        navigateTo('/proyecto');
      } else {
        alert("Error joining the project. The project either does not exist or you are already a member.");
      }
    } catch (error) {
      console.error(error);
      alert("Error joining the project");
    }
  };
  </script>
  
  <style scoped>

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
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  </style>
  