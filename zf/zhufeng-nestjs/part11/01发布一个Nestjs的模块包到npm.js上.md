现在前端开发中离不开`npm`包管理,不管我们是前端开发比如:`vue`、`react`、`angular`开发,或者后端开发比如:`express`等开发,只要涉及到`js`的开发的都差不多要涉及到`npm`包的问题。可能曾经我们会发布自己写的工具方法、`vue`组件包到`npm`上,方便下次使用。我们一样的可以封装`Nestjs`模块包到`npm`上,方便我们下次直接安装使用,主要涉及的知识点

* 1、`Nestjs`动态模块的概念(有不清楚的可以回顾下第一章,模块)
* 2、发布`npm`包的问题

[如果对发布`npm`包不熟悉的可以先看下这个文章](https://juejin.im/post/6844904023410081806)

## 一、发布一个`Nestjs`包到`npm`上的步骤
* 1、先去[`npmjs`](https://www.npmjs.com/)上搜索你想要的包是否被人提前注册了
* 2、使用命令创建一个`Nestjs`项目

  ```shell
  nest new nest-log
  ```

* 3、创建一个模块

  ```shell
  nest g mo nest-log
  ```

* 4、在模块中创建一个服务

  ```shell
  nest g s nest-log/services/nest-log
  ```

* 5、将`nest-log.module.ts`改成动态模块的方式

  ```ts
  import { Module, DynamicModule } from '@nestjs/common';
  import { NestLogService } from './services/nest-log.service';

  @Module({})
  export class NestLogModule {
    static register(prefix: string): DynamicModule {
      return {
        module: NestLogModule,
        providers: [
          NestLogService,
          // 使用useValue的方式在模块中注入一个变量,可以理解为在该模块中注入了别的模块,只是注入的方式不是采用import
          // 而是采用模块调用静态方法的方式
          {
            provide: 'PREFIX',
            useValue: prefix
          }
        ],
        // 动态模块一样的也要对外暴露出去
        exports: [
          NestLogService
        ]
      }
    }
  }
  ```

* 6、服务中使用外面传递过来的参数

  ```ts
  import { Injectable, Inject } from '@nestjs/common';

  @Injectable()
  export class NestLogService {
    constructor (
      @Inject('PREFIX') private readonly prefix: string,
    ) { }

    log(str: string): void {
      console.log(`${this.prefix}-${str}`);
    }
  }
  ```

* 7、在`src`目录下创建一个`index.ts`的文件,将需要暴露出的模块或者类暴露出去

  ```ts
  export * from './nest-log/nest-log.module';
  export * from './nest-log/services/nest-log.service';
  ```

* 8、根目录下创建一个`tsconfig.npm.build.json`的文件

  ```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "removeComments": false,
      "sourceMap": false,
    },
    "exclude": [
      "node_modules",
      "test",
      "dist",
      "index.ts",
      "**/*.d.ts",
      "**/*spec.ts",
      "src/main.ts",
      "src/app.module.ts"
    ]
  }
  ```

* 9、在`package.json`文件下新增一行可执行的命令

  ```json
  "scripts": {
    "build:npm": "rimraf dist && nest build -p tsconfig.npm.build.json"
  }
  ```

* 10、将`dependencies`里面的依赖包拷贝到`devDependencies`中
* 11、执行打包命令

  ```shell
  npm run build:npm
  ```

* 12、发布到`npm`上

```shell
npm publish
```

## 二、使用方式

* 1、安装包

  ```shell
  npm install nest-log
  ```

* 2、在需要使用的模块中引入

  ```ts
  import { NestLogModule } from 'nest-log';

  @Module({
    imports: [
      // 使用自己刚刚发布的npm包
      NestLogModule.register('test---')
    ],
    providers: [UsersService],
    controllers: [UsersController]
  })
  export class UsersModule { }
  ```

* 3、在控制器中使用服务

  ```ts
  import { Controller, Get } from '@nestjs/common';
  import { NestLogService } from 'nest-log';

  @Controller('users')
  export class UsersController {
    constructor (
      private readonly nestLogService: NestLogService,
    ) { }

    @Get()
    hello(): string {
      this.nestLogService.log('获取用户信息')
      return 'hello';
    }
  }
  ```

* 4、控制台打印信息

  ```shell
  test----获取用户信息
  ```

* 5、[代码地址](https://github.com/kuangshp/nest-log)