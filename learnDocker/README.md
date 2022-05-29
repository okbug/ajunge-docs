## 进入一个正在运行的docker的终端

----

## 运行docker基本流程
docker run -it -p [服务器的端口]:[docker虚拟机的端口] 镜像名称

举例：

`docker run -it -p 80:80 nginx-html`

由于Nginx默认是在80端口，所以docker虚拟机端口选择80
如果要访问 http://服务器ip:3000 访问到文件
那么就需要输入 `docker run -it -p 3000:80 nginx-html`


nginx-html是自己打的镜像

打镜像过程
```shell
mkdir test-single-index
cd test-single-index
vim index.html
vim Dockerfile
docker image build -t nginx-html .
# 这里默认打的使用 Dockerfile这个文件，如果指定文件可以通过 -f 来指定
# docker image build -f node.Dockerfile -t tag-name
```


运行

docker run -it -p 80:80 nginx-html

通过这样的流程 可以打包一个只有index.html的最基础Nginx包

上述Dockerfile内容为

```Dockerfile
# 选择基础镜像
FROM nginx:1.21.0-alpine

# 将上面写的index.html打入到镜像的 Nginx默认目录
# 由于还没有对Nginx进行配置，所以默认进入到这个页面中
ADD index.html /usr/share/nginx/html/index.html
```


### RUN 指令

RUN 可以在镜像中执行shell脚本(包括异步，比如下载、删除等操作)

但是一个RUN指令会产生一层 **Image Layer** (不知道是什么) 会让镜像变得很大
所以在一个RUN指令里面使用 && 和 换行就可以
```Dockerfile
FROM what
RUN echo "Hello" && \
    echo "World" && \
    echo "!"
```

### 为什么说多次RUN有缓存？
我的理解是 它类似git一样，每次的RUN都需要保存
所以如果有下载文件的话，当次的历史记录也会继续把文件保留
下一次RUN的时候才删除。但是文件依然存在于版本管理的东西内
所以会比较占空间

## Dockerfile中的COPY
COPY和ADD都可以把本地的文件复制到镜像。如果嵌套目录不存在，会自动创建


```Dockerfile
COPY my-file.js /a/b/c/index.js
```


### ADD和COPY的不同点
如果是压缩文件的话，ADD后可以自动解压


### 如何选择

复制一般使用`COPY`，解压使用`ADD`

## WORKDIR
WORKDIR 是指定了当前的工作目录（如果没有就创建）
在指定了工作目录后运行的ADD、COPY等命令，都会默认在工作目录中新建和复制
（相当于是cd到了那个目录再进行操作）


## ARG和ENV

相同点：
在Dockerfile中，同样可以当做变量来使用
```Dockerfile
FROM node:14
ARG NAME=Hello
ENV AGE=18
```

不同点：
ARG灵活，在构建容器的时候可以通过 --build-arg NAME=newName 来改变变量
而不是通过修改Dockerfile
ENV可以打入到虚拟环境中的env里面


## CMD
CMD就是最后一次执行的命令
或者说是 容器启动的时候执行的命令
多个CMD的的话，只会执行最后一个



## 快速清理

快速清理停止的容器
`docker system prune -f`

快速清理没有使用的镜像
`docker image prune -a`
