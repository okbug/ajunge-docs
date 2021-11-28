import React,{PropsWithChildren,useEffect} from 'react'
import {connect} from 'react-redux';
import { ProfileState } from '@/store/reducers/profile';
import {RouteComponentProps,Link} from 'react-router-dom';
import {CombinedState} from '@/store/reducers';
import NavHeader from '@/components/NavHeader';
import actions from '@/store/actions/profile';
import {message,Button,Form,Input} from 'antd';
import {UserAddOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import {LoginPayload} from '@/typings/user';
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    [key in keyof typeof actions]:any
};
interface Params{}
type Props = PropsWithChildren<RouteComponentProps<Params>&StateProps&DispatchProps>
function Login(props:Props) {
    const handleFinish = (values:LoginPayload)=>{
        props.login(values);
    }
    const handleFinishFailed = (errorInfo:any)=>{
       message.error('表单校验失败'+errorInfo);
    }
    return (
        <section>
           <NavHeader history={props.history}>登录</NavHeader>
           <Form
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
              className="login-form"
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
               <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-submit"
                  >登录</Button>
                  或者<Link to="/register">立刻注册!</Link>
               </Form.Item>
           </Form>
        </section>
    )
}
function mapStateToProps(state:CombinedState):ProfileState{
    return state.profile;
}
export default connect(mapStateToProps,actions)(Login);