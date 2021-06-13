
## 一、关于`RBAC`权限系统数据表的设计

* 1、数据模型图

  ![输入图片说明](https://images.gitee.com/uploads/images/2020/1014/221622_7f182a57_1808543.jpeg "rbac.jpg")

* 2、关于`RBAC`的认识

  `RBAC`（`Role-Based Access Control`，基于角色的访问控制），就是用户通过角色与权限进行关联。简单地说，一个用户拥有若干角色，每一个角色拥有若干权限。这样，就构造成“用户-角色-权限”的授权模型。在这种模型中，用户与角色之间，角色与权限之间，一般者是多对多的关系。

* 3、本项目采用单表设计,就不创建外键去关联,以减少在开发中的各种约束

## 二、用户的实体类

* 1、创建一个用户的模块
* 2、在用户模块的目录下创建一个`entities`的文件夹(不同类型的文件分开存放)
* 3、创建后台用户的实体类

  主要是用户名、密码、等一些常见的字段

  ```ts
  // users.entity.ts文件
  import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
  import { Exclude } from 'class-transformer';

  @Entity('admin_user') // 可能有前端的用户表,看情况区分
  export class AdminUserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
      type: 'int',
      name: 'id',
      comment: '主键id'
    })
    id: number;

    @Column({
      type: 'varchar',
      length: 50,
      name: 'username',
      nullable: false,
      comment: '用户名'
    })
    username: string;

    @Column({
      type: 'varchar',
      length: 100,
      name: 'password',
      nullable: false,
      comment: '密码'
    })
    password: string;

    @Exclude() // 表示排除不返回这个字段,但是仅仅是针对于直接返回,如果你对齐进行数据操作后就不可以
    @Column({
      type: 'tinyint',
      nullable: false,
      default: () => 0,
      name: 'is_del',
      comment: '是否删除,1表示删除,0表示正常'
    })
    isDel: number;

    @CreateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'created_at',
      comment: '创建时间'
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'updated_at',
      comment: '更新时间',
    })
    updatedAt: Date;
  }
  ```

* 4、运行脚本迁移文件,动态生成数据库数据表
  
  ![输入图片说明](https://images.gitee.com/uploads/images/2020/1014/221642_a02f3e67_1808543.png "user_table.png")

* 5、查看生成的表是否与自己想要的
> 注意点,有时候生成数据表文件的时候会报错,可以先将项目中的`migration`文件夹删除及数据库中的`migrations`删除,重新生成文件

## 三、角色表

* 1、数据模型

  ```ts
  import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
  import { Exclude } from 'class-transformer';

  @Entity('role')
  export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
      type: 'int',
      name: 'id',
      comment: '主键id'
    })
    id: number;

    @Column({
      type: 'varchar',
      nullable: false,
      unique: true,
      length: 50,
      name: 'title',
      comment: '角色名称'
    })
    title: string;

    @Column({
      type: 'varchar',
      nullable: true,
      length: 100,
      name: 'description',
      comment: '角色描素'
    })
    description: string | null;

    @Exclude()
    @Column({
      type: 'tinyint',
      nullable: false,
      default: () => 0,
      name: 'is_del',
      comment: '是否删除,1表示删除,0表示正常'
    })
    isDel: number;

    @CreateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'created_at',
      comment: '创建时间'
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'updated_at',
      comment: '更新时间',
    })
    updatedAt: Date;
  }
  ```

## 四、资源表

> 资源表稍微有点复杂,设计同表中的关联问题,场景设计也麻烦,先来个之前已经做好的`gif`图片说明

* 1、动画图表述最终结果

  ![](./source/rbac.gif)
  
  

* 2、数据表的设计

  ```ts
  import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
  import { Exclude } from 'class-transformer';

  @Entity('access')
  export class AccessEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
      type: 'int',
      name: 'id',
      comment: '主键id'
    })
    id: number;

    @Column({
      type: 'varchar',
      nullable: true,
      unique: true,
      length: 50,
      name: 'module_name',
      comment: '模块名称'
    })
    moduleName: string | null;

    @Column({
      type: 'tinyint',
      nullable: true,
      name: 'type',
      comment: '类型,模块顶级模块: 1, 表示菜单: 2, 操作: 3'
    })
    type: number | null;

    @Column({
      type: 'varchar',
      nullable: true,
      unique: true,
      length: 100,
      name: 'action_name',
      comment: '操作名称'
    })
    actionName: string | null;

    @Column({
      type: 'varchar',
      nullable: true,
      length: 100,
      name: 'icon',
      comment: '小图标'
    })
    icon: string | null;

    @Column({
      type: 'varchar',
      nullable: true,
      length: 100,
      name: 'url',
      comment: 'url地址'
    })
    url: string | null;

    @Column({
      type: 'varchar',
      nullable: true,
      length: 10,
      name: 'method',
      comment: '请求方式'
    })
    method: string | null;

    @Column({
      type: 'int',
      nullable: false,
      default: () => -1,
      name: 'module_id',
      comment: '父模块id'
    })
    moduleId: number;

    @Column({
      type: 'int',
      nullable: false,
      default: () => 1,
      name: 'sort',
      comment: '排序'
    })
    sort: number;

    @Column({
      type: 'varchar',
      nullable: true,
      length: 100,
      name: 'description',
      comment: '描素'
    })
    description: string | null;

    @Exclude()
    @Column({
      type: 'tinyint',
      nullable: false,
      default: () => 0,
      name: 'is_del',
      comment: '是否删除,1表示删除,0表示正常'
    })
    isDel: number;

    @CreateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'created_at',
      comment: '创建时间'
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: 'timestamp',
      nullable: false,
      name: 'updated_at',
      comment: '更新时间',
    })
    updatedAt: Date;
  }
  ```
* 3、[本章节代码](https://github.com/kuangshp/nest-book-code/tree/28.rbac01)