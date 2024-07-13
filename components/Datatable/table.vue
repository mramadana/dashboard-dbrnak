<template>

<div class="main-table">
      <DataTable
        :value="products"
        :filters="filters"
        :rows="rows"
        :sortable="sortable"
        tableStyle="min-width: 50rem"
        class="main-table"
        id="my_table"
        ref="my_table"
      >
        <template #empty>
          {{ $t("orders.no_records_found") }}
        </template>

        <div v-for="(col, index) in columns" :key="col.field">
          <Column
            :field="col.field"
            :header="col.header"
            :sortable="sortable"
            v-if="col.field !== 'abilities'"
          >
            <!--  if i need to add image it index is one in my data table  -->
            <template v-if="index === 1 && showImage" #body="slotProps">
              <img
                :src="slotProps.data.image"
                loading="lazy"
                class="shadow-4 datatable-image-custom"
              />
            </template>
          </Column>
        </div>


        <!--*********** Route To Details ***********-->
        <Column :field="routeTable.header" :header="routeTable.header" v-if="routeTable">
            <template #body="slotProps">
                <router-link :to="routeTable.path + '/' + slotProps.data[routeTable.id]" class="table_link">
                    <span v-if="routeTable.proptext">{{ routeTable.proptext }}</span>
                    <span class="table-icon" v-if="!routeTable.icon"><i class="fas fa-ellipsis-h"></i></span>
                </router-link>
            </template>
        </Column>

        <!-- in this Column pass dropdown have all dialogs inside package page  -->
        <Column v-if="DropDownpackageDialog" header="">
          <template #body="slotProps">
            <div class="dropdown drop-lang dropdown-table sort-table">
              <div
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button
                    class="dropdown-item"
                    @click="delete_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.delete") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/trash.png')"
                      alt="delet-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="edit_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.edit") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/edit.png')"
                      alt="edit-img"
                      class="tb-img"
                    />
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="rate_package_Dialog(slotProps.data.id)"
                  >
                    {{ $t("Glopal.ratings") }}
                    <img
                      :src="require('@/assets/images/dropdown-img/star.png')"
                      alt="star-img"
                      class="tb-img"
                    />
                  </button>
                </li>

                <li>
                  <button class="dropdown-item" @click="details_package(slotProps.data.id)">
                    {{$t('Glopal.details')}}
                    <i class="fa-solid fa-circle-info tb-img"></i>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Column>

        <!-- if i need to add Column for order id -->

        <Column v-if="showOrderId">
          <template #body="slotProps">
            <router-link
              :to="{
                name: 'orderDetails',
                params: { orderId: slotProps.data.id },
              }"
            >
              <div class="table-list">
                <i class="fas fa-ellipsis-h"></i>
                <!-- <p>{{ slotProps.data.id }}</p> -->
              </div>
            </router-link>
          </template>
        </Column>

      </DataTable>
    </div>
</template>

<script setup>
/******************* Import *******************/


/******************* Data *******************/

// Paginator
const currentPage = ref(1);

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['updateProduct', 'updateType', 'paginateNum']);

/******************* Props *******************/
const props = defineProps({
    products: Array,
    columns: Array,
    filters: Object,
    currency: String,
    rows: Number,
    showSearch: {
      type: Boolean,
      default: false, // Show search by default, change to false when you want to hide it
    },

    sortable: {
      type: Boolean,
      default: true, // show sortable by default, change to false when you want to hide it
    },

    showImage: {
      type: Boolean,
      default: false, // show image by default, change to false when you want to hide it
    },

    showOrderId: {
      type: Boolean,
      default: false, // hide showOrderId by default, change to true when you want to show it
    },

    routeTable: {
        type: Object, // pass object with path and header
    },
});

/******************* Methods *******************/

const updateProductQuantity = (data) => {
    emit('updateProduct', data);
}

const updateType = (data) => {
    emit('updateType', data);
}

// Paginate Function
const onPaginate = (e) => {
  currentPage.value = e.page + 1;
  window.scrollTo(0, 0);
  emit('paginateNum', currentPage.value);
};

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style lang="scss"></style>