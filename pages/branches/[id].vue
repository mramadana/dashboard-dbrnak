<template>
    <div>
        <div class="container">

            <div id="teleportDiv" class="with-plus-btn"></div>

            <div class="section-btns mb-5">
        
                <nuxt-link :to="'/branches/'+ id + '/edit'" class="custom-btn order-btn sm">{{ $t('employees.edit_branch') }}</nuxt-link>
        
                <nuxt-link :to="'/branches/'+ id + '/employees'" class="custom-btn order-btn sm">{{ $t('Home.employees') }}</nuxt-link>
            </div>


            
        </div>
        <NuxtPage :page-key="route => route.fullPath"/>

    </div>
</template>

<script setup>
    const id = useRoute().params.id
</script>

<!-- <script setup>

definePageMeta({
        name: "Cars.edit_branch_data",
        middleware: ['auth', 'check'],
    });

    // flatpicker date import
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ useScope: 'global' });

    const { id } = useRoute().params

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

    // variables get data

    const image = ref('');
    const name = ref('');
    const email = ref('');
    const manager_image = ref('');
    const manager_name = ref('');
    const manager_email = ref('');
    const manager_password = ref('');
    const manager_phone = ref('');


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

</style> -->

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
