import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [latestMessages, setLatestMessages] = useState("")
  const [message, setMessage] = useState("")

  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen = ()=>{
      console.log("connected")
      setSocket(socket)  
    }

    socket.onmessage = (message)=>{
      console.log("received message", message.data)
      setLatestMessages(message.data)
    }
    setSocket(socket)

    return ()=>{
      socket.close();
    }
    
  },[])
  if(!socket){
    return <div>
      
      connecting to socket server...
    </div>
  }


  return (
    <div>
      <input type="text" placeholder='write here' onChange={(e)=>{
        setMessage(e.target.value)
      }} />
      <button onClick={()=>{
        socket.send(message)
      }} >send</button>
      {latestMessages}
    </div>  )
}

export default App
