<template>
    <div>

        <div class="sidebar" :class="{ 'active': isActive }">

            <!-- ***** close icon to close sidebar ***** -->
            <div class="colse-icon" @click="$emit('toggle-active')"><i class="fas fa-times"></i></div>

            <!-- ***** sidebar logo ***** -->
            <div class="sidebar-logo">
                <nuxt-link to="/" class="logo">
                    <img src="@/assets/images/black_logo.png" alt="">
                </nuxt-link>
            </div>
            
            <div ref="linksList" class="links">

                <nuxt-link class="link" to="Auth/login" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/index.png" alt="hint-img">
                    </div>
                    {{ $t('Home.home') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/cars.png" alt="hint-img">
                    </div>
                    {{ $t('Home.my_car') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/branch.png" alt="hint-img">
                    </div>
                    {{ $t('Home.branches') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/user.png" alt="hint-img">
                    </div>
                    {{ $t('Home.branch_managers') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/later.png" alt="hint-img">
                    </div>
                    {{ $t('Home.electronic_contract') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/setting.png" alt="hint-img">
                    </div>
                    {{ $t('Home.settings') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/privacy.png" alt="hint-img">
                    </div>
                    {{ $t('Home.privacy_policies') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/later.png" alt="hint-img">
                    </div>
                    {{ $t('Home.terms_and_conditions') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/users.png" alt="hint-img">
                    </div>
                    {{ $t('Home.who_are_we') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/contact.png" alt="hint-img">
                    </div>
                    {{ $t('Home.connect_us') }}
                </nuxt-link>

                <nuxt-link class="link" to="" @click="handleResize">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/logout.png" alt="hint-img">
                    </div>
                    {{ $t('Home.logout') }}
                </nuxt-link>
            </div>

        </div>

        <div class="overlay-sidebar" @click="$emit('toggle-active')" :class="{ 'show': isActive }"></div>
    </div>
</template>

<script setup>

const props = defineProps({
  isActive: Boolean,
});

const emit = defineEmits(['toggle-active']);

const toggleActive = () => {
  emit('toggle-active');
};


const handleResize = () => {
    if (window.innerWidth < 768) {
        emit('toggle-active');
    }
};


const router = useRouter();



router.afterEach((to, from) => {
        console.log('Route changed:', from, '->', to);
        if (window.innerWidth <= 1250) {
          console.log('Emitting toggle-active event');
          emit('toggle-active');
          handleResize();
        }
});





</script>

