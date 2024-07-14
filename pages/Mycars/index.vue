<template>
    <div>
        <div class="main-text">
            <h1 class="main-title">{{ $t('Home.my_car') }}</h1>
            <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
        </div>

        <!-- ***** datatable ***** -->
        <div v-if="!loading">
            <DatatableTable :products="products"
            :columns="columns"
            :rows="10"
            :filters="filters"
            :sortable="true"
            :showImage="true"
            :routeTable="routeTable"/>
        </div>

        <!-- ***** datatable skeleton ***** -->
            <div v-if="loading">
                <DatatableSkelton :SkeletonProducts="SkeletonProducts" />
            </div>

        <!--***** Paginator *****-->
        <div class="paginate-parent" v-if="showPaginate">
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" dir="ltr" />
        </div>   
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Home.my_car",
        middleware: ['auth', 'check'],
    });

    // store
    const store = useAuthStore();
    const { token , user } = storeToRefs(store);


    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

import { useI18n } from 'vue-i18n';


const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

const products = ref([]);

const loading = ref(true);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

const columns = ref(
    [
        { field: 'id', header: t('Table.number') },
        { field: 'image', header: t('Table.car_image') },
        { field: 'name', header: t('Table.car_name') },
        { field: 'car_type', header: t('Table.car_type') },
        { field: 'category', header: t('Table.vehicle_class') },
        { field: 'car_model', header: t('Table.car_model') },
    ]
);

const SkeletonProducts = new Array(columns.value.length);

const routeTable = ref({
    header: t('Global.car_details'),
    path: 'Mycars',
    id: 'id'
});

const getData = async () => {
    loading.value = true;
  await axios.get(`provider/cars?page=${currentPage.value}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.cars;
      totalPage.value = res.data.data.pagination.total_items;
      pageLimit.value = res.data.data.pagination.per_page;
    }
    loading.value = false;
  }).catch(err => console.log(err));
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
    // get datatable data
    await getData();

});

</script>