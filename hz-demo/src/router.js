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
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "pagination" */ './views/Pagination.vue')
        }
    ]
})
