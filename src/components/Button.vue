<template>
    <button :class="buttonClass" @click="onClick" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: 'blue'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click'])

const onClick = () => {
    if (!props.disabled) {
        emit('click')
    }
}

const buttonClass = computed(() => {
    return `
        ${props.disabled ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : `bg-${props.color}-500 hover:bg-${props.color}-600 text-white`}
        border 
        border-${props.color}-500 
        hover:border-${props.color}-600 
        focus:ring-4 
        focus:outline-none 
        focus:ring-${props.color}-300 
        font-medium 
        rounded-lg 
        text-sm 
        px-5 
        py-2 
        text-center 
        mb-2
    `
})
</script>