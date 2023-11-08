'use strict';
require('dotenv').config();
const express = require('express');
const app= express()
app.use(express.json())
// let user= require('./models/users/model')

const cors= require('cors')
const v1Routes= require('./routes/v1')
app.use(cors());
app.use(v1Routes);


// app.post('/signup', async (req,res)=>{
//     let newUser= await user.create(req.body)

//     res.status(200).send(newUser)
// })

// app.get('/users', async(req,res)=>{
//     let users= await user.findAll()
//     res.status(200).send(users)
// })

// app.post('/deals', async (req,res)=>{
//     let newDeal= await deal.create(req.body)

//     res.status(200).send(newDeal)
// })

// app.get('/deals', async(req, res)=>{
//     let deals=  await deals.findAll()
//     res.status(200).send(deals)
// })


module.exports = {
    server: app,
    start: (port) => {
      app.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };