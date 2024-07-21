<template>
    <div>

        <div class="main-text mb-0">
            <h1 class="main-title">{{ $t('employees.branch_manager_data') }}</h1>
            <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
        </div>

        <div class="custom-width text-start w-100">
            <form @submit.prevent="submitData" ref="editmanagerform">
                <div class="inner p-3">
                    <div class="row">
    
                        <div class="col-12 text-center">
                            <div class="form-group">
                                <div class="input_auth without-edit parent-remove">
                                    <img
                                        src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                        :class="{'hidden-default': uploadedImage_2.length !== 0,'default-class': true,}"/>
                                    <GlobalImgUploader
                                        acceptedFiles="image/*"
                                        name="image"
                                        @uploaded-images-updated="updateUploadedImages_2"
                                        :newImages="image"
                                    />
                                </div>
                            </div>
                        </div>
    
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Table.username') }}
                                </label>
                                <div class="main_input">
                                    <i class="fas fa-user sm-icon"></i>
                                    <input type="text" name="name" v-model="name" class="custum-input-icon validInputs" :placeholder="$t('Table.username')">
                                </div>
                            </div>
                        </div>
    
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.mobile_number') }}
                                </label>
                                <div class="with_cun_select">
                                    <div class="main_input">
                                        <i class="fas fa-mobile-alt sm-icon"></i>
                                        <input type="number" class="custum-input-icon validInputs" name="phone" v-model="phone" @input="checkPhone" :placeholder="$t('Auth.please_mobile_number')">
                                    </div>
                                    <div class="card d-flex justify-content-center dropdown_card">
                                        <Dropdown
                                        v-model="selectedCountry"
                                        :options="countries"
                                        filter
                                        optionLabel="name"
                                        :emptyMessage="$t('Home.no_available_options')"
                                        :emptyFilterMessage="$t('Home.emptyFilterMessage')"
                                        >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex-group-me">
                                            <img
                                                loading="lazy"
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
                                                loading="lazy"
                                                :alt="slotProps.option.label"
                                                :src="slotProps.option.image"
                                                :class="`mr-2 flag flag-${slotProps.option.key}`"
                                                style="width: 24px"
                                            />
                                            <div>{{ slotProps.option.name }}</div>
                                            <div>{{ slotProps.option.key }}</div>
                                            </div>
                                        </template>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.email') }}
                                </label>
                                <div class="main_input">
                                    <i class="fas fa-envelope sm-icon"></i>
                                    <input type="email" class="custum-input-icon validInputs" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                                </div>
                            </div>
                        </div>
    

                        <div class="col-12">
                            <div class="custom-width text-start w-100 p-0" v-if="abilitiesList">
                                <h1 class="main-title bold head-title">{{ $t("Branches.abilities") }}</h1>
                                <div class="inner pt-5 p-3">
                                    <div class="row">
                                        <div class="col-12 col-md-4" v-for="(ability) in abilitiesList" :key="ability.id">
                                            <div class="radios form-group">
                                                <div class="d-flex gap-3">
                                                    <label class="custom-radio custom-check">
                                                        <input type="checkbox" name="opinion" value="true" v-model="abilitiesCheckededit[ability.id]" 
                                                        class="d-none"
                                                        disabled
                                                        />
                                                        <span class="mark">
                                                        <i class="fas fa-check icon"></i>
                                                        </span>
                                                        <p class="hint">{{ ability.name }}</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>
    
            </form>
        </div>
    </div>
</template>


<script setup>

    definePageMeta({
        name: "employees.branch_manager_data",
        middleware: ['auth', 'check'],
    });
    const { id } = useRoute().params

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    // Axios
    const axios = useApi();

    // success response
    const { response } = responseApi();

    const store = useAuthStore();

    const { token, user } = storeToRefs(store);

    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // variables
    const abilitiesCheckededit = ref({});

    // countries
    const selectedCountry = ref({})
    const countries = ref([]);

    const uploadedImage_2 = ref([]);

    const passwordVisible = ref({
        definitelyNewPassword: false,
    });

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const phone = ref('');
    const image = ref('');
    const errors = ref([]);
    const loading = ref(false);

    const abilitiesList = ref([]);
    const receivedEditData = ref([]);

    // methods

    // Initialize abilitiesChecked with false for each ability
    abilitiesList.value.forEach((ability) => {
        abilitiesCheckededit.value[ability.id] = false;
    });

    const initializeAbilitiesChecked = (abilities) => {
        abilitiesCheckededit.value = {}; // Reset the state
        abilities.forEach((ability) => {
            abilitiesCheckededit.value[ability.id] = false;
        });
    };

    const selectedAbilitiesEdit = computed(() => {
        return Object.keys(abilitiesCheckededit.value).filter(key => abilitiesCheckededit.value[key]);
    });
    
    const noSelectionWarning = ref(false);

    const checkSelections = () => {
      // Check if none of the abilities are selected
      const editSelected = selectedAbilitiesEdit.value.length > 0;
    // Check if none of the abilities are selected in either edit or add
        noSelectionWarning.value = !(editSelected);
      if (noSelectionWarning.value) {
        errors.value.push(t(`validation.choose_one_ability`));
      }
    };

    // methods



    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };

    //  Get All countries
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

    const getDetaile = async () => {
    loading.value = true;
    await axios.get(`provider/manager-details?manager_id=${id}`, config).then(res => {
        if (response(res) == "success") {
            name.value = res.data.data.name;
            email.value = res.data.data.email;
            phone.value = res.data.data.phone;
            image.value = res.data.data.image;
            selectedCountry.value.key = res.data.data.country_code;
            receivedEditData.value = res.data.data.abilities;
                initializeAbilitiesChecked(abilitiesList.value); // Reset before setting new values
                receivedEditData.value.forEach((ability) => {
                    if (abilitiesCheckededit.value.hasOwnProperty(ability.id)) {
                    abilitiesCheckededit.value[ability.id] = true;
                    }
                });
        }
        loading.value = false;
    }).catch(err => console.log(err));
    }

    onMounted( async () => {

        await store.getAbilities();

        abilitiesList.value = store.abilities_list;

        // get detailes of manager
        await getDetaile();

        // Get All countries
       await getCountries();
    });

</script>
