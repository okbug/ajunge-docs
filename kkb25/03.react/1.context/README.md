Context组件接收有三种方式：
Consumer组件内部传一个函数可以接收到value 并且返回一个JSX语法的DOM
类组件设置 static contextType 赋值为Context对象，可以在类组件中获取到this.context为传递的值 
查看文件 ContextApp.js && Context.js && ConttextIndex.js 来使用一下