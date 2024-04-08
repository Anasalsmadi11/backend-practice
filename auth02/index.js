'use strict'

require('dotenv').config()
const server= require('./src/server')
const {sequelize} = require('./src/models/index')
const port= process.env.PORT
sequelize.sync()
    .then(()=>{
        server.listen(port,()=>{
            console.log('server is ready')
        })
    })