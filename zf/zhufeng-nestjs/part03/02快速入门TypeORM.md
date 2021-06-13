## 一、环境搭建

* 1、全局安装包

  ```shell
  npm install typeorm -g
  ```

* 2、创建一个项目并且指定数据库

  ```shell
  typeorm init --name projectName --database mysql
  ```
  * --name指定项目名称
  * --database指定选用那种数据库,目前支持的数据库有`mysql, mariadb, postgres, sqlite, mssql, oracle, mongodb,cordova, react-native, expo, nativescript`(前提是你的电脑上安装的对应的数据库)

* 3、初始化项目后的目录结构

  ```shell
  .
  ├── README.md
  ├── ormconfig.json
  ├── package.json
  ├── src
  │   ├── entity
  │   │   └── User.ts
  │   ├── index.ts
  │   └── migration
  └── tsconfig.json

  3 directories, 6 files
  ```
  * `ormconfig.json`文件配置与数据库连接相关的信息
  * `src/entity`表示实体类,一般约定为建表的对象(默认创建一个User.ts)的文件
  * `src/index.ts`入口文件,练习对数据的增删改查操作

* 4、安装依赖包
* 5、修改`ormconfig.json`文件数据库配置信息
* 6、运行命令并且查看数据库是否自动创建表(<font color="#f00">需要手动创建一个数据库</font>)

  ```shell
  npm run start
  ```

* 7、<font color="#f00">**注意点:**</font>
  * `mysql`中编码选择,要选用`utf8mb4`编码才是`utf8`,不是选`utf8`就表示是`utf8`编码
  * `utf8mb4_bin`字符集排序规则

## 二、`ormconfig.json`文件详解

* 1、解析各个字段

  ```json
  {
    "type": "mysql", // 选用的数据库
    "host": "localhost", // 数据库地址
    "port": 3306, // 数据库端口
    "username": "test", // 数据库用户名
    "password": "test", // 数据库密码
    "database": "test", // 数据库
    "synchronize": true, // 是否同步true表示会自动将src/entity里面定义的数据模块同步到数据库生成数据表(已经存在的表的时候再运行会报错)
    "dropSchema": true, // 删除数据库中的表
    "logging": false, // 是否打印日志,执行sql语句时候输出原生sql,也可以配置成一个数组["query", "error", "schema"]指定sql的执行类型
    "charset": "utf8mb4", // 编码
    "timezone": "local", // 时区,默认本地,也可以写"+8"
    "entityPrefix": "", // 给此数据库连接上的所有表（或集合）加的前缀。
    "entities": [ // 定义TypeORM需要查找的数据模型的,可以定义多个
        "src/entity/**/*.ts"
    ],
    "migrations": [ // 数据迁移文件生成的地方
        "src/migration/**/*.ts"
    ],
    "subscribers": [ // 订阅(用的少)
        "src/subscriber/**/*.ts"
    ],
    "cli": { // 数据迁移工具使用的
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
  }
  ```

## 三、关于`ormconfig.json`文件的几种写法
* 1、直接选择默认的`ormconfig.json`,`src/index.ts`中的`createConnection`方法会默认去读取
* 2、直接使用`ormconfig.js`类似上面`ormconfig.json`一样的会默认读取

  ```js
  module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'typeorm_mysql',
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: [
      'src/entity/**/*.ts'
    ]
  }
  ```
* 3、还可以使用`ormconfig.xml`和`ormconfig.yml`格式
* 4、[以上配置参考代码](https://github.com/kuangshp/nest-book-code/tree/10.type_orm/typeorm_mysql)
* 5、不使用配置文件,直接在`src/index.ts`的`createConnection`方法中写死(可以直接删除`ormconfig.[format]`的文件, `format=[js，ts，json，yml，yaml，xml]`)

  ```typescript
  createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'typeorm_mysql',
      synchronize: true,
      logging: true,
      dropSchema: true,
      entities: [
          'src/entity/**/*.ts'
      ]
  }).then(async connection => {
    // 业务代码
  })
  ```
* 6、连接远程数据库(比如可能买了阿里云数据库服务的业务)

  ```typescript
  createConnection({
    type: "mysql",
    url: "mysql://test:test@localhost/test"
  });
  ```

* 7、一般选用`ormconfig.js`就可以主要出于3方面原因
  * 1、查询顺序`[js，ts，json，yml，yaml，xml]`从左到右边开始的顺序查找
  * 2、如果存在多个数据库的时候直接导出一个数组
  * 3、可以使用`.env`的文件,避免数据库敏感信息泄漏