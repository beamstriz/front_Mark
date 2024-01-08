import { createRouter, createWebHistory } from 'vue-router';

import PageLogin from '@/views/PageLogin.vue';
import PageLoginSapiens from '@/views/PageLoginSapiens'
import HomeView from '@/views/HomeView.vue';

const routes = [
    {
        path: '/',
        redirect:'/login',
    },

    {
    name: 'PageLogin',
    path: '/login',
    component: PageLogin
    },

    {
    name: 'PageLoginSapiens',
    path: '/loginSapiens',
    component: PageLoginSapiens   
    },

    {
    name: 'HomeView',
    path: '/home',
    component: HomeView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router