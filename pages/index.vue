<template>
    <div>
        <main>
            <div class="container">
                
                <div class="main-text">
                    <h1 class="main-title">{{ $t('Home.home') }}</h1>
                    <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
                </div>

                <!-- home card -->

                <div class="row mb-4">

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.new_orders_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.incoming_requests') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.current_orders_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.current_requests') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.total_orders_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.total_orders') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.cars_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.number_of_cars') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.branches_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.number_of_branches') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 col-xl-2 custom-color">
                        <div class="home-cars">
                            <div class="hint-order">
                                <img src="@/assets/images/hint-order.png" :loading="lazy" alt="hint-order"/>
                            </div>
                            <div class="text">
                                <h3 class="main-title mb-1" v-if="!loading">{{ ordersNum?.cancel_orders_count }}</h3>
                                <skeleton v-if="loading" width="50px" height="7px" style="margin-bottom: 7px;"/>
                                <p class="main-disc">{{ $t('order.number_of_canceled_orders') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <!-- ***** datatable ***** -->
                <div v-if="!loading">
                    <DatatableTable :products="products"
                    :columns="columns"
                    :rows="10"
                    :filters="filters"
                    :sortable="true"/>
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
        </main>
    </div>
</template>

<script setup>

definePageMeta({
    name: "Titles.home",
    middleware: ['auth', 'check'],
});

// Store
const store = useAuthStore();

const { token, user } = storeToRefs(store);


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

const ordersNum = ref([]);

const loading = ref(true);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

const columns = ref(
    [
        { field: 'order_num', header: t('Table.order_number') },
        { field: 'user_name', header: t('Table.customer_name') },
        { field: 'car_name', header: t('Table.car_name') },
        { field: 'created_at', header: t('Table.date_of_order') },
    ]
);

const SkeletonProducts = new Array(columns.value.length);

const getData = async () => {
    loading.value = true;
  await axios.get(`provider/home?page=${currentPage.value}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.orders;
      totalPage.value = res.data.data.pagination.total_items;
      pageLimit.value = res.data.data.pagination.per_page;
      ordersNum.value = res.data.data;
      console.log(ordersNum.value, "Ssssssssssssssss");

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

<style lang="scss">
.custom-color {
    &:nth-child(odd) {
        .hint-order {
            background: #ddd;
        }
        .main-title {
            color: #535455;
        }
    }
    &:nth-child(even) {
        .hint-order {
            background: rgba(255, 0, 0, 10%) 0% 0% no-repeat padding-box;
        }

        .main-title {
            color: #ff0000;
        }
    }
}

.home-cars {
    padding: 15px 10px;
    background: #fff;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 2px hsl(0deg 0% 0% / 13%);
    margin-bottom: 20px;
    height: calc(100% - 20px);
    @media (max-width: 380px) {
       flex-direction: column;
    }
    .main-disc {
        font-size: 13px;
        text-align: center;
    }

    .main-title {
        text-align: center;
    }
}

.hint-order {
    padding: 5px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    margin-inline-end: 15px;
    @media (max-width: 380px) {
       margin-inline-end: 0 !important;
       margin-bottom: 10px;
    }
}
</style>
