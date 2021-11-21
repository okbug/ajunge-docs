/1.sync => webpack同步加载commonjs

/2.cjs2esm => commonjs加载esmodule

/3.esm2esm => esm 加载esm


[webpack使用脚手架初始化一个plugin或者loader](https://webpack.docschina.org/api/cli/)


# 调试webpack工作流程

使用vscode调试

在项目根目录添加 `.vscode` 文件夹，并且添加配置文件:`launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug webpack",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/webpack/bin/webpack.js"
    }
  ]
}


```

注意上面`program`的webpack路径要对应自己node_modules下的路径(因为有可能多个版本webpack 导致件夹带上版本号)

然后新建一个文件

