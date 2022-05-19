创建项目:

`cargo new project-name`

运行项目:

`cargo run`

或者`cargo build`
build之后要在target文件夹下面运行可执行文件

## mod的概念
mod类似nodejs中的一个个本地模块
```rust
// main.rs

mod mod1
fn main() {
    println!("{}", mod1::TEXT);
}

// mod1.rs 或者mod1文件夹下面的mod.rs文件
pub const TEXT: &str = "Hello, World";
```

使用这个办法可以在main中引入我们的mod1中的变量和方法

