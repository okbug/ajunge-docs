import React, { useState, CSSProperties, PropsWithChildren, useEffect } from 'react'
import { Lesson } from '@/typings/lesson';
import { Lessons } from '@/store/reducers/home';
import { Card, Button, Alert, Skeleton } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.less';

type Props = PropsWithChildren<{
    lessons: Lessons,
    getLessons: () => any,
    homeContainerRef: any
}>
interface VisibleLesson extends Lesson {
    index: number
}
function LessonList(props: Props, forwardRef: any) {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons()
        }
        forwardRef.current = forceUpdate;
    }, []);
    useEffect(() => {
        forceUpdate();
    }, []);
    //1rem=>像素 37.5px
    const remSize: number = parseFloat(document.documentElement.style.fontSize);
    //计算每个条目实际的高度 = 每个条目的高度/1个rem的高度 * rem的px值=在我们这个项目中目前每个条目实际的高度
    //650px是设计稿中每个课程卡片的高度，在iphone6下高度变成一半就是325px
    //(650 / 75)是在计算在原来的设计搞中，每个卡片占据多少个REM
    const itemSize: number = (650 / 75) * remSize;
    //容器的实际高度
    const containerHeight = window.innerHeight - (220 / 75) * remSize;
    //home-container真实的DOM元素
    const homeContainer = props.homeContainerRef.current;
    let start = 0, end = 0;
    if (homeContainer) {
        //轮播图160px 32.8px
        const scrollTop = homeContainer.scrollTop - 160 - 32.8;
        //得到向上卷去的数量 55px 10px 5.5 5 ,最终start索引就是5,指的是第6条
        start = Math.floor(scrollTop / itemSize);
        end = start + Math.floor(containerHeight / itemSize);
        start -= 2, end += 2;
        start = start < 0 ? 0 : start;
        end = end > props.lessons.list.length ? props.lessons.list.length : end;
    }
    //截取可视内容的条目  30条数据  一屏能显示10条  当前在第2页 9 11-20 22,最终渲染的就是9~22
    const visibleList: VisibleLesson[] = props.lessons.list.map((item: Lesson, index: number) => ({ ...item, index })).slice(start, end);
    const style: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: itemSize
    }
    let bottomTop = props.lessons.list.length * itemSize;
    return (
        <section className="lesson-list">
            <h2><MenuOutlined />全部课程</h2>
            <Skeleton
                loading={props.lessons.list.length === 0 && props.lessons.loading}
                active
                paragraph={{ rows: 8 }}
            >
                <div style={{
                    position: 'relative', width: '100%',
                    height: `${itemSize * props.lessons.list.length}px`
                }}>
                    {
                        visibleList.map((lesson: VisibleLesson) => (
                            <Link style={{ ...style, top: `${itemSize * lesson.index}px` }}
                                key={lesson.id} to={{ pathname: `/detail/${lesson.id}`, state: lesson }}>
                                <Card hoverable={true} style={{ width: '100%' }} cover={<img src={lesson.poster} alt={lesson.title} />}>
                                    <Card.Meta title={lesson.title} description={`价格:${lesson.price}元`} />
                                </Card>
                            </Link>
                        ))
                    }
                    {
                        props.lessons.hasMore ? (
                            <Button style={{ textAlign: 'center', top: `${bottomTop}px` }} block={true} type="primary" loading={props.lessons.loading} onClick={props.getLessons}
                            >{props.lessons.loading ? "" : '加载更多'}</Button>
                        ) : <Alert style={{ textAlign: 'center', top: `${bottomTop}px` }} message="我是有底线的" type="warning" />
                    }
                </div>
            </Skeleton>


        </section>
    )

}

export default React.forwardRef(LessonList);