<template>
    <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
        aria-label="Breadcrumb">
        <ol class="inline-flex items-center rtl:space-x-reverse">
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
                <div v-if="index !== breadcrumbs.length - 1" class="flex items-center">
                    <router-link :to="crumb.path"
                        class="inline-flex items-center mx-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                        {{ crumb.meta.breadcrumb }}
                    </router-link>
                    <svg class="rtl:rotate-180 block w-3 h-3 mx-2 text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                </div>
                <div v-else class="flex items-center">
                    <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ crumb.meta.breadcrumb }}</span>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
    const pathArray = route.path.split('/').filter(path => path);
    const breadcrumbArray = [];

    pathArray.forEach((_, index) => {
        const path = '/' + pathArray.slice(0, index + 1).join('/');
        const route = router.resolve(path);

        if (route.meta && route.meta.breadcrumb) {
            breadcrumbArray.push(route);
        }
    });

    return breadcrumbArray;
});
</script>