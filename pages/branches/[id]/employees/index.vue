<template>
    <div>
        <div class="container">
            <ClientOnly>
                <Teleport to="#teleportDiv">
                    
                    <div class="main-text mb-0">
                        <h1 class="main-title">{{ $t('Home.employees') }}</h1>
                        <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
                    </div>
                    <div class="search-section">
                        <div class="main_input with_icon search">
                            <input type="text" class="custum-input-icon" v-model="filters['global'].value" :placeholder="$t('Table.keywords')">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <button @click="addedemployee = true" class="custom-btn plus sm"><i class="fas fa-plus"></i></button>
                </div>

                </Teleport>
            </ClientOnly>
        </div>



        <!-- ***** datatable ***** -->
        <div v-if="!loading">
            <DatatableTable :products="products"
            :columns="columns"
            :rows="10"
            :filters="filters"
            :sortable="true"
            :DropDownemployees="true"
            @deleteItem="deleteItem"
            @editItem="editItem"
            @viewItem="viewItem"
            />
        </div>

        <!-- ***** datatable skeleton ***** -->
        <div v-if="loading">
                <DatatableSkelton :SkeletonProducts="SkeletonProducts" />
            </div>

        <!--***** Paginator *****-->
        <div class="paginate-parent" v-if="showPaginate">
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" dir="ltr" />
        </div>

        <!-- add employee -->

        <Dialog v-model:visible="addedemployee" modal class="custum_dialog_width employee lg" :draggable="false">

            <div class="custom-width text-start w-100 p-0">
                <h1 class="main-title bold head-title text-center">{{ $t("employees.user_data") }}</h1>
            </div>

            <form @submit.prevent="addemployee" ref="addemployeeform">
                <div class="inner p-3">
                    <div class="row">

                        <div class="col-12 text-center">
                            <div class="form-group">
                                <div class="input_auth without-edit">
                                    <img
                                        src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                        :class="{'hidden-default': uploadedImage_1.length !== 0,'default-class': true,}"/>
                                    <GlobalImgUploader
                                        acceptedFiles="image/*"
                                        name="image"
                                        @uploaded-images-updated="updateUploadedImages_1"
                                        :newImages="addobject.image"
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
                                    <input type="text" name="name" v-model="addobject.name"  class="custum-input-icon validInputs" :placeholder="$t('Auth.enter_name')">
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
                                    <input type="text" name="job_title" v-model="addobject.job_title" class="custum-input-icon validInputs" :placeholder="$t('employees.job_name')">
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
                                        <input type="number" class="custum-input-icon validInputs" name="phone" v-model="addobject.phone" :placeholder="$t('Auth.please_mobile_number')">
                                    </div>
                                    <div class="card d-flex justify-content-center dropdown_card">
                                        <Dropdown
                                        v-model="addemployeCountry"
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
                                    <input type="email" class="custum-input-icon validInputs" name="email" v-model="addobject.email" :placeholder="$t('Auth.please_enter_email')">
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.password') }}
                                </label>
                                <div class="main_input with_icon">
                                    <input :type="inputType('definitelyNewPassword')" name="password" v-model="addobject.password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
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
                                                v-model="abilitiesCheckedAdd[ability.id]"
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

                    <button class="custom-btn md m-auto" @click="addEmployeeFun">
                        {{ $t('employees.confirm_addition') }}
                        <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                        aria-hidden="true"></span>
                    </button>
                </div>

            </form>

        </Dialog>

        <!-- deit employee -->

        <Dialog v-model:visible="editemployee" modal class="custum_dialog_width employee lg" :draggable="false">
            <div class="text-center">
                <h1 class="main-title bold head-title pb-3">تعديل الموظف</h1>
                <form @submit.prevent="editemployeeFun" ref="editemployeeform">
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
                                            :newImages="editobject.image"
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
                                        <input type="text" name="name" v-model="editobject.name" class="custum-input-icon validInputs" :placeholder="$t('Auth.enter_name')">
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
                                        <input type="text" name="job_title" v-model="editobject.job_title" class="custum-input-icon validInputs" :placeholder="$t('employees.job_name')">
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
                                            <input type="number" class="custum-input-icon validInputs" name="phone" v-model="editobject.phone" :placeholder="$t('Auth.please_mobile_number')">
                                        </div>
                                        <div class="card d-flex justify-content-center dropdown_card">
                                            <Dropdown
                                            v-model="editemployeCountry"
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
                                        <input type="email" class="custum-input-icon validInputs" name="email" v-model="editobject.email" :placeholder="$t('Auth.please_enter_email')">
                                    </div>
                                </div>
                            </div>
        
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.password') }}
                                    </label>
                                    <div class="main_input with_icon">
                                        <input :type="inputType('definitelyNewPassword_2')" name="password" v-model="editobject.password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
                                        <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
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
                                                    v-model="abilitiesCheckededit[ability.id]"
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
        
                        
                        <button class="custom-btn md m-auto" @click="editEmployeeFun">
                            {{ $t('employees.edit_user') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                            aria-hidden="true"></span>
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>


        <!-- show employee details -->

        <Dialog v-model:visible="viewemployee" modal class="custum_dialog_width employee lg" :draggable="false">
            <form @submit.prevent="viewmployee" ref="viewmployeeform">
                    <div class="inner p-3">
                        <div class="row">
        
                            <div class="col-12 text-center mb-4">
                                <div class="form-group">
                                    <div class="input_auth without-edit">
                                        <img
                                            src="@/assets/images/upload_img.png" loading="lazy" alt="default-img"
                                            :class="{'hidden-default': uploadedImage_3.length !== 0,'default-class': true,}"/>
                                        <GlobalImgUploader
                                            acceptedFiles="image/*"
                                            name="image"
                                            @uploaded-images-updated="updateUploadedImages_3"
                                            :newImages="viewobject.image"
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
                                        <input type="text" name="name" v-model="viewobject.name" class="custum-input-icon validInputs" :placeholder="$t('Auth.enter_name')">
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
                                        <input type="text" name="job_title" v-model="viewobject.job_title" class="custum-input-icon validInputs" :placeholder="$t('employees.job_name')">
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
                                            <input type="number" class="custum-input-icon validInputs" name="phone" v-model="viewobject.phone" :placeholder="$t('Auth.please_mobile_number')">
                                        </div>
                                        <div class="card d-flex justify-content-center dropdown_card">
                                            <Dropdown
                                            v-model="viewemployeCountry"
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
                                        <input type="email" class="custum-input-icon validInputs" name="email" v-model="viewobject.email" :placeholder="$t('Auth.please_enter_email')">
                                    </div>
                                </div>
                            </div>
        
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.password') }}
                                    </label>
                                    <div class="main_input with_icon">
                                        <input :type="inputType('definitelyNewPassword_3')" name="password" v-model="viewobject.password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
                                        <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_3')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_3 }">
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
                                                    v-model="abilitiesChecked[ability.id]"
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
        
                        
                        <button class="custom-btn md m-auto">
                            {{ $t('employees.edit_user') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                            aria-hidden="true"></span>
                        </button>
                    </div>
                </form>
        </Dialog>


        <!-- delete employee -->

        <Dialog v-model:visible="deleteSuccessfully" modal class="custum_dialog_width employee" :draggable="false">
            <div class="text-center">
                <h1 class="main-title bold mb-4">{{ $t('Branches.delete_employee') }}</h1>
                <img src="@/assets/images/delete.png" alt="check-img" class="check-img">
                <div class="section-btns">
                    <button class="custom-btn sm bg-red d-inline-flex" @click="deleteSuccessfullyFun">{{ $t('Global.yes') }}</button>
                    <button class="custom-btn sm d-inline-flex" @click="deleteSuccessfully = false">{{ $t('Global.no') }}</button>
                </div>
            </div>
        </Dialog> 
    </div>
</template>

<script setup>

    // import FilterMatchMode to get input search work
    import { FilterMatchMode } from 'primevue/api';

    definePageMeta({
        name: "Home.employees",
        middleware: ['auth', 'check'],
    });

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // store
    const store = useAuthStore();
    const { token , user } = storeToRefs(store);

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    const deleteSuccessfully = ref(false);

    const addedemployee = ref(false);
    
    const addemployeeform = ref(null);

    const editemployeeform = ref(null);

    const viewmployeeform = ref(null);

    const addobject = ref({
        name: '',
        email: '',
        password: '',
        phone: '',
        job_title: '',
        image: '',
    });

    const editobject = ref({
        name: '',
        email: '',
        password: '',
        phone: '',
        job_title: '',
        image: '',
    });

    const viewobject = ref({
        name: '',
        email: '',
        password: '',
        phone: '',
        job_title: '',
        image: '',
    });

    const addemployeCountry = ref({});
    const editemployeCountry = ref({});
    const viewemployeCountry = ref({});

    const countries = ref([]);
    const passwordVisible = ref({
        definitelyNewPassword: false,
        definitelyNewPassword_2: false,
        definitelyNewPassword_3: false,
    });

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

// Toast
const { successToast, errorToast } = toastMsg();
const errors = ref([]);

const products = ref([]);

const employees_details = ref(false);

const loading = ref(true);

const employee_id = ref('');
const employee_id_branch = ref('');
const uploadedImage_1 = ref([]);
const uploadedImage_2 = ref([]);
const uploadedImage_3 = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// table columns
const columns = ref(
    [
        { field: 'id', header: t('Table.number') },
        { field: 'name', header: t('Table.username') },
        { field: 'job_title', header: t('Table.job') },
        { field: 'created_at', header: t('Table.date_added') },
    ]
);

const abilities = ref([
    {id: 1, name: "إضافة سيارة", value: "manage-packages"},

    {id: 2, name: "حذف سيارة", value: "manage-services"},

    {id: 3, name: "تعديل سيارة", value: "manage-orders"},
    
    {id: 4, name: "انهاء الطلب", value: "manage-appoinments"},
    ]);

    const abilitiesChecked = ref({});
    const abilitiesCheckededit = ref({});
    const abilitiesCheckedAdd = ref({});

    // Initialize abilitiesChecked with false for each ability
        abilities.value.forEach((ability) => {
        abilitiesCheckededit.value[ability.id] = false;
        abilitiesCheckedAdd.value[ability.id] = false;
    });

    const noSelectionWarning = ref(false);

    const checkSelections = () => {
        const editSelected = Object.values(abilitiesCheckededit.value).some((checked) => checked);
        const addSelected = Object.values(abilitiesCheckedAdd.value).some((checked) => checked);

        // Check if none of the abilities are selected in either edit or add
        noSelectionWarning.value = !(editSelected || addSelected);
        
        // If no abilities are selected, add a validation error
        if (noSelectionWarning.value) {
            errors.value.push(t(`validation.choose_one_ability`));
    }
    };

    const SkeletonProducts = new Array(columns.value.length);



    const editemployee = ref(false);
    const viewemployee = ref(false);
// methods
    // validation Function
    const validate = () => {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if(editobject.value.image) {
                return
            }
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }

        checkSelections()
    }

//  Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            const defaultCountry = countries.value.find(country => country.id == 1);
            if (defaultCountry) {
                addemployeCountry.value = { ...defaultCountry };
                editemployeCountry.value = { ...defaultCountry };
                viewemployeCountry.value = { ...defaultCountry };
            }
        }
    }).catch(err => console.log(err));
};

const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    };

const togglePasswordVisibility = (input) => {
    passwordVisible.value[input] = !passwordVisible.value[input];
};

// delete item
const deleteItem = async (id) => {
    employee_id.value = id;
    deleteSuccessfully.value = true
}

// edit item
const editItem = async (id) => {
    employee_id.value = id;
    editemployee.value = true
   await getDetaile()
    
}

// view item
const viewItem = async (id) => {
    employee_id.value = id;
    viewemployee.value = true
}


const deleteSuccessfullyFun = () => {
    deleteEmployee()
}

const editSuccessfullyFun = () => {
    console.log(employee_id.value, "branch_id");
}

const updateUploadedImages_1 = (images) => {
        uploadedImage_1.value = images;
    };

const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };
const updateUploadedImages_3 = (images) => {
        uploadedImage_3.value = images;
    };

// delete employee
const deleteEmployee = async () => {
    const fd = new FormData();
    fd.append('employee_id', employee_id.value);
    loading.value = true;
    await axios.post(`provider/delete-employee`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            deleteSuccessfully.value = false;
            getData();
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));
}


// get datatable data
const getData = async () => {
    loading.value = true;
  await axios.get(`provider/employees?branch_id=${employee_id_branch.value}&page=${currentPage.value}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.employees;
      totalPage.value = res.data.data.pagination.total_items;
      pageLimit.value = res.data.data.pagination.per_page;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

// start to add employee
const addEmployeeFun = () => {

loading.value = true;
const fd = new FormData(addemployeeform.value);
fd.append('branch_id', employee_id_branch.value);
fd.append('country_code', addemployeCountry.value.key);

validate();

if (errors.value.length) {
    errorToast(errors.value[0]);
    loading.value = false;
    errors.value = [];
} else {
    axios.post("provider/add-employee", fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            addedemployee.value = false;
            addemployeeform.value.reset();
            getData();
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));
}
};

// start to get employee
const getDetaile = async () => {
    loading.value = true;
    await axios.get(`provider/employee-details?employee_id=${employee_id.value}`, config).then(res => {
        if (response(res) == "success") {
            editobject.value.image = res.data.data.image;
            editobject.value.name = res.data.data.name;
            editobject.value.email = res.data.data.email;
            editobject.value.phone = res.data.data.phone;
            addemployeCountry.value.key = res.data.data.country_code;
            editobject.value.job_title = res.data.data.job_title;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// fix bug image shown in dialog
watch(editemployee, (newValue) => {
  if (!newValue) {
    editobject.value.image = [];
  }
});


const editEmployeeFun = async () => {

loading.value = true;
const fd = new FormData(editemployeeform.value);
console.log(employee_id.value, "ya kareem yaaaaaa rab");
fd.append('employee_id', employee_id.value);
fd.append('country_code', editemployeCountry.value.key);
validate();

if (errors.value.length) {
    errorToast(errors.value[0]);
    loading.value = false;
    errors.value = [];
} else {
    axios.post("provider/edit-employee", fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            getData();
            editemployee.value = false;
            
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));
}
}




// Paginate Function
const onPaginate = (e) => {
  loading.value = true;
  currentPage.value = e.page + 1;
  window.scrollTo(0, 0);
  getData();
};

/******************* Computed *******************/

let showPaginate = computed(() => {
  return totalPage.value > pageLimit.value
});


onMounted(async () => {
    employee_id_branch.value = localStorage.getItem('edit_branch_id');

    // get datatable data
    await getData();

    // get countries
    await getCountries();

});

</script>

<style lang="scss" scoped>
    .section-btns {
        .custom-btn {
            font-size: 16px;
            border: 0;
        }
    }
</style>
