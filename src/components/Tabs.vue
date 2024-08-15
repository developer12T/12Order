<template>
    <div>
        <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li v-for="(tab, index) in tabs" :key="index" class="me-2">
                <a href="#" @click.prevent="selectTab(index)" :class="['inline-block p-4 rounded-t-lg',
                actived(index) ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50']"
                    :aria-current="actived(index) ? 'page' : null">
                    {{ tab.name }}
                </a>
            </li>
        </ul>
        <div class="p-4 bg-gray-50 rounded-lg">
            <slot :activeTab="modelValue"></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => []
    },
    modelValue: {
        type: Number,
        default: 0,
    }
});

const emit = defineEmits(['update:modelValue'])

const selectTab = (index) => {
    emit('update:modelValue', index)
};

const actived = (index) => {
    return props.modelValue === index
}
</script>
