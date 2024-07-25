<template>
    <div>
        <Breadcrumb />
        <Tables :columns="columns" :data="orderData" :showCheckbox="false" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOrderStore, useUtilityStore} from '../../stores'
import Tables from '../../components/Tables.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'

const order = useOrderStore()
const util = useUtilityStore()

const orderData = computed(() => {
    return order.orderCmItem
});

const columns = ref([
    { key: 'id', label: 'รหัส' },
    { key: 'name', label: 'สินค้า' },
    { key: 'qtyText', label: 'จำนวน' },
    { key: 'pricePerQty', label: 'ราคาต่อหน่วย' },
    { key: 'itemDiscount', label: 'ส่วนลด' },
    { key: 'summaryPrice', label: 'รวม' }
]);

onMounted(() => {
    order.getOrderCmDetail(util.orderNo);
})

</script>