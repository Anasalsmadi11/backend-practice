
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
    preOrder(){
        let result=[]
        let traverse=(node)=>{
            result.push(node.value)
            if(node.left) traverse(node.left)
            if(node.right) traverse(node.right)
        }
        traverse(this.root)
        return result
    }
    // add(data){
    //     if(this.root === null){
    //         this.root= new Node(data) // here data represent the value in the Node class so it doesnt matter what do you name it as long as it is the same name as the add(param) method param
    //     }else{
    //         const searchTree= (node)=>{
    //             if( data < node.value ){
    //                 if(node.left === null){
    //                     node.left= new Node(data)
    //                     return // here i put the return to break the recursion cus i already found a place for  the new node so no need to go down
    //                 }else{
    //                     return searchTree(node.left)
    //                 }
    //             }else if( data > node.value){
    //                 if(node.right === null){
    //                     node.right= new Node(data)
    //                     return 
    //                 }else{
    //                     return searchTree(node.right)
    //                 }
    //             }
                
    //         }
    //         return searchTree(this.root)
    //     }
        
    // }

    add(data){
        if(!this.root){
            this.root= new Node(data)
            return 
        }else{
            let searchTree=(node)=>{
                if(node.value > data){

                    if(node.left === null){
                        node.left= new Node(data)
                    }else{
                        return searchTree(node.left)
                    }
                }else{
                    if(node.right === null){
                        node.right= new Node(data)
                    }else{
                        return searchTree(node.right)
                    }
                }
            }
            searchTree(this.root)
        }
    }
}


let fifty = new Node(50);
let seventeen = new Node(17);
let seventytwo = new Node(72);
let twelve = new Node(12);
let fiftyfour = new Node(54);
let seventysix = new Node(76);
let nine = new Node(9);
let fourteen = new Node(14);
// let nineteen = new Node(19);
let sixtyseven = new Node(67);

fifty.left= seventeen
fifty.right= seventytwo
seventeen.left= twelve
twelve.left= nine
twelve.right= fourteen
seventytwo.left= fiftyfour
seventytwo.right= seventysix
fiftyfour.right= sixtyseven


tree= new BinaryTree(fifty)

tree.add(23)
tree.add(13)
console.log(tree.preOrder())