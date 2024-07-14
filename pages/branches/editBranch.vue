<template>
    <div>
        <div class="main-text mb-0">
        <h1 class="main-title">{{ $t('Cars.edit_branch_data') }}</h1>
        <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
    </div>
    </div>
</template>

<script setup>
    definePageMeta({
        name: "Cars.edit_branch_data",
        middleware: ['auth', 'check'],
    });

    // store
    const store = useAuthStore();

    const { token , user } = storeToRefs(store);


    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // success response
    const { response } = responseApi();

    // Axios
    const axios = useApi();
</script>