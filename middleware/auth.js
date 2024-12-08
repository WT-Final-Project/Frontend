// ~/middleware/auth.js

import { useCookieStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useCookieStore()
    if (!store.userId) {
      navigateTo('/iniciar-sesion')
    }
  });
  