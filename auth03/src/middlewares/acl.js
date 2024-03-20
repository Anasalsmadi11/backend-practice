'use strict'

module.exports= (capability)=>{
    return(req,res,next)=>{
      try{
        console.log(req.user.capabilities)
          if(req.user.capabilities.includes(capability)){
              next()
          }else{
              next('access denied')
          }
        }catch(error){
            next('invalid')
        }
    }
}