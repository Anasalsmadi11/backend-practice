'use strict'

 const express= require('express')
// import express from 'express'
 const app= express()
 const port= 3000
app.get('/test',(req,res)=>{
    res.send("kyoko")
})


app.listen(port,()=>{
    console.log('server is ready')
})
 module.exports= app
