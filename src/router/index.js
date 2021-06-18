import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(Router)

const Routes = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import('../views/Categories')
        },
        {
            path: '/books',
            name: 'books',
            component: () => import('../views/Books')
        },
        {
            path: '/category/:slug',
            name: 'category',
            component: () => import('../views/Category')
        },
        {
            path: '/book/:slug',
            name: 'book',
            component: () => import('../views/Book')
        },
        {
            path: '*',
            redirect: {
                name: 'home'
            }
        }
    ]
})

export default Routes;