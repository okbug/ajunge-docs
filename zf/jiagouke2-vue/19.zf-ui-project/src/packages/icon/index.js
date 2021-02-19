import Icon from './icon.vue'
import '../../style/icon.scss'
// Button组件是可以单独使用
// import {Button} from 'zf-ui';
// app.use(Button)

Icon.install = (app) => { // Vue3.0 app  createApp().use().mount()
    app.component(Icon.name,Icon)
}
export default Icon
