const Node = require('./node')

class LinkedList{
    constructor(){
        this.head= null,
        this.size=0
    }
    // insert first node :
    insertFirst(data){
        this.head= new Node(data,this.head) // i put this.head here as anext cus if i have a node i need to push it to the next and make the new one the head
        this.size++
    }

    // isert last:

    insertLast(data){
        let node= new Node(data)
        let current;
        if(!this.head){
            this.head= node
        }else{
           current= this.head  //current.data =200
           while(current.next){ 
            // console.log(current.next) // 100
            current= current.next // current =100, current.next=null
            // console.log(current.next)
           }
           current.next=node
        }
        this.size++
        
    }
    /// insert at index:
    insertAt(data, index){
        // if the index is greater than the length of the linked list
        if(index >0 && index> this.size){
            return; /// here it means return nothing
        }
        if(index ===0 ){
             this.head = new Node(data, this.head)
             return;
        }
        const node = new Node(data)
        let current, previous;
        // set current to first:
        current = this.head
        let count=0
        while(count < index){
            previous= current
            count++
            current=current.next
        }
        previous.next=node
        node.next=current
        this.size++
 
    }

    // print the data:
     printListData(){
        let current =this.head;
        while(current){
            console.log(current.data)
            current = current.next
        }
    }
}

module.exports= LinkedList;