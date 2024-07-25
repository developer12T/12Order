<template>
    <div>
        <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li v-for="(tab, index) in tabs" :key="index" class="me-2">
                <a href="#" @click.prevent="selectTab(index)" :class="['inline-block p-4 rounded-t-lg',
                isActive(index) ? 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500' :
                    'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300']"
                    :aria-current="isActive(index) ? 'page' : null">
                    {{ tab.name }}
                </a>
            </li>
        </ul>
        <div class="p-4 bg-gray-50 rounded-lg">
            <slot :activeTab="activeTab"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => []
    }
});

const activeTab = ref(0);

const selectTab = (index) => {
    activeTab.value = index;
};

const isActive = (index) => {
    return activeTab.value === index;
};
</script>
