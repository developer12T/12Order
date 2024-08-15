<template>
    <div v-if="isVisible" :class="['fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50', { hidden: !isVisible }]">
      <div class="relative p-4 w-full max-w-md">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" @click="closeAction" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
            <Icon icon="mdi:close" width="20" height="20"></Icon>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <Icon :icon="icon" class="mx-auto mb-4" width="48" height="48"></Icon>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{{ message }}</h3>
            <button @click="confirmAction" type="button" class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              {{ confirmText }}
            </button>
            <button @click="closeAction" type="button" class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700">
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import { Icon } from '@iconify/vue'
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
    confirmText: {
      type: String,
      default: "Yes, I'm sure",
    },
    cancelText: {
      type: String,
      default: 'No, cancel',
    },
    icon: {
      type: String,
      default: 'mdi:alert-circle-outline',
    },
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const closeAction = () => {
    emit('close')
  };
  
  const confirmAction = () => {
    emit('confirm')
  };
  </script>
  