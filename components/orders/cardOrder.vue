<template>
    <div>

        <!-- ***** datatable ***** -->
        <div v-if="!loading">
            <DatatableTable :products="orders"
            :columns="columns"
            :rows="3"
            :sortable="true"
            :routeTable="routeTable"
            />
        </div>

        <!-- ***** datatable skeleton ***** -->
        <div v-if="loading">
            <DatatableSkelton :SkeletonProducts="SkeletonProducts" />
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        orders: Array,
        loading : Boolean
    })

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    const columns = ref(
        [
            { field: 'order_num', header: t('Global.order_number') },
            { field: 'user_name', header: t('Table.customer_name') },
            { field: 'car_name', header: t('order.car_name') },
            { field: 'created_at', header: t('order.date_of_order') },
        ]
    );

    const SkeletonProducts = new Array(columns.value.length);

    const routeTable = ref({
        header: '',
        path: '/orderDetails',
        id: 'id'
    });
</script>
