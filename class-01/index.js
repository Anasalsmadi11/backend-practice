const LinkedList=require('./lib/linkedList')
let ll= new LinkedList()
ll.insertFirst("100")
ll.insertFirst("200")
console.log(ll) // LinkedList {
//     head: Node { data: '200', next: Node { data: '100', next: null } },
//     size: 0
//   } here i first created the 100 node as a head then i created the 200 node as a head and pushed the first head(100) to be the next node 

ll.insertLast("400")
ll.insertAt("500",2)
ll.printListData()
