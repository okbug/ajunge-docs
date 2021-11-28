function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args);
        }
        return args;
    }
}
export default compose;