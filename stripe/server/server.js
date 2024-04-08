
/*

        npm run start to start the server
        start is the name of the key in scripts in package.json

*/
require('dotenv').config()
const express= require('express')
const app= express()
app.use(express.json())
app.use(express.static('public'))
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

 const storeItems= new Map([
         [1,{priceInCents:10000, name:"Learn React Today"}],
    [2,{priceInCents:20000, name:"Learn CSS Today"}]

])
app.get('/kyoko',(req,res)=>{
        res.send('okayrnasai Kyoko san')
})

app.post("/create",(req,res)=>{
        res.json({url:"create"})
})

 app.listen(3000)