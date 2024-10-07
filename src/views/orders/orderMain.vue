<template>
    <div>
        <Tabs :tabs="tabsWithCounts" v-model="activeTab">
            <template #search>
                <div class="px-4">
                    <Search />
                </div>
            </template>
            <template #buttons>
                <div>
                    <button v-if="activeTab === 1 || activeTab === 2" @click="handleSummary(selectedRows)" type="button"
                        :disabled="!selectedRows.length" :class="['text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
                    {
                        'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                        'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
                    }]">
                        ใบจอง
                        <span v-if="selectedRows.length"
                            class="inline-flex items-center justify-center min-w-[1.5rem] h-4 px-2 ms-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {{ selectedRows.length }}
                        </span>
                    </button>
                    <button v-if="activeTab === 1 || activeTab === 2" @click="handleSummaryAll(selectedRows)" type="button"
                        :disabled="!selectedRows.length" :class="['text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
                    {
                        'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                        'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
                    }]">
                        ใบรวม
                        <span v-if="selectedRows.length"
                            class="inline-flex items-center justify-center min-w-[1.5rem] h-4 px-2 ms-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {{ selectedRows.length }}
                        </span>
                    </button>
                    <button v-if="activeTab === 0" @click="handleConfirm1(selectedRows)" type="button"
                        :disabled="!selectedRows.length" :class="['text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
                    {
                        'bg-blue-500 hover:bg-green-600 border-green-500 hover:green-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                        'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
                    }]"> เพิ่มรายการ
                    </button>
                    <button v-if="activeTab === 1" @click="handleConfirm2(selectedRows)" type="button"
                        :disabled="!selectedRows.length" :class="['text-white border font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4',
                    {
                        'bg-green-500 hover:bg-green-600 border-green-500 hover:green-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300': selectedRows.length,
                        'bg-gray-400 border-gray-400 cursor-not-allowed': !selectedRows.length,
                    }]"> เข้าระบบ
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
                <Alert :isVisible="showConfirm1" message="ต้องการเพิ่มรายการ?" confirmText="ยืนยัน" cancelText="ยกเลิก"
                    icon="line-md:downloading-loop" style="color: #787373" @confirm="handleAdd"
                    @close="showConfirm1 = false" />

                <Alert :isVisible="showConfirm2" message="ต้องการเพิ่มรายการเข้า M3?" confirmText="ยืนยัน"
                    cancelText="ยกเลิก" icon="line-md:downloading-loop" style="color: #787373" @confirm="handleAddErp"
                    @close="showConfirm2 = false" />

                <Alert :isVisible="showSuccess" message="เพิ่มสำเร็จ" icon="ep:success-filled" style="color: #14c257"
                    :confirmButton="false" :cancelButton="false" @close="showSuccess = false" />

                <Alert :isVisible="showFail" message="เกิดข้อผิดพลาด" icon="line-md:alert-circle-loop"
                    style="color: #ba1212" :confirmButton="false" :cancelButton="false" @close="showFail = false" />

                <div v-if="activeTab === 0">
                    <Tables :columns="columnsList" :data="filteredOrderData" @update:selected="handleSelectedRows"
                        :resetSelected="resetSelected" @row:clicked="handleRowClicked" :loading="loading">
                        <template #cell="{ column, row }">
                            <span v-if="column.key === 'send'">
                                <span v-if="!row.send"
                                    class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ไม่พร้อมส่ง</span>
                                <span v-else
                                    class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">พร้อมส่ง</span>
                            </span>
                            <span v-else>
                                {{ row[column.key] }}
                            </span>
                        </template>
                    </Tables>
                </div>
                <div v-if="activeTab === 1">
                    <Tables :columns="columns" :data="filteredOrderData" @update:selected="handleSelectedRows"
                        :resetSelected="resetSelected" @row:clicked="handleRowClicked" :loading="loading" />
                </div>
                <div v-if="activeTab === 2">
                    <Tables :columns="columns" :data="filteredOrderData" @update:selected="handleSelectedRows"
                        :resetSelected="resetSelected" @row:clicked="handleRowClicked" :loading="loading" />
                </div>
                <div v-if="activeTab === 3">
                    <Tables :columns="columns" :data="filteredOrderData" @update:selected="handleSelectedRows"
                        :resetSelected="resetSelected" @row:clicked="handleRowClicked" :loading="loading" />
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useOrderStore, useUtilityStore } from '../../stores'
import Tabs from '../../components/Tabs.vue'
import Tables from '../../components/Tables.vue'
import Search from '../../components/Search.vue'
import Alert from '../../components/Alert.vue'

const router = useRouter()
const order = useOrderStore()
const util = useUtilityStore()

const orderData = computed(() => order.orderCm)
const filteredOrderData = computed(() => util.filteredData)

const activeTab = ref(0)
const status = ref(10)
const showConfirm1 = ref(false)
const showConfirm2 = ref(false)
const showSuccess = ref(false)
const showFail = ref(false)
const selectedRows = ref([])
const isLoading = ref(false)
const loading = ref(true)
const resetSelected = ref(false)

const tabs = ref([
    { name: 'รายการขาย', status: '10' },
    { name: 'รอเข้าระบบ', status: '15' },
    { name: 'รอส่ง', status: '20' },
    { name: 'ประวัติ', status: '30' }
])

const tabsWithCounts = computed(() => {
    return tabs.value.map((tab) => {
        const count = orderData.value.filter(item => item.status === tab.status).length;
        return {
            ...tab,
            count: count || 0
        }
    })
})

const columnsList = ref([
    { key: 'createDate', label: 'วันที่' },
    { key: 'createTime', label: 'เวลา' },
    { key: 'orderNo', label: 'บิล' },
    { key: 'storeName', label: 'ร้าน' },
    { key: 'address', label: 'ที่อยู่' },
    { key: 'area', label: 'เขต' },
    { key: 'totalPrice', label: 'รวม' },
    { key: 'send', label: 'สถานะ' }
])

const columns = ref([
    { key: 'createDate', label: 'วันที่' },
    { key: 'createTime', label: 'เวลา' },
    { key: 'orderNo', label: 'บิล' },
    { key: 'storeName', label: 'ร้าน' },
    { key: 'address', label: 'ที่อยู่' },
    { key: 'area', label: 'เขต' },
    { key: 'totalPrice', label: 'รวม' }
])

const handleSelectedRows = (rows) => {
    selectedRows.value = rows
    console.log('Selected Rows:', selectedRows.value)
}

const handleRowClicked = async (orderNo) => {
    console.log('Clicked:', orderNo)
    util.orderNo = orderNo;
    await router.push('/order/detail')
    order.getOrderCmDetail(orderNo)
}

const handleConfirm1 = () => {
    console.log('Confirmed!')
    showConfirm1.value = true
}

const handleConfirm2 = () => {
    console.log('Confirmed!')
    showConfirm2.value = true
}

const handleSuccess = () => {
    console.log('Success!')
    showSuccess.value = true
}

const handleFail = () => {
    console.log('Failed!')
    showFail.value = true
}

const handleAdd = async () => {
    showConfirm1.value = false
    isLoading.value = true
    try {
        await order.addOrder(
            selectedRows.value
        )
        selectedRows.value = []
        console.log('add', selectedRows.value)
        handleSuccess()
    } catch (error) {
        console.error(error)
        handleFail()
    } finally {
        isLoading.value = false
        order.getOrderCm(status.value)
        resetSelected.value = true
        console.log('valueSelected', selectedRows.value)
    }
}

// const handleAddErp = async () => {
//     showConfirm2.value = false
//     isLoading.value = true
//     try {
//         await order.addOrderERP(
//             selectedRows.value.map((item) => {
//                 return {
//                     orderNo: item.orderNo
//                 }
//             })
//         )
//         selectedRows.value = []
//         handleSuccess()
//     } catch (error) {
//         console.error(error)
//         handleFail()
//     } finally {
//         isLoading.value = false
//         order.getOrderCm(status.value)
//         resetSelected.value = true
//         console.log('valueSelected', selectedRows.value)
//     }
// }
const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`
}

const handleAddErp = async () => {
    showConfirm2.value = false
    isLoading.value = true
    try {
        const orders = selectedRows.value.map((item) => {
            return {
                Hcase: 1, 
                orderNo: item.orderNo,
                orderType: "M31",
                orderStatusLow: 22,
                orderStatusHigh: 22,
                orderDate: formatDate(item.createDate), 
                requestDate: formatDate(item.createDate),
                customerNo: item.storeId, 
                payer: "21000026",
                addressID: "INVTSP", 
                warehouse: item.warehouse,
                total: item.totalPrice,
                totalNet: item.totalPrice - item.totalDiscount,
                OAFRE1: "YSEND",
                ref: `OD${item.orderNo}`,
                note: item.note, 
                item: item.list.map((product) => {
                    return {
                        itemCode: product.id,
                        qtyPCS: product.qtyPcs, 
                        qtyCTN: Math.floor(product.qtyPcs / product.unitQty), 
                        unit: product.unitText, 
                        price: product.pricePerQty, 
                        discount: product.discount, 
                        netPrice: product.pricePerQty - product.discount,
                        total: product.totalAmount, 
                        promotionCode: product.proCode || "" 
                    };
                })
            };
        });

        await order.addOrderERP(orders)

        selectedRows.value = []
        handleSuccess();
    } catch (error) {
        console.error(error);
        handleFail();
    } finally {
        isLoading.value = false;
        order.getOrderCm(status.value);
        resetSelected.value = true;
        console.log('valueSelected', selectedRows.value);
    }
}

const handleSummary = async () => {
    isLoading.value = true
    try {
        util.summary = selectedRows.value
        await order.summaryOrder(selectedRows.value)
        console.log(util.summary)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
        await router.push('/order/summary')
    }
}

const handleSummaryAll = async () => {
    isLoading.value = true
    try {
        util.summaryAll = selectedRows.value
        await order.summaryOrderAll(selectedRows.value)
        console.log(util.summaryAll)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
        await router.push('/order/summaryAll')
    }
}

watchEffect(() => {
    if (!isLoading.value) {
        selectedRows.value = []
    }
})

watch(activeTab, async (newTab) => {
    loading.value = true;
    try {
        switch (newTab) {
            case 0:
                status.value = 10
                break
            case 1:
                status.value = 15
                break
            case 2:
                status.value = 20
                break
            case 3:
                status.value = 30
                break
            default:
                status.value = 10
        }
        await order.getOrderCm(status.value)
    } catch (error) {
        console.error("Error fetching data:", error)
        handleFail()
    } finally {
        loading.value = false
    }
})

watch(orderData, (newData) => {
    util.searchData = newData
})

onMounted(async () => {
    loading.value = true
    try {
        await order.getOrderCm(status.value)
        util.searchData = orderData.value
        console.log('orderData', orderData.value);
    } catch (error) {
        console.error("Error on mounted:", error)
        handleFail()
    } finally {
        loading.value = false
    }
})

</script>