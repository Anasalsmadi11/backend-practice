'use strict'

require('dotenv').config()
const express= require('express')
const app= express()
app.use(express.json())
const bcrypt= require('bcrypt')
const basic= require('./middlewares/basicAuth')
const bearer = require('./middlewares/bearerAuth')
const users= require('./models/userModel')
const acl= require('./middlewares/acl')

app.post('/signup', async(req,res)=>{
    let username= req.body.username
    // let hashedPassword = await bcrypt.hash(req.body.password,5)
    let record = await users.create({
        username: username,
        password:req.body.password,
        role:req.body.role
    })
    res.status(201).json(record)
})

// app.post('/signup', bearer, signupHandler)
app.post('/signin', basic, loginHandler)
app.get('/orders',bearer, ordersHandler)

app.get('/img', bearer, acl('read'),(req, res)=>{
    res.send("has the ability to read")
})
app.post('/img', bearer, acl('create'),(req, res)=>{
    res.send("has the ability to create")
})
app.put('/img', bearer, acl('update'),(req, res)=>{
    res.send("has the ability to update")
})
app.delete('/img', bearer, acl('delete'),(req, res)=>{
    res.send("has the ability to delete")
})

function loginHandler(req,res){
    res.status(200).json(req.user)
}
function ordersHandler(req,res){
    res.status(200).json({
        'message':'you can view this order',
        'user':req.user
    })
}

module.exports= app