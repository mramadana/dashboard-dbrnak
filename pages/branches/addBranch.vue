<template>
    <div>
        <div class="container">
            <div class="main-text mb-0">
                <h1 class="main-title">{{ $t('Cars.add_branch_data') }}</h1>
                <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
            </div>

            <form @submit.prevent="addBranch" ref="addBranchform">

                    <div class="row">
                        <!-- first step form -->
                        <div class="custom-width text-start w-100 p-0">
                            <h1 class="main-title bold head-title">{{ $t("Titles.branch_data") }}</h1>
                            <div class="inner p-3">
                                <div class="col-12 col-xl-6 col-md-8">
                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                                :class="{'hidden-default': uploadedImage.length !== 0,'default-class': true,}"/>
                                            <GlobalImgUploader
                                                acceptedFiles="image/*"
                                                name="image"
                                                @uploaded-images-updated="updateUploadedImages_1"
                                                class="validInputs"
                                            />
                                        </div>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Cars.branch_name') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-user sm-icon"></i>
                                            <input type="text" class="custum-input-icon validInputs" name="name" :placeholder="$t('Branches.please_enter_branch_name')">
                                        </div>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.mobile_number') }}
                                        </label>
                                        <div class="with_cun_select">
                                            <div class="main_input">
                                                <i class="fas fa-mobile-alt sm-icon"></i>
                                                <input type="number" class="custum-input-icon validInputs" valid="phone" v-model="phone" name="phone" @input="checkPhone" :placeholder="$t('Auth.please_mobile_number')">
                                            </div>
                                            <div class="card d-flex justify-content-center dropdown_card">
                                                <Dropdown
                                                v-model="branchCountry"
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

                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.email') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-envelope sm-icon"></i>
                                            <input type="email" class="custum-input-icon validInputs" valid="email" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                                        </div>
                                    </div>

                                    <div class="form-group" @click="openmodal">
                                        <label class="label">
                                            {{ $t('Auth.location') }}
                                        </label>
                                        <div class="main_input pointer">
                                            <i class="fas fa-user sm-icon"></i>
                                            <input type="text" class="custum-input-icon pointer validInputs" name="location_required" readonly  v-model="mainAddress"  :placeholder="$t('Auth.enter_loaction')">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- add time work -->
                        <div class="custom-width text-start w-100 p-0">
                            <h1 class="main-title bold head-title">{{ $t("Branches.worktime") }}</h1>
                            <div class="inner p-3">
                                <div class="col-12 col-xl-8 col-md-12">
                                    <div class="worktime">

                                        <div v-for="(item, index) in times" :key="index" class="time-section">
                                            <div class="day">
                                                <label class="label">{{ $t('Branches.day') }}</label>
                                                <input type="text" class="main_input" :placeholder="placeholders[index]" :class="{ 'closed_input': item.isClosed }" readonly/>
                                            </div>

                                            <div class="from">
                                                <label class="label">{{ $t('Branches.from') }}</label>
                                                <div class="main_input" :class="{ 'closed_input': item.isClosed }">
                                                <flat-pickr
                                                    v-model="item.from"
                                                    :config="getConfigFrom(index)"
                                                    class="select_date main_input custom-date"
                                                    :placeholder="$t('Branches.time_from')"
                                                    name="from"
                                                    :disabled="item.isClosed"
                                                />
                                                </div>
                                            </div>

                                            <div class="to">
                                                <label class="label">{{ $t('Branches.to') }}</label>
                                                <div class="main_input" :class="{ 'closed_input': item.isClosed }">
                                                <flat-pickr
                                                    v-model="item.to"
                                                    :config="getConfigTo(index)"
                                                    class="select_date main_input custom-date"
                                                    :placeholder="$t('Branches.time_to')"
                                                    name="to"
                                                    :disabled="item.isClosed"
                                                />
                                                </div>
                                            </div>
                                            <div class="switch-parent">
                                                <label class="switch">
                                                    <input type="checkbox" value="0" v-model="item.isClosed">
                                                    <div class="slider round"></div>
                                                </label>
                                                <span class="switch-text">{{$t('Branches.closed')}}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- second acount for Branch Manager -->
                        <div class="custom-width text-start w-100 p-0">
                            <h1 class="main-title bold head-title">{{ $t("Branches.branch_manager_account") }}</h1>
                            <div class="inner p-3">
                                <div class="col-12 col-xl-6 col-md-8">
                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                                :class="{'hidden-default': uploadedImage_2.length !== 0,'default-class': true,}"/>
                                            <GlobalImgUploader
                                                acceptedFiles="image/*"
                                                name="manager_image"
                                                @uploaded-images-updated="updateUploadedImages_2"
                                            />
                                        </div>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.name') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-user sm-icon"></i>
                                            <input type="text" name="manager_name" class="custum-input-icon validInputs" :placeholder="$t('Auth.enter_name')">
                                        </div>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.mobile_number') }}
                                        </label>
                                        <div class="with_cun_select">
                                            <div class="main_input">
                                                <i class="fas fa-mobile-alt sm-icon"></i>
                                                <input type="number" class="custum-input-icon validInputs" name="manager_phone" @input="checkPhone" :placeholder="$t('Auth.please_mobile_number')">
                                            </div>
                                            <div class="card d-flex justify-content-center dropdown_card">
                                                <Dropdown
                                                v-model="managerCountry"
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

                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.email') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-envelope sm-icon"></i>
                                            <input type="email" class="custum-input-icon validInputs" valid="manager_email" name="manager_email" v-model="manager_email" :placeholder="$t('Auth.please_enter_email')">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.password') }}
                                        </label>
                                        <div class="main_input with_icon">
                                            <input :type="inputType('definitelyNewPassword')" name="manager_password" v-model="password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
                                            <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                            <i class="far fa-eye icon"></i>
                                            </button>
                                        </div>
                                    </div>
        
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.confirm_password_sm') }}
                                        </label>
                                        <div class="main_input with_icon">
                                            <input :type="inputType('definitelyNewPassword_2')" name="manager_password_confirm" v-model="confirmPassword" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_confirm_password') ">
                                            <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                            <i class="far fa-eye icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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

                         <div class="p-0 mt-4">
                             <button type="submit" class="custom-btn xl" @click="submitData">
                                {{ $t('Branches.add') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                            </button>
                         </div>

                    </div>

                    
            </form>
        </div> 

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
        name: "Titles.addBranch",
        middleware: ['auth', 'check'],
    });

    // flatpicker date import
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ useScope: 'global' });

    // store
    const store = useAuthStore();

    const { token , user } = storeToRefs(store);

    const abilitiesChecked = ref({});

    const abilities = ref([
    {id: 1, name: "إضافة سيارة", value: "manage-packages"},

    {id: 2, name: "حذف سيارة", value: "manage-services"},

    {id: 3, name: "تعديل سيارة", value: "manage-orders"},
    
    {id: 4, name: "انهاء الطلب", value: "manage-appoinments"},
    ]);

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // success response
    const { response } = responseApi();

    // Axios
    const axios = useApi();

    // variables
      // Toast
    const { successToast, errorToast } = toastMsg();
    const uploadedImage = ref([]);
    const uploadedImage_2 = ref([]);
    const phone = ref('');
    const branchCountry = ref({})
    const managerCountry = ref({})
    const countries = ref([]);
    const errors = ref([]);
    const loading = ref(false);
    const mainAddress = ref("");
    
    const closeModal_btn = ref(true);

    const show_inputs = ref(false);

    const visible = ref(false);
    const currentLocation = ref(false);

    const password = ref('');
    const confirmPassword = ref('');

    const passwordVisible = ref({
        definitelyNewPassword: false,
        definitelyNewPassword_2: false
    });
    
    const location = ref({
        lat: null,
        lng : null
    });

    // flatpicker configration

    const times = ref([
      { day: 'saturday', from: null, to: null, isClosed: false, },
      { day: 'sunday', from: null, to: null, isClosed: false, },
      { day: 'monday', from: null, to: null, isClosed: false, },
      { day: 'tuesday', from: null, to: null, isClosed: false, },
      { day: 'wednesday', from: null, to: null, isClosed: false, },
      { day: 'thursday', from: null, to: null, isClosed: false, },
      { day: 'friday', from: null, to: null, isClosed: false, },
    ]);

    const placeholders = ref([
      t('Branches.saturday'),
      t('Branches.sunday'),
      t('Branches.monday'),
      t('Branches.tuesday'),
      t('Branches.wednesday'),
      t('Branches.thursday'),
      t('Branches.friday'),
    ]);

    // start to methods

    const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    };

    const togglePasswordVisibility = (input) => {
        passwordVisible.value[input] = !passwordVisible.value[input];
    };

    const createConfig = (index, type) => ({
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      disableMobile: "true",
      onChange: (selectedDates) => {
        if (type === 'from') {
          if (times.value[index].to && selectedDates[0] >= times.value[index].to) {
            times.value[index].to = null;
          }
        } else if (type === 'to') {
          if (times.value[index].from && selectedDates[0] <= times.value[index].from) {
            times.value[index].from = null;
          }
        }
      },
    });

    const getConfigFrom = (index) => createConfig(index, 'from');
    const getConfigTo = (index) => createConfig(index, 'to');

    watch(
      () => times.value.map(item => item.from),
      (newValues) => {
        newValues.forEach((fromValue, index) => {
          if (times.value[index].to && fromValue >= times.value[index].to) {
            times.value[index].to = null;
          }
        });
      }
    );

    watch(
      () => times.value.map(item => item.to),
      (newValues) => {
        newValues.forEach((toValue, index) => {
          if (times.value[index].from && toValue <= times.value[index].from) {
            times.value[index].from = null;
          }
        });
      }
    );
    
    // methods

    // validation Function
    const validate = () => {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }

        if (password.value !== confirmPassword.value) {
            errors.value.push(t(`validation.confirmPassword`));
        }

        checkSelections()
    }

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

    const submitData = () => {

      validate();
      if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {
            
            console.log(times.value);
            console.log(abilitiesChecked.value, "11111");
            console.log(abilities.value, "22222222");
            console.log(branchCountry.value, "33333333");
            console.log(managerCountry.value, "44444444");
        }

    };


    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };
    
    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };



    const getCountries = async () => {
        await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == 1) {
                    branchCountry.value = countries.value[i];
                    managerCountry.value = countries.value[i];
                    }
                }
            }
        }).catch(err => console.log(err));
    };

    const closeModal = () => {
        visible.value = false
        mainAddress.value = location.value.address
    }

    const handleClose = () => {
        visible.value = false
    }

    const handleUpdateAddress = (newAddress) => {
        location.value = newAddress;
    };

    const openmodal = () => {
        visible.value = true;
        setTimeout(() => {
            currentLocation.value = true;
        }, 100);
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


    onMounted( async () => {
       await getCountries();

       loadGoogleMaps().then((google) => {
        console.log('Google Maps API loaded:', google);
        
        }).catch((error) => {
            console.error('Error loading Google Maps API:', error);
        });
    });
</script>


<style lang="scss" scoped>

    .closed_input {
        background-color: #e2e2e2;
    }

    .custom-date {
        &:disabled {
            background-color: #e2e2e2;
        }
    }

    .time-section {
        display: flex;
        align-items: end;
        gap: 15px;
        margin-bottom: 25px;
        @media (max-width: 550px) {
            flex-wrap: wrap;
        }
        .input {
            width: 100%;
        }
        > div {
            flex-grow: 1;
        }
    }
    .switch-parent {
        display: flex;
        align-items: center;
        padding: 11px 10px;
        border: 1px solid #ddd;
        box-shadow: 0 0 2px #d9d9d9;
        border-radius: 6px;
        gap: 10px;
        flex-grow: 0 !important;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 15px;
    }

    .switch input {
    display: none;
    }

    .slider {
    position: absolute;
    cursor: pointer;
    background-color: #d8d8d8;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 1px solid var(--main);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 0px;
        top: 50%;
        background-color: var(--main);
        transition: 0.4s;
        transform: translateY(-50%);
    }

    input:checked + .slider {
    background-color: var(--main);
    border-color: var(--main);
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #101010;
    }

    input:checked + .slider:before {
    -webkit-transform: translate(20px, -50%);
    -ms-transform: translate(20px, -50%);
    transform: translate(20px, -50%);
    background-color: #fff;
    }

    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }

    .switch-text {
        font-size: 12px;
    }

</style>
