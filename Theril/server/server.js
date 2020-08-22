const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const PORT = 3000

const users = []
io.on('connection', (socket) => {
      console.log('A user connected: ' + socket.id)

      socket.on('sendMessage', (data) => {
            const payload = {
                  username: data.username,
                  text: data.message
            }
            io.emit('recieve', payload)
      })

      socket.on('submitLogin', (username) => {
            console.log(username)
            const user = {
                  username,
                  id: socket.id
            }
            console.log(user)
            users.push(user)
      })

      socket.on('disconnect', () => {
            console.log((`User ${socket.id} disconnected.`))
      })
})

http.listen(PORT, function () {
      console.log('Server Running on port:', PORT)
})