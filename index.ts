type Listener = (...args: any[]) => void

class Emitter {
    private _events: Map<string, Listener[]>
    constructor() {
        this._events = new Map()
    }
    on(event: string, listener: Listener) {
        if(!this._events.has(event)) { this._events.set(event, []) }
        this._events.get(event).push(listener)
        const off = () => { this._events.set(event, this._events.get(event).filter((listener_) => listener_ != listener)) }
        return off
    }
    once(event: string, listener: Listener) {
        if(!this._events.has(event)) { this._events.set(event, []) }
        let wrapper
        this._events.get(event).push(wrapper = () => {
            listener()
            this._events.set(event, this._events.get(event).filter((listener_) => listener_ != wrapper))
        })
    }
    emit(event: string, ...args: any[]) {
        if(this._events.has(event)) {
            for(let listener of this._events.get(event)) {
                listener(...args)
            }
        }
    }
    offAll() {
        this._events.clear()
    }
}