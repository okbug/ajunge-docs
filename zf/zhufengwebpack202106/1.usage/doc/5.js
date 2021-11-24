let less = require('less');
//如果遇到less 里包含@import,直接处理了
less.render(myCSS, { plugins: [LessPlugin] })
  .then(
    function(output) { },
    function(error) { }
  );