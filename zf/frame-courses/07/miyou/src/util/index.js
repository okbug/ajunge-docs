import React, { useState } from 'react'
export function loadable(obj) {
  let { loader, loading: Loading } = obj;
  let Com = null;
  return function (props) {
    let [flag, setFlag] = useState(false);
    if (!flag) {
      loader().then(data => {
        // data 是一个导出对象
        // data.default ===> Home组件
        Com = data.default
        setFlag(true);
      })
    }
    return <>
      {
        flag ? <Com {...props} /> : <Loading />

      }
    </>
  }
}
