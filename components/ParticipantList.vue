<template>
  <div class="participants-list">
    <ul>
      <li
        class="container-participante"
        v-for="participant in participants"
        :key="participant.username"
      >
        <div class="participant-info">
          {{ participant.username }} - {{ participant.userrole }}
        </div>
        <div
          class="delete-box"
          v-if="user.rank === 'lider' && participant.username != userId"
        >
          <span class="close-icon" @click="eliminar(participant.username)"
            >X</span
          >
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

const { data: user } = await useFetch("http://localhost:3001/user/" + userId);

const props = defineProps({
  participants: Array,
});

const eliminar = async (delUser) => {
  console.log(delUser);
  try {
    const result = await $fetch(
      "http://localhost:3001/participate/" + proyId + "/" + userId,
      {
        method: "delete",
      }
    );

    console.log(result);

    if (result.data._value != null) {
      window.location.reload(true);
    } else {
      alert("An error has occur!");
    }
  } catch (error) {
    console.error(error);
    alert("Error eliminating the participant");
  }
};
</script>

<style scoped>
.container-participante {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  margin: 30px auto;
  max-width: 640px;
  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}

.container-participante:hover {
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}

.participant-info {
  flex-grow: 1;
  font-size: 18px;
  color: #333;
}

.delete-box {
  width: 40px;
  height: 40px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 10px;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
}

.delete-box:hover {
  background-color: #555;
  transform: scale(1.05);
}

.close-icon {
  color: #ff0000;
  font-size: 30px;
}
</style>
