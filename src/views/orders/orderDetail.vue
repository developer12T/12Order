<template>
    <div class="mb-5">
        <Breadcrumb />
    </div>
    <div class="flex flex-row space-x-4 mb-3">
        <div class="flex-1 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div v-if="loading">
                <Skeleton v-for="i in 6" :key="i" width="100%" height="0.8rem" class="mb-2" />
            </div>
            <div v-else class="flex flex-col text-sm">
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
        <Tables :columns="columns" :data="itemData" @update:selected="handleSelectedRows" :checkbox="false" :loading="loading">
            <template #cell="{ column, row }">
                <span v-if="column.key === 'stock'">
                    <span v-if="!row.stock" class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ขาดสต็อก</span>
                    <span v-else class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">มีสต็อก</span>
                </span>
                <span v-else>
                    {{ row[column.key] }}
                </span>
            </template>
        </Tables>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useOrderStore, useUtilityStore } from '../../stores'
import Tables from '../../components/Tables.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'
import Skeleton from '../../components/Skeleton.vue'

const order = useOrderStore()
const util = useUtilityStore()

const loading = ref(true)

const itemData = computed(() => order.orderCmItem)
const orderData = computed(() => order.orderCmDetail)

const columns = ref([
    { key: 'id', label: 'รหัส' },
    { key: 'name', label: 'สินค้า' },
    { key: 'qtyText', label: 'จำนวน' },
    { key: 'pricePerQty', label: 'ราคาต่อหน่วย' },
    { key: 'itemDiscount', label: 'ส่วนลด' },
    { key: 'summaryPrice', label: 'รวม' },
    { key: 'stock', label: 'สถานะ' }
]);

const handleSelectedRows = (selectedRows) => {
    console.log('Selected Rows:', selectedRows)
}

onMounted(async () => {
    try {
        await order.getOrderCmDetail(util.orderNo)
    } finally {
        loading.value = false
    }
})

</script>