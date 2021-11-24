
function loader(source) {
    console.log('normal1');
    return source + '//normal1';
}
//style=loader的时候 会用到
loader.pitch = function (remainingRequest, previousRequest, data) {
    console.log(remainingRequest);
    console.log(previousRequest);
    console.log(data);
    console.log('normal1 pitch');
    return 'var v = "normal1"';
}
module.exports = loader;