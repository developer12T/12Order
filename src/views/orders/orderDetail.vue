<template>
    <div class="mb-5">
        <Breadcrumb />
    </div>
    <div class="flex flex-row space-x-4 mb-3">
        <div class="flex-1 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div class="flex flex-col text-sm">
                <span>เลข {{ orderData.orderNo }} </span>
                <span>รหัส {{ orderData.code }} | ร้านค้า {{ orderData.name }}</span>
                <span>ที่อยู่ {{ orderData.address }}</span>
                <span>เบอร์โทร {{ orderData.tel }}</span>
                <span>เลขผู้เสียภาษี {{ orderData.tax }}</span>
                <span>พนักงานขาย {{ orderData.saleMan }}</span>
            </div>
        </div>
        <div class="flex-1 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div>
                <span>ที่อยู่จัดส่ง</span>
            </div>
        </div>
    </div>
    <div>
        <Tables :columns="columns" :data="itemData" :checkbox="false" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOrderStore, useUtilityStore } from '../../stores'
import Tables from '../../components/Tables.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'

const order = useOrderStore()
const util = useUtilityStore()

const itemData = computed(() => {
    return order.orderCmItem
})

const orderData = computed(() => {
    return order.orderCmDetail
})

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