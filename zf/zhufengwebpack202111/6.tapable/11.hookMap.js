let { SyncHook } = require('tapable');
class HookMap {
    constructor(createHookFactory) {
        this._createHookFactory = createHookFactory;
        this._map = new Map();
    }
    for(key) {
        const hook = this._map.get(key);
        if (hook) return hook;
        let newHook = this._createHookFactory();
        this._map.set(key, newHook);
        return newHook;
    }
    get(key) {
        return this._map.get(key);
    }
}
const map = new HookMap(() => new SyncHook(['name']));
map.for('key1').tap('plugin1', (name) => console.log('plugin1', name));
map.for('key1').tap('plugin2', (name) => console.log('plugin2', name));
const hook1 = map.get('key1');
hook1.call('zhufeng');
/**
 * 它可以帮助 我们快速创建一组钩子
 */
