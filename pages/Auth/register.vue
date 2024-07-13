<template>
    <div>
        
        <GlobalAuthBanner>
    
            <div class="container">
                <div class="layout-form custom-width">
                    <img src="@/assets/images/black_logo.png" alt="login-logo" class="login-logo" loading="lazy">
                    <h1 class="main-title bold lg mb-4">{{ $t("Auth.create_account") }}</h1>
                    <form @submit.prevent="signUp" ref="signUpForm">
                        <div class="row">
                            <div class="col-12 col-md-10 mr-auto">
    
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.username') }}
                                    </label>
                                    <div class="main_input">
                                        <i class="fas fa-user sm-icon"></i>
                                        <input type="text" class="custum-input-icon validInputs" valid="name" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
                                    </div>
                                </div>
        
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.mobile_number') }}
                                    </label>
                                    <div class="with_cun_select">
                                        <div class="main_input">
                                            <i class="fas fa-mobile-alt sm-icon"></i>
                                            <input type="number" class="custum-input-icon validInputs" valid="phone" name="phone" v-model="phone" :placeholder="$t('Auth.please_mobile_number')">
                                        </div>
                                        <div class="card d-flex justify-content-center dropdown_card">
                                        <Dropdown
                                        v-model="selectedCountry"
                                        :options="countries"
                                        optionLabel="name"
                                        >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex-group-me">
                                            <img
                                                :alt="slotProps.value.label"
                                                :src="slotProps.value.image"
                                                :class="`mr-2 flag flag-${slotProps.value.key}`"
                                                style="width: 24px"
                                            />
                                            <div>{{ slotProps.value.key }}</div>
                                            </div>
                                            <span v-else>
                                            {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex-group-me">
                                            <img
                                                :alt="slotProps.option.label"
                                                :src="slotProps.option.image"
                                                :class="`mr-2 flag flag-${slotProps.option.key}`"
                                                style="width: 24px"
                                            />
                                            <div>{{ slotProps.option.key }}</div>
                                            </div>
                                        </template>
                                        </Dropdown>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.select_city') }}
                                    </label>
                                    <div class="flex justify-content-center dropdown_card main_input special-custom">
                                        <i class="fa-solid fa-city sm-icon"></i>
                                        <Dropdown v-model="city" :options="cities" optionLabel="name" :placeholder="$t('Auth.select_city')" class="w-full md:w-14rem custum-dropdown" />
                                    </div>
                                </div>
    
                                <div class="form-group" @click="openmodal">
                                    <label class="label">
                                        {{ $t('Auth.location') }}
                                    </label>
                                    <div class="main_input pointer">
                                        <i class="fas fa-user sm-icon"></i>
                                        <input type="text" class="custum-input-icon pointer" readonly  v-model="mainAddress"  placeholder="ادخل الموقع">
                                    </div>
                                </div>
    
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.email') }}
                                    </label>
                                    <div class="main_input">
                                        <i class="fas fa-envelope sm-icon"></i>
                                        <input type="email" class="custum-input-icon validInputs" valid="email" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                                    </div>
                                </div>
        
                                <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.password') }}
                                        </label>
                                        <div class="main_input with_icon">
                                            <i class="fas fa-lock sm-icon"></i>
                                            <input :type="inputType('definitelyNewPassword')" name="password" v-model="password" class="custum-input-icon validInputs" valid="password" :placeholder=" $t('Auth.please_enter_password') ">
                                            <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                            <i class="far fa-eye icon"></i>
                                            </button>
                                        </div>
                                </div>

                                <div class="parent-imgs">

                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png"
                                                loading="lazy"
                                                alt="default-img"
                                                :class="{'hidden-default': uploadedImage.length !== 0,'default-class': true,}"/>
                                            <span :class="{'hidden-default': uploadedImage.length !== 0}">{{ $t("Global.attach_photo") }}</span>
                                            <GlobalImgUploader
                                                acceptedFiles="image/*"
                                                name="commercial_image"
                                                v-model="commercial_image"
                                                @uploaded-images-updated="updateUploadedImages_1"
                                                class="validInputs"
                                            />
                                        </div>
                                    </div>
    
                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png"
                                                loading="lazy"
                                                alt="default-img"
                                                :class="{'hidden-default': uploadedImage_2.length !== 0,'default-class': true,}"/>
                                            <span :class="{'hidden-default': uploadedImage_2.length !== 0}">{{ $t("Global.attach_photo") }}</span>
                                            <GlobalImgUploader
                                                acceptedFiles="application/*"
                                                name="file"
                                                v-model="file"
                                                @uploaded-images-updated="updateUploadedImages_2"
                                                class="validInputs"
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png"
                                                loading="lazy"
                                                alt="default-img"
                                                :class="{'hidden-default': uploadedImage_3.length !== 0,'default-class': true,}"/>
                                            <span :class="{'hidden-default': uploadedImage_3.length !== 0}">{{ $t("Global.attach_photo") }}</span>
                                            <GlobalImgUploader
                                                acceptedFiles="image/*"
                                                name="logo"
                                                v-model="logo"
                                                @uploaded-images-updated="updateUploadedImages_3"
                                                class="validInputs"
                                            />
                                        </div>
                                    </div>
                                </div>

        
                                <div class="radios form-group check-inner mb-4">
                                    <div class="d-flex gap-3">
                                        <label class="custom-radio custom-check">
                                            <input type="checkbox" name="terms" v-model="terms" class="d-none">
                                            <span class="mark">
                                                <i class="fas fa-check icon"></i>
                                            </span>
                                            <p class="check-text hint">
                                            {{ $t("Auth.agree_to") }}
                                            <NuxtLink to="/terms" target="_blank" class="anchor">
                                                {{ $t("Auth.terms_and_conditions") }}
                                            </NuxtLink >
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                <div class="radios form-group check-inner mb-4">
                                    <div class="d-flex gap-3">
                                        <label class="custom-radio custom-check">
                                            <input type="checkbox" name="elctronic_file" v-model="elctronic_file" class="d-none">
                                            <span class="mark">
                                                <i class="fas fa-check icon"></i>
                                            </span>
                                            <p class="check-text hint">
                                            {{ $t("Auth.agree_to") }}
                                            <NuxtLink to="/terms" target="_blank" class="anchor">
                                                {{ $t("Auth.terms_and_conditions") }}
                                            </NuxtLink >
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                
                                <button type="submit" class="custom-btn w-100 mr-auto" :disabled="loading">
                                    {{ $t('Auth.confirmation') }}
                                    <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                            aria-hidden="true"></span>
                                </button>
        
                                <div class="new-sign mt-4">
                                    {{ $t('Auth.already_have_account') }}
                                    <nuxt-link to="/Auth/login" >{{ $t('Auth.login') }}</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    
            
        </GlobalAuthBanner>
        
        <!-- global google map component -->
        <GlobalGoogleMap
            v-model:visible="visible"
            @closeModal="closeModal"
            @updateAddress="handleUpdateAddress"
            @handleClose="handleClose"
            :show_inputs="show_inputs"
            :lat="location.lat"
            :lng="location.lng"
            :current_location="currentLocation"
            :isDraggable="true"
            :closeModal_btn="closeModal_btn"
            :title= "$t('Auth.location')"
        />
    </div>

</template>

<script setup>

    definePageMeta({
        name: "Auth.create_account",
        middleware: 'check'
    });

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ useScope: 'global' });

    // success response
    const { response } = responseApi();

    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();
    const phone = ref(null);

    // Store
    const store = useAuthStore();
    const { signUpHandler } = store;

    // google map
    const { lat, lng, address} = storeToRefs(store);

    const mainAddress = ref("");

    
    const closeModal_btn = ref(true);
    
    const show_inputs = ref(false);
    
    const visible = ref(false);
    const currentLocation = ref(false);
    
    const signUpForm = ref(null);
    const selectedCountry = ref({})
    const countries = ref([]);
    
    const errors = ref([]);
    const loading = ref(false);
    const terms = ref(false);
    const elctronic_file = ref(false);
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const passwordVisible = ref({
        definitelyNewPassword: false,
    });
    
    const city = ref(null);
    const cities = ref([]);
    
    const uploadedImage = ref([]);
    const uploadedImage_2 = ref([]);
    const uploadedImage_3 = ref([]);
    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };
    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };

    const updateUploadedImages_3 = (images) => {
        uploadedImage_3.value = images;
    }

    const closeModal = () => {
        visible.value = false
        mainAddress.value = address.value
    }

    const handleClose = () => {
        visible.value = false
    }

    const handleUpdateAddress = (newAddress) => {
        location.value = newAddress;
        console.log(location.value, "location.value");
    };

    const openmodal = () => {
        visible.value = true;
        setTimeout(() => {
            currentLocation.value = true;
        }, 100);
    };


    const location = ref({
        lat: lat.value,
        lng: lng.value
    });

    const togglePasswordVisibility = (input) => {
        passwordVisible.value[input] = !passwordVisible.value[input];
    };

    const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    }

    // Get All countries
    const getCountries = async () => {
        await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == 1) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
    };

    // get cities
    const getCities = async () => {
        await axios.get('cities').then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
        }
    }).catch(err => console.log(err));
    };

    // Validation Function
    function validate() {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }

        if (!terms.value) {
            errors.value.push(t(`validation.conditions`));
        }

        if (!elctronic_file.value) {
            errors.value.push(t(`validation.conditions8888546`));
        }

        if(!city.value) {
            errors.value.push(t(`validation.city`));
        }
    };

    // signUp Function
    const signUp = async () => {
        const fd = new FormData(signUpForm.value);
        fd.append('country_code', selectedCountry.value.key);

        validate();
        
        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {
            loading.value = true;

            // Get Returned Data From Store
            const res = await signUpHandler(fd);
            res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

            loading.value = false;
        }
    };

    const loadGoogleMaps = () => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google);
        } else {
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(window.google));
                existingScript.addEventListener('error', () => reject(new Error('Error loading Google Maps API')));
                if (window.google && window.google.maps) {
                    resolve(window.google);
                }
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDY4h8L8OYA4vrhpzUaLHzGzJWI8noOTZg&libraries=places&callback=initMap&loading=async`;
                script.async = true;
                script.defer = true;
                window.initMap = () => resolve(window.google);
                script.onerror = () => reject(new Error('Error loading Google Maps API'));
                document.head.appendChild(script);
            }
        }
    });
};

    onMounted(async () => {
        await getCountries();
        await getCities();

        loadGoogleMaps().then((google) => {
        console.log('Google Maps API loaded:', google);
        
        }).catch((error) => {
            console.error('Error loading Google Maps API:', error);
        });
    });

</script>