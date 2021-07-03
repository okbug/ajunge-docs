/*
cancelText
footer
okText
title
onCancel
onOk
*/

import React from 'react';
import style from './modal.module.css'
class Modal extends React.Component {

  render() {
    let {
      okText = '确定',
      cancelText = '取消',
      onCancel,
      onOk,
      className = '',
      children,
      footer,
      title,
      visible = false
    } = this.props;
    return (
      visible ?
        <div className={style.modal_box + ' ' + className}>
          <div className={style["mask"]}></div>
          <div className={style["content"]}>
            <header>
              {title || '默认的头部'}
            </header>
            <main>
              {children || <div>
                默认的身体
            </div>}
            </main>
            <footer>
              {
                footer ?
                  footer :
                  <div>
                    <button onClick={onCancel}>{cancelText || "取消"}</button>
                    <button onClick={onOk}>{okText || '确定'}</button>
                  </div>
              }
            </footer>
          </div>
        </div> : <></>
    );
  }
}
export default Modal