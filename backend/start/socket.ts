import Ws from 'App/Services/Ws'
import Cron from 'node-cron'

Ws.boot()

Ws.io.on('connection', (socket) => {
    Cron.schedule('11 * * * *', () => {
        socket.emit('cron', `Avante soldado, está começando a guerra de torres!`)
    })

    socket.emit('ping', 'Pong!')
})
