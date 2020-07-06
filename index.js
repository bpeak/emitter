class Emitter {
    constructor() {
        this._events = new Map()
    }
    on(event, listener) {
        if(!this._events.has(event)) { this._events.set(event, []) }
        this._events.get(event).push(listener)
        return () => {
            this._events.set(event, this._events.get(event).filter((listener_) => listener_ != listener))
        }
    }
    once(event ,listener) {
        if(!this._events.has(event)) { this._events.set(event, []) }
        let wrapper
        this._events.get(event).push(wrapper = function(...args){
            listener(...args)
            this._events.set(event, this._events.get(event).filter((listener_) => listener_ != wrapper))
        }.bind(this))
    }
    emit(event, ...args) {
        if(this._events.has(event)) {
            this._events.get(event).forEach(listener => {
                listener(...args)
            })
        }
    }
    offAll() {
        this._events.clear()
    }
}

module.exports = Emitter