const Emitter = require('./')

const emitter = new Emitter()

emitter.on('tick', (a) => {
    console.log('normal', a)
})

emitter.once('tick', (a) => {
    console.log('once', a)
})

const off = emitter.on('tick', (a) => {
    console.log('cancel', a)
})

emitter.on('tick', (a, b) => {
    console.log('two args', a, b)
})

setInterval(() => {
    emitter.emit('tick', 10, 100)
}, 1000)

setTimeout(() => {
    off()
}, 3000)