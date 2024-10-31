<template>
    <div class="mb-5">
        <Breadcrumb />
    </div>
    <div class="a4-pages font-sarabun">
        <div class="print-icon-container">
            <Icon @click="printPage" icon="noto-v1:printer" height='30' width='30' />
        </div>
        <div v-for="(page, pageIndex) in paginatedSummary" :key="pageIndex" class="a4-page">
            <div class="header">
                <div class="flex flex-row justify-between">
                    <img src="/logo-onetwo.png" class="flex-none w-28">
                    <h1 class="flex items-center">บริษัท วันทูเทรดดิ้ง จำกัด</h1>
                    <p>FM-SA-015 rev.00 01/02/64</p>
                </div>
            </div>
            <!-- <div class="flex justify-center">
                <h5>ใบรับคืนสินค้า</h5>
            </div> -->
            <div class="flex flex-row justify-between">
                <p class="flex justify-start font-bold">เล่มที่ ............</p>
                <h5>ใบรับคืนสินค้า</h5>
                <p class="flex justify-end font-bold">เลขที่ 000001</p>
            </div>
            <div class="info">
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label">ชื่อลูกค้า</p>
                        <p>{{ page.order.storeName }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label">ที่อยู่ลูกค้า</p>
                        <p>{{ page.order.address }}</p>
                    </div>
                </div>
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label">รหัสลูกค้า</p>
                        <p>{{ page.order.storeId }} </p>
                    </div>
                    <div class="aligned-item">
                        <p class="label">อ้างอิงบิลเลขที่</p>
                        <p>.......................</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label">พนักงานขาย</p>
                        <p class="w-36">{{ page.order.saleCode }} {{ page.order.saleMan }}</p>
                    </div>
                </div>
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label">วันที่เอกสาร</p>
                        <p>{{ page.order.createDate }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label">วันที่บิล</p>
                        <p>....................</p>
                    </div>
                </div>
            </div>

            <table class="order-table mt-4">
                <thead>
                    <tr>
                        <th rowspan="2">รหัสสินค้า</th>
                        <th rowspan="2">รายการ</th>
                        <th colspan="3">จำนวนสินค้า</th>
                        <th rowspan="2">หมายเหตุ</th>
                    </tr>
                    <tr>
                        <th class="w-20">หีบ</th>
                        <th>ถุง/แพ็ค/แผง</th>
                        <th>ซอง/ขวด</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in page.items" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td class="text-left">{{ item.name }}</td>
                        <td>{{ item.convertedUnits.large.qty }}</td>
                        <td>{{ item.convertedUnits.medium.qty }}</td>
                        <td>{{ item.convertedUnits.small.qty }}</td>
                        <td></td>
                    </tr>

                    <tr v-for="i in (itemsPerPage - page.items.length)" :key="'empty-' + i">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td></td>
                    </tr>

                    <template
                        v-if="pageIndex === paginatedSummary.length - 1 || paginatedSummary[pageIndex + 1]?.order !== page.order">
                        <tr>
                            <td colspan="2" class="text-center font-bold">รวม</td>
                            <td>{{ page.totalList.large }}</td>
                            <td>{{ page.totalList.medium }}</td>
                            <td>{{ page.totalList.small }}</td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="mt-5">
                <div class="flex flex-row justify-between">
                    <p class="flex items-start">ผู้คืนสินค้า (ลูกค้า)
                        .............................................................................................................................
                    </p>
                    <p class="flex items-end">วันที่ ...............................................................</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>ผู้รับคืนสินค้า (รถขนส่ง)
                        ....................................................................................................................
                    </p>
                    <p class="flex items-end">วันที่ ...............................................................</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>ผู้ตรวจสอบ (คลังสินค้า/บัญชี)
                        ...........................................................................................................
                    </p>
                    <p class="flex items-end">วันที่ ...............................................................</p>
                </div>
            </div>
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

const itemsPerPage = 20
const paginatedSummary = computed(() => {
    const pages = []
    summaryOrders.value.forEach(order => {
        const list = order.list || []
        for (let i = 0; i < list.length; i += itemsPerPage) {
            const pageItems = list.slice(i, i + itemsPerPage)
            pages.push({
                order,
                items: pageItems,
                totalList: order.totalList
            })
        }
    })
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
    padding: 5mm 8mm;
    background-color: white;
    box-shadow: 0 0 5mm rgba(0, 0, 0, 0.1);
    margin-bottom: 2mm;
    display: flex;
    flex-direction: column;
    gap: 2mm;
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

.header p {
    font-size: 10px;
}

.info {
    display: flex;
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
    font-size: 12px;
    line-height: 0.6;
}

.order-table tr {
    text-align: center;
}

.order-table th {
    /* padding: 2px 5px 10px 2px; */
    background-color: #f5f5f5;
}

.order-table td {
    background-color: #fff;
}

p {
    margin: 0 0 5px;
    line-height: 1.5;
    font-size: 12px;
}

h1 {
    font-size: 20px;
    font-weight: bold;
}

h5 {
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
    margin-top: -20px;
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