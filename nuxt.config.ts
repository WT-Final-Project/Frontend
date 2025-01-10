// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // Stylesheet
  css: ["~/assets/css/main.css"],

  // Modules
  modules: ["@pinia/nuxt"],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  plugins: ["~/plugins/funiones.js"],
});
