let fs = require('fs');
//代表一次编译,代表一次生产过程
class Complication{
    build(){
        console.log('编译一次');
    }
}
//代表整个编译
class Compiler{
    run(){
        this.compile();//开始编译
        //index.js如果变更了会重启一次新的编译
        fs.watchFile('./index.js',(curr, prev)=>{
            this.compile();
        });
    }
    compile(){
        let complication = new Complication();
        complication.build();
    }
}

let compiler = new Compiler();
compiler.run();