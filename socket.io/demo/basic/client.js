'use stirct'
require('dotenv').config()
const port= process.env.PORT
const ioClient= require('socket.io-client')
const host= `http://localhost:${port}`
const socket= ioClient.connect(host)

socket.on('sayHi', (payload)=>{
    console.log('server said hi and the payload is ' + payload.name)

    
})

setTimeout(() => {
    
    socket.emit('bye', {phrase:'see you again'})
}, 3000);