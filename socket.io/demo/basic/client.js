'use stirct'
require('dotenv').config()
const port= process.env.PORT
const ioClient= require('socket.io-client')
const host= `http://localhost:${port}`
const socket= ioClient.connect(host)

socket.emit('sayHi', {name: "kyoko otonashi"})

setTimeout(() => {
    
    socket.emit('bye', {phrase:'see you again'})
}, 3000);

    socket.on('att', (payload)=>{
    console.log('hi from the client', payload.phrase)
})