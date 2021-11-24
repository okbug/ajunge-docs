


const sum = (a, b) => {
    console.log(this);
    return a + b;
}

const funcA = () => {
    console.log(this);
    const sum = (a, b) => {
        console.log(this);
        return a + b;
    }
}


//这就是节点
let node = {
    "type": "Identifier",
    "identifierName": "sum",
    "name": "sum"
};


let nodePath = {
    node,
    replaceWith(newNode){
        nodePath.node = newNode;
    },
    remove(){

    }
}
nodePath.replaceWith(newNode);

nodePath.node = newNode;