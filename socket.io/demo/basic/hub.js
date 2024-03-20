'use strict'
require('dotenv').config()
const port = process.env.PORT
const socket = require('socket.io') // typeof(socket) : function
const ioSocket = socket(port)


ioSocket.on('connect', (newSocket)=>{
    // console.log(newSocket)
    console.log('welcome to my server socket.io ' + newSocket.id)

    // ioSocket.on('sayHi', (payload)=>{
    //     console.log('hi from the client', payload.name)
    // })
    ioSocket.emit('att', {phrase:' attention, to all clients'}) // here if you put ioSocket.on it wont work , but if  you put ioSocket.emit it'll work and this is like the server sent message to all clients 

    newSocket.on('bye', (payload)=>{
        console.log(`byeeeee, ${payload.phrase}`)
    })


})