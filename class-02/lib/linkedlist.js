const Node= require('./node')

class linkedList{
    constructor(){
        this.head= null
        this.size = 0
    }
    // insert first node
    insertFirst(value){
        let newNode= new Node(value)
        if(!this.head){
            this.head= newNode
        }else{
            // let current= this.head
            // // console.log(current)
            // this.head= newNode
            // // console.log(">>",this.head)
            // newNode.next= current

            // or
            newNode.next= this.head // the newNode here is 200 and the head is 100
            this.head= newNode
            this.size++
        }
        // or
        // this.head=new Node(value, this.head)
    }

    // insert last node
    
    insertLast(value){
        let newNode= new Node(value)
        let current= this.head
        if(!this.head){
            this.head=newNode
        }else{
            while(current.next){
                // console.log("current",current.value) //200
                current= current.next
                // console.log("current",current.value) //100
            }
            current.next= newNode
        }
        this.size++
    }


    // insert at index
    // insertAfterIndex(newValue, index){
    //     // if(index > this.size){
    //     //     return;
    //     // }
    //     let newNode= new Node(newValue)
    //     let current= this.head
    //     while(current.value !== index){
    //         current= current.next
          
    //     }
    //     console.log("this current",current.value)
    //     newNode.next= current.next
    //     current.next= newNode
    //     // newNode= current
    //     this.size++
    // }
    // or
    insertAfterIndex(value, index){
        let newNode= new Node(value)
        let count =0
        let current = this.head
        while(index > count){
            count++
            current = current.next
            // console.log(current.value)
        }
        newNode.next= current.next
        current.next= newNode

    }

    insertAtIndex(value, index){
      
        if(index > 0 && index > this.size){
            return ;
        }
        if(index === 0){
            this.head= new Node(value, this.head)
        }
        
        const newNode= new Node(value)
        let current = this.head
        let previous
        let count = 0
        while(index >count ){
            count++
            previous= current 
            current =current.next
        }
        newNode.next= current
        previous.next= newNode
    }

    // insertAtIndex(newValue, value){
    //     const newNode= new Node(newValue)
    //     if(!this.head){
    //         this.head= newNode
    //     }else{ // i added a previous node cus i need to conect the previous node withe newNode and connect the new node with the next node
    //         let current, previous
    //         current= this.head
    //         while(current.value !== value){
    //             previous= current
    //             current= current.next
    //         }
    //         newNode.next= current
    //         previous.next= newNode

    //     }
    // }


    // get at index 
    getAtIndex(index){
        let current= this.head
        let count = 0
        if(!this.head){
            return;
        }
            while(index > count){
                count++
                current= current.next
            }
            return current.value
    }

    // remove at index
    removeAt(index){
        let current = this.head
        let previous // i initialize it cus i need to link the node before the targeted node with the node after the targeted node >> ex: 300 -> 200 -> 100 become => 300 -> 100
        if(index=== 0){
            this.head= current.next
        }else{
            let count =0 
            while(index > count){
                count++
                previous= current
                current= current.next
            }

            previous.next= current.next
        }
    }

    toString(){
        let current = this.head
        let result=''
        while(current){
            result+=  `${current.value} ->`
            current= current.next
        }
        result += null
        return result
    }
    insertBefore(value, index){
        if(!this.head){ // if the head is empty
            this.head= new Node(value)
        }
        if(index> this.size){ 
            return;
        }else if(index === 0){
            this.head= new Node(value, this.head)
        }
        let newNode= new Node(value)
        let current = this.head
        let previous= null
        let count= 0
        while(index > count){
            count++
            previous= current
            current= current.next
        }
        newNode.next= current
        previous.next= newNode

    }

    kthFromEnd(k){  //https://www.youtube.com/watch?v=dKFvYm3P6OY&t=476s video explain the kth
        let p1= this.head
        let p2 = this.head
        let count=0
        while(k > count){
            count++
            p2=p2.next
        }
        while(p2){
            p1= p1.next
            p2= p2.next
        }
        console.log(p1.value)

    }

    // print linkedList
    // print(){
    //     let result= []
    //     let current = this.head
  
    //     while(current){
    //         let val=`{ ${current.value} } ->`
    //         result.push(val)
    //         current= current.next
    //     }
    //     return result
    // }

 
    // print(){
    //     let current= this.head
    //     while(current){
    //         console.log(current.value)
    //         current= current.next
    //     }
    // }
}




module.exports= linkedList;