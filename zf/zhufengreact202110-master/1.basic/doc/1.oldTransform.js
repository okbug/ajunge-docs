const babel = require("@babel/core");
const sourceCode = `<h1 id="title" key="title" ref="title">hello</h1>`;
const result = babel.transform(sourceCode, {
    plugins: [['@babel/plugin-transform-react-jsx',{runtime:'classic'}]]
});
console.log(result.code);

const result2 = babel.transform(sourceCode, {
    plugins: [['@babel/plugin-transform-react-jsx',{runtime:'automatic'}]]
});
console.log(result2.code);