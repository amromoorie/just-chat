import { useState } from 'react'
import io from 'socket.io-client'



export default function ChatRegister({}) {
  const socket = io.connect('http://localhost:8081')

  const [currentUserInput, setCurrentUserInput] = useState('')
  const [currentRoomInput, setCurrentRoomInput] = useState('')
  const [message, setMessage] = useState('')

  socket.on('connect', () => {
    console.log('you are conntected::::', socket.id)
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setMessage(currentUserInput)
    setCurrentUserInput('')

    socket.emit('initiate-chat', message)
  }

  const handleUserChange = (evt) => {
    setCurrentUserInput(evt.target.value)
  }

  const handleRoomChange = (evt) => {
    setCurrentRoomInput(evt.target.value)
  }

  const joinRoom = (room = 1243) => {
    socket.emit('join-room', room, (msg) => {
      // show message
    })
  }
  console.log('joinRoom: ', joinRoom())
  socket.on('message', (message) => {})
  return (
    <div className='bg-green-800 flex justify-center items-center'>
      <main className='bg-gray-400 flex flex-col justify-cfenter itemfs-center space-y-5'>
        <h2 className='text-2xl'>Register</h2>
        <section>
          <label>username: </label>{' '}
          <input
            type='text'
            placeholder='username'
            value={currentUserInput}
            onChange={handleUserChange}
          />
          <label>room code</label> <input />
        </section>
      </main>
    </div>
  )
}
