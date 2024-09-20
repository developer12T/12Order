<template>
    <div>
        <Tabs :tabs="tabs" v-model="activeTab">
            <template #buttons>
                <div class="flex flex-row justify-end">
                    <button @click="handleSummary(selectedRows)" type="button" :disabled="!selectedRows.length" :class="['mr-2 text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
            {
                'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
            }]"> ใบจอง
                    </button>
                    <button @click="handleSummaryAll(selectedRows)" type="button" :disabled="!selectedRows.length"
                        :class="['mr-2 text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
            {
                'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
            }]"> ใบรวม
                    </button>
                    <button v-if="activeTab === 0" @click="handleConfirm(selectedRows)" type="button"
                        :disabled="!selectedRows.length" :class="['mr-2 text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
            {
                'bg-green-500 hover:bg-green-600 border-green-500 hover:green-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
            }]"> นำเข้าระบบ
                    </button>
                </div>
            </template>
            <template #default="{ activeTab }">
                <div v-if="isLoading"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                    <div class="relative p-6">
                        <Icon class="icon w-12 h-12" icon="line-md:loading-twotone-loop" />
                    </div>
                </div>
                <Alert :isVisible="showConfirm" message="ต้องการนำเข้าระบบ?" confirmText="ยืนยัน" cancelText="ยกเลิก"
                    icon="line-md:downloading-loop" style="color: #787373" @confirm="handleAdd"
                    @close="showConfirm = false" />

                <Alert :isVisible="showSuccess" message="นำเข้าระบบสำเร็จ" icon="ep:success-filled"
                    style="color: #14c257" :confirmButton="false" :cancelButton="false" @close="showSuccess = false" />

                <div v-if="activeTab === 0">
                    <Tables :columns="columns" :data="cnData" @update:selected="handleSelectedRows"
                        :resetSelected="resetSelected" @row:clicked="handleRowClicked" />
                </div>
                <div v-if="activeTab === 1">
                    ยังไม่มีข้อมูล
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useCnStore, useUtilityStore } from '../../stores'
import Tabs from '../../components/Tabs.vue'
import Tables from '../../components/Tables.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter()
const cn = useCnStore()
const util = useUtilityStore()

const cnData = computed(() => cn.orderCnCm)

const activeTab = ref(0)
const showConfirm = ref(false)
const showSuccess = ref(false)
const selectedRows = ref([])
const isLoading = ref(false)
const resetSelected = ref(false)
const tabs = ref([{ name: 'รายการคืน' }, { name: 'ประวัติ' }])
const columns = ref([
    { key: 'createDate', label: 'วันที่' },
    { key: 'orderNo', label: 'บิล' },
    { key: 'storeName', label: 'ร้าน' },
    { key: 'address', label: 'ที่อยู่' },
    { key: 'area', label: 'เขต' },
    { key: 'totalAmount', label: 'รวม' }
])

const handleSelectedRows = (rows) => {
    selectedRows.value = rows
    console.log('Selected Rows:', selectedRows.value)
}

const handleRowClicked = async (orderNo) => {
    console.log('Clicked:', orderNo)
    util.cnNo = orderNo;
    await router.push('/cn/detail')
    cn.getCnOrderCmDetail(orderNo)
}

const handleConfirm = () => {
    console.log('Confirmed!')
    showConfirm.value = true
}

const handleSuccess = () => {
    console.log('Success!')
    showSuccess.value = true
}

const handleAdd = async () => {
    showConfirm.value = false
    isLoading.value = true
    try {
        await cn.addCnErp(
            selectedRows.value
        )
        selectedRows.value = []
        console.log('add', selectedRows.value)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
        handleSuccess()
        cn.getCnOrderCm()
        resetSelected.value = true
        console.log('valueSelected', selectedRows.value)
    }
}

const handleSummary = async () => {
    isLoading.value = true
    try {
        util.summary = selectedRows.value
        // await order.summaryOrder(selectedRows.value)
        console.log(util.summary)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
        // await router.push('/order/summary')
    }
}

const handleSummaryAll = async () => {
    isLoading.value = true
    try {
        util.summaryAll = selectedRows.value
        // await order.summaryOrderAll(selectedRows.value)
        console.log(util.summaryAll)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
        // await router.push('/order/summaryAll')
    }
}

watchEffect(() => {
    if (!isLoading.value) {
        selectedRows.value = []
    }
})

onMounted(() => {
    cn.getCnOrderCm()
})

</script>