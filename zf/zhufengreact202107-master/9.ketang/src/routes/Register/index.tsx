import React,{PropsWithChildren} from 'react'
import {connect} from 'react-redux';
import { ProfileState } from '@/store/reducers/profile';
import {RouteComponentProps,Link} from 'react-router-dom';
import {CombinedState} from '@/store/reducers';
import NavHeader from '@/components/NavHeader';
import actions from '@/store/actions/profile';
import {message,Button,Form,Input} from 'antd';
import {UserAddOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {RegisterPayload} from '@/typings/user';
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    [key in keyof typeof actions]:any
};
interface Params{}
type Props = PropsWithChildren<RouteComponentProps<Params>&StateProps&DispatchProps>
function Register(props:Props) {
    const handleFinish = (values:RegisterPayload)=>{
        console.log(values);
        props.register(values);
    }
    const handleFinishFailed = (errorInfo:any)=>{
        console.log(errorInfo);
       message.error('表单校验失败');
    }
    return (
        <section>
           <NavHeader history={props.history}>注册</NavHeader>
           <Form
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
              className="regiter-form"
           >
               <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{required:true,message:'请输入用户名'}]}
               >
                   <Input prefix={<UserAddOutlined/>} placeholder="用户名"/>
               </Form.Item>
               <Form.Item
                  label="密码"
                  name="password"
                  rules={[{required:true,message:'请输入密码'}]}
               >
                   <Input prefix={<LockOutlined/>} placeholder="密码"/>
               </Form.Item>
               <Form.Item
                  label="确认密码"
                  name="confirmPassword"
                  rules={[{required:true,message:'请输入确认密码'}]}
               >
                   <Input prefix={<LockOutlined/>} placeholder="密码"/>
               </Form.Item>
               <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[{required:true,message:'请输入邮箱'}]}
               >
                   <Input prefix={<MailOutlined/>} type="mail" placeholder="邮箱"/>
               </Form.Item>
               <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-submit"
                  >注册</Button>
                  或者<Link to="/login">立刻登录!</Link>
               </Form.Item>
           </Form>
        </section>
    )
}
function mapStateToProps(state:CombinedState):ProfileState{
    return state.profile;
}
export default connect(mapStateToProps,actions)(Register);