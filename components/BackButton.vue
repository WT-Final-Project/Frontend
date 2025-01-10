<template>
    <nuxt-link :to="to" class="back-button">
      <img src="/back-button-image.svg" alt="Back" />
    </nuxt-link>
  </template>
  
  <script setup>

  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  
  .back-button {
    max-height: 50px; 
    width: auto; 
  }
  </style>
  