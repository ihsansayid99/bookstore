import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'
import dialog from './dialog'
import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sideBar: false
    },
    mutations: {
        setSideBar: (state, value) => {
            state.sideBar = value
        }
    },
    actions: {
        setSideBar: ({commit}, value) => {
            commit('setSideBar', value)
        }
    },
    getters: {
        sideBar: state => state.sideBar
    },
    modules: {
        cart,
        alert,
        dialog,
        auth
    }
})
export default store;