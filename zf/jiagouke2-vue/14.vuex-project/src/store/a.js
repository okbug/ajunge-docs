import c from './c'
export default {
    namespaced:true,
    state:{
        age:222
    },
    getters:{

    },
    actions:{

    },
    mutations:{
        changeAge(state,payload){
            state.age += payload;
        }
    },
    modules:{
        c
    }
}