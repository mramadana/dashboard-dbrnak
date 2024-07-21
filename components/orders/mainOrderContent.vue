<template>

    <div>
        <OrdersCardOrder :orders="orders" :loading="loading" />

        <!--***** Paginator *****-->
        <div class="paginate-parent" v-if="showPaginate">
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    ordersName: {
        type: String,
        required: true
    },
    noData: {
        type: String,
        required: true
    }
});

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// loading
const loading = ref(true);

// orders
const orders = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Methods *******************/

// getOrders
const getOrders = async () => {
    loading.value = true;
    await axios.get(`${props.ordersName}?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data.orders;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
            console.log(orders.value);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getOrders();
};

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value;
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrders();
});
</script>
