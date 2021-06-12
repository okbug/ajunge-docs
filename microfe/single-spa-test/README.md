全局安装single-spa的脚手架 `npm install create-single-spa -g`

然后新建一个目录
在目录中输入 `create-single-spa`
然后就会有类似vue-cli或cra的一个终端选择器
首先让你选择应用的文件夹，默认是 `.` 也就是当前文件夹
这里输入container 这样就会在文件夹下创建一个叫做container的文件夹
然后第二个选项选择 `single-spa root config` 这是创建容器应用的意思
然后其他的随意

最后切换到container文件夹下，输入 `npm start` 这样就会在 http://localhost:9000/ 有项目出现了

