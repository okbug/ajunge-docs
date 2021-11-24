"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AssetPlugin =
/*#__PURE__*/
function () {
  function AssetPlugin(options) {
    _classCallCheck(this, AssetPlugin);

    this.options = options;
  }

  _createClass(AssetPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      //每当compiler开始一次新的构建，创建一个新的compilation实例，会触发一个钩子事件
      compiler.hooks.compilation.tap('AssetPlugin', function (compilation) {
        //chunk代码块asset产出的资源文件
        compilation.hooks.chunkAsset.tap('AssetPlugin', function (chunk, filename) {
          console.log(chunk.name, filename);
        });
      });
    }
  }]);

  return AssetPlugin;
}();

module.exports = AssetPlugin;