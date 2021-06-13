## 一、为什么要使用文档
使用`Nestjs`提供后端接口,供给前端开发工程师使用,不管是不是同一个人来开发,都需要一个文档,更加的清楚的告诉前端工程师,这个项目中有哪些接口,每个接口需要传递什么字段,接口的请求方式,返回什么数据,也可以使用`swagger`接口模拟请求数据

[官网地址](https://docs.nestjs.com/openapi/introduction)

## 二、在`Nestjs`项目中使用`swagger`文档

* 1、安装依赖包

  ```shell
  npm install --save @nestjs/swagger swagger-ui-express
  ```

* 2、在`main.ts`中配置文档

  ```ts
  import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
  const PORT = process.env.PORT || 8080;
  const PREFIX = process.env.PREFIX || '/';

  ...
  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);

  // 配置api文档信息
  const options = new DocumentBuilder()
    .setTitle('nest framework  api文档')
    .setDescription('nest framework  api接口文档')
    .setBasePath(PREFIX) // 设置基础的路径
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' }) // 设置请求头的token字段
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  ...
  await app.listen(PORT);
  Logger.log(`服务已经启动:localhost:${PORT}/${PREFIX}`);
  ...
  ```

* 3、在登录的控制器中使用

  ```ts
  @ApiTags('用户登录')
  @Controller('login')
  export class LoginController {
    constructor (
      private readonly userService: UserService,
    ) { }

    @ApiOperation({
      summary: '用户登录',
      description: '用户名和密码登录',
    })
    @ApiCreatedResponse({
      type: LoginDto,
      description: '用户登录DTO'
    })
    @Post()
    async login(
      @Body() loginData: LoginDto,
    ): Promise<any | string> {
      return await this.userService.login(loginData);
    }
  }
  ```

* 4、映射`DTO`,在对应的`dto`中使用装饰器,装饰后,可以在文档中看到参数

  ```ts
  import { IsNotEmpty, IsString } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  export class LoginDto {
    // 使用装饰器
    @ApiProperty({ required: true, description: '用户名' })
    @IsString({ message: '用户名必须为字符类型' })
    @IsNotEmpty({ message: '姓名不能为空' })
    readonly username: string;
    // 使用装饰器
    @ApiProperty({ required: true, description: '密码' })
    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;
  }
  ```

* 5、在浏览器上输入`localhost:3000/api/docs`

  ![](./source/01.jpg)

* 6、使用方式
* 7、[本章节代码](https://github.com/kuangshp/nest-book-code/tree/27.swagger)