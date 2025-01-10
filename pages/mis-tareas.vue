<template>
    <div>
      <CabeceraPr />
      <div class="container">
        <MyTaskList :tasks="tasks" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCookieStore } from '~/stores';

  definePageMeta({
    middleware: ["auth"],
  });

  onMounted(() => {
  store.setTareaId(undefined);
});
  
  const store = useCookieStore();
  const userId = store.userId
  const proyId = store.proyId
  
  const { data: tasks } = await useFetch('http://localhost:3001/uncompleted/'+proyId+'/'+userId);
  </script>
  
  <style scoped>
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

.project-details {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  font-family: inherit;
}

  </style>
  