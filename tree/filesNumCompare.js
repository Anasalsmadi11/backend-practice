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
    isEqual(node1, node2){
        // node1 = directory1
        // node2= folder1
        if(node1===null){
            return null
        }
        if(node2===null){
            return null
        }else{
            let traverse=(node)=>{
                let count=0
                if(node != null){

                    if(node.value == 'file' ){
                        count++
                        traverse(node.left)
                        traverse(node.right)
                    }else{
                        traverse(node.left)
                        traverse(node.right)

                    }
            }
           
            return count
        }
   traverse(node1)
    }
    }

    // isEqual(node1, node2) {
    //     let countFiles=(node)=> {
    //        if (node === null) {
    //            return 0;
    //        }
   
    //        let count = node.value === 'file' ? 1 : 0;
    //        count += countFiles(node.left);
    //        count += countFiles(node.right);
   
    //        return count;
    //    }
   
         
    //        const count1 = countFiles(node1);
    //        const count2 = countFiles(node2);
   
    //        return count1 === count2;
    //    }
}


let directory1= new Node("folder")
let directory2= new Node("folder")
let directory3= new Node("folder")
let directory4= new Node("folder")
let directory5= new Node("folder")
let directory6= new Node("folder")
let file1= new Node("file")
let file2= new Node("file")
let file3= new Node("file")
let file4= new Node("file")
let file5= new Node("file")

directory2.right=  new Node("file")

directory1.left= directory2
directory1.right= directory3
directory2.left=directory4
directory3.right= directory5
directory5.right= directory6
directory4.left=file1
directory4.right= file2
directory5.left=file3
directory6.left= file4
directory6.right= file5


let folder1= new Node("folder")
let folder2= new Node("folder")
let folder3= new Node("folder")
let folder4= new Node("folder")
let folder5= new Node("folder")

let fille1= new Node("file")
let fille2= new Node("file")
let fille3= new Node("file")
let fille4= new Node("file")
let fille5= new Node("file")

folder1.left= folder2
folder1.right= folder3
folder2.right= folder4
folder3.right= folder5
folder2.left= fille1
folder4.left=fille2
folder4.right= fille3
folder5.left=fille4
folder5.right= fille5


let tree1= new BinaryTree()


console.log(tree1.isEqual(directory1))
// console.log(tree1.isEqual())