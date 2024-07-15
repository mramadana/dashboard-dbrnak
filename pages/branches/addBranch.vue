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
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <div class="input_auth without-edit">
                                            <img
                                                src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                                :class="{'hidden-default': uploadedImage.length !== 0,'default-class': true,}"/>
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
                                            {{ $t('Auth.mobile_number') }}
                                        </label>
                                        <div class="with_cun_select">
                                            <div class="main_input">
                                                <i class="fas fa-mobile-alt sm-icon"></i>
                                                <input type="number" class="custum-input-icon validInputs" valid="phone" v-model="phone" name="phone" @input="checkPhone" :placeholder="$t('Auth.please_mobile_number')">
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

                        <!-- second step form -->
                        <div class="custom-width text-start w-100 p-0">
                            <h1 class="main-title bold head-title">{{ $t("Branches.worktime") }}</h1>
                            <div class="inner p-3">
                                <div class="col-12 col-md-8">
                                    <div class="worktime">
                                        <div class="form-group">
                                            <label class="label">
                                                اليوم
                                            </label>
                                            <input type="text" class="main_input" :placeholder="$t('Auth.enter_username')">
                                        </div>

                                        <div v-for="(item, index) in timeSections" :key="index" class="time-section">
                                            <div class="day">
                                                <label class="label">{{ $t('Branches.day') }}</label>
                                                <input type="text" class="main_input" :placeholder="item.placeholder" readonly/>
                                            </div>

                                            <div class="from">
                                                <label class="label">{{ $t('Branches.from') }}</label>
                                                <div class="main_input">
                                                <flat-pickr
                                                    v-model="item.from"
                                                    :config="getConfigFrom(index)"
                                                    class="select_date main_input custom-date"
                                                    :placeholder="$t('Branches.time_from')"
                                                    name="from"
                                                />
                                                </div>
                                            </div>

                                            <div class="to">
                                                <label class="label">{{ $t('Branches.to') }}</label>
                                                <div class="main_input">
                                                <flat-pickr
                                                    v-model="item.to"
                                                    :config="getConfigTo(index)"
                                                    class="select_date main_input custom-date"
                                                    :placeholder="$t('Branches.time_to')"
                                                    name="to"
                                                />
                                                </div>
                                            </div>
                                            <div class="switch-parent">
                                                <label class="switch">
                                                    <input type="checkbox" value="1" v-model="isSelected">
                                                    <div class="slider round"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <button @click="submitData">Submit</button>
                                    </div>
                                </div>
                            </div>
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


    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // success response
    const { response } = responseApi();

    // Axios
    const axios = useApi();

    // variables
    const uploadedImage = ref([]);
    const phone = ref('');
    const selectedCountry = ref({})
    const countries = ref([]);

    const mainAddress = ref("");
    
    const closeModal_btn = ref(true);

    const show_inputs = ref(false);

    const visible = ref(false);
    const currentLocation = ref(false);

    
    const location = ref({
        lat: null,
        lng : null
    });

    // flatpicker date
    // const from = ref(null);
    // const to = ref(null);

    // methods

    const timeSections = ref([
      { day: 'saturday', placeholder: t('Branches.saturday'), from: null, to: null },
      { day: 'sunday', placeholder: t('Branches.sunday'), from: null, to: null },
      { day: 'monday', placeholder: t('Branches.monday'), from: null, to: null },
      { day: 'tuesday', placeholder: t('Branches.tuesday'), from: null, to: null },
      { day: 'wednesday', placeholder: t('Branches.wednesday'), from: null, to: null },
      { day: 'thursday', placeholder: t('Branches.thursday'), from: null, to: null },
      { day: 'friday', placeholder: t('Branches.friday'), from: null, to: null },
    ]);

    const createConfig = (index, type) => ({
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      onChange: (selectedDates) => {
        if (type === 'from') {
          if (timeSections.value[index].to && selectedDates[0] >= timeSections.value[index].to) {
            timeSections.value[index].to = null;
          }
        } else if (type === 'to') {
          if (timeSections.value[index].from && selectedDates[0] <= timeSections.value[index].from) {
            timeSections.value[index].from = null;
          }
        }
      },
    });

    const getConfigFrom = (index) => createConfig(index, 'from');
    const getConfigTo = (index) => createConfig(index, 'to');

    watch(
      () => timeSections.value.map(item => item.from),
      (newValues) => {
        newValues.forEach((fromValue, index) => {
          if (timeSections.value[index].to && fromValue >= timeSections.value[index].to) {
            timeSections.value[index].to = null;
          }
        });
      }
    );

    watch(
      () => timeSections.value.map(item => item.to),
      (newValues) => {
        newValues.forEach((toValue, index) => {
          if (timeSections.value[index].from && toValue <= timeSections.value[index].from) {
            timeSections.value[index].from = null;
          }
        });
      }
    );

    const submitData = () => {
      // Here you can handle the submission logic
      console.log(timeSections.value);
      // For example, you can send the timeSections.value array to an API or process it as needed
    };


    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };



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



    onMounted( async () => {
       await getCountries();
    });
</script>


<style lang="scss" scoped>
    .time-section {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
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
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 0 2px #d9d9d9;
        border-radius: 6px;
        gap: 10px;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 1px solid var(--main);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 8px;
        width: 8px;
        left: 4px;
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
    -webkit-transform: translate(17px, -50%);
    -ms-transform: translate(17px, -50%);
    transform: translate(17px, -50%);
    background-color: #fff;
    }

    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }

</style>
