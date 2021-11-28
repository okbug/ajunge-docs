import React from 'react';
import styles from './profile.css';
import {history} from 'umi';

function Profile() {
  return (
    <div>
      <h1 className={styles.title}>Page profile</h1>
      <button onClick={()=>history.goBack()}>返回</button>
    </div>
  );
}

//给Profile这个类上的wrappers属性赋值为一个数组
Profile.wrappers = ['@/wrappers/auth'];

export default Profile;