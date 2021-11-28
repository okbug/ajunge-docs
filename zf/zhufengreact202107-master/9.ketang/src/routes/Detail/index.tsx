import React, { PropsWithChildren, useState, useEffect } from 'react';
import NavHeader from '@/components/NavHeader';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { Lesson, LessonResult } from '@/typings/lesson';
import { getLesson } from '@/api/home';
interface Params { id: string }
type Props = PropsWithChildren<RouteComponentProps<Params>>
function Detail(props: Props) {
    let [lesson, setLesson] = useState<Lesson>({} as Lesson);
    useEffect(() => {
        let lesson: any = props.location.state;
        if (!lesson) {
            ; (async function () {
                let id = props.match.params.id;
                let result = await getLesson<LessonResult>(id);
                if (result.success) {
                    lesson = result.data;
                }
                setLesson(lesson);
            })();
        }else{
            setLesson(lesson);
        }

    }, []);
    return (
        <>
            <NavHeader history={props.history}>登录</NavHeader>
            <Card hoverable={true} style={{ width: '100%' }}
                cover={<video src={lesson.video} controls autoPlay={false}></video>}>
                <Card.Meta title={lesson.title} description={`价格:${lesson.price}`} />
            </Card>
        </>
    )
}
export default connect()(Detail);