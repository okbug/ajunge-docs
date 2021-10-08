const EventEmitter = require('events');
const fs = require('fs')
class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.highWaterMark = options.highWaterMark || 64 * 1024;

        this.flowing = false; // 非流动模式，还没有开始读取文件中的内容。后续 pause resume 就是更新这个flowing属性的
      
        this.open();
        // 每次你调用on方法，如果不是newListener事件就会触发newListener的回调,同步触发的
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.read();
            }
        });
      
        this.offset = this.start;
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
    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read())
        }
        const buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd,buffer,0,this.highWaterMark,this.offset,(err,bytesRead)=>{
            if(bytesRead){
                this.offset += bytesRead;
                this.emit('data',buffer);
                this.read();
            }else{
                this.emit('end')
                this.destroy()
            }
        })
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
    resume() {

    }
    pause() {

    }
}

module.exports = ReadStream