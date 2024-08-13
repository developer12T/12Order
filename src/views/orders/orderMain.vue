<template>
    <div>
        <div class="flex flex-row justify-end">
            <button @click="handleAdd(selectedRows)" type="button" :disabled="isAdding"
                class="bg-green-500 hover:bg-green-600 mr-2 text-white border border-green-500 hover:border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2 sm:mb-0 sm:ml-4">
                นำเข้าระบบ
            </button>
        </div>
        <Tabs :tabs="tabs">
            <template #default="{ activeTab }">
                <div v-if="activeTab === 0">
                    <Tables :columns="columns" :data="orderData" @update:selected="handleSelectedRows"
                        @row:clicked="handleRowClicked" />
                    <div v-if="isAdding"
                        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                        <div class="relative p-6">
                            <Icon class="icon w-12 h-12" icon="line-md:loading-twotone-loop" />
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 1">
                    ยังไม่มีข้อมูล
                </div>
                <div v-if="activeTab === 2">
                    ยังไม่มีข้อมูล
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores'
import Tabs from '../../components/Tabs.vue'
import Tables from '../../components/Tables.vue'

const router = useRouter()
const order = useOrderStore()
const orderData = computed(() => {
    return order.orderCm;
});

const tabs = ref([{ name: 'รายการขาย' }, { name: 'ค้างส่ง' }, { name: 'ประวัติ' }]);
const columns = ref([
    { key: 'createDate', label: 'วันที่' },
    { key: 'orderNo', label: 'บิล' },
    { key: 'storeName', label: 'ร้าน' },
    { key: 'address', label: 'ที่อยู่' },
    { key: 'area', label: 'เขต' },
    { key: 'totalPrice', label: 'รวม' }
]);

const selectedRows = ref([])
const isAdding = ref(false)

const handleSelectedRows = (rows) => {
    selectedRows.value = rows;
};

const handleRowClicked = async (orderNo) => {
    console.log('Clicked:', orderNo)
    localStorage.setItem('orderNo', orderNo)
    await router.push('/order/detail')
}

const handleAdd = async () => {
    isAdding.value = true
    console.log('add', selectedRows.value)
    try {
        await order.addOrderErp(
            selectedRows.value
        )
    } catch (error) {
        console.error(error)
    } finally {
        isAdding.value = false
        order.getOrderCm()
    }
}

onMounted(() => {
    order.getOrderCm();
})

</script>