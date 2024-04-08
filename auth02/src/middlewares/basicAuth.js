'use strict'

const base64= require('base-64')
const users= require('../models/userModel')

async function basic(req,res,next){
    if(req.headers.authorization){
        let headerParts = req.headers.authorization.split(" ")[1]
        let decoded= await base64.decode(headerParts).split(':')
        let [username, password]= decoded
        // console.log(username, password)
        users.authBasic(username,password)
            .then((data)=>{
                req.user= data
                console.log("===========>",data)
                next()
            })
            .catch((error)=>{
                next('invalid loginn')
            })
    }
   
}

module.exports= basic