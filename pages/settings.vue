<template>
    <div>

        <h1 class="main-title bold lg">{{ $t("Home.settings") }}</h1>
        <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>

        <div class="container">
            
            <div class="section-btns justify-content-start mb-4">
    
                <router-link class="custom-btn order-btn sm" to="/settings/profile">
                    {{ $t("Auth.view_profile") }}
                </router-link>

                <router-link class="custom-btn order-btn sm" to="/settings/editProfile">
                    {{ $t("Global.edit_profile") }}
                </router-link>

                <router-link class="custom-btn order-btn sm" to="/settings/changeMobileNumber">
                    {{ $t("Global.change_mobile_number") }}
                </router-link>

                <router-link class="custom-btn order-btn sm" to="/settings/changeEmail">
                    {{ $t("Global.change_email") }}
                </router-link>

                <router-link class="custom-btn order-btn sm" to="/settings/changePassword">
                    {{ $t("Global.change_password") }}
                </router-link>

            </div>

            <!-- nested routes -->
            <div class="custom-width text-start p-0 w-100">
                <NuxtPage />
            </div>
        </div>

    </div>
</template>

<script setup>
    definePageMeta({
        name: "Home.settings",
        middleware: ['auth', 'check'],
    });


    // pinia store
    import { useAuthStore } from '~/stores/auth';

    const { response } = responseApi();

    const { successToast, errorToast } = toastMsg();

    const axios = useApi();

    const store = useAuthStore();

    const { deleteAccountHandler } = store;

    const { user } = storeToRefs(store);

    const delete_Successfully = ref(false)

    const deleteAcount = ref(false)

    const deletedAcount = async () => {
        delete_Successfully.value = true;
        deleteAcount.value = false;
        localStorage.clear();

        // Get Returned method From Store
        const res = await deleteAccountHandler();
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);
        navigateTo("/Auth/register");
    }
</script>

