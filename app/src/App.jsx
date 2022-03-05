import io from 'socket.io-client'
const socket = io.connect('http://localhost:8081')
import { Button } from '@mantine/core'

function App() {
  return (
    <div>
      <Button>Hello world!</Button>
    </div>
  )
}

export default App
