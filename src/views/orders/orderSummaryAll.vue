<template>
    <div class="mb-5">
        <Breadcrumb />
    </div>
    <div class="a4-pages">
        <div class="print-icon-container">
            <Icon @click="printPage" icon="noto-v1:printer" height='30' width='30' />
        </div>
        <div v-for="(pageItems, pageIndex) in paginatedSummaryOrders" :key="pageIndex" class="a4-page">
            <div class="header">
                <h1>(ใบรวมสินค้า)</h1>
            </div>
            <table class="order-table mt-4">
                <thead>
                    <tr>
                        <th>รหัสสินค้า</th>
                        <th>รายการ</th>
                        <th>หีบ</th>
                        <th>แพ็ค</th>
                        <th>ชิ้น</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in pageItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.convertedUnits.large.qty }}</td>
                        <td>{{ item.convertedUnits.medium.qty }}</td>
                        <td>{{ item.convertedUnits.small.qty }}</td>
                    </tr>
                    <tr v-for="i in (23 - pageItems.length)" :key="'empty-' + i">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useOrderStore, useUtilityStore } from '../../stores'
import Breadcrumb from '../../components/Breadcrumb.vue'

const order = useOrderStore()
const util = useUtilityStore()
const summaryOrders = computed(() => order.orderSummaryAll)

const paginatedSummaryOrders = computed(() => {
    const itemsPerPage = 23
    const pages = []
    for (let i = 0; i < summaryOrders.value.length; i += itemsPerPage) {
        pages.push(summaryOrders.value.slice(i, i + itemsPerPage))
    }
    return pages
})

const printPage = () => {
    const printContent = document.querySelector('.a4-pages').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

onMounted(() => {
    order.summaryOrderAll(util.summaryAll)
    console.log('all', summaryOrders)
})
</script>

<style scoped>
.a4-pages {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.a4-page {
    width: 210mm;
    height: 297mm;
    padding: 15mm 20mm;
    background-color: white;
    box-shadow: 0 0 5mm rgba(0, 0, 0, 0.1);
    margin-bottom: 5mm;
    display: flex;
    flex-direction: column;
    gap: 5mm;
    page-break-after: always;
}

.header {
    text-align: center;
    margin-bottom: 1mm;
}

.header h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: #333;
}

.order-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1px;
}

.order-table th,
.order-table td {
    border: 1px solid #000;
    padding: 8px 12px;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
}

.order-table th {
    background-color: #f5f5f5;
}

.order-table td {
    background-color: #fff;
}

.print-icon-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 5px;
    margin-bottom: 10px;
}

@media print {
    .print-icon-container {
        display: none;
    }

    @page {
        margin: 0;
    }

    body {
        margin: 0;
        padding: 0;
    }
}
</style>