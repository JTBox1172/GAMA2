import { createRouter, createWebHistory } from 'vue-router'
import GraphView from '../views/GraphView.vue'
import TablesView from '../views/TablesView.vue'
import HomeView from '../views/HomeView.vue'
import UploadView from '@/views/UploadView.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '',
            component: HomeView,
        },
        {
            path: '/graph-view',
            name: '',
            component: GraphView,
        },
        {
            path: '/tables-view',
            name: '',
            component: TablesView,
        },
        {
            path: '/upload-data',
            name: 'upload-data',
            component: UploadView,
        },
    ],
})

export default router
