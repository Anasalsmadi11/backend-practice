'use strict'

require('dotenv').config()
const express= require('express')
const app= express()
app.use(express.json())
const nodemailer= require('nodemailer')

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.GMAIL_EMAIL,
        pass:process.env.GMAIL_PASSWORD
    }
})

const mailOptions = {
    from: 'anas.alsmadi734@gmail.com',
    to:'anas.alsmadi34@gmail.com',
    subject: 'dynamic email',
    text: 'check this out'
}


transporter.sendMail(mailOptions,(err, info)=>{
    if(err){
        console.log('Error', err)
    }else{
        console.log('message sent successfully')
    }
})

