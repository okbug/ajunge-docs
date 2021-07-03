import React from 'react';
import { Tabs, List, InputItem, Toast } from 'antd-mobile';
import { register, login } from '../api'
import { RouterProps } from 'react-router-dom'
const tabs = [
  { title: '登录', sub: '1' },
  { title: '注册', sub: '2' }
];

class User extends React.Component<RouterProps>{
  state = {
    phone: '',
    name: '',
    password: '',
    passwordPay: '',
    page: 1
  }

  onChangePhone = (phone: any) => {

    this.setState({
      phone,
    });
  }
  onChangeName = (name: any) => {

    this.setState({
      name,
    });
  }
  onChangePsw = (password: any) => {

    this.setState({
      password,
    });
  }
  onChangePswP = (passwordPay: any) => {

    this.setState({
      passwordPay,
    });
  }
  submit = () => {
    register({
      ...this.state
    }).then((data: any) => {
      if (data.code == 0) {
        // this.props.history.push('/login')
        this.setState({
          page: 0
        })
      }
    })
  }
  login = () => {
    login({
      account: this.state.name,
      password: this.state.password.replace(/ */, '')
    }).then((data: any) => {
      this.props.history.push('/')
    })
  }
  render() {
    return <div className=''>
      <Tabs tabs={tabs}
        // initialPage={1}
        page={this.state.page}
        renderTab={tab => <span>{tab.title}</span>}
        onTabClick={(tab, index) => { this.setState({ page: index }) }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <List renderHeader={() => 'Confirm when typing'}>

            <InputItem
              type="text"
              placeholder="input your phone"
              onChange={this.onChangeName}
              value={this.state.name}
            >用户名</InputItem>
            <InputItem
              type="phone"
              placeholder="input your phone"
              onChange={this.onChangePsw}
              value={this.state.password}
            >登陆密码</InputItem>

          </List>
          <button onClick={this.login}>登录</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <List renderHeader={() => 'Confirm when typing'}>
            <InputItem
              type="phone"
              placeholder="input your phone"
              onChange={this.onChangePhone}
              value={this.state.phone}
            >手机号码</InputItem>
            <InputItem
              type="text"
              placeholder="input your phone"
              onChange={this.onChangeName}
              value={this.state.name}
            >用户名</InputItem>
            <InputItem
              type="phone"
              placeholder="input your phone"
              onChange={this.onChangePsw}
              value={this.state.password}
            >登陆密码</InputItem>
            <InputItem
              type="phone"
              placeholder="input your phone"
              onChange={this.onChangePswP}
              value={this.state.passwordPay}
            >支付密码</InputItem>

          </List>
          <button onClick={this.submit}>提交</button>
        </div>
      </Tabs>
    </div>;
  }
}
export default User

