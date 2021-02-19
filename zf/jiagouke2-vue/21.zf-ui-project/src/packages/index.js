// 总入口
import Button from './button';
import Icon from './icon';
import ButtonGroup from './button-group';
import Carousel from './carousel'
import CarouselItem from './carousel-item'
import Message from './message'
// 这几个组件一起打包
const plugins = [
    Button,
    Icon,
    ButtonGroup,
    Carousel,
    CarouselItem
]
const install = (app) =>{
    plugins.forEach(plugin => app.use(plugin));
}
export default {
    install
}
export {
    Icon,
    Button,
    ButtonGroup,
    Message
}

// import ZfUi from 'zf-ui'
// app.use(ZfUi)