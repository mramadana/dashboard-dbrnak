
// pinia store
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {

  if(process.client){

    // Store
    const store = useAuthStore();
    const { isLoggedIn } = storeToRefs(store);
  
    // Toast
    const { errorToast } = toastMsg();
  
    // get i18n t
    const nuxtApp = useNuxtApp();
    const t = nuxtApp.vueApp.config.globalProperties.$t;
  
    // if i route to settings , go profile page directly
    if (to.path === '/settings') {
    
      return '/settings/profile';
      
    };
  
    // if i route to settings , go profile page directly
    if (to.path === '/myorders') {
    
      return '/myorders/new';
      
    };
  
    // if user logged in
  
    if (isLoggedIn.value === false && to.meta.middleware && to.meta.middleware.includes('auth')) {
  
      errorToast(t("validation.requiresAuth"));
  
      return navigateTo("Auth/login");
    }
  }

})