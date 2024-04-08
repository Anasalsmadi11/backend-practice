const LinkedList = require("./linkedList");

class Node {
    constructor(data, next= null){
        this.data=data;
        this.next= next
    }
}
let n1 =new Node(100);
// console.log(n1) ///Node { data: 100, next: null }



module.exports=Node;