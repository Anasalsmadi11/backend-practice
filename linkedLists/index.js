'use strict';


const Node = require('./lib/node')
const linkedList= require('./lib/linkedlist')

const ll= new linkedList()
ll.insertFirst(100)
ll.insertFirst(15)
ll.insertFirst(10)
// console.log(ll)
ll.insertFirst(200)
// // ll.insertFirst(200)
// ll.insertFirst(300)
// ll.insertFirst(300)
ll.insertFirst(300)
// ll.removeDuplicates()
// ll.reverseLinkedList()
ll.insertLast(50)
ll.insertAtIndex(10,2)
ll.orderAscending()

console.log(ll.deleteMid())
// ll.insertBefore(500,300)
// ll.insertAfterIndex(40,0)

// console.log(ll.getAtIndex(1))
// ll.removeAt(2)
// ll.kthFromEnd(3)
console.log(ll.toString())
// console.log(ll.print())


//=================================


// function zipLists(list1, list2) {
//     // here if one of the two linked lists is empty return the other one
//      if (!list1.head) {
//        return list2;
//      }
//      if (!list2.head) {
//        return list1;
//      }
   
//      const result = new linkedList(); //i defined this cus i need a new linked list that combine the two linked lists together
//      let current1 = list1.head;
//      let current2 = list2.head;
   
//      while (current1 && current2) {
//        result.insertLast(current1.value); // here it is not literally insert at last but append
//        result.insertLast(current2.value);
//        current1 = current1.next;
//        current2 = current2.next;
//      }
    
//      return result.toString();
//    }
  
 
//    const list1 = new linkedList();
//    list1.insertLast(1);
//    list1.insertLast(3);
//    list1.insertLast(2);
   
//    const list2 = new linkedList();
//    list2.insertLast(5);
//    list2.insertLast(9);
//    list2.insertLast(4);
   
//    console.log(zipLists(list1,list2))
   
// //++++++++++++++++++++++++++++++++++++++++++++++++++

//  function test(list,n){
//    console.log(list.head.value)
//   }
//   const list= new linkedList()
//   list.insertLast(15)
//  list.insertLast(14)
//  test(list,2)

 //++++++++++++++++++++++++++++++++++++++++++++++++++
//   const newNode= new Node(50)
//  function addAT(list,index){
//   if(!list.head){
//     list.head=newNode
//   }else{
//     let current= list.head
//     let previous=null
//     let count=0
//     while(index >count){
//       count++
//       previous=current
//       current= current.next
//     }
//     previous.next= newNode
//     newNode.next= current
//   }
//   return list.toString() 
//  }
//  console.log(addAT(list,1))

function zip(list1 ,list2){

    let current1 = list1.head
    let current2 = list2.head
    let result=[]
    while(current1 && current2){
        
        result.push(current1.value)
        result.push(current2.value)

        current1 = current1.next
        current2 = current2.next
    }
    return result

}
// let ten= new Node(10) // there is no need for these cus i already managed the nodes inside the methods
// let twenty= new Node(20)
// let thirty= new Node(30)
// let fourty= new Node(40)

let ll1= new linkedList(10)
let ll2= new linkedList(20)


ll1.insertLast(30)
ll1.insertLast(10)
ll1.insertLast(4)
ll1.insertLast(20)

ll2.insertLast(20)
ll2.insertLast(40)

console.log(zip(ll1,ll2))


function secLargest(list){

    let current= list.head
    let temp1= current
    let previous= temp1
    
    while(current.next){

        if(current.value > previous.value && current.value > temp1){
            
            if(current.next.next){

                temp1= current
            
            }
    }
    previous= current
    current= current.next
}
return `second largest ${temp1.value}`
    
    }
    console.log(secLargest(ll1))