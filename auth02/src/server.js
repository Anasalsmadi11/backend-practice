'use strict'

require('dotenv').config()
const express= require('express')
const app= express()
app.use(express.json())
const bcrypt= require('bcrypt')
const basic= require('./middlewares/basicAuth')
const bearer = require('./middlewares/bearerAuth')
const users= require('./models/userModel')

app.post('/signup', async(req,res)=>{
    let username= req.body.username
    let hashedPassword = await bcrypt.hash(req.body.password,5)
    let record = await users.create({
        username: username,
        password:hashedPassword
    })
    res.status(201).json(record)
})

// app.post('/signup', bearer, signupHandler)
app.post('/signin', basic, loginHandler)
app.get('/orders',bearer, ordersHandler)

function loginHandler(req,res){
    res.status(200).json(req.user)
}
function ordersHandler(req,res){
    res.status(200).json({
        'message':'you can view this order',
        'user':req.user
    })
}

const { Op } = require('sequelize'); // Op naming is manditory

// const searchName = 'anas';
app.get('/users/:id',async(req,res)=>{
    const searchName = req.params.id;
    console.log(searchName)

    // finding anything related to the user:

    const getUsers= await users.findAll(
        {
            where:{
                username:{[Op.like]:`%${searchName}%`} // ,
                // password: {[Op.like]:`%${"Y"}%`} // adding this means makes the search restricted,so it search part of the username with part of the password
            }
        }
        ).then(data =>{
            res.status(201).send(data)
            // console.log(results);
        }).catch(error =>{
            console.error('Error:', error);
        })

    // regular finding user: 

    // const getUsers=await users.findAll({
    //   where: {username:searchName}
    // }).then(results => {
    //     res.status(201).send(results)
    //   console.log(results);
    // }).catch(error => {
    //   console.error('Error:', error);
    // });
})

module.exports= app