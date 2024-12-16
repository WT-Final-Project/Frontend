<template>
    <div class="participants-list">
      <ul>
        <li class="container-participante" v-for="participant in participants" :key="participant.nombreusuario">
          <div class="participant-info">
            {{ participant.nombreusuario }} - {{ participant.rango }}
          </div>
          <div class="delete-box" v-if="user.rango === 'lider' && participant.nombreusuario != userId">
            <span class="close-icon" @click="eliminar(participant.nombreusuario)">X</span>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useCookieStore } from "~/stores";

  const store = useCookieStore();
  const userId = store.userId;
  const proyId = store.proyId;

  const { data: user } = await useFetch('http://localhost:3001/participan/obtener/'+proyId+'/'+userId)

  const props = defineProps({
    participants: Array
  });

  const eliminar = async (delUser) => {
    console.log(delUser);
      try {
        const result = await useFetch('http://localhost:3001/participan/borrar/'+proyId+'/'+delUser, {
          method: 'delete',
        });

        console.log(result);

        if(result.data._value != null) {
          window.location.reload(true);
        } else {
          alert('An error has occur!');
        }

      } catch (error) {
        console.error(error);
        alert("Error eliminating the participant");
      }
  }
  </script>
  
  <style scoped>
    .container-participante {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: silver; 
    padding: 20px; 
    margin: 30px auto; 
    max-width: 640px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    border: 2px solid; 
    border-color: #000; 
    }

    .participant-info {
    flex-grow: 1;
    font-size: 18px;
    }

    .delete-box {
    width: 35px;  
    height: 35px;
    background-color: #585858; 
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid; 
    border-color: #000;
    border-radius: 10px; 
    transition: background-color 0.3s ease; 
    }
    .delete-box:hover {
    background-color: rgb(128, 125, 125); 
    }

    .close-icon {
    color: #ff0000; 
    font-size: 30px; 
    cursor: pointer;
    }
  </style>
  