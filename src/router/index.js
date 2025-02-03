import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import Task1Scatterplot from '@/components/Tasks/Task1Scatterplot.vue';
import Task2SpiderChart from '@/components/Tasks/Task2SpiderChart.vue';
import Task3Heatmap from '@/components/Tasks/Task3Heatmap.vue';
import Task4NetworkGraph from '@/components/Tasks/Task4NetworkGraph.vue';
import Task from '@/components/Tasks/Task1Scatterplot.vue';

const routes = [
    { path: '/Daten-Krimi/', component: LandingPage },
    { path: '/Daten-Krimi/task1', component: Task1Scatterplot },
    { path: '/Daten-Krimi/task2', component: Task2SpiderChart },
    { path: '/Daten-Krimi/task3', component: Task3Heatmap },
    { path: '/Daten-Krimi/task4', component: Task4NetworkGraph },
    { path: '/Daten-Krimi/task', component: Task },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
