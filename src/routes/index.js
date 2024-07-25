import { createWebHistory, createRouter } from 'vue-router'
import orderRoute from './modules/orderRoute.js'

const routes = [
    { path: '/', component: () => import('../views/authentication/Login.vue') },
    { path: '/sidebar', component: () => import('../components/Sidebar.vue') },
    { path: '/home', component: () => import('../views/Layout.vue') },
    // {
    //     path: '/',
    //     component: Main,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import('../components/Sidebar.vue')
    //         },
    //     ]
    // }
    ...orderRoute
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;