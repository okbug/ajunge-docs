import {createNamespacedHelpers} from 'vuex'
let {mapState} = createNamespacedHelpers('user')
export default {
    data(){
        return {menuTree:[]}
    },
    computed:{
        ...mapState(['userInfo'])
    },
    created(){
        let mapping = {};
        let authList = this.userInfo.authList; // 菜单权限
        authList.forEach(a=>{ 
            a.children = [];
            mapping[a.id] = a;// 将自己放到映射表里 方便后续可以找到父路由
            if(a.pid == -1){
                this.menuTree.push(a);
            }else{
                mapping[a.pid] && mapping[a.pid].children.push(a);
            }
        })
    },
    render(){
        const renderChildren = (list)=>{
            return list.map(item=>{
                return item.children.length?
                <el-submenu index={item._id}>
                    <div slot="title">{item.name}</div>
                    {renderChildren(item.children)}
                </el-submenu>:
                <el-menu-item index={item.path}>{item.name}</el-menu-item>
            })
        }
        return <el-menu background-color="#2a2a2a" text-color="#fff"  active-text-color="#fff" router={true}>
            {renderChildren(this.menuTree)}
        </el-menu> 
    }
}