import React from 'react';
import Routes from '../router/routes'
import { Layout } from 'antd';
import style from '../scss/layout.module.scss'
import MySlider from '../components/MySlider'
import MyHeader from '../components/MyHeader'
import MyFooter from '../components/MyFooter'
const { Content } = Layout;

class MyLayout extends React.Component {
  render() {
    return <div className={style.my_layout_box}>
      <Layout className={style.mylayout_box}>
        <MySlider></MySlider>
        <Layout>
          <MyHeader></MyHeader>
          <Content>
            <Routes />
          </Content>
          <MyFooter>F</MyFooter>
        </Layout>
      </Layout>
    </div>;
  }
}
export default MyLayout