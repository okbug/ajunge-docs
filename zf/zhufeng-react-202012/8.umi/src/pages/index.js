import React from 'react';
import styles from './index.css';
import {Link} from 'umi';
export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/profile">个人中心</Link>
    </div>
  );
}
