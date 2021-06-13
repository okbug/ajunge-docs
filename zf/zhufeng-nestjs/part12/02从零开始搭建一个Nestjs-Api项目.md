

## 一、基础配置项

* 1、安装几个依赖包

  ```shell
  npm install dotenv
  npm install @types/dotenv -D
  ```

* 2、根目录下创建一个`.env`的文件

  ```shell
  PREFIX=api/v1
  PORT=5000
  ```

* 3、在`main.ts`文件中配置端口及请求的路径前缀

  ```ts
  import 'dotenv/config';
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { Logger } from '@nestjs/common';

  const PORT = process.env.PORT || 8080;
  const PREFIX = process.env.PREFIX || '/';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 给请求添加prefix
    app.setGlobalPrefix(PREFIX);
    await app.listen(PORT);
    Logger.log(`服务已经启动:localhost:${PORT}/${PREFIX}`);
  }
  bootstrap();
  ```

* 4、安全配置[官网地址](https://docs.nestjs.com/techniques/security)
> 包括允许跨域请求、请求频率等一些配置,自己可以根据官网的方式来配置(一般不配置`CSRF`)

* 5、[本小节代码](https://github.com/kuangshp/nest-book-code/tree/28.project01)

## 二、配置`MySQL`数据库
* 1、安装依赖包

  ```shell
  npm install --save @nestjs/typeorm typeorm mysql
  npm install nestjs-config
  ```

* 2、在`.env`文件中写上数据库连接的信息

  ```shell
  DB_TYPE=mysql
  DB_HOST=localhost
  DB_USERNAME=root
  DB_PASSWORD=123456
  DB_DATABASE=nest_mysql
  DB_PORT=3306
  DB_LOGGING=true
  ```

* 3、根目录下创建一个`ormconfig.js`(主要是用于数据迁移的使用)

  ```js
  module.exports = [
    {
      name: 'default',
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logging: false,
      entities: [
        'src/entity/**/*.entity.{ts,js}',
        'src/modules/**/*.entity.{ts,js}'
      ],
      migrations: [
        'src/migration/*.ts'
      ],
      subscribers: [
        'src/subscribers/**/*.ts'
      ],
      cli: {
        'entitiesDir': 'src/entity',
        'migrationsDir': 'src/migration',
        'subscribersDir': 'src/subscriber'
      }
    }
  ]
  ```

* 4、在`src`目录下创建一个`config/database.config.ts`的文件

  ```ts
  export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
  };
  ```

* 5、在`app.module.ts`文件中使用

  ```ts
  import * as path from 'path';
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ConfigModule, ConfigService } from 'nestjs-config';

  import { AppController } from './app.controller';
  import { AppService } from './app.service';

  @Module({
    imports: [
      // 配置加载配置文件
      ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
        modifyConfigName: name => name.replace('.config', ''),
      }),
      // mysql的连接
      TypeOrmModule.forRootAsync({
        useFactory: async (config: ConfigService) => ({
          type: config.get('database.type'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          subscribers: [__dirname + './../subscribers/*.subscriber{.ts,.js}'],
          logging: config.get('database.logging'),
          timezone: '+08:00', // 东八区
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule { }
  ```

* 6、在`package.json`中配置数据迁移脚本命令

  ```json
  "scripts": {
      ...
      "generate": "ts-node ./node_modules/.bin/typeorm migration:generate -n Test",
      "db": "ts-node ./node_modules/typeorm/cli.js migration:run"
  },
  ```

* 7、[本小节代码](https://github.com/kuangshp/nest-book-code/tree/28.project02)

##  三、拦截器、守卫、过滤器、管道的配置

> 拦截器、过滤器、管道配置成全局,守卫在需要的路由上配置,[参考代码](https://github.com/kuangshp/nest-book-code/tree/28.project02)

## 四、配置`swagger`文档[参考代码](https://github.com/kuangshp/nest-book-code/tree/28.project03)