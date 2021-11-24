(function anonymous(name, age) {
    //_x里面放的是事件回调函数 数组
    var _x = this._x;
    
    var _fn0 = _x[0];// this.taps[0].fn
    _fn0(name, age);

    var _fn1 = _x[1];
    _fn1(name, age);

    var _fn2 = _x[2];
    _fn2(name, age);
})