import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'menu',
            component: () => import(/* webpackChunkName: "menu" */ './views/Menu.vue')
        },
        {
            path: '/terminology',
            name: 'terminology',
            component: () => import(/* webpackChunkName: "terminology" */ './views/Terminology.vue')
        },
        {
            path: '/pagination',
            name: 'pagination',
            component: () => import(/* webpackChunkName: "pagination" */ './views/Pagination.vue')
        },
        {
            path: '/tree',
            name: 'tree',
            component: () => import(/* webpackChunkName: "tree" */ './views/Tree.vue')
        },
        {
            path: '/eltree',
            name: 'eltree',
            component: () => import(/* webpackChunkName: "ElTree" */ './views/ElTree.vue')
        }
    ]
})
