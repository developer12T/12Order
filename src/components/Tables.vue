<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-if="showCheckbox" scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                @change="selectAll" :checked="isAllSelected" />
                            <label for="checkbox-all" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th v-for="(column, index) in columns" :key="index" class="px-6 py-3">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                    @click="rowClicked(row)">
                    <td v-if="showCheckbox" class="w-4 p-4">
                        <div class="flex items-center">
                            <input :id="'checkbox-' + index" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                @change.stop="selectRow(row)" :checked="isSelected(row)" />
                            <label :for="'checkbox-' + index" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4">
                        {{ row[column.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    showCheckbox: {
        type: Boolean,
        default: true
    }
});

const emits = defineEmits(['update:selected', 'row:clicked']);

const selectedRows = ref([]);
const isAllSelected = ref(false);

const selectRow = (row) => {
    if (isSelected(row)) {
        selectedRows.value = selectedRows.value.filter(selected => selected !== row);
    } else {
        selectedRows.value.push(row);
    }
    emitSelectedRows();
};

const isSelected = (row) => {
    return selectedRows.value.includes(row);
};

const selectAll = () => {
    if (isAllSelected.value) {
        selectedRows.value = [];
    } else {
        selectedRows.value = [...props.data];
    }
    isAllSelected.value = !isAllSelected.value;
    emitSelectedRows();
};

const emitSelectedRows = () => {
    emits('update:selected', selectedRows.value);
};

const rowClicked = (row) => {
    emits('row:clicked', row.orderNo);
};

watch(selectedRows, (newVal) => {
    isAllSelected.value = newVal.length === props.data.length;
});
</script>