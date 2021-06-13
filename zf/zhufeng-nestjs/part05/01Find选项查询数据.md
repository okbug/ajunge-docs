前面我们仅仅介绍了`TypeORM`对数据的增、删、改操作,一直未提查询数据的方法,用也仅仅是用了`find`和`findOne`的基本使用方式,因为我们在实际开发中80%的对数据库操作都是在查询数据,以下将重点介绍查询数据

## 一、`find`的基本使用
* 1、全部查询所有的字段

  ```ts
  // 1.查询全部的字段
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find();
  console.log(result);
  ```
  
  执行的`SQL`类似

  ```sql
  select * from user;
  ```

* 2、使用`select`选择性的查询想要的字段

  ```ts
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({ select: ['id', 'username'] });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select id, username from user;
  ```

* 3、使用`where`条件查询

  ```ts
  // 3.使用where条件查询
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({ where: { id: 1 } });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user where user.id = 1;
  ```

* 4、使用`where`多条件`and`的关系查询数据

  ```ts
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({ where: { id: 1, username: 'xx' } });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user where user.id = 1 and user.username = 'xx';
  ```

* 5、使用`where`多条件`or`的关系查询数据

  ```ts
  // 5.使用where..or查询数据
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({ where: [{ id: 1 }, { username: 'xx' }] });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user where user.id = 1 or user.username = 'xx';
  ```

* 6、`relations`关系查询(<font color="#f00">前提是要先有外键关联关系</font>)

  ```ts
  // 6.relations关系查询
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({ relations: ['userDetail'] });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select a.*,b.* from user as a left join user_extend as b on a.id = b.userId;
  ```

* 7、使用`join`关系查询(对`relations`的扩展)

  ```ts
  // 7.使用join
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({
      join: {
          alias: 'user',
          leftJoinAndSelect: {
              detail: 'user.userDetail',
              posts: 'user.posts'
          }
      }
  });
  console.log(JSON.stringify(result));
  ```

* 8、`order`排序查询

  ```ts
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({
      order: {
          id: 'DESC',
          username: 'ASC'
      }
  });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user order by username asc, id desc;
  ```

* 9、分页查询数据
  * `skip`偏移(表示从哪里开始)
  * `take`查询多少条数据

  ```ts
  // 9.分页查询
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({
      skip: 0,
      take: 10,
  })
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user limit 0,10;
  ```

## 二、`Find`的进阶选项

`TypeORM`提供了许多内置运算符，可用于创建更复杂的查询：

* 1、`Not`

  ```ts
  // 10.Not
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({
      username: Not('王五')
  });
  console.log(result);
  ```

  执行的`SQL`类似 

  ```sql
  select * from user where username != '王五';
  ```

* 2、`LessThan`小于,一般用于数字
* 3、`LessThanOrEqual`小于或者等于
* 4、`MoreThan`大于
* 5、`MoreThanOrEqual`大于等于
* 6、`Equal`等于
* 7、`Like`模糊查询 `xx: LIKE('%yy%')`
* 8、`Between`两个范围之间`xx: Between(1,10)`
* 9、`In`在什么里面`xx: In(['',''])`
* 10、上面的可以多个组合起来一起使用

## 三、`TypeORM`不仅仅提供`Find`方法,还有一系列的方法

* 1、`find`查找返回一个数组
* 2、`findOne`查询返回一个对象,直接传递一个数字进去,会根据`id`去查询
* 3、`findAndCount`查询返回数量`[data, count]`
* 4、`findByIds([])`根据`id`数组查询

## 四、[本章节代码](https://github.com/kuangshp/nest-book-code/tree/15.find)