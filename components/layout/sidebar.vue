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
            
            <div ref="linksList" class="links" @scroll="saveScrollPosition">

                <nuxt-link class="link" to="/" :class="{ 'active': isActiveLink('/') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/index.png" alt="hint-img">
                    </div>
                    {{ $t('Home.home') }}
                </nuxt-link>

                <nuxt-link class="link" to="/Mycars" :class="{ 'active': isActiveLink('/Mycars') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/cars.png" alt="hint-img">
                    </div>
                    {{ $t('Home.my_car') }}
                </nuxt-link>

                <nuxt-link class="link" to="/branches" :class="{ 'active': isActiveLink('/branches') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/branch.png" alt="hint-img">
                    </div>
                    {{ $t('Home.branches') }}
                </nuxt-link>

                <!-- <nuxt-link class="link" to="/employees" :class="{ 'active': isActiveLink('/employees') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/branch.png" alt="hint-img">
                    </div>
                    {{ $t('Home.employees') }}
                </nuxt-link> -->

                <nuxt-link class="link" to="/branchManagers" :class="{ 'active': isActiveLink('/branchManagers') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/user.png" alt="hint-img">
                    </div>
                    {{ $t('Home.branch_managers') }}
                </nuxt-link>

                <nuxt-link class="link" to="">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/later.png" alt="hint-img">
                    </div>
                    {{ $t('Home.electronic_contract') }}
                </nuxt-link>

                <nuxt-link class="link" to="/settings" :class="{ 'active': isActiveLink('/settings/profile') }">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/setting.png" alt="hint-img">
                    </div>
                    {{ $t('Home.settings') }}
                </nuxt-link>

                <nuxt-link class="link" to="">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/privacy.png" alt="hint-img">
                    </div>
                    {{ $t('Home.privacy_policies') }}
                </nuxt-link>

                <nuxt-link class="link" to="">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/later.png" alt="hint-img">
                    </div>
                    {{ $t('Home.terms_and_conditions') }}
                </nuxt-link>

                <nuxt-link class="link" to="">
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/users.png" alt="hint-img">
                    </div>
                    {{ $t('Home.who_are_we') }}
                </nuxt-link>

                <nuxt-link class="link" to="/connectUs" :class="{ 'active': isActiveLink('/connectUs') }"
                >
                    <div class="hint-img">
                        <img src="@/assets/images/sidebar/contact.png" alt="hint-img">
                    </div>
                    {{ $t('Home.connect_us') }}
                </nuxt-link>

                <nuxt-link class="link" to="">
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

const scrollPosition = ref(0);
const linksList = ref(null);
const router = useRouter();
const route = useRoute();

const isActiveLink = (path) => {
  if (path === '/') {
    return route.path === path;
  }
  return route.path.startsWith(path);
};

const emit = defineEmits(['toggle-active']);


// Handle link click, store clicked link path, and scroll to middle
const handleLinkClick = (event) => {
  const target = event.target.closest('.link');
  const path = target.getAttribute('to');
  localStorage.setItem('clickedLinkPath', path);

  if (window.innerWidth < 768) {
    emit('toggle-active');
  }
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
};


// Scroll to the middle of the previously clicked link on mount
const scrollToClickedLink = () => {
  const clickedLinkPath = localStorage.getItem('clickedLinkPath');
  if (clickedLinkPath) {
    const target = linksList.value.querySelector(`.link[to='${clickedLinkPath}']`);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
};

const saveScrollPosition = () => {
  if (linksList.value) {
    scrollPosition.value = linksList.value.scrollTop;
    localStorage.setItem('sidebarScrollPosition', scrollPosition.value);
  }
};

const restoreScrollPosition = () => {
  const savedPosition = localStorage.getItem('sidebarScrollPosition');
  if (linksList.value && savedPosition !== null) {
    smoothScrollTo(savedPosition);
  }
};

// Smooth scroll function
const smoothScrollTo = (position) => {
  if (linksList.value) {
    linksList.value.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }
};

const handleRouteChange = () => {
  console.log('Route changed:', router);
  if (window.innerWidth <= 1250) {
    emit('toggle-active');
    handleResize();
  }
};

watch(router, handleRouteChange);

router.afterEach((to, from) => {
        if (window.innerWidth <= 1250) {
          emit('toggle-active');
          handleResize();
        }
});

onMounted(() => {
  restoreScrollPosition();
  scrollToClickedLink();
});

</script>

<!-- <style lang="scss" scoped>

</style> -->

