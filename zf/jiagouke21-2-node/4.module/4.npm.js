// npm node package manager  第三方模块， 我们可以通过npm来进行下载 
// npm  npm安装的模块 分为两种 本地安装 

// 全局安装 只能放在命令行中使用   
// 本地安装 在开发的时候会使用的模块

// npm install http-server -g
// npm root -g 全局安装的目录 Users\test1\AppData\Roaming\npm\node_modules, 把对应的模块放到了环境变量指代的目录

// C:\Users\test1\AppData\Roaming\npm\hs -> C:\Users\test1\AppData\Roaming\npm\node_modules\http-server\bin\http-server
// C:\Users\test1\AppData\Roaming\npm\http-server -> C:\Users\test1\AppData\Roaming\npm\node_modules\http-server\bin\http-server

// 包必须要初始化 
// 在开发时 可以临时将我们的包，放到全局下 npm link, 方便调试

// 后续肯定需要将包发不到npm 上， 可以下载加 -g 直接放到当前用户系统中

// 仅仅在命令中使用， 做一些工具 
// nrm 切换源  npm、nrm(node regisiter manager)、nvm （node version manager  nvm-win）

// nrm use cnpm/taobao/npm 某个源  npm install 


// 本地模块  开发依赖 --save-dev（-D）（仅在开发的时候使用 gulp） 项目依赖  --save （-S）（开发上线都需要 vue react）
// 也可以不区分 没有很大影响

// package-lock.json 是用于锁定版本的

// npm 他的特点是将包拍平 ,如果版本不同 会各自安装到自己的模块下
// devDependencies;
// dependencies
// peerDependencies
// optionalDependencies  bundleDependencies
// a -> c@2
// b -> c@3

// a
// c
// b


// vue 2 -> vue-template-compiler 2


// 版本号 ^ ~ >= <=  semver约定 三位  major.minor.patch 
// ^2.2.0  2只能是2  (2.3.0 2.2.4)
// ~2.2.0  2.2 只能是2.2 比0大都可以
// >= 2.1
// <= 2.1  
// 1.0.0 ~ 2.0.0

// 还有一些特殊的 >=2  -> 3发布了  预发版本，先测试 后续ok 在发布正式的
// alpha  @3.0.0-alpha0.1 内部测试
// beta   公测版本 可以一起测试
// rc 最终测试版本 
// 最后发布正式版本


// 命令执行问题， 将模块安装到了项目里 该如何使用 

// webpack 


// npm run 命令会将当前项目下的node_modules/.bin 目录放到环境变量中，所以可以在执行时找到目录下的文件，执行完毕后，环境变量就移除掉了

// npx 如果模板不存在会下载，执行 -》 在删除  如果当先项目下有可以直接复用，如果没有会先安装 (好处就是最新的)
// 执行的命令都很长 npx 执行没法保存参数  （临时用完就销毁 包 环境变量都没有了）