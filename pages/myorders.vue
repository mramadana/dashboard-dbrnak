<template>
    <div class="container">
        <h1 class="main-title bold lg">{{ $t("Home.myrequests") }}</h1>
        <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
        
        <div class="section-btns mb-5">

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/new">{{ $t("Global.new") }}</nuxt-link>

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/current">{{ $t("Titles.current") }}</nuxt-link>

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/finished">{{ $t("Titles.finished") }}</nuxt-link>

        </div>
        
        <div class="all_table">
            <NuxtPage />
        </div>
    </div>
  </template>

  <script setup>

    definePageMeta({
        middleware: ['auth', 'check'],
    });
    
    // store
    const store = useAuthStore();
    const { user } = storeToRefs(store);
  </script>
  

  
