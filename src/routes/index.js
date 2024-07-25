import { createWebHistory, createRouter } from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
    { path: '/', component: () => import('../views/authentication/Login.vue') },
    { path: '/sidebar', component: () => import('../components/Sidebar.vue') },
    { path: '/home', component: () => import('../views/Main.vue') },
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;