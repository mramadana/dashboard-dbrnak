
// pinia store
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {

    // Store
    const store = useAuthStore();
    const { isLoggedIn, hideElement } = storeToRefs(store);
  
    // Toast
    const { errorToast } = toastMsg();
  
    // get i18n t
    const nuxtApp = useNuxtApp();
    const t = nuxtApp.vueApp.config.globalProperties.$t;

    // for auth

    



    // if user logged in
  
    if (isLoggedIn.value === false && to.meta.middleware == "auth") {

      errorToast(t("validation.requiresAuth"));

      return navigateTo("/")
    }
})