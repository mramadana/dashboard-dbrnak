import { defineNuxtPlugin } from "#app";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      // key: "AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA",
      key: "AIzaSyDY4h8L8OYA4vrhpzUaLHzGzJWI8noOTZg",
      
      libraries: "places", // This is required if you use the Autocomplete plugin
    },

    
  });
});