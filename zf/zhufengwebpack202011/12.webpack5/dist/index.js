(() = > {
    "use strict";
    function t(n) {
    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
        function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(n)
}
function n(t, e) {
    return (n = Object.setPrototypeOf ||
        function (t, n) {
            return t.__proto__ = n,
                t
        })(t, e)
}
function e(n, e) {
    return !e || "object" !== t(e) && "function" != typeof e ?
        function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(n) : e
}
function o(t) {
    return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    })(t)
}
function r(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
}
var c = function (t) {
    !
    function (t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
            e && n(t, e)
    }(i, (function t() {
        r(this, t)
    }));
    var c, u, f = (c = i, u = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))),
                !0
        } catch (t) {
            return !1
        }
    }(),
        function () {
            var t, n = o(c);
            if (u) {
                var r = o(this).constructor;
                t = Reflect.construct(n, arguments, r)
            } else t = n.apply(this, arguments);
            return e(this, t)
        });
    function i() {
        return r(this, i),
            f.apply(this, arguments)
    }
    return i
}();
console.log(c, "zhufeng")
}) ();