'use strict'

require('dotenv').config()
const port = process.env.PORT || 3030
const socket = require('socket.io')
const ioSocket = socket(port)

ioSocket.on('connect' ,(newSocket)=>{
    console.log('socket connected', newSocket.id)

    ioSocket.emit('brightness', {brightness: 75}) 

    newSocket.on('light', ()=>{
       setInterval(() => {
        let brightness = Math.ceil((Math.random() * 100))
        console.log('-------------------------------')
        console.log('brightness detected', brightness)
        
        ioSocket.emit('brightness' ,{brightness:brightness})
       }, 3000);
    })
})

const healthSystem = ioSocket.of('/health-system')

healthSystem.on('connect',(newSocket)=>{
    console.log('name space connected', newSocket.id)

    healthSystem.emit('flu', 'is sick')
})