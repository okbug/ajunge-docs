
const { ExternalModule } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
class AutoExternalPlugin {
    constructor(options) {
        this.options = options;
        ///可以进行外部依赖的模块数组
        this.externalModules = Object.keys(this.options);//['lodash']
        //存放着所有的实际用到的外部依赖
        this.importedModules = new Set();//[]
    }
    /**
     * 1.收集依赖，我需要知道这个项目中一共到底用到了哪些外部依赖模块，放到importedModules里面
     * 2.拦截生成模块的流程，如果它是一个外部模块话，就不要走原始的打包流程了，而用一个外部模块进行替代
     * 3.把实用到的依赖模块对应的CDN脚本插入到输出的index.html里面去
     * @param {*} compiler 
     */
    apply(compiler) {
        //获取普通模块的工厂
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
            normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap('AutoExternalPlugin', parser => {
                    //parser会负责把源代码转成AST语法树，并且进行遍历，如果发现了import语句话，就触发回调
                    parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
                        if (this.externalModules.includes(source)) {
                            this.importedModules.add(source);//如果走到了这里，就表示代码中实际用到了lodash这个模块
                        }
                    });
                    //监听CallExpression语法树节点，如果方法名是require的话
                    parser.hooks.call.for('require').tap('AutoExternalPlugin', (callExpression) => {
                        let source = callExpression.arguments[0].value;
                        if (this.externalModules.includes(source)) {
                            this.importedModules.add(source);//如果走到了这里，就表示代码中实际用到了lodash这个模块
                        }
                    });
                })
            normalModuleFactory.hooks.factorize.tapAsync('AutoExternalPlugin', (resolveData, callback) => {
                let { request } = resolveData;//lodash
                if (this.importedModules.has(request)) {
                    let { globalVariable } = this.options[request];//_
                    //如果返回的是一个外部模块，则不需要按正常模块生产流程执行
                    callback(null, new ExternalModule(globalVariable));
                } else {
                    //读取模块源代码，传递给loader再返回JS模块，再解析依赖，再返回此模块
                    callback(null);//NormalModule 普通模块
                }
            });
        });
        compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
            //1.HtmlWebpackPlugin内部会向compilation对象上添加额外的钩子
            //2.可以通过HtmlWebpackPlugin.getHooks取现这些钩子
            //3.改变标签
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin', (htmlData, callback) => {
                [...this.importedModules].forEach(key => {
                    htmlData.assetTags.scripts.unshift({
                        tagName: 'script',
                        voidTag: false,
                        meta: { plugin: 'html-webpack-plugin' },
                        attributes: { src: this.options[key].url }
                    });
                });
                callback(null, htmlData);
            });
        });
    }
}
module.exports = AutoExternalPlugin;