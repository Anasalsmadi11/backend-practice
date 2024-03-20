'use strict'
require('dotenv').config()
const express= require('express')
const {Sequelize, DataTypes, where}= require('sequelize')
const POSTGRES_URI= process.env.DATABASE_URL
const sequelize = new Sequelize(POSTGRES_URI, {});
const base64= require('base-64')
const bcrypt= require('bcrypt')
const app= express()
app.use(express.json()) // see explaine below

const users= sequelize.define('users',{
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

app.get('/' , (req,res)=>{
    res.send('welcome home kyoko')
})
app.post('/signup', async(req,res)=>{
    let username= req.body.username
    let hashedPassword= await bcrypt.hash(req.body.password,5)

    // let decoded= await base64.decode('$2b$05$jkM1jLi0PgQENidCjKMUou7O8o4BKeV2LrsPjTqIe3FJGk8z7.8Xu')
    let checkUser= await users.findOne({where:{username:username}})
    if(checkUser){
        res.status(200).send("user already exists")
    }else{

        let newRecord= await users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newRecord)
    }
    // console.log("=======>",decoded)
})

app.get('/users', async(req,res)=>{
    let records = await users.findAll()
    res.status(200).send(records)
})

app.post('/signin',async(req,res)=>{
    // console.log('headers auth', req.headers.authorization)
    if(req.headers.authorization){
        let headerParts= req.headers.authorization.split(" ")[1]
        let decoded= base64.decode(headerParts).split(":")
        let [username,password]= decoded 
        // console.log(password)
        let user= await users.findOne({where:{username:username}})
        // console.log(user)
        let validUser= await bcrypt.compare(password, user.password)
        if(validUser){
            res.status(200).send(user)
        }else{
            res.status(500).send('wrong password')
        }
    }else{
        res.status(500).send('validation error')
    }
})

sequelize.sync({
    // force:true
}).then((

    )=>{
        app.listen(3000, ()=>{
            console.log('server started and listening')
    })
})






// const jsonString = `{ // this is in JSON format
//     "name": "John Doe",
//     "age": 30,
//     "email": "john@example.com",
//     "address": {
//       "street": "123 Main St",
//       "city": "Anytown",
//       "zipcode": "12345"
//     },
//     "isStudent": false,
//     "hobbies": ["reading", "hiking", "coding"]
//   }`;
  
//   const parsedObject = JSON.parse(jsonString); /// with this i turn the JSON format into object format
  
//   console.log(parsedObject); // will be :

//   {
//     name: 'John Doe',
//     age: 30,
//     email: 'john@example.com',
//     address: { street: '123 Main St', city: 'Anytown', zipcode: '12345' },
//     isStudent: false,
//     hobbies: [ 'reading', 'hiking', 'coding' ]
//   }
  
  