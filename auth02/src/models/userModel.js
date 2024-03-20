'use strict'

require('dotenv').config()
const bcrybt= require('bcrypt')
const {sequelize, DataTypes}= require('./index')
const jwt = require('jsonwebtoken')

const SECRETDATA= process.env.SECRETDATA

const users= sequelize.define('usermodel',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    token:{
        type:DataTypes.VIRTUAL,

    }
})


users.authBasic= async function (username,password){
const user= await users.findOne( {where:{username:username} } )
let validUser= await bcrybt.compare(password, user.password)
if(validUser){
    let newToken= jwt.sign({username: user.username, password:user.password},SECRETDATA)
    user.token= newToken
    // console.log('=========>',user)
    return user
}else{
   throw new Error('invalid user')
    
}
} 

users.authBearer= async function(token){
    let parsedToken= jwt.verify(token,SECRETDATA)
    console.log("parsed token username",parsedToken.username )
    let user= await users.findOne({where:{username: parsedToken.username}})

    if(user.username){
        return user
    }else{
        throw new Error('invalid token')
    }
}
module.exports= users