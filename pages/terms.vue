<template>
    <div>
        
        <div class="container">
            <h1 class="main-title bold lg">{{ $t("Global.terms_and_conditions") }}</h1>
            <div class="layout-form custom-width w-100">

                <img src="@/assets/images/black_logo.png" alt="logo" class="login_logo sm mb-4" loading="lazy">

                <div class="main-title normal mt-3 about_disc" v-if="!loading" v-html="terms" >

                </div>

                <div v-if="loading">
                    <div v-for="i in 8" :key="i">
                        <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>

definePageMeta({
    name: "Global.terms_and_conditions",
    middleware: ['auth', 'check'],
});


const loading = ref(true);

const { response } = responseApi();

const axios = useApi();

// pinia store
const store = useAuthStore();

// token
const { token} = storeToRefs(store);


const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

const terms = ref('');

const getTerms = async () => {
    loading.value = true;
    await axios.get(`provider/terms`, config).then(res => {
    if (response(res) == "success") {
        terms.value = res.data.data;
    }
    loading.value = false;
    }).catch(err => {
        console.error(err);
    });
};

onMounted(() => {
    getTerms();
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
