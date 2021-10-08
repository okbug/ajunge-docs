const EventEmitter = require('events');
const fs = require('fs')
const { Queue } = require('./LinkList')
class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.open();

        // 自定义写入流的属性
        // 1.记录写入的总个数，如果写入后，在减去写入的个数
        this.len = 0; // 字节数
        this.offset = this.start; // 写入的偏移量
        this.cache = new Queue; // 缓存写入操作
        this.needDrain = false; // 是否要触发 drain事件
        this.writing = false; // 表示是否正在写入 如果是正在写入就放到缓存区中
    }
    clearBuffer() { // 消息队列
        // 写入完毕后  清空缓存区
        let obj = this.cache.peak(); // 底层用链表来优化队列
        if (obj) {
            let { chunk, encoding, cb } = obj.element
            this._write(chunk, encoding, cb)
        } else {
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false;
                this.emit('drain')
            }
        }
    }
    write(chunk, encoding = null, cb = () => {}) {
        // 数据肯定是buffer类型得
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        this.needDrain = this.len >= this.highWaterMark;

        let oldCb = cb;
        cb = () => {
            oldCb();
            this.clearBuffer()
        }
        if (this.writing) {
            // 放到缓存区中
            this.cache.add({
                chunk,
                encoding,
                cb
            })
        } else {
            this.writing = true;
            this._write(chunk, encoding, cb)
        }
        return !this.needDrain
    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }

        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            this.offset += written;
            this.len -= written;
            cb(); // 成功后会调用回调，回调完成后需要继续清空
        })
    }
    end(chunk, encoding = null, cb = () => {}) {

    }
    destroy(err) {
        if (err) {
            return this.emit('error', err)
        }
        if (this.autoClose) {
            fs.close(this.fd, () => {
                if (this.emitClose) {
                    this.emit('close')
                }
            })
        }
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.destroy(err);
            }
            this.fd = fd;
            this.emit('open', fd); // 当你发射open事件的时候 肯定能拿到fd了
        })
    }

}

module.exports = WriteStream