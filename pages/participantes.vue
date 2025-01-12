<template>
  <CabeceraPr />
  <div class="container">
    <h2 class="title">PARTICIPANTS</h2>

    <ParticipantList :participants="participants" />
  </div>
</template>

<script setup>
import { useCookieStore } from "~/stores";
import { ref, onMounted } from "vue";

const store = useCookieStore();
const proyId = store.proyId;

const { data: participants } = await $fetch(
  "http://localhost:3001/participate/all/" + proyId
);

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  store.setTareaId(undefined);
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-bottom: 50px;
  color: #000;
  text-transform: uppercase;
  font-family: "Georgia", serif;
}

.container {
  background-color: #fff;
  padding: 40px;
  margin: 50px auto;
  max-width: 750px;
  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: "Georgia", serif;
}

.container:hover {
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.6);
  transform: scale(1.01);
}

.container-participante {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 30px auto;
  max-width: 640px;

  background-color: #fff;
  border: 4px solid silver;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
  transition: box-shadow 0.3s, transform 0.3s;
  font-family: inherit;
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
  width: 35px;
  height: 35px;
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
  cursor: pointer;
}
</style>
