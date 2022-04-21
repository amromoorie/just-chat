import { instrument } from '@socket.io/admin-ui'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
// intiate server
const app = express()
const server = http.createServer(app)

// for cors issues
app.use(cors())

// intiate socket io service
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
  },
})
// socket io dashboard setup
instrument(io, { auth: false })

io.on('connection', (socket) => {
  // console.log('server:: on connection!', socket.id)
  // socket.on('sendMessage', msg => {
  //   socket.broadcast.emit('haveMessage', msg)
  // })
  socket.emit('message', 'Welcome it started!')
  socket.broadcast.emit('message', 'you have joined successfully')

  socket.on('disconnect', () => {
    io.emit('message', 'you have left chat...')
  })
  // listen for  chat
  socket.on('initiate-chat', (chat, room) => {
    if (room === '') {
      console.log('chat: ', chat)
      socket.broadcast.emit('message', chat)
    } else {
      socket.to(room).emit('message', chat)
    }
  })

  socket.on('join-room', (roomPassCode, cb) => {
    console.log('roomPassCode: ', roomPassCode)
    socket.join(roomPassCode)
    cb()
  })
})

const PORT = 8081
server.listen(PORT, (err) => {
  if (err) throw new Error(err)
  console.log(`Server is listening on port ${PORT}!`)
})
