"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DonePlugin =
/*#__PURE__*/
function () {
  function DonePlugin(options) {
    _classCallCheck(this, DonePlugin);

    this.options = options;
  }

  _createClass(DonePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      //在编译 完成后再打印
      //	done: new AsyncSeriesHook(["stats"]),
      compiler.hooks.done.tapAsync('DonePlugin', function (stats, callback) {
        setTimeout(function () {
          console.log('DonePlugin');
          callback();
        }, 0);
      });
    }
  }]);

  return DonePlugin;
}();

module.exports = DonePlugin;