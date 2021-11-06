function loader(source) {
    // source 是 资源被fs读取后解析的字符串
    return `module.exports = ${JSON.stringify(source)}`
}
module.exports = loader