<template>
    <div class="flex font-kanit">
        <Sidebar />
        <div :class="[isSidebarOpen ? 'ml-64' : 'ml-20', 'flex-1 transition-margin duration-300']">
            <Nav />
            <main class="mt-16 p-4">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Nav from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

provide('isSidebarOpen', isSidebarOpen)
provide('toggleSidebar', toggleSidebar)

</script>