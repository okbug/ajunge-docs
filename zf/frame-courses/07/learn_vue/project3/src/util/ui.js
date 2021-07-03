import Vue from 'vue'

import {
  Button, Select, Container,
  Header,
  Aside,
  Main,
  Footer, Form, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  FormItem, Input, Row,
  Col, Loading, MessageBox, Message, Breadcrumb,
  BreadcrumbItem,
} from 'element-ui';
[Button, Select, Container,
  Header,
  Aside,
  Main, Form, Input, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup, Row, Breadcrumb,
  BreadcrumbItem,
  Col,
  FormItem,
  Footer,].forEach(item => {
    Vue.use(item)
  })


Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;