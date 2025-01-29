import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';

import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue';

const routes = [
    { path: '/Daten-Krimi/', component: LandingPage },
    { path: '/Daten-Krimi/task1', component: HelloWorld },
    { path: '/Daten-Krimi/task2', component: TheWelcome },
    { path: '/Daten-Krimi/task3', component: HelloWorld },
    { path: '/Daten-Krimi/task4', component: TheWelcome }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
