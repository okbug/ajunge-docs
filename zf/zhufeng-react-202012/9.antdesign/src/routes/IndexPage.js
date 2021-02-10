import React from 'react';
import { connect } from 'dva';
import {Layout} from 'antd';
import NavBar from '../components/NavBar';
import NotFound from '../components/NotFound';
import {renderRoutes,renderRedirect} from '../utils/routes';
import {Switch} from 'dva/router';

const {Content}=Layout;
function IndexPage(props) {
  return (
   <Layout>
     <NavBar {...props}/>
     <Content>
       <Switch>
        {renderRoutes(props.routes,props.app)}
        {renderRedirect('/',true,props.routes)}
        <NotFound/>
       </Switch>
     </Content>
   </Layout>
  );
}
export default connect()(IndexPage);
