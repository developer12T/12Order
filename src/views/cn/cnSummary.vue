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
                <h1>(ใบรับคืนสินค้า)</h1>
            </div>
            <div class="flex flex-row justify-between mt-2">
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label"><strong>ชื่อลูกค้า</strong></p>
                        <p>{{ page.order.storeId }} {{ page.order.storeName }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>ที่อยู่ลูกค้า</strong></p>
                        <p>{{ page.order.address }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>สถานที่ส่ง</strong></p>
                        <p>{{ page.order.address }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>เบอร์โทร</strong></p>
                        <p>{{ page.order.tel }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>หมายเหตุ</strong></p>
                        <p>{{ page.order.note || '' }}</p>
                    </div>
                </div>
                <div class="info-column">
                    <div class="aligned-item">
                        <p class="label"><strong>เลขที่เอกสาร</strong></p>
                        <p>{{ page.order.orderNo }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>วันที่เอกสาร</strong></p>
                        <p>{{ page.order.createDate }}</p>
                    </div>
                    <div class="aligned-item">
                        <p class="label"><strong>พนักงานขาย</strong></p>
                        <p>{{ page.order.saleCode }} {{ page.order.saleMan }}</p>
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
                    <tr v-for="(item) in page.items" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.convertedUnits.large.qty }}</td>
                        <td>{{ item.convertedUnits.medium.qty }}</td>
                        <td>{{ item.convertedUnits.small.qty }}</td>
                    </tr>

                    <tr v-for="i in (itemsPerPage - page.items.length)" :key="'empty-' + i">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>

                    <template
                        v-if="pageIndex === paginatedSummary.length - 1 || paginatedSummary[pageIndex + 1]?.order !== page.order">
                        <tr>
                            <td colspan="2" class="text-center font-bold">รวมทั้งหมด</td>
                            <td>{{ page.totalList.large }}</td>
                            <td>{{ page.totalList.medium }}</td>
                            <td>{{ page.totalList.small }}</td>
                        </tr>
                        <div class="mt-5">
                            <p>d</p>
                            <p>d</p>
                            <p>d</p>
                            <p>d</p>
                        </div>
                    </template>
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

const itemsPerPage = 16
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
    line-height: 1.5;
    font-size: 12px;
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