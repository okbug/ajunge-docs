
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
import './index.less';
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & typeof actionCreators>;
function Login(props: Props) {
    const onFinish = (values: any) => {
        props.login(values);
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error('表单验证失败' + errorInfo);
    }
    return (
        <>
            <NavHeader history={props.history} >登录</NavHeader>
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
                <Form.Item >
                    <Button type="primary" htmlType="submit" className="user-form-button">登录</Button>
                    没有账号, <Link to="/register">立刻注册</Link>
                </Form.Item>
            </Form>
        </>
    )
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(mapStateToProps, actionCreators)(Login);