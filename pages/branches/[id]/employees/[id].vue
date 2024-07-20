<template>
    <div>
        <div class="main-text mb-0">
            <h1 class="main-title">{{ $t('employees.view_employee_data') }}</h1>
            <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
        </div>
        <div class="custom-width text-start w-100 pt-3">

            <form @submit.prevent="editemployee" ref="editemployeeform">
                <div class="inner p-3">
                    <div class="row">
    
                        <div class="col-12 text-center mb-4">
                            <div class="form-group">
                                <div class="input_auth without-edit">
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
                                    <input type="text" name="name" v-model="name" class="custum-input-icon validInputs" :placeholder="$t('Auth.enter_name')">
                                </div>
                            </div>
                        </div>
    
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('employees.job_name') }}
                                </label>
                                <div class="main_input">
                                    <i class="fa-solid fa-house sm-icon"></i>
                                    <input type="text" name="job_title" v-model="job_title" class="custum-input-icon validInputs" :placeholder="$t('employees.job_name')">
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
    
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.password') }}
                                </label>
                                <div class="main_input with_icon">
                                    <input :type="inputType('definitelyNewPassword')" name="password" v-model="password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
                                    <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        <div class="col-12">
                            <!-- abilities form -->
                            <div class="custom-width text-start w-100 p-0">
                                <h1 class="main-title bold head-title">{{ $t("Branches.abilities") }}</h1>
                                <div class="inner pt-5 p-3">
                                    <div class="row">
                                        <div class="col-12 col-md-4" v-for="(ability) in abilities" :key="ability.id">
                                        <div class="radios form-group">
                                            <div class="d-flex gap-3">
                                            <label class="custom-radio custom-check">
                                                <input
                                                type="checkbox"
                                                name="opinion"
                                                value="true"
                                                v-model="abilitiesChecked['ability'+ ability.id]"
                                                class="d-none"
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
        name: "employees.view_employee_data",
        middleware: ['auth', 'check'],
    });

    // variables

    const { id } = useRoute().params

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    const store = useAuthStore();
    const { token , user } = storeToRefs(store);

    // success response
    const { response } = responseApi();

    // Axios
    const axios = useApi();

    const abilitiesChecked = ref({});

    const selectedCountry = ref({});
    const countries = ref([]);

    const abilities = ref([
    {id: 1, name: "إضافة سيارة", value: "manage-packages"},

    {id: 2, name: "حذف سيارة", value: "manage-services"},

    {id: 3, name: "تعديل سيارة", value: "manage-orders"},

    {id: 4, name: "انهاء الطلب", value: "manage-appoinments"},
    ]);

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const phone = ref('');
    const job_title = ref('');


    const uploadedImage_2 = ref([]);

    const passwordVisible = ref({
        definitelyNewPassword: false,
    });

        // methods

    // validation Function
    const validate = () => {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }

        checkSelections()
    }

    const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    };

    const togglePasswordVisibility = (input) => {
        passwordVisible.value[input] = !passwordVisible.value[input];
    };

    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };

    // Initialize abilitiesChecked with false for each ability
    abilities.value.forEach((ability) => {
        abilitiesChecked.value['ability' + ability.id] = false;
    });

    const noSelectionWarning = ref(false);

    const checkSelections = () => {
      // Check if none of the abilities are selected
      noSelectionWarning.value = !Object.values(abilitiesChecked.value).some((checked) => checked);
      if (noSelectionWarning.value) {
        errors.value.push(t(`validation.choose_one_ability`));
      }
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

    onMounted(async () => {
        await getCountries();
    });
</script>
