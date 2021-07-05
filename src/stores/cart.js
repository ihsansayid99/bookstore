export default {
    namespaced: true,
    state: {
        carts: [],
    },
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: (state, payload) => {
            let idx = state.carts.indexOf(payload);
            state.carts.splice(idx,1,{
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity 
            });
            if(payload.quantity <= 0) {
                state.carts.splice(idx,1)
            }
        },
        remove: (state, payload) => {
            let idx = state.carts.indexOf(payload);
            state.carts.splice(idx, 1)
        },
        set: (state, payload) => {
            state.carts = payload
        },
    },
    actions: {
        add: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if(!cartItem){
                commit('insert', payload)
            }else{
                cartItem.quantity++
                commit('update', cartItem)
            }
        },
        remove: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if(cartItem.quantity > 0){
                cartItem.quantity = cartItem.quantity - 1
                commit('update', cartItem)
            }else{
                commit('remove', payload)
            }
        },
        set: ({commit}, payload) => {
            commit('set', payload)
        },
    },
    getters: {
        carts: state => state.carts,
        count: (state) => {
            return state.carts.length
        },
        totalPrice: state => {
            return state.carts.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price, 0)
        },
        totalQuantity: state => {
            return state.carts.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)
        },
        totalWeight: state => {
            return state.carts.reduce((totalWeight, cartItem) => totalWeight + cartItem.weight, 0)
        }
    }
}