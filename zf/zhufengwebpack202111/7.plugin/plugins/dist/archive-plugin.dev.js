"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JSZip = require('jszip');

var _require = require('webpack-sources'),
    RawSource = _require.RawSource;

var ArchivePlugin =
/*#__PURE__*/
function () {
  function ArchivePlugin(options) {
    _classCallCheck(this, ArchivePlugin);

    this.options = options;
  }

  _createClass(ArchivePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      //emit当webpack确定好输出的内容后会触发一次emit钩子，这里你修改输出文件列表最后的机会，因为这个钩子执行完后就开始把编译后的结果输出到文件系统中去
      //const processAssetsHook = new AsyncSeriesHook(["assets"]);
      compiler.hooks.emit.tap('ArchivePlugin', function (compilation) {
        compilation.hooks.processAssets.tapPromise('ArchivePlugin', function (assets) {
          //assets 本次编译出来的资源文件
          //let assets = compilation.assets;
          var zip = new JSZip();

          for (var filename in assets) {
            var cacheSource = assets[filename];
            console.log('before', cacheSource.source); //获取此文件对应的源代码

            var source = cacheSource.source();
            console.log('after', source); //向压缩包里添加文件，文件名叫filename,文件内容叫source

            zip.file(filename, source);
          }

          return zip.generateAsync({
            type: 'nodebuffer'
          }).then(function (content) {
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
  }]);

  return ArchivePlugin;
}();

module.exports = ArchivePlugin;