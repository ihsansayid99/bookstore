import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import store from '../stores/index'

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
            path: '/checkout',
            name: 'checkout',
            component: () => import('../views/Checkout'),
            meta: { auth: true }
        },
        {
            path: '/payment',
            name: 'payment',
            component: () => import('../views/Payment'),
            meta: { auth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile'),
            meta: { auth: true }
        },
        {
            path: '/my-order',
            name: 'my-order',
            component: () => import('../views/MyOrder.vue'),
            meta: { auth: true }
        },
        {
            path: '*',
            redirect: {
                name: 'home'
            }
        }
    ]
})

Routes.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
      if(store.getters['auth/guest']){
        store.dispatch('alert/set', {
          status: true,
          text: 'Login First',
          color: 'error'
        })
        store.dispatch('setPrevUrl', to.path)
  
        store.dispatch('dialog/setComponent', 'login')
      }else{
        next()
      }
    }else{
      next()
    }
  })

export default Routes;