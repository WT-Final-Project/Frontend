<template>
  <div class="about-us">
    <section class="hero">
      <div class="back-button-circle">
        <BackButton to="/pantalla-inicio" />
      </div>

      <div class="hero-content">
        <h1>Accelerating Your Success</h1>
        <p>
          At <strong>Efficient Manager</strong>, we empower businesses to streamline project
          management, delivering exceptional results in record time.
        </p>
        <button @click="learnMore">Learn More</button>
      </div>
    </section>

    <section class="values">
      <h2>Our Vision</h2>
      <p>
        We envision a world where every project achieves its goals efficiently,
        minimizing delays and maximizing impact.
      </p>
      <div class="value-cards">
        <div class="card">
          <img src="/public/efficiency.jpg" alt="Efficiency">
          <h3>Efficiency</h3>
          <p>
            Our tools ensure every step is optimized to save time and resources.
          </p>
        </div>
        <div class="card">
          <img src="/public/innovation.jpg" alt="Innovation">
          <h3>Innovation</h3>
          <p>
            Leveraging the latest technologies, we redefine project management strategies.
          </p>
        </div>
        <div class="card">
          <img src="/public/teamwork.jpg" alt="Teamwork">
          <h3>Teamwork</h3>
          <p>
            We bring teams together, fostering collaboration to achieve excellence.
          </p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Ready to Optimize Your Projects?</h2>
      <p>Join the hundreds of businesses that trust us to transform their project outcomes.</p>
      <button @click="contactUs">Contact Us</button>
    </section>
  </div>
</template>


<script setup>
const learnMore = () => {
  alert("Discover how we revolutionize project management.");
};

const contactUs = () => {
  window.location.href = "/contactUs";
};
</script>

<style scoped>
.about-us {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

.hero {
  position: relative;
  background: url('/public/fondo2.jpg') no-repeat center center/cover;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
}

.back-button-circle {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  cursor: pointer;
  z-index: 999;
}
.back-button-circle:hover {
  background-color: #f0f0f0;
}

.back-button-circle a,
.back-button-circle button {
  color: #333;
  font-size: 1.4rem;
  text-decoration: none;
}


.hero-content {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
}

.hero button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6200;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.hero button:hover {
  background-color: #e55500;
}

.values {
  padding: 30px 20px;
  background-color: #f5f5f5;
  text-align: center;
  margin-top: 0;
}
.value-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 300px;
  overflow: hidden;
  text-align: center;
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card h3 {
  margin: 15px 0;
  font-size: 1.5em;
}
.card p {
  padding: 0 10px 20px;
}


.cta {
  background-color: #333;
  color: #fff;
  padding: 50px 20px;
  text-align: center;
}
.cta button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6200;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.cta button:hover {
  background-color: #e55500;
}
</style>

