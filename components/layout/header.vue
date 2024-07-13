<template>
    <div class="defaultLayout auth-padding main-header" :class="{'active': isActive }">
        <header class="header" :class="headerClass">
            <div class="container">
                <div class="inner-header">
                    <div class="navbar-btn"  @click="toggleActive">
                        <i class="fas fa-bars"></i>
                    </div>
                    <div class="d-flex align-items-center">
                        <NuxtLink v-if="isLoggedIn" to="/Notifications" class="notification">
                            <div class="notif-icon">
                                <i class="fas fa-bell"></i>
                                <div class="nof-cont" v-if="notifCount" :data-number="notifCount"></div>
                            </div>
                        </NuxtLink>

                        <div class="profile-hint resp-icon">
                            <img :src="user.image" loading="lazy" class="user-img">
                            <div class="hints">
                                <p class="title" v-if="user.name">{{ user.name }} </p>
                                <p class="desc" v-if="user.type">{{ user.type }}</p>
                            </div>
                        </div>

                        <div class="dropdown drop-lang">
                            <a
                                class="dropdown-toggle hint-lang"
                                href="#"
                                data-bs-toggle="dropdown"
                            >
                                <i class="fas fa-globe icon"></i>
                                <div v-if="htmlLang == ''">
                                    <p>العربية</p>
                                </div>
                                <div v-else>
                                    <p>
                                        {{
                                            htmlLang === "ar"
                                                ? "العربية"
                                                : "english"
                                        }}
                                    </p>
                                </div>
                            </a>
    
                            <ul class="dropdown-menu">
                                <button
                                    class="dropdown-item"
                                    @click="switchLang('ar')"
                                >
                                    العربيه
                                </button>
                                <button
                                    class="dropdown-item"
                                    @click="switchLang('en')"
                                >
                                    English
                                </button>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    </div>
</template>


<script setup>

    import { useAuthStore } from '~/stores/auth';
    
    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();
    
    // store
    const store = useAuthStore();

    const isActive = ref(false);

    const { user, isLoggedIn, token } = storeToRefs(store);


    const { response } = responseApi();

    const { logoutHandler } = store;
    // notifications
    const notifCount = ref(null);
    const logoutDialog = ref(false);

    // config
    let config = {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    };
    const logout = async () => {
        
        // Get Returned Data From Store
        logoutDialog.value = false;
        const res = await logoutHandler();
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);
        localStorage.clear();
    }

    const emit = defineEmits(['toggle-active']);

    const toggleActive = () => {
        isActive.value = !isActive.value;
        emit("toggle-active");
    };

    // get notifications Count
    const getNotificationsCount = async () => {
        await axios.get('count-notifications', config).then(res => {
            if(response(res) == "success") {
                notifCount.value = res.data.data.count;
            }
        }).catch(err => {
            console.error(err);
        });
    };

    // watch token To Get The New User Data
    watch(token, async (newVal) => {
    if (newVal) {
        config = {
            headers: {
                Authorization: `Bearer ${newVal}`
            }
        }

        getNotificationsCount();
    } else {
        notifCount.value = 0;
    }
    });

    watch(notifCount, (newValue, oldValue) => {
      // If notifCount becomes empty or not 0, hide the element
      if (newValue == 0) {
        notifCount.value = null;
      }
    });

    const router = useRouter();

    router.afterEach(() => {
      getNotificationsCount();
      
    });



    onMounted( async () => {
       await getNotificationsCount();
    });
    
</script>

<script>

export default {
    data() {
        return {
            htmlLang: "",
            navBtnActive: false,
            navLinksActive: false,
            navOverlayShow: false,
            // isActive: false,
        };
    },

    methods: {
        // logout() {
        //     localStorage.clear();
        //     this.logoutDialog = false;
        //     this.$router.push("/Auth/login");
        // },


        chageDir(dir) {
            let element = document.querySelector(".html_direction");
            element.setAttribute("lang", dir);
            if (dir === "ar") {
                element.setAttribute("dir", "rtl");
                this.htmlLang = dir;
            }
            if (dir === "en") {
                element.setAttribute("dir", "ltr");
                this.htmlLang = dir;
            }
        },
        switchLang(newLang) {
            const lang = useCookie('lang')
            if (newLang !== localStorage.getItem("locale")) {
                lang.value = newLang
                localStorage.setItem("locale", newLang);
                location.reload();
            }
        },

        handleClick() {
            this.navBtnActive = true;
            this.navLinksActive = true;
            this.navOverlayShow = true;
        },

        handleOverlayClick() {
            this.navBtnActive = false;
            this.navLinksActive = false;
            this.navOverlayShow = false;
        },
    },

    watch: {
    // Watch for changes in the route
    
    $route(to, from) {
      // Handle the event here
      this.handleOverlayClick();
    },
  },

    async mounted() {
        let sessionKey = localStorage.getItem("locale");

        window.sessionKey = localStorage.getItem("locale");
        if (sessionKey) {
            this.chageDir(localStorage.getItem("locale"));
        }
    },

    computed: {
        headerClass() {
            return {
                "auth-padding": this.shouldAddMarginBottom,
            };
        },
        shouldAddMarginBottom() {
            // Check if the current route is not the home page
            return this.$route.path.includes("Auth") === true;
        },
    },
};
</script>

<style lang="scss">
.add-margin {
    margin-bottom: 40px;
}
.defaultLayout {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>
