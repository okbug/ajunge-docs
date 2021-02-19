import CarouselItem from '../carousel/carousel-item'
import '../../style/carousel-item.scss'
CarouselItem.install = (app) => {
    app.component(CarouselItem.name,CarouselItem)
}
export default CarouselItem
