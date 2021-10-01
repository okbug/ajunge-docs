interface fn {
    (...payload: any): void;
}

class EventEmitter {
    private events = new Map<string, fn[]>();

    private on(eventName: string, callback) {
        const event = this.events.get(eventName) || [];
        event.push(callback);
        this.events.set(eventName, event);
    }

    private emit(eventName: string, ...payload) {
        const cbs = this.events.get(eventName);
        cbs && cbs.forEach(cb => cb(...payload));
    }

    private off(eventName: string, callback: fn) {
        let cbs = this.events.get(eventName);
        if (cbs) {
            cbs = cbs.filter(fn => fn !== callback);
            this.events.set(eventName, cbs);
        }
    }

    private once(eventName: string, callback: fn) {
        const fn: fn = (...payload) => {
            callback(...payload);
            this.off(eventName, fn);
        }

        this.on(eventName, fn);
    }
}

interface one {
    name: string;
}
class One {
    age: number = 1;
    func1() {
        console.log('one func1')
    }
}
class Two implements One {
    // constructor
    age: number = 2;
    func1() {
        console.log('two func1')
    }
}