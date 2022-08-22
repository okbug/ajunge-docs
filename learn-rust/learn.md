Rust的主要特点：
无GC、基于LLVM、内存安全、强类型+静态类型
混合编程范式
线程安全

# Rust的设计哲学

- 内存安全
- 零成本抽象
- 实用性

> 运行单个文件类似 node app.js
> 创建项目类似 npm init 运行项目类似 npm run script
> cargo就是rust 中的包管理器，类似pip、npm等

运行单个文件
```shell
rustc main.rs
./main
```

创建项目

`cargo new p-name`

运行项目
`cd p-name`

`cargo run`

test