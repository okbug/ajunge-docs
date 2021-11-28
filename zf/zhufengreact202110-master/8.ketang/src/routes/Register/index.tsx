
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import actionCreators from '@/store/actionCreators/profile';
import { RouteComponentProps } from 'react-router-dom';
import NavHeader from '@/components/NavHeader';
import { message, Descriptions, Alert, Button, Form, Input } from 'antd';
import { UserAddOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { RegisterPayload } from '@/typings/user';
import './index.less';
type DispatchProps = typeof actionCreators;//把actionCreators映射为属性对象
type StateProps = ReturnType<typeof mapStateToProps>//把mapStateToProps返回值类型映射为属性对象
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & DispatchProps & StateProps>;
function Register(props: Props) {
    const onFinish = (values: RegisterPayload) => {
        console.log(values);
        props.register(values);
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error('表单验证失败' + errorInfo);
    }
    return (
        <>
            <NavHeader history={props.history} >注册</NavHeader>
            <Form
                className="user-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input prefix={<UserAddOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input prefix={<LockOutlined />} placeholder="密码" />
                </Form.Item>
                <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: '请输入确认密码' }]}>
                    <Input prefix={<LockOutlined />} placeholder="确认密码" />
                </Form.Item>
                <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input type="email" prefix={<MailOutlined />} placeholder="邮箱" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" className="user-form-button">注册</Button>
                    已有账号, <Link to="/login">立刻登录</Link>
                </Form.Item>
            </Form>
        </>
    )
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(mapStateToProps, actionCreators)(Register);