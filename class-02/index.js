'use strict';

// const node= require('./lib/node')

const linkedList= require('./lib/linkedlist')

const ll= new linkedList()
ll.insertFirst(100)
// console.log(ll)
ll.insertFirst(200)
ll.insertFirst(300)

ll.insertLast(50)
ll.insertAfterIndex(40,1)
ll.insertAtIndex(10,1)

console.log(ll.getAtIndex(0))
ll.removeAt(2)
ll.insertBefore(500,2)
ll.kthFromEnd(4)
console.log(ll.toString())
// console.log(ll.print())