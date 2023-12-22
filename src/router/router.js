import { createRouter, createWebHistory } from 'vue-router';

import PageLogin from '@/views/PageLogin.vue';
import PageLoginSapiens from '@/views/PageLoginSapiens'

const routes = [
    {
    name: 'PageLogin',
    path: '/login',
    component: PageLogin
    },
    {
    name: 'PageLoginSapiens',
    path: '/loginSapiens',
    component: PageLoginSapiens   
    }
]

const router =createRouter({
    history: createWebHistory(),
    routes
})

export default router