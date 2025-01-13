<template>
  <div class="contact-us">
    <section class="hero">
      <BackButton to="/pantalla-inicio" />
      <h1>Contact Us</h1>
      <p>
        We're here to help. Reach out to us and let's build efficient solutions together.
      </p>
    </section>

    <section class="contact-info">
      <div class="info">
        <h2>Get in Touch</h2>
        <p>Email: <a href="mailto:support@efficientmanager.com">support@efficientmanager.com</a></p>
        <p>Phone: <a href="tel:+123456789">+123 456 789</a></p>
        <p>Address: 123 Project Lane, Efficiency City, EC 45678</p>
      </div>
    </section>

    <section class="contact-form">
      <h2>Send Us a Message</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" rows="5" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  alert(`Thank you, ${form.name}. Your message has been sent!`);
  form.name = "";
  form.email = "";
  form.message = "";
};
</script>

<style scoped>
.contact-us {
  font-family: Arial, sans-serif;
  color: #333;
}

.hero {
  background: url("/public/fondo2.jpg") no-repeat center center/cover;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.5em;
  max-width: 600px;
}

.contact-info {
  background-color: #f5f5f5;
  padding: 30px;
  text-align: center;
}

.contact-info h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 1.2em;
  margin: 10px 0;
}

.contact-info a {
  color: #ff6600; /* Naranja */
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-form {
  padding: 30px;
  text-align: center;
}

.contact-form h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333; /* Más contraste */
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333; /* Más contraste */
}

.form-group input,
.form-group textarea {
  width: 80%; /* Reducir el ancho */
  max-width: 500px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #ff6600; /* Cambiar a naranja */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e55500; /* Un naranja más oscuro */
}
</style>
