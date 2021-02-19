const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const Creator = require('./Ctreator');
module.exports = async function (projectName,options) {
    // 创建项目 
    const cwd = process.cwd(); // 获取当前命令执行时的工作目录
    const targetDir = path.join(cwd,projectName); // 目标目录
    if(fs.existsSync(targetDir)){
        if(options.force){ // 如果强制创建 ，删除已有的
            await fs.remove(targetDir);
        }else{
            // 提示用户是否确定要覆盖
            let {action} = await Inquirer.prompt([ // 配置询问的方式
                {
                    name:'action',
                    type:'list', // 类型非常丰富
                    message: `Target directory already exists Pick an action:`,
                    choices:[
                        {name:'Overwrite',value:'overwrite'},
                        {name:'Cancel',value:false}
                    ]
                }
            ]);
            if(!action){
                return
            }else if(action === 'overwrite'){
                console.log(`\r\nRemoving....`);
                await fs.remove(targetDir)
            }
        }
    }
    // 创建项目
    const creator = new Creator(projectName,targetDir);

    creator.create(); // 开始创建项目 

}