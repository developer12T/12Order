<template>
    <div>
        <input type="text" id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ค้นหา..." v-model="searchText">
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUtilityStore } from '../stores'

const util = useUtilityStore()

const searchText = computed({
    get: () => util.searchText,
    set: value => util.searchText = value
})
</script>