
class HookCodeFactory {
    setup(hook, options) {
        //把事件函数对象中的函数取出来，拼成一个数组传递给 hook._x
        hook._x = options.taps.map(tap => tap.fn);
    }
    args(options = {}) {
        let { before, after } = options;
        let allArgs = this.options.args;//[name,age]
        if (before) allArgs = [before, ...allArgs];
        if (after) allArgs = [...allArgs, after];
        return allArgs.join(',');//name,age
    }
    init(options) {
        this.options = options;
    }
    deInit() {
        this.options = null;
    }
    header() {
        let code = '';
        code += `var _x = this._x;\n`;
        let interceptors = this.options.interceptors;
        if (interceptors.length > 0) {
            code += `var _taps = this.taps;\n`;
            code += `var _interceptors = this.interceptors;\n`;
            for (let i = 0; i < interceptors.length; i++) {
                let interceptor = interceptors[i];
                if (interceptor.call) {
                    code += `_interceptors[${i}].call(${this.args()});\n`;
                }
            }
        }
        return code;
    }

    /**
     * 动态创建函数
     * @param {*} options  
     *    taps tapInfo数组
     *    args 参数数组
     *    type 注册类型
     */
    create(options) {
        this.init(options);  // this.options = options;
        let { type } = options;
        let fn;
        switch (type) {
            case 'sync':
                fn = new Function(
                    this.args(),//name,age
                    this.header() + this.content()
                );
                break;
            case 'async':
                fn = new Function(
                    this.args({ after: '_callback' }),//name,age
                    this.header() + this.content({ onDone: () => `_callback();\n` })
                );
                break;
            case 'promise':
                let taps = this.options.taps.length;
                let tapsContent = this.content({ onDone: () => `_resolve();\n` });
                let content = `
                    return new Promise((function (_resolve) {
                        ${tapsContent}
                    }));
                `;
                fn = new Function(
                    this.args({}),//name,age
                    this.header() + content
                );
                break;
            default:
                break;
        }
        return fn;
    }
    callTapsSeries() {
        let taps = this.options.taps;
        if (taps.length === 0) {
            return '';
        }
        let code = '';
        for (let i = 0; i < taps.length; i++) {
            let content = this.callTap(i);
            code += content;
        }
        return code;
    }
    callTapsParallel({ onDone }) {
        let taps = this.options.taps;
        let code = `var _counter = ${taps.length};\n`;
        code += `
        var _done = (function () {
            ${onDone()}
        });`;
        for (let i = 0; i < taps.length; i++) {
            let content = this.callTap(i);
            code += content;
        }
        return code;
    }
    /**
     *  var _fn0 = _x[0];
     *   _fn0(name, age);
     * @param {*} i 
     */
    callTap(tapIndex) {
        let code = '';
        let interceptors = this.options.interceptors;
        if (interceptors.length > 0) {
            code += `var _tap${tapIndex} = _taps[${tapIndex}];\n`;
            for (let i = 0; i < interceptors.length; i++) {
                code += ` _interceptors[${i}].tap(_tap${tapIndex});\n`;
            }
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        let tapInfo = this.options.taps[tapIndex];
        switch (tapInfo.type) {
            case 'sync':
                code += `_fn${tapIndex}(${this.args()})\n`;
                break;
            case 'async':
                code += `
                _fn${tapIndex}(${this.args({
                    after: `function () {
                      if (--_counter === 0) _done();
                    }`})});`;
                break;
            case 'promise':
                code += `
                var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                _promise${tapIndex}.then((function () {
                    if (--_counter === 0) _done();
                }));
                `
                break;
            default:
                break;
        }
        return code;
    }
}
module.exports = HookCodeFactory;