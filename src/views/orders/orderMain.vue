<template>
    <div>
        <Tabs :tabs="tabs">
            <template #default="{ activeTab }">
                <div v-if="activeTab === 0">
                    <Tables :columns="columns" :data="orderData" @update:selected="handleSelectedRows" @row:clicked="handleRowClicked" />
                </div>
                <div v-if="activeTab === 1">
                    ยังไม่มีข้อมูล
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores'
import Tabs from '../../components/Tabs.vue'
import Tables from '../../components/Tables.vue'

const router = useRouter()
const order = useOrderStore()
const orderData = computed(() => {
    return order.orderCm;
});

const tabs = ref([{ name: 'รายการขาย' }, { name: 'ประวัติ' }]);
const columns = ref([
    { key: 'createDate', label: 'วันที่' },
    { key: 'orderNo', label: 'บิล' },
    { key: 'storeName', label: 'ร้าน' },
    { key: 'address', label: 'ที่อยู่' },
    { key: 'area', label: 'เขต' },
    { key: 'totalPrice', label: 'รวม' }
]);

const handleSelectedRows = (selectedRows) => {
    console.log('Selected Rows:', selectedRows);
};

const handleRowClicked = (orderNo) => {
  console.log('Clicked:', orderNo);
  localStorage.setItem('orderNo', orderNo);
  router.push('/order/detail')
};

onMounted(() => {
    order.getOrderCm();
})

</script>