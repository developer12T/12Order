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
                <span>เลข {{ cnData.orderNo }} </span>
                <span>รหัส {{ cnData.code }} | ร้านค้า {{ cnData.name }}</span>
                <span>ที่อยู่ {{ cnData.address }}</span>
                <span>เบอร์โทร {{ cnData.tel }}</span>
                <span>เลขผู้เสียภาษี {{ cnData.tax }}</span>
                <span>พนักงานขาย {{ cnData.saleMan }}</span>
            </div>
        </div>
        <div class="flex-1 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div>
                <span>ที่อยู่จัดส่ง</span>
            </div>
        </div>
    </div>
    <div>
        <Tables :columns="columns" :data="itemData" @update:selected="handleSelectedRows" :checkbox="false" :loading="loading"/>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useCnStore, useUtilityStore } from '../../stores'
import Tables from '../../components/Tables.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'
import Skeleton from '../../components/Skeleton.vue'

const cn = useCnStore()
const util = useUtilityStore()

const loading = ref(true)

const itemData = computed(() => cn.orderCnCmItem)
const cnData = computed(() => cn.orderCnCmDetail)

const columns = ref([
    { key: 'id', label: 'รหัส' },
    { key: 'name', label: 'สินค้า' },
    { key: 'qtyText', label: 'จำนวน' },
    { key: 'pricePerQty', label: 'ราคาต่อหน่วย' },
    { key: 'summaryPrice', label: 'รวม' }
]);

const handleSelectedRows = (selectedRows) => {
    console.log('Selected Rows:', selectedRows)
}

onMounted(async () => {
    try {
        await cn.getCnOrderCmDetail(util.cnNo)
    } finally {
        loading.value = false
    }
})

</script>