'use strict'

require('dotenv').config()
const port = process.env.PORT
const host = `http://localhost:${port}/health-system`
const io = require('socket.io-client')
const socket = io.connect(host)

socket.on('flu', handleFlu)

function handleFlu(payload){
    console.log('running nose', payload)
}