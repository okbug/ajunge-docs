## 一、什么是`QueryBuilder`

`QueryBuilder`是`TypeORM`最强大的功能之一 ,它允许你使用优雅便捷的语法构建`SQL`查询，执行并获得自动转换的实体。也是进行复杂查询必使用的技能之一。

## 二、创建`QueryBuilder`的几种方式

* 1、使用`connection`创建方式一

  ```ts
  import "reflect-metadata";
  import { createConnection, getConnection } from "typeorm";
  import { User } from "./entity/User";

  createConnection().then(async connection => {
    // 1.使用connection创建
    const user = await getConnection()
      .createQueryBuilder()
      .select(['user.id', 'user.username']) // 需要选择查询的字段,如果想要全部查询可以不加select
      .from(User, 'user') // 从哪张表,并且定义别名为user
      .where('(user.id=:id)', { id: 1 }) // 过滤条件
      .getOne(); // 查询一个
    console.log(user);
  }).catch(error => console.log(error));
  ```

* 2、使用`connection`创建方式二

  ```ts
  // 2.使用connection创建
  const user = await getConnection()
    .createQueryBuilder(User, 'user')
    .select(['user.id', 'user.username'])
    .where('(user.id=:id)', { id: 1 })
    .getOne();
  console.log(user);
  ```

* 3、使用`entity manager`

  ```ts
  // 3.使用entity manager创建
  const user = await getManager()
    .createQueryBuilder(User, 'user')
    .select('user')
    .getMany();
  console.log(user);
  ```

* 4、使用`repository`

  ```ts
  // 4.使用repository创建
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .getMany();
  console.log(user);
  ```

## 三、`QueryBuilder`五种类型
* 1、查询数据

  ```ts
  const user = await getConnection()
    .createQueryBuilder(User, 'user')
    .select(['user.id', 'user.username'])
    .where('(user.id=:id)', { id: 1 })
    .getOne();
  console.log(user);
  ```

* 2、插入数据

  ```ts
  // 插入数据
  const result = await getConnection()
    .createQueryBuilder()
    .insert() // 插入数据的时候要指明插入到那个实体类
    .into(User)
    .values([{ username: '张三', password: '1234' }, { username: '李四', password: '12345' }])
    .execute();
  console.log(result);
  ```

* 3、更新数据

  ```ts
  // 更新数据
  const result = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ username: '哈哈哈' })
    .where('id=:id', { id: 1 })
    .execute();
  console.log(result);
  ```

* 4、删除数据

  ```ts
  // 删除数据
  const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id=:id', { id: 3 })
    .execute();
  console.log(result);
  ```
* 5、创建关系查询

  ```ts
  // 创建关系查询
  const result = await getConnection()
    .createQueryBuilder(User, 'user')
    // 第一个参数是定义字段,第二个实体类,第三个是别名,第四个是条件
    .leftJoinAndMapMany('user.posts', Posts, 'posts', 'user.id=posts.userId')
    .getMany();
  console.log(JSON.stringify(result));
  ```

## 四、查询数据方法

* 1、`getOne`查询一条数据
* 2、`getMany`查询多条数据
* 3、`getRawOne`使用聚合函数的时候下查询一条数据
* 4、`getRawMany`使用聚合函数的时候下查询多条数据

  ```ts
  const result = await getConnection()
    .createQueryBuilder(User, 'user')
    // 使用了聚合函数就要使用getRawOne或者getRawMany方法
    .select('SUM(user.id)', 'sum')
    .getRawOne();
  console.log(result);
  ```

## 五、传递参数

* 1、直接使用

  ```ts
  .where("user.username = :username", { username: "哈哈" })
  ```

* 2、使用`setParameter`填充值

  ```ts
  .where("user.username = :username")
  .setParameter("username", "哈哈")
  ```

* 3、`LIKE`模糊查询

  ```ts
  .where("user.username like :username", {username: `% ${username} %`})
  ```

* 4、`IN`查询

  ```ts
  .where("user.username IN (:...username)", { username: [ "Timber", "Cristal", "Lina" ] })
  ```

## 六、[本章节参考代码](https://github.com/kuangshp/nest-book-code/tree/16.queryBuilder)