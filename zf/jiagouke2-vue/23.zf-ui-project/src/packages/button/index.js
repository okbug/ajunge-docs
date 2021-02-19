import Button from './button.vue'
import '../../style/button.scss'
// Button组件是可以单独使用
// import {Button} from 'zf-ui';
// app.use(Button)



Button.install = (app) => {
    app.component(Button.name,Button)
}
export default Button
