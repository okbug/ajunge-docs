# SSR Server Side Render 服务端渲染


## 缺陷
- 占用内存
- api 只有 beforeCreated Created
问 ajax请求在created还是在mounted？
最好是created 因为SSR的话 只能在这里 保持一致


# Vue 的 SSR原理
页面渲染后发起ajax请求，用请求来的数据渲染页面

（如果JS很大 就有首屏白屏问题 通过SSR解决）
因为后端请求数据，没有网络的问题 所以会减少白屏的时间




