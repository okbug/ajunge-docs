import ButtonGroup from './button-group.vue'
import '../../style/button-group.scss'
// Button组件是可以单独使用
// import {Button} from 'zf-ui';
// app.use(Button)


ButtonGroup.install = (app) => {
    app.component(ButtonGroup.name,ButtonGroup)
}
export default ButtonGroup
