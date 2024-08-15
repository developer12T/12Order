<template>
    <div class="mb-5">
        <Breadcrumb />
    </div>
    <div class="a4-pages">
        <div class="print-icon-container">
            <Icon @click="printPage" icon="noto-v1:printer" height='30' width='30'/>
        </div>
        <div v-for="(order, index) in summaryOrders" :key="index" class="a4-page">
            <div class="header">
                <h1>(ใบสั่งจอง)</h1>
            </div>
            <div class="flex flex-row justify-between mt-2">
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label"><strong>ชื่อลูกค้า</strong></p>
                        <p>{{ order.storeId }} {{ order.storeName }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>ที่อยู่ลูกค้า</strong></p>
                        <p>{{ order.address }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>สถานที่ส่ง</strong></p>
                        <p>{{ order.address }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>เบอร์โทร</strong></p>
                        <p>{{ order.tel }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>หมายเหตุ</strong></p>
                        <p>{{ order.note || '' }}</p>
                    </div>
                </div>
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label"><strong>เลขที่เอกสาร</strong></p>
                        <p>{{ order.orderNo }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>วันที่เอกสาร</strong></p>
                        <p>{{ order.createDate }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>พนักงานขาย</strong></p>
                        <p>{{ order.saleCode }} {{ order.saleMan }}</p>
                    </div>
                </div>
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
                    <tr v-for="item in order.list" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.convertedUnits.large.qty }}</td>
                        <td>{{ item.convertedUnits.medium.qty }}</td>
                        <td>{{ item.convertedUnits.small.qty }}</td>
                    </tr>
                    <tr v-for="i in (16  - order.list.length)" :key="'empty-' + i">
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
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useOrderStore, useUtilityStore } from '../../stores'
import Breadcrumb from '../../components/Breadcrumb.vue'

const order = useOrderStore()
const util = useUtilityStore()
const summaryOrders = computed(() => order.orderSummary)

const printPage = () => {
    const printContent = document.querySelector('.a4-pages').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

onMounted(() => {
    order.summaryOrder(util.summary)
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
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: #333;
}

.info-column {
    display: flex;
    flex-direction: column;

}

.aligned-item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1px; 
}

.label {
    width: 100px; 
    flex-shrink: 0; 
    text-align: left; 
    margin-right: 1px; 
    font-weight: bold;
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

p {
    margin: 0 0 5px;
    line-height: 1.6;
    font-size: 14px;
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