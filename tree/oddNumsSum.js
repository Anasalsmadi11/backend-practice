class Node {
    constructor( value,  left=null, right=null){ 
        this.left= left;
        this.right= right;
        this.value= value
    }
}

class BinaryTree{
    constructor(root= null){

        this.root= root
    }
    oddNumSumm(){
        if(this.root== null){
            return 'null'
        }
        else{
            let sum= 0
            let traverse= (node)=>{
                if(node != null){
                    if(node.value % 2 == 1){
                        sum += node.value
                        traverse(node.left)
                        traverse(node.right)
                    }else{
                        traverse(node.left)
                        traverse(node.right)  
                    }
                    // console.log(sum)
                }
            }
            traverse(this.root)
            return sum
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
let nineteen = new Node(19);
let sixtyseven = new Node(67);

fifty.left= seventeen
fifty.right= seventytwo
seventeen.right=nineteen
seventeen.left= twelve
twelve.left= nine
twelve.right= fourteen
seventytwo.left= fiftyfour
seventytwo.right= seventysix
fiftyfour.right= sixtyseven


tree= new BinaryTree(fifty)
console.log(tree.oddNumSumm())