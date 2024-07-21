<template>
    <div>
        <div class="container">
            <h1 class="main-title bold lg mb-4">{{ $t("Global.privacy_policy") }}</h1>
            <div class="layout-form custom-width w-100">

                <img src="@/assets/images/black_logo.png" alt="logo" class="login_logo mb-4" loading="lazy">

                <div v-if="!loading" class="main-title normal mt-3 about_disc" v-html="aboutDisc">
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
    name: "Global.privacy_policy",
});

const loading = ref(true);

const { response } = responseApi();

const axios = useApi();

// pinia store
const store = useAuthStore();


// token
const { token } = storeToRefs(store);

const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};


const aboutDisc = ref('');

// methods 

// getAbout
const getAbout = async () => {
    loading.value = true;
    await axios.get(`provider/privacy`, config).then(res => {
    if (response(res) == "success") {
        aboutDisc.value = res.data.data;
        console.log(res.data.data, "about");
    }
    loading.value = false;
    }).catch(err => {
        console.error(err);
    });
};

onMounted( async () => {
   await getAbout();
})
</script>

<style lang="scss" scoped>
    .login_logo {
        @media (max-width: 768px) {
            max-width: 150px;
        }
    }
</style>

