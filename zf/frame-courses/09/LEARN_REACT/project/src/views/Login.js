import React from 'react';
import { connect } from 'react-redux'
import { loginFn } from '../store/actions/user'
import { Form, Input, Button, Checkbox } from 'antd';
import md5 from 'md5'
import '../scss/login.scss'

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

let Login = (props) => {

  let { loginFn, history } = props;
  console.log(props)

  const onFinish = (values) => {
    values.passwordMd5 = md5(values.passwordMd5)
    // console.log('Success:', values);
    loginFn(values).then(data => {
      history.replace('/')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login_box">
      <Form
        layout='vertical'
        name="basic"
        initialValues={{ userName: 'admin' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="passwordMd5"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Login = connect(() => ({}), (dispatch) => {
  return {
    loginFn(params) {
      return dispatch(loginFn(params))
    }
  }
})(Login)
export default Login