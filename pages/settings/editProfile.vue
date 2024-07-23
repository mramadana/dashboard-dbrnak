<template>
    <div>
        <h1 class="main-title bold head-title mb-5">{{ $t("Home.edit_profile") }}</h1>
        <div class="container">
            <form @submit.prevent="editProfile" ref="editProfileform">
                <div class="row pb-4">
                    <div class="col-12 col-md-6">

                        <div class="form-group text-center">
                            <div class="input_auth">
                                <div class="edit-label">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <img src="@/assets/images/upload_layout.png" loading="lazy" :class="{'hidden-default' : uploadedImage_4.length > 0, 'default-class': true}">
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages_4" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.username') }}
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
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

                        <div class="form-group" @click="openMapModal">
                            <label class="label">
                                {{ $t('Auth.location') }}
                            </label>
                            <div class="main_input pointer">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon pointer validInputs" name="location_required" readonly  v-model="mainAddress"  :placeholder="$t('Auth.enter_loaction')">
                            </div>
                        </div>

                        <div class="parent-imgs">

                            <div class="form-group">
                                <div class="input_auth without-edit">
                                    <img
                                        src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                        :class="{'hidden-default': uploadedImage.length !== 0,'default-class': true,}"/>
                                    <span :class="{'hidden-default': uploadedImage.length !== 0}">{{ $t("Auth.attach_commercial_register") }}</span>
                                    <GlobalImgUploader
                                        acceptedFiles="image/*"
                                        name="commercial_image"
                                        v-model="commercial_image"
                                        @uploaded-images-updated="updateUploadedImages_1"
                                        :newImages="commercial_image"
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
                                    <span :class="{'hidden-default': uploadedImage_2.length !== 0}">{{ $t("Auth.attach_file") }}</span>
                                    <GlobalImgUploader
                                        acceptedFiles="application/*"
                                        name="file"
                                        v-model="file"
                                        @uploaded-images-updated="updateUploadedImages_2"
                                        :newImages="file"
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
                                    <span :class="{'hidden-default': uploadedImage_3.length !== 0}">{{ $t("Auth.add_logo") }}</span>
                                    <GlobalImgUploader
                                        acceptedFiles="image/*"
                                        name="logo"
                                        v-model="logo"
                                        @uploaded-images-updated="updateUploadedImages_3"
                                        :newImages="logo"
                                    />
                                </div>
                            </div>

                            <button type="submit" class="custom-btn md mr-auto">
                                {{ $t('Global.Saving_changes') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                            </button>

                        </div>
                        
                    </div>
                </div>
            </form>
        </div>

        <GlobalGoogleMap
            v-model:visible="visible"
            :lat="lat"
            :lng="lng"
            @handleClose="handleClose"
            :closeModal_btn="closeModal_btn"
            @closeModal="closeModal"
            :submit_location="submit_location"
            :isDraggable="true"
            :title= "$t('Auth.location')"
            @updateAddress="handleUpdateAddress"
            :mapAddress="mapAddress"
            :current_location_button="true"
        />

        <!-- if no lat and lng -->
        <Dialog v-model:visible="emptyLocation" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <h1 class="main-title bold">
                    {{ $t("order.location_determined") }}
                </h1>
            </div>
        </Dialog>

        <Dialog v-model:visible="successfullyChange" modal class="custum_dialog_width without-close" :draggable="false" >
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h3 class="main-title bold mb-4">{{ $t('Global.Saving_changes_success') }}</h3>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
    definePageMeta({
        name: "Home.edit_profile",
        middleware: ['auth', 'check'],

    });

    const mapAddress = ref('');

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    // pinia store
    import { useAuthStore } from '~/stores/auth';

    const city_id = ref(null);

    const closeModal = () => {
        visible.value = false
        mainAddress.value = location.value.address
    }

// Store
const store = useAuthStore();

// success response
const { response } = responseApi();

const { profileHandler } = store;

// // Toast
const { successToast, errorToast } = toastMsg();

// // Axios
const axios = useApi();


/******************* Data *******************/

const image = ref('');
const name = ref('');
const city = ref(null);
const cities = ref([]);

const commercial_image = ref([]);
const file = ref([]);
const logo = ref([]);

const emptyLocation = ref(false);

// google map customize

const visible = ref(false);
const closeModal_btn = ref(true);
const lat = ref(null);
const lng = ref(null);

// image upload

const uploadedImage = ref([]);
const uploadedImage_2 = ref([]);
const uploadedImage_3 = ref([]);
const uploadedImage_4 = ref([]);

const openMapModal = () => {
    if(lat.value == 0 || lng.value == 0) {
        emptyLocation.value = true;
    } else {

        visible.value = true;
    }
};
const handleClose = () => {
    visible.value = false;
};
const mainAddress = ref('');

const successfullyChange = ref(false);
const errors = ref([]);

const loading = ref(false);

const { token } = storeToRefs(store);

const editProfileform = ref(null);

const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

const handleUpdateAddress = (newAddress) => {
        location.value = newAddress;
        console.log(location.value, "location.value");
    };

    // upload imgs

    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };
    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };

    const updateUploadedImages_3 = (images) => {
        uploadedImage_3.value = images;
    }

    const updateUploadedImages_4 = (images) => {
        uploadedImage_4.value = images;
    }

        // Validation Function
    function validate() {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }
    };

    const getCities = async () => {
        await axios.get('cities').then(res => {
            if (response(res) == "success") {
                cities.value = res.data.data;
                for (let i = 0; i < cities.value.length; i++) {
                if (cities.value[i].id == city_id.value) {
                    city.value = cities.value[i];
                }
            }
            }
        }).catch(err => console.log(err));
    };

    //  get profile data
    const profile = async () => {

        await axios.get('provider/show-profile', config).then(res => {
            name.value = res.data.data.name;
            image.value = res.data.data.image;
            mainAddress.value = res.data.data.map_desc;
            lat.value = +res.data.data.lat;
            lng.value = +res.data.data.lng;
            logo.value = res.data.data.logo;
            mapAddress.value = res.data.data.map_desc;
            commercial_image.value = res.data.data.commercial_image;
            city_id.value = res.data.data.city_id;
            file.value = res.data.data.file
        }).catch(err => console.log(err));
    }

    const editProfile = async () => {
        loading.value = true;
        const fd = new FormData(editProfileform.value);
        if(city.value) {
            fd.append('city_id', city.value.id);
        }
        if(location.value) {
            fd.append('lat', location.value.lat);
            fd.append('lng', location.value.lng);
        } else {
            fd.append('lat', lat.value);
            fd.append('lng', lng.value);
        }
        fd.append('map_desc', mainAddress.value);
        validate();

        // Get Returned Data From Store
        const res = await profileHandler(fd);

        if (res.status == "success") {
            successToast(res.msg);
            successfullyChange.value = true;
            setTimeout(() => {
                successfullyChange.value = false
                navigateTo("/settings");
            }, 1000);
        } else {
            errorToast(res.msg);
        }

        loading.value = false;

    }

    onMounted(async () => {
       await profile();
       await getCities();
    })
    

</script>

