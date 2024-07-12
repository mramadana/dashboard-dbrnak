
// pinia store
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {

    const store = useAuthStore();
    const { hideElement } = storeToRefs(store);

    if(to.path.includes("Auth")) {
        hideElement.value = false
    } else {
        hideElement.value = true
    }

})