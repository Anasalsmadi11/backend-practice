const button =document.querySelector("button")
// console.log(button)
// console.log('button')
button.addEventListener("click",function(){
    fetch('/create',{
        method:"POST",
        headers:{
            "Content-Type":"application/json", 
        },
        body:JSON.stringify({
            items:[
                {id: 1, quantity: 3},
                {id: 2, quantity: 1}
            ]
        })
    }).then(res =>{
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({url})=>{  // here i added {} to url so i can destructure the incoming object to get the url key from it, i can put it without {} but below i should put url.url
window.location= url
console.log(url)
}).catch(e =>{
    console.log(e.error,"sssssss")
})
})