const JSZip = require('jszip');
const { RawSource } = require('webpack-sources');
class ArchivePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        //emit当webpack确定好输出的内容后会触发一次emit钩子，这里你修改输出文件列表最后的机会，因为这个钩子执行完后就开始把编译后的结果输出到文件系统中去
        //const processAssetsHook = new AsyncSeriesHook(["assets"]);
        compiler.hooks.emit.tap('ArchivePlugin', (compilation) => {
            compilation.hooks.processAssets.tapPromise('ArchivePlugin', (assets) => {
                //assets 本次编译出来的资源文件
                //let assets = compilation.assets;
                var zip = new JSZip();
                for (let filename in assets) {

                    let cacheSource = assets[filename];
                    console.log('before', cacheSource.source);
                    //获取此文件对应的源代码
                    const source = cacheSource.source();
                    console.log('after', source);
                    //向压缩包里添加文件，文件名叫filename,文件内容叫source
                    zip.file(filename, source);
                }
                return zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                    //向输出的文件列表中添加一个新的文件 key
                    /*  assets['archive_' + Date.now() + '.zip'] = {
                         source() {
                             return content;
                         }
                     }; */
                    //assets的值必须是一个对象，对象需要有一个source方法，返回源代码
                    assets['archive_' + Date.now() + '.zip'] = new RawSource(content);
                });
            });
        });
    }
}
module.exports = ArchivePlugin;