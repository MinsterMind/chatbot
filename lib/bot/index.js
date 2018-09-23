const bot = require('./bot')

const load = io => {
    //handle on connection event for socket.io
    io.on('connection', socket => {

        //handle event when message is received
        socket.on('chat message', msg => {
            //reply with the same message to show on the client side
            io.emit('chat message', msg)

            //reply with the bot answer
            io.emit('bot chat message', bot.getResponse(msg))
        })
    })
}

module.exports = {load}