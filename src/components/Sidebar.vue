<template>
    <div class="w-64 h-screen bg-gray-100 p-4 font-kanit flex flex-col justify-between">
        <div>
            <router-link to="/" class="flex items-center space-x-2">
                <img :src="logoSrc" alt="Logo" class="h-10">
                <span class="font-bold text-xl">{{ title }}</span>
            </router-link>
            <nav class="flex-1 mt-4">
                <ul class="space-y-2">
                    <li v-for="(item, index) in menuItems" :key="index">
                        <div v-if="item.submenu">
                            <button @click="toggleSubmenu(index)" type="button"
                                :class="['flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100', isSubmenuOpen(index) ? 'bg-gray-200' : '']">
                                <Icon :icon="item.icon"
                                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900">
                                </Icon>
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ item.name
                                    }}</span>
                                <Icon class="w-3 h-3" icon="mdi:chevron-down"></Icon>
                            </button>
                            <ul v-if="isSubmenuOpen(index)" class="py-2 space-y-2">
                                <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                    <router-link :to="subItem.link"
                                        class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                        :class="{ 'bg-gray-200': isActive(subItem.link) }">{{ subItem.name
                                        }}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            <router-link :to="item.link"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
                                :class="{ 'bg-gray-200': isActive(item.link) }">
                                <Icon :icon="item.icon" class="h-6 w-6"></Icon>
                                <span class="ml-3">{{ item.name }}</span>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <router-link to="#"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200">
            <Icon icon="mdi:logout" class="h-6 w-6"></Icon>
            <span class="ml-3">ออกจากระบบ</span>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const logoSrc = ref('/public/logo-onetwo.png');
const title = ref('12Order');
const menuItems = ref([
    { name: 'หน้าหลัก', icon: 'mdi:home', link: '#', submenu: null },
    { name: 'รายงาน', icon: 'mdi:chart-bar', link: '#', submenu: null },
    {
        name: 'ร้านค้า',
        icon: 'mdi:store',
        link: '#',
        submenu: [
            { name: 'ร้านที่ 1', link: '#' },
            { name: 'ร้านที่ 2', link: '#' }
        ]
    },
    { name: 'สินค้า', icon: 'mdi:package-variant', link: '#', submenu: null },
    { name: 'โปรโมชั่น', icon: 'mdi:tag', link: '#', submenu: null },
    { name: 'ผู้ใช้งาน', icon: 'mdi:account', link: '#', submenu: null }
])

const openSubmenus = ref(new Set());
const toggleSubmenu = (index) => {
    if (openSubmenus.value.has(index)) {
        openSubmenus.value.delete(index);
    } else {
        openSubmenus.value.add(index);
    }
}
const isSubmenuOpen = (index) => {
    return openSubmenus.value.has(index);
}

const route = useRoute();
const isActive = (link) => {
    return route.path === link
}

</script>