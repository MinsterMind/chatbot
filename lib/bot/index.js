const bot = require('./bot')

const load = io => {
    io.on('connection', socket => {
        socket.on('chat message', msg => {
            io.emit('chat message', msg)
            io.emit('bot chat message', bot.getResponse(msg))
        })
        socket.on('bot chat message', msg => {
            io.emit('chat message', 'you: manoj: '+msg)
        })
    })
}

module.exports = {load}