<template>
    <div>
        <div class="container">
            <h1 class="main-title bold ">{{ $t("Global.order_details") }}</h1>
            <p class="main-disc">{{ $t('Home.welcome') }} {{ user?.name }} ، {{ $t('Home.welcome_back') }}</p>
            <div class="custom-width layout-form w-100 text-start pt-4 rounded-2">
                <h1 class="main-title normal mb-4">{{ $t("Global.order_details") }}</h1>

                <div class="info">

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.order_status") }}</h6>
                        <h6 class="text" v-if="!loading && orderData.status == 0">{{ $t("order.new") }}</h6>
                        <h6 class="text" v-if="!loading && orderData.status == 1">{{ $t("order.current") }}</h6>
                        <h6 class="text" v-if="!loading && orderData.status == 4">{{ $t("order.rented") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
                    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.order_number") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.order_num }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.received_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.receive_date }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <!-- comment on this section -->

                    <div class="item-details"> 
                        <h6 class="text">{{ $t("Global.delivery_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.return_date }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.car_count") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.quantity }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.order_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.created_at }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.car_name_2") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.car_name }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.rent_type") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.rental_type }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.rental_period") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.duration }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("order.rental_cost") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.daily_cost }} {{ $t("order.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.booking_cost") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.booking_cost }} {{ $t("order.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.rental_car") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.car_rental }} {{ $t("order.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.rental_after_discount") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.price_after_discount }} {{ $t("order.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.Value_Added") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.vat_amount }} {{ $t("order.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.branch_name") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.branch?.name }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.branch_address") }}</h6>
                        <h6 class="text pointer decoration" v-if="!loading" @click="openMapModal">
                            <img src="@/assets/images/marker.png" loading="lazy" alt="marker-icon" class="marker-icon">
                            {{ orderData.map_desc.map_desc }}
                        </h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <!-- ************************* -->
                     <div class="row mt-5">
                        <div class="col-12 col-md-6">
                            <h3 class="main-title normal mb-4">{{ $t("order.choose_payment") }}</h3>
            
                            <div class="info">
                                <div class="item-details">
            
                                    <h6 class="text" v-if="!loading">{{ orderData.pay_type }}</h6>
                                    <skeleton v-if="loading" width="100px" height="10px"/>
                                    <i class="fas fa-wallet payment_icon" style="margin-inline-start: auto"></i>
                                </div>
                            </div>

                        </div>
                        <div class="col-12 col-md-6">
                            <h3 class="main-title normal mb-4">{{ $t("order.customer_data") }}</h3>
                            <div class="info">
                                <div class="branch">
                                    <img :src="orderData.branch?.image" v-if="!loading" alt="branch_image" class="branch_image">
                                    <skeleton v-if="loading" width="100px" height="100px"/>
                                    <div class="flex-grow-1">
                                        <div class="item-details">
                                            <h6 class="text" v-if="!loading">{{ orderData.branch?.name }}</h6>
                                            <skeleton v-if="loading" width="100px" height="10px"/>
                                        </div>
                                        <div class="item-details">
                                            <div class="text d-flex align-items-center gap-2" v-if="!loading">
                                                <i class="fas fa-mobile-alt"></i> {{ orderData.branch?.phone }}
                                            </div>
                                            <skeleton v-if="loading" width="100px" height="10px"/>
                                        </div>
            
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                    
                </div>

            </div>
        </div>
    
    </div>

</template>


<script setup>

definePageMeta({
        middleware: ['auth', 'check'],
        name: "Global.order_details",
    })

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    const { id } = useRoute().params;
    
    // response
    const { response } = responseApi();
    
    // axios
    const axios = useApi();
    
    const loading = ref(true);
    const orderData = ref({});
    
    const orderStatus = ref(0);
    
    // pinia store
    const store = useAuthStore();

    // token
    const { token, user} = storeToRefs(store);
    
    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

        // get order-details data
    const orderDetails = async () => {
        loading.value = true;
        await axios.get(`order-details?order_id=${id}`, config).then(res => {
            if (response(res) == "success") {
                orderData.value = res.data.data;
                orderStatus.value = res.data.data.status;
                console.log(orderData.value);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    };

    onMounted(() => {
        orderDetails();
    });

</script>

<style lang="scss" scoped>
    .marker-icon {
        width: 13px;
        height: 20px;
        object-fit: contain;
        margin-inline-end: 5px
    }
    .branch {
        display: flex;
        align-items: start;
        .branch_image {
            width: 110px;
            height: 95px;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .cancled {
        text-align: center;
        padding: 15px;
        color: #fff;
        border-radius: 2px;
    }
</style>

