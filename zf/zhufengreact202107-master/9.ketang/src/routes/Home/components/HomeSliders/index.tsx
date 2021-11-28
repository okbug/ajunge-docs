import React, { useState, CSSProperties, useEffect } from 'react'
import {Carousel} from 'antd';
import './index.less';
import {Slider} from '@/typings/slider';
interface Props{
    sliders:Slider[],
    getSliders:any
}
function HomeSliders(props: Props) {
    useEffect(()=>{
        props.getSliders();
    },[]);
    return (
        <Carousel effect={'scrollx'} autoplay>
            {
                props.sliders.map((item:Slider,index:number)=>(
                    <div key={item.url}><img src={item.url}/></div>
                ))
            }
        </Carousel>
    )
}

export default HomeSliders;