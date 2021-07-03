create-react-app

npx create-react-app  项目名

npm run eject   暴露配置文件  可以自己配置一些webpack


react-app-rewired 这个包可以让我们 在不暴露配置文件的前提下 修改配置文件
怎么用？ 1 在根目录下 新建一个 config-overrides.js 文件
        2  需要把package.json中的命令 换成 
               "scripts": {
                -   "start": "react-scripts start",
                +   "start": "react-app-rewired start",
                -   "build": "react-scripts build",
                +   "build": "react-app-rewired build",
                -   "test": "react-scripts test",
                +   "test": "react-app-rewired test",
                    "eject": "react-scripts eject"
                } 

组件 都是 函数 (普通函数和类)   
    静态组件 --> 普通函数    hooks
    类组件   -->  class类   

    组件名字 首字母必须大写          




redux 就是一种数据管理模型 跟react没有关系    

react-redux  他是把redux跟react进行链接的一个桥梁
    用法   首先再根组件使用它提供的Provider组件把根组件包起来 然后给他一个store属性
    以后 哪个组件想使用redux中的数据  就用高阶组件connect处理
    处理过的组件 = connect(f1,f2)(处理前的组件)

    f1接收的是redux中的state  返回值必须是一个对象 这个对象中的属性会传给处理的组件
    f1 接收的是redux中的dispatch 返回值必须是一个对象 这个对象中的属性会传给处理的组件

    combineReducers({
        xxx:xxxReducer
    }) 用来合并多个reducer


  redux-thunk 是一个redux中间件  可以让dispatch接收一个函数了
  应用中间件 需要applyMiddleware