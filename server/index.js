import express from 'express'
import cors from 'cors'
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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('server:: on connection!', socket)
  // socket.on('sendMessage', msg => {
  //   socket.broadcast.emit('haveMessage', msg)
  // })
})



const PORT = 8081
server.listen(PORT, (err) => {
  if (err) throw new Error(err)
  console.log(`Server is listening on port ${PORT}!`)
})


