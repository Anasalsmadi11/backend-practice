'use strict'

require('dotenv').config()
const bcrybt= require('bcrypt')
const {sequelize, DataTypes}= require('./index')
const jwt = require('jsonwebtoken')

const SECRETDATA= process.env.SECRETDATA

const users= sequelize.define('usermodel',{
    username:{
        type:DataTypes.STRING,
        allowNull:false
        // get(){
        //     const datavalue= this.getDataValue("username")
        //     return datavalue.toUpperCase()
        // }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){
            const hashed= bcrybt.hashSync(value,5)
            this.setDataValue('password',hashed)
        }
    },
    role:{
        type:DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
        defaultValue: 'user'
    },
    capabilities:{
        type:DataTypes.VIRTUAL,
        get(){
            const acl = {
                user:["read"],
                writer:['read','create'],
                editor:['read', 'create', 'update'],
                admin:['read','create', 'update','delete']
            }
            return acl[this.role]
        }

    },
    token:{
        type:DataTypes.VIRTUAL
        // get(){
        //     return jwt.sign({username:this.username, password:this.password},SECRETDATA)
        // }
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