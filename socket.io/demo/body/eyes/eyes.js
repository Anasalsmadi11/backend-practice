'use strict'
require('dotenv').config()
const port = process.env.PORT || 3030
const host= `http://localhost:${port}`
const ioClient= require('socket.io-client')
const socket = ioClient.connect(host)

socket.on('brightness', handleBrightness)

function handleBrightness(payload){
    if(payload.brightness >= 75){
        console.log('close your eyes')
    }
}

socket.emit('light')