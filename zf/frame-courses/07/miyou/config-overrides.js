// module.exports = function (config) {
const { override, fixBabelImports } = require('customize-cra');
let res = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
console.log(res)
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
// }