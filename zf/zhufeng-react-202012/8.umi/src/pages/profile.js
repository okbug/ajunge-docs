import React from 'react';
import styles from './profile.css';
import {history} from 'umi';
class ClassProfile  extends React.Component{
  render(){
    return (
      <div>
        <h1 className={styles.title}>Page profile</h1>
        <button onClick={()=>history.goBack()}>返回</button>
      </div>
    );
  }
}
function FunctionProfile(props){
  return (
    <div>
      <h1 className={styles.title}>Page profile</h1>
      <button onClick={()=>history.goBack()}>返回</button>
    </div>
  );
}
FunctionProfile.wrappers = ['@/wrappers/auth'];
export default FunctionProfile;
/**
 * 真正在渲染的时候是如何的？
 * let Auth = require('@/wrappers/auth');
 * 渲染这个Auth    <Auth><Profile/></Auth>
 */