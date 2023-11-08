'use strict'
require('dotenv').config()
const port = process.env.PORT
const socket = require('socket.io')
const ioSocket = socket(port)

ioSocket.on('connect', (newSocket)=>{
    // console.log(newSocket)
    console.log('welcome to my server socket.io ' + newSocket.id)

    ioSocket.on('sayHi', ()=>{
        console.log('hi from the client')
    })

    newSocket.on('bye', (payload)=>{
        console.log(`byeeeee, ${payload.phrase}`)
    })


})