import React, { useEffect } from 'react';
import { Lessons } from '@/store/reducers/home';
import { MenuOutlined } from '@ant-design/icons';
import Lesson from '@/typings/lesson';
import { Link } from 'react-router-dom'
import { Card, Button, Alert, Skeleton } from 'antd';
interface Props {
    lessons: Lessons,
    getLessons: any
}
function LessonList(props: Props) {
    useEffect(() => {
        if (props.lessons.list.length == 0) {
            props.getLessons();
        }
    }, []);
    return (
        <section className="lesson-list">
            <h2><MenuOutlined />全部课程</h2>
            <Skeleton
                loading={props.lessons.list.length === 0 && props.lessons.loading}
                active
                paragraph={{ rows: 8 }}
            >
                {
                    props.lessons.list.map((lesson: Lesson, index: number) => (
                        <Link key={lesson.id} to={{ pathname: `/detail/${lesson.id}`, state: lesson }}>
                            <Card hoverable={true} style={{ width: '100%' }} cover={<img src={lesson.poster} />}>
                                <Card.Meta title={lesson.title} description={`价格:${lesson.price}`} />
                            </Card>
                        </Link>
                    ))
                }
                {
                    props.lessons.hasMore ? (
                        <Button
                            style={{ width: '100%' }}
                            loading={props.lessons.loading}
                            type="primary"
                            onClick={props.getLessons}>{props.lessons.loading ? '加载中' : '加载更多'}</Button>
                    ) : <Alert style={{ textAlign: 'center' }} message="到底了" type="warning"></Alert>
                }
            </Skeleton>

        </section>
    )
}
export default LessonList;