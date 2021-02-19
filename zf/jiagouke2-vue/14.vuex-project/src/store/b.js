export default {
    namespaced:true,
    state:{
        age:333
    },
    getters:{

    },
    actions:{
    },
    mutations:{
        changeAge(state,payload){
            state.age += payload;
        }
    }
}