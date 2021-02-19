export default {
    name:'routerLink',
    props:{ // 属性接受
        to:{
            type:String,
            required:true
        },
        tag:{
            type:String,
            default:'a'
        }
    }, // 写组件库 都可以采用jsx 来写
    methods:{
        handler(to){
            this.$router.push(to);
        }
    },  
    render(){
        let {tag,to} = this;
        // jsx 语法  绑定事件
        return <tag onClick={this.handler.bind(this,to)}>{this.$slots.default}</tag>
    }
}