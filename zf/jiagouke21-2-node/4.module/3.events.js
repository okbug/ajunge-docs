function EventEmitter() {
    this._events = {}
}
EventEmitter.prototype.on = function(eventName, callback) {
    if (!this._events) this._events = {}
    const callbacks = this._events[eventName] || [];
    callbacks.push(callback);
    this._events[eventName] = callbacks;
}
EventEmitter.prototype.emit = function(eventName, ...args) {
    if (!this._events) this._events = {}
    let callbacks = this._events[eventName];
    if (callbacks) {
        callbacks.forEach(cb => cb(...args));
    }
}
EventEmitter.prototype.off = function(eventName, callback) {
    if (!this._events) this._events = {}
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(fn => fn != callback && fn.l != callback)
    }
}
EventEmitter.prototype.once = function(eventName, callback) {
    const one = (...args) => {
        callback(...args)
        // 执行完毕后 
        // 删除事件啊
        this.off(eventName, one)
    }
    // 先绑定事件
    one.l = callback; // 自定义属性 创建关联
    this.on(eventName, one);
}
module.exports = EventEmitter

// on emit off once 基本的四个方法，必须非常流利的写出来