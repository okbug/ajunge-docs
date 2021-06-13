
## 一、`Cookie`的介绍

* 1、`HTTP` 是无状态协议。简单地说，当你浏览了一个页面,然后转到同一个网站的另一个页 面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。如果我们要实现多个页面之间共享数据的话我们就可以使用 `Cookie` 或者 `Session` 实 现
* 2、`cookie` 是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。

## 二、`Cookie`的特点

  * `cookie` 保存在浏览器本地
  * 正常设置的 `cookie` 是不加密的，用户可以自由看到;
  * 用户可以删除 `cookie`，或者禁用它
  * `cookie` 可以被篡改
  * `cookie` 可以用于攻击
  * `cookie` 存储量很小。实际上要被`localStorage`替代，但是后者 IE9 兼容。

## 三、在`Nestjs`中使用`Cookie`

* 1、[`cookie-parser`地址](https://www.npmjs.com/package/cookie-parser)

* 2、下载

  ```shell
  npm install cookie-parser
  npm install @types/cookie-parser -D
  ```

* 3、在`main.ts`中使用

  ```typescript
  // 导包
  import * as cookieParser from 'cookie-parser';
  
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 使用
    app.use(cookieParser());
    await app.listen(3000);
  }
  bootstrap();
  ```

* 4、在组件的控制器中写入和获取`cookie`

  ```typescript
  import { Controller, Get, Response, Request } from '@nestjs/common';
  
  @Controller('user')
  export class UserController {
    @Get()
    index(@Request() req) {
      console.log(req.cookies.name, '当前的cookie');
      return '主页';
    }
  
    @Get('login')
    login(@Response() res) {
      // 如果使使用了res就不能使用return，必须使用send
      res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true });
      res.send('登录页面');
    }
  }
  ```

* 5、在浏览器控制图查看`cookie`

  > 到了时间刷新浏览器控制图上的刷新的,`cookie`就会被清空的

  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0831/201855_084c9f0f_1808543.jpeg "nestjs03_cookie.jpg")
  



* 6、关于`cookie`的参数说明

| NO.  | 参数       | 类型      | 参数说明                                                     |
| :--: | :--------- | --------- | ------------------------------------------------------------ |
|  1   | `domain`   | `String`  | 指定域名下有效                                               |
|  2   | `expires`  | `Date`    | 过期时间(秒),设置在某个时间点后会在该`cookoe`后失效          |
|  3   | `httpOnly` | `Boolean` | 默认为`false`表示不允许客户端(通过`js`来获取`cookie`)        |
|  4   | `maxAge`   | `String`  | 最大失效时间(毫秒),设置在多少时间后失效                      |
|  5   | `path`     | `String`  | 表示`cookie`影响到的路径,如:`path=/`如果路径不能匹配的时候,浏览器则不发送这个`cookie` |
|  6   | `secure`   | `Boolean` | 当 `secure` 值为` true` 时,`cookie` 在 `HTTP` 中是无效,在 `HTTPS `中才有效 |
|  7   | `signed`   | `Boolean` | 表示是否签名`cookie`,如果设置为`true`的时候表示对这个`cookie`签名了,这样就需要用`res.signedCookies()`获取值`cookie`不是使用`res.cookies()`了, |



* 7、签名`cookie`的设置

  ```typescript
  // main.ts中
  app.use(cookieParser(process.env.SECRET)); // 配合dotenv包来使用
  ```

  ```typescript
  import { Controller, Get, Response, Request } from '@nestjs/common';
  
  @Controller('user')
  export class UserController {
    @Get()
    index(@Request() req) {
      console.log(req.signedCookies, '当前的cookie');
      return '主页';
    }
  
    @Get('login')
    login(@Response() res) {
      // 如果使使用了res就不能使用return，必须使用send
      // res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true });
      res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true, signed: true })
      res.send('登录页面');
    }
  }
  ```

* 8、如果要销毁`cookie`常见的方式
  * 直接将值设置为空
  * 设置`maxAge=0`

* 9、[本小节代码](https://github.com/kuangshp/nest-book-code/tree/08.cookie)

## 四、`Nestjs中使用session`

* 1、**`session`** 是另一种记录客户状态的机制，不同的是 **`Cookie`** 保存在客户端浏览器中，而 **`session`** 保存 在服务器上

* 2、`session`的工作流程
  当浏览器访问服务器并发送第一次请求的时候,服务器端会创建一个`session`对象,生成一个类似于`{key: '', value: ''}`的对象,然后将`key(cookie)`返回到浏览器(客户)端,浏览器再次访问的时候携带这个`key(cookie)`到服务器端,找到这个`session`的`value`值。

* 3、在`nestjs`中使用`express-session`进行`session`的操作

  ```typescript
  npm install express-session
  npm install @types/express-session -D
  ```
* 4、在`main.ts`中配置`session`

  ```typescript
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import * as session from 'express-session';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 配置中间件使用session,加盐是123456(随便写的)
    app.use(session({ secret: '123456', cookie: { maxAge: 60000 } }))
    await app.listen(3000);
  }
  bootstrap();
  ```
* 5、创建`user`的模块及控制器(忽视请求方式,只是方便浏览器模拟请求)

  ```typescript
  import { Controller, Get, Request, Response } from '@nestjs/common';

  @Controller('user')
  export class UserController {
    @Get()
    index(
      @Request() req: { [key: string]: any }
    ): string {
      console.log(req.session);
      return '用户主页';
    }

    @Get('login')
    login(
      @Response() res: { [key: string]: any },
      @Request() req: { [key: string]: any }
    ): void {
      req.session.name = 'hello';
      // 再次提醒使用了@Response就不能使用return
      res.send('登录页面')
    }
  }
  ```

* 6、先在浏览器中访问`localhost:3000/user/login`然后访问`localhost:3000/user`

  ```typescript
  // 编辑器控制图打印出信息,可以获取到刚刚设置的session
  Session {
    cookie: {
      path: '/',
      _expires: 2020-07-27T09:28:20.046Z,
      originalMaxAge: 60000,
      httpOnly: true
    },
    name: 'hello'
  }
  ```

* 7、常见参数的说明

| NO   | 参数               | 说明                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| 1    | `secret`           | 一个 `String` 类型的字符串，作为服务器端生成` session` 的签名 |
| 2    | `name`             | 返回客户端的`key` 的名称，默认为`connect.sid`,也可以自己设置 |
| 3    | `resave`           | 强制保存 `session `即使它并没有变化,。默认为` true`。建议设置成 `false` |
| 4    | `saveUninitalized` | 强制将未初始化的 `session` 存储。当新建了一个 `session` 且未设定属性或值时，它就处于 未初始化状态。在设定一个 `cookie` 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。( 默认:`true`)。建议手动添加 |
| 5    | `cookie`           | 设置返回到前端`key` 的属性，默认值为`{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }`。 |
| 6    | `rolling`          | 在每次请求时强行设置 `cookie`，这将重置` cookie` 过期时间(默认:`false`) |

* 8、`session`的销毁

* 设置`maxAge=0`

  ```typescript
  req.session.cookie.maxAge=0
  ```

* 将值设置为空

* 使用`destroy`销毁方法

  ```typescript
  req.session.destroy((err) => {
    ...
  })
  ```
* 9、[本小节代码地址](https://github.com/kuangshp/nest-book-code/tree/09.session)