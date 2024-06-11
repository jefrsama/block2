// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import MyPage from '../components/MyPage.vue'
import SurveyPage from '../components/SurveyPage.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/my',
        name: 'MyPage',
        component: MyPage
    },
    {
        path: '/survey',
        name: 'SurveyPage',
        component: SurveyPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
