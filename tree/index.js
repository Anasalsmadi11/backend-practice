
// this is a trace of the recursion tree function that will find the depth of the tree, maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

//                  3
//              /        \
//             9          20
//                       /   \
//                      15     7

// const maxDepth = (root)=> {
//     let max=0
//     let BFS=(node, level)=>{
//     if(node === null) return
//     if(level> max) max= level
// 1 BFS(node.left,level+1)
//       //////////////level 1///////////////
//       {
//     if(node.left === null) return
//     if(level> max) max= level =2
//     BFS(node.left.left,level+1) //here wont add to the level cuse the function here wont be called because the node.left.left is null
//      BFS(node.left.right, level+1) 
//       //////////////////////////////
// 1   BFS(node.right, level+1) 
//       //////////////level 1///////////////
//       {
//     if(node.right === null) return
//     if(level> max) max= level =3
// 2    BFS(node.right.left,level+1) 
//               //////////////level 2///////////////
//       {
//     if(node.right.left === null) return
//     if(level> max) max= level =3
//     BFS(node.right.left.left,level+1) 
//      BFS(node.right.left.right, level+1) 
//       //////////////////////////////
// 2     BFS(node.right.right, level+1)
//     //////////////level 2///////////////
//       {
//     if(node.right.right === null) return
//     if(level> max) max= level =3
//     BFS(node.right.right.left,level+1) 
//      BFS(node.right.right.right, level+1) 
//       //////////////////////////////


//     }
//     BFS(root,1) // one because the first node at the first level ,
//     return max
   
// };



/// leetcode problem # 100 Same Tree:

class Node {
    constructor( value,  left=null, right=null){ 
        this.left= left;
        this.right= right;
        this.value= value
    }
}

class BinaryTree{
    constructor(root=null){
        this.root= root
    }
}
let one = new Node(1);
let two = new Node(2);
let three = new Node(3);
let four = new Node(4);
let five = new Node(5);
let six = new Node(6);
let seven = new Node(7);
let eight = new Node(8);
let nine = new Node(9);

one.left = two;
one.right = three;
two.left = six;
three.left = four;
three.right = five;
six.right = seven;
seven.left = eight;
seven.right = nine;



tree1= new BinaryTree(one)
tree2= new BinaryTree(one)



  
function breadthFirst(tree1,tree2){
let result=[]
let queue=[]
let currentNode= tree1.root
queue.push(currentNode)
while(queue.length){
    currentNode= queue.shift()
    result.push(currentNode.value)
    if(currentNode.left) queue.push(currentNode.left)
    if(currentNode.right) queue.push(currentNode.right)
}
  let result1=[]
let queue1=[]
let currentNode1= tree2.root
queue1.push(currentNode1)
while(queue1.length){
    currentNode1= queue1.shift()
    result1.push(currentNode1.value)
    if(currentNode1.left) queue1.push(currentNode1.left)
    if(currentNode1.right) queue1.push(currentNode1.right)
}
  // console.log(result)
  // console.log(result1)

  for(let i=0 ;i<result1.length;i++){
if(result[i] !== result1[i]){
  
        return false
    }else{
      
    return true
    }
   
}
}

console.log(breadthFirst(tree1,tree2))