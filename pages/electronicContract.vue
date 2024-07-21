<template>
    <div>
        
        <div class="container">
            <h1 class="main-title bold lg">{{ $t("Home.electronic_contract") }}</h1>

            <div class="layout-form custom-width w-100">

                <img src="@/assets/images/black_logo.png" alt="logo" class="login_logo sm mb-4" loading="lazy">

                <div class="main-title normal mt-3 about_disc" v-if="!loading" v-html="terms" >

                </div>

                <div v-if="loading">
                    <div v-for="i in 8" :key="i">
                        <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                    </div>
                </div>
                
                <div class="section-btns mt-4 justify-content-end" v-if="!isLoggedIn && !loading">
                    <nuxt-link to="/Auth/login" class="custom-btn sm">{{ $t('Auth.confirmation') }}</nuxt-link>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>

definePageMeta({
    name: "Home.electronic_contract",
    middleware: ['check']
});


const loading = ref(true);

const { response } = responseApi();

const axios = useApi();

// pinia store
const store = useAuthStore();

// token
const { token , isLoggedIn} = storeToRefs(store);


const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

const terms = ref('');

const getContract = async () => {
    loading.value = true;
    await axios.get(`contract`).then(res => {
    if (response(res) == "success") {
        terms.value = res.data.data;
    }
    loading.value = false;
    }).catch(err => {
        console.error(err);
    });
};

onMounted(() => {
    getContract();
})

</script>

<style lang="scss">
    .about_disc {
        * {
            &:first-child {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>
