"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg); // let info =  it.next(value)
      
        var value = info.value; // info.value => yield的返回值
    } catch (error) {
         reject(error); return;
         }
    if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function read() {
    return _read.apply(this, arguments);
}

function _read() {
    _read = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var a, b;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return 'b.txt';

                    case 3:
                        a = _context.sent;
                        _context.next = 6;
                        return fs.readFile(a, 'utf8');

                    case 6:
                        b = _context.sent;
                        return _context.abrupt("return", b);

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context["catch"](0);
                        console.log(_context.t0);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [
            [0, 10]
        ]);
    }));
    return _read.apply(this, arguments);
}