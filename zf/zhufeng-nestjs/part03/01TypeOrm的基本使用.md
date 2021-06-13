## 一、什么是`TypeOrm`
`TypeORM`是一个优秀的 `Node.js ORM`框架，采用`TypeScript`编写，支持使用`TypeScript` 或 `Javascript（ES5，ES6，ES7）`开发。目标是保持支持最新的`Javascript`特性来帮助开发各种用户数据库的应用 - 不管是轻应用还是企业级的。

简单一句话概括就是使用`typescript`来写的对象关系映射(`Object Relational Mapping`,简称`ORM,或O/RM,或O/R mapping`)

## 二、`TypeORM`能做什么

* 根据模型自动创建数据库表
* 可以透明的插入/更新/删除数据库对象
* 映射数据库`table`到`Javascript`对象，映射表列到`Javascript`对象属性
* 提供表的一对一，多对一，一对多，多对多关系处理

## 三、我们为什么要使用`TypeORM`
* `TypeORM`可以帮助开发者专注于业务逻辑，而不用过于担心数据存储的问题。
* 我们不需要特意去学习各种种`SQL`语句
* 不需要考虑`SQL`注入等一些因素
* 不需要考虑未来更换数据库来修改`SQL`语句

## 四、目前`Nodejs`中常用的`ORM`框架

* [`TypeORM`](https://typeorm.io/)
* [`sequelize`](https://sequelize.org/)

在`Nestjs`中两个`ORM`都支持使用,一般使用`TypeORM`的比较多