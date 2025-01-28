import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import Task1Scatterplot from '@/components/Task1Scatterplot.vue';
import Task2SpiderChart from '@/components/Task2SpiderChart.vue';
import Task3Heatmap from '@/components/Task3Heatmap.vue';
import Task4NetworkGraph from '@/components/Task4NetworkGraph.vue';

const routes = [
    { path: '/', component: LandingPage },
    { path: '/task1', component: Task1Scatterplot },
    { path: '/task2', component: Task2SpiderChart },
    { path: '/task3', component: Task3Heatmap },
    { path: '/task4', component: Task4NetworkGraph },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
