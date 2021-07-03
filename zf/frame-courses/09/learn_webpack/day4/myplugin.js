class Myplugin {
  constructor(options) {

  }
  apply(compiler) {
    let hooks = compiler.hooks;
    hooks.emit.tap('myplugin', function (compilation) {
      let assets = compilation.assets;
      var str = '生成文件列表：\n';
      for (let k in assets) {
        str += `## 文件名是：${k}; 文件大小是${assets[k].size()} \n`
      }
      assets['fileList.md'] = {
        source() {
          return str
        },
        size() {
          return str.length
        }
      }
    })
  }
}

module.exports = Myplugin