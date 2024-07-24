<template>
    <nav
        class="fixed top-0 left-0 z-40 w-full h-16 bg-gray-100 shadow-lg flex items-center justify-between px-4 font-kanit">
        <div class="flex items-center">
            <button @click="toggleSidebar"
                class="lg:flex hidden items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <Icon height="24" icon="bi:list" width="24" />
            </button>
            <router-link to="/" class="flex items-center ml-3">
                <img src="/logo-onetwo.png" class="h-10 mr-3" />
                <span class="self-center text-xl font-normal whitespace-nowrap">12Order</span>
            </router-link>
        </div>
        <div class="flex items-center">
            <div class="relative ml-3">
                <button @click="toggleUserMenu"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" type="button">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src="/user.png" alt="user photo" />
                </button>
                <div v-if="isUserMenuOpen" class="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <router-link to="/profile"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</router-link>
                    <router-link to="/settings"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</router-link>
                    <router-link to="/logout"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Icon } from '@iconify/vue';

const isUserMenuOpen = ref(false);
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleSidebar = inject('toggleSidebar');
</script>