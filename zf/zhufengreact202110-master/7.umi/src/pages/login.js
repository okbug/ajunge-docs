import React from 'react';
import styles from './login.css';
import { history } from 'umi';
export default function Page(props) {
  const login = () => {
    localStorage.setItem('isLogin', 'true');
    history.push(props.location.state.from);
  }
  return (
    <div>
      <button onClick={login}>登录</button>
    </div>
  );
}
