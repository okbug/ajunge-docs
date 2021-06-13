

## 一、关于`Nestjs`项目开发的基本架构
目前在`Nestjs`企业项目开发中,主要有两种项目结构模型

* 1、基于`Angular`的模块化开发方式
* 2、基于`Java`的`MVC`项目结构的方式开发

不管使用哪种方式来开发,都是以个人过往的项目经验或者工作经验习惯来的,即使你用的是`Java`的`MVC`项目结构方式来开发的,最后你也会将控制器、服务层、实体类定义成一个模块。最终的结果还是模块化开发,过往的项目我都是使用`Java`的`MVC`项目结果开发的,在这次的项目中我打算使用基于`Angular`的模块化开发方式来开发项目

## 二、关于两种项目结构开发的对比

* 1、基于`Angular`的模块化开发方式

  ```shell
  .
  ├── app.module.ts # 根模块
  ├── config # 配置文件
  │   └── database.config.ts
  ├── filters # 过滤器
  │   └── http-exception.filter.ts
  ├── guard # 守卫
  │   ├── auth.guard.spec.ts
  │   └── auth.guard.ts
  ├── interceptors # 拦截器
  │   ├── logging.interceptor.ts
  │   └── transform.interceptor.ts
  ├── main.ts # 入库文件
  ├── middlewares # 中间件
  ├── modules
  │   └── user # 将user定义一个模块
  │       ├── controllers
  │       └── # user模块下全部的控制器
  │       ├── services
  │       └── # user模块下全部的服务层
  |       ├── entity
  │       └── # user模块下全部的实体类
  │       ├── user.module.ts
  ├── pipes
  │   └── # 自定义管道
  ├── services
  │   └── # 公共的服务
  └── utils
      # 工具类
  ```

* 2、基于`Java`的`MVC`项目开发方式

  ```shell
  .
  ├── app.module.ts # 根模块
  ├── config # 配置文件
  │   ├── admin.config.ts
  │   ├── database.config.ts
  │   ├── front.config.ts
  ├── controllers
  │   ├── controllers.module.ts
  |   ├── # 全部的控制器
  ├── decorators
  │   ├── # 自定义装饰器
  ├── entities
  │   ├── entities.module.ts
  │   └── model
  │       ├── # 全部的实体类
  ├── filters # 自定义过滤器
  │   └── http-exception.filter.ts
  ├── guard
  │   └── auth.guard.ts
  ├── interceptors # 全部的拦截器
  │   ├── logging
  │   │   ├── logging.interceptor.spec.ts
  │   │   └── logging.interceptor.ts
  │   └── transform
  │       ├── transform.interceptor.spec.ts
  │       └── transform.interceptor.ts
  ├── main.ts # 主入口文件
  ├── module
  │   ├── # 公共模块
  ├── pipe # 自定义管道
  │   ├── parse.idanduuid.pipe.ts
  │   ├── validation.pipe.spec.ts
  │   └── validation.pipe.ts
  ├── services
  │   ├── # 全部的服务
  │   ├── services.module.ts
  ├── types
  │   # 自定义数据类型
  ├── utils
  │   # 工具类
  └── validators
      # 自定义校验器
  ```