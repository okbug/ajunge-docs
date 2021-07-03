class MyPlugin {
  constructor(options) {
    this.options = options
  }
  handleInitial(complication, callback) {
    var str = '文件列表是:\n';
    for (let k in complication.assets) {
      str += `文件名:${k},,,大小是 ${complication.assets[k].size()} \n\n`
    }
    complication.assets['myfile.md'] = {
      source() {
        return str
      },
      size() {
        return str.length
      }
    }
    callback && callback()
  }
  apply(compiler) {
    // console.log(compiler);
    const hooks = compiler.hooks;
    if (hooks) {
      // 给 webpack的emit事件(钩子)  绑定了一个函数
      hooks.emit.tap('myplugin', compilation => {
        this.handleInitial(compilation);
      });
    } else {
      compiler.plugin('emit', (compilation, callback) => {
        try {
          this.handleInitial(compilation);
          callback();
        } catch (error) {
          callback(error);
        }
      });
    }
  }
}

module.exports = MyPlugin