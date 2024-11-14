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
                <span>รหัส {{ cnData.storeId }} | ร้านค้า {{ cnData.name }}</span>
                <span>ที่อยู่ {{ cnData.address }}</span>
                <span>เบอร์โทร {{ cnData.tel }}</span>
                <span>เลขผู้เสียภาษี {{ cnData.tax || '-' }}</span>
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
        <Tables :columns="columns" :data="editableData" :checkbox="false" :loading="loading">
            <template #cell="{ column, row }">
                <template v-if="isEditing(row.id) && column.key === 'qtyText'">
                    <input v-model="editCache[row.id].qty" type="number"
                        class="border border-gray-300 rounded px-2 py-1 text-sm w-16" />
                </template>
                <template v-else-if="isEditing(row.id) && column.key === 'lot'">
                    <input v-model="editCache[row.id].lot" type="text"
                        class="border border-gray-300 rounded px-2 py-1 text-sm" @input="validateLot(row.id)" />
                    <span v-if="lotErrors[row.id]" class="text-red-500 text-xs mt-1 block">
                        ไม่เกิน 20 ตัวอักษร
                    </span>
                </template>
                <template v-else>
                    {{ column.key === 'qtyText' ? `${row.qty} ${row.unitTypeThai}` : row[column.key] }}
                </template>
            </template>
            <template #cell-actions="{ row }">
                <div>
                    <button v-if="!isEditing(row.id) && cnData.status == 10" @click="startEditing(row)"
                        class="bg-yellow-400 text-white px-3 py-1 rounded">
                        <Icon icon="ri:edit-line" width="20" height="20" />
                    </button>
                    <div v-else-if="isEditing(row.id)">
                        <button @click="saveRow(row)" :disabled="lotErrors[row.id]"
                            class="bg-green-500 text-white px-3 py-1 rounded mr-2">
                            <Icon icon="mdi:check" width="20" height="20" />
                        </button>
                        <button @click="cancelEditing(row.id)" class="bg-red-500 text-white px-3 py-1 rounded">
                            <Icon icon="mdi:close" width="20" height="20" />
                        </button>
                    </div>
                </div>
            </template>
        </Tables>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Tables from '../../components/Tables.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'
import Skeleton from '../../components/Skeleton.vue'
import { useCnStore, useUtilityStore } from '../../stores'

const cn = useCnStore()
const util = useUtilityStore()

const loading = ref(true)
const cnData = computed(() => cn.orderCnCmDetail)

const editableData = ref([])
const editCache = ref({})
const editingRowId = ref(null)
const lotErrors = ref({}) // เก็บสถานะ error ของ lot

const columns = ref([
    { key: 'id', label: 'รหัส' },
    { key: 'name', label: 'สินค้า' },
    { key: 'qtyText', label: 'จำนวน' },
    { key: 'pricePerQty', label: 'ราคา' },
    { key: 'exp', label: 'วันหมดอายุ' },
    { key: 'lot', label: 'ล็อต' },
    { key: 'summaryPrice', label: 'รวม' },
    { key: 'actions', label: '' }
])

onMounted(async () => {
    try {
        await cn.getCnOrderCmDetail(util.cnNo)
        editableData.value = JSON.parse(JSON.stringify(cn.orderCnCmItem))
    } finally {
        loading.value = false
    }
})

const isEditing = (rowId) => editingRowId.value === rowId

const startEditing = (row) => {
    editingRowId.value = row.id
    editCache.value[row.id] = { qty: row.qty, lot: row.lot }
}

const validateLot = (rowId) => {
    const lot = editCache.value[rowId].lot
    lotErrors.value[rowId] = lot.length > 20
}

const saveRow = async (row) => {
    if (lotErrors.value[row.id]) return

    const originalData = {
        system: '12Order',
        module: 'CN',
        data: {
            ...cnData.value,
            list: [row]
        }
    }
    const editedData = {
        orderNo: cnData.value.orderNo,
        itemNo: row.id,
        unit: row.unitId,
        oldLot: row.lot,
        qty: editCache.value[row.id].qty,
        lot: editCache.value[row.id].lot
    }
    try {
        await cn.updateqQtyOrder(editedData)
        await util.insertLog(originalData)
        // console.log(editedData)
        // console.log(originalData)
    } catch (error) {
        console.error(error)
    } finally {
        await cn.getCnOrderCmDetail(util.cnNo)
        editableData.value = JSON.parse(JSON.stringify(cn.orderCnCmItem))
        editingRowId.value = null
        lotErrors.value[row.id] = false
    }
}

const cancelEditing = async (rowId) => {
    const cachedData = editCache.value[rowId]
    const row = editableData.value.find((item) => item.id === rowId)
    if (cachedData) {
        row.qty = cachedData.qty
        row.lot = cachedData.lot
    }
    await cn.getCnOrderCmDetail(util.cnNo)
    editableData.value = JSON.parse(JSON.stringify(cn.orderCnCmItem))
    editingRowId.value = null
    lotErrors.value[rowId] = false
}

</script>

<style scoped>
.bg-gray-500:hover {
    background-color: #6b7280;
}

.bg-blue-500:hover {
    background-color: #3b82f6;
}

.bg-green-500:hover {
    background-color: #10b981;
}

.text-red-500 {
    color: #ef4444;
}
</style>