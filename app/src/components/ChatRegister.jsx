import { useState } from 'react'
import io from 'socket.io-client'
import img from '../assets/hero.svg'


export default function ChatRegister({}) {
  const socket = io.connect('http://localhost:8081')

  const [currentUsernameInput, setCurrentUsernameInput] = useState('')
  const [currentRoomInput, setCurrentRoomInput] = useState('')
  const [message, setMessage] = useState('')

  socket.on('connect', () => {
    // console.log('you are conntected::::', socket.id)
  })

  socket.on('message', (message) => {
    // console.log('message!: ', message);

  })

  // const handleSubmit = (evt) => {
  //   evt.preventDefault()
  // }
  
  const startChatting =   () => {
    setMessage(currentUsernameInput)
    setCurrentUsernameInput('')
  
   socket.emit('initiate-chat', currentUsernameInput)
    // console.log('test::::message: ', message);
    
  }

  const handleUserChange = (evt) => {
    setCurrentUsernameInput(evt.target.value)
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
  return (
    <>  
    <div className='flex justify-center  '>

        <div class="absolute opacity-80 w-[75%] h-[75%] rotate-[-3deg] mt-32 rounded-2xl shadow-innerj origin-top-left bg-gradient-to-br from-primary via-primary to-secondary  -z-10"></div>
      <div className='opacity-80 h-screen w-[60%] absolute bg-primary '></div>
    </div>

    <div className='bg-primdary h-screen bg-clip-padfding flex flex-col justify-center items-center  backdrop-filter backdrop-blur-sm' >

      <div className='h-screen w-[60%] flex flex-col justify-center items-center'>

        <h2 className='text-3xl bg-white rounded-lg px-[12rem] py-4 text-gray-800 '>Register</h2>
      <main className='flex flex-col items-center justify-center mt-2 bg-white border-secondary border-2  h-[40rem] w-[30rem] rounded-2xl '>
        <section className='h-[20rem] w-[10rem] bg-dslate-600 '>
          <form className=' flex flex-col justify-center items-center'>
            {/* <label className='block'> */}

            <span className='block text-lg font-medium text-slate-700'>Username</span>
          <input
            className='w-full h-12 rounded-lg px-4 text-lg focus:ring-primary border-primary border-2'
            type='text'
            placeholder='username'
            value={currentUsernameInput}
            onChange={handleUserChange}
            />
            {/* </label> */}
            <input
            type='text'
            placeholder='room ID'
            value={currentRoomInput}
            // onChange={handleUserChange}
            />
          <button className='' onClick={startChatting}>Send</button>
            </form>
        </section>
        <section className='ml-2 border-primary border-2  h-[5rem] w-[20rem] rounded-lg'>
          <h3 className='pl-2 text-gray-800 '>your username &amp; a room ID are needed for chatting functionality..</h3>

        </section>
      </main>
      </div>
    </div>
            </>
  )
}
