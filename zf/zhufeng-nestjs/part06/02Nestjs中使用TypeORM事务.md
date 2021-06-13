## 一、数据库中事务操作的必要性

在数据库操作中,如果涉及到多表关联、多表有关系操作的时候,我们就要进行事务处理,以免一张表的数据已经发生了修改,刚好发生了异常,造成另外一张表的数据不进行更新。

常见场景

- 两张表关联关系同时需要插入、删除数据
- 银行转换一个表数据减少另外一个表的数据增加

## 二、方式一、隐式`commit`,隐式`rollback`

- 1、控制层的代码

  ```js
  @Post()
  async create(@Body() data: Extract<CreateUserDto, CreateUserExtendDto>) {
    return this.userService.create(data);
  }
  ```

- 2、服务层的代码

  ```js
  async create(data: Extract<CreateUserDto, CreateUserExtendDto>) {
    const { name, password, email, mobile, gender, qq, address } = data;
    return getManager()
      .transaction(async (entityManage: EntityManager) => {
        const user: { [propName: string]: any } = await entityManage.save(
          UserEntity,
          {
            name,
            password,
            email,
            mobile,
            gender,
          },
        );
        //throw new Error('主动抛出错误');
        await entityManage.save(UserExtendEntity, {
          userId: user.id,
          qq,
          address,
        });
      })
      .then(res => {
        console.log(res);
        return '创建成功';
      })
      .catch(e => {
        console.log(e);
        return '创建失败';
      });
  }
  ```

## 三、显式的使用`commit`和`rollback`

- 1、控制层的代码

  ```js
  @Post()
  async create(@Body() data: Extract<CreateUserDto, CreateUserExtendDto>) {
    return this.userService.create(data);
  }
  ```

- 2、服务层的使用

  ```js
  async create(data: Extract<CreateUserDto, CreateUserExtendDto>) {
    const { name, password, email, mobile, gender, qq, address } = data;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 注意如果这个地方使用save是不行的
      const user = await queryRunner.manager.insert<UserEntity>(UserEntity, {
        name,
        password,
        email,
        mobile,
        gender,
      });
      Logger.log(JSON.stringify(user), '插入user的数据');
      const userId = user.identifiers[0].id;
      await queryRunner.manager.insert<UserExtendEntity>(UserExtendEntity, {
        userId,
        qq,
        address,
      });
      await await queryRunner.commitTransaction();
      return '创建成功';
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('创建失败');
    }
  }
  ```

## 四、方式三、在控制层中使用装饰器的方式(这种方式和第一种有点类似)

* 1、控制层的代码

  ```js
  @Post()
  @Transaction()
  async create(
    @Body() data: Extract<CreateUserDto, CreateUserExtendDto>,
    @TransactionManager() manager: EntityManager,
  ) {
    return this.userService.create(data, manager);
  }
  ```

* 2、在服务层中

  ```js
  async create(
    data: Extract<CreateUserDto, CreateUserExtendDto>,
    manager: EntityManager,
  ) {
    const { name, password, email, mobile, gender, qq, address } = data;
    const user: { [propName: string]: any } = await manager.save(UserEntity, {
      name,
      password,
      email,
      mobile,
      gender,
    });
    Logger.log(JSON.stringify(user), '当前用户');
    // throw new Error('错误了') // 测试主动抛出异常是否回滚
    await manager.save(UserExtendEntity, {
      userId: user.id,
      qq,
      address,
    });
    return '创建成功';
  }
  ```