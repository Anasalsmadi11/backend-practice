"use struct"
const base64= require('base-64')
const users= require('../models/userModel')

module.exports= async function beaerer(req, res, next){
    if(req.headers.authorization){
        let tokenParts= req.headers.authorization.split(" ")[1]
        users.authBearer(tokenParts)
            .then((data)=>{
                req.user= data
                next()
            }).catch(()=>{
                next('invalid tokennn')
            })
    }
}