const linkedList= require('./linkedlist')

class Node{
    constructor(value, next= null){
        this.value= value;
        this.next= next;
    }
}

    // let n1= new Node(100)
    // console.log(n1)

module.exports= Node;