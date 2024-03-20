'use strict'

const base64= require('base-64')
const bcrypt= require('bcrypt')

const username= 'anas'
const password= '123'
const email= 'anas.alsmadi@411gmail.com'

let encoded= base64.encode(`${username} ${password} ${email}`)
console.log('>>>>', encoded)

let decoded= base64.decode(encoded)

console.log('>>>>', decoded) 

async function hashed(text){
    console.log('before hashing', text)
    let hashed= await bcrypt.hash(text,5)
    console.log('after hashing', hashed)
    
    let p1= '$2b$05$g7iOqBuBR1eWADNhhL1m6.iI4UxLR5XVuibz8ISJvfVb6oQpNwQYu'
    let p2= '$2b$05$dUWyYmcbumPeH0ljKnIw2.ocSAi6P6fCZOnNrs9QbLgIpU8IFVL2G'
    let isValid = await bcrypt.compare(username, p2)
    console.log(isValid)
}
hashed(username)
