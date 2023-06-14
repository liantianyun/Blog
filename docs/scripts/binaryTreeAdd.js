function BinaryNode(value) {
    this.left = null
    this.right = null
    this.value = value
}

BinaryNode.prototype.insert = function (val){
    // 递归终止
    if (this.value === undefined) {
        this.value = val
        // 插入左子树
    } else if(this.value >= val) {
        if (this.left === null) {
            this.left = new BinaryNode(val)
        } else {
            this.left.insert(val)
        }
        // 插入右子树
    } else {
        if (this.right === null) {
            this.right = new BinaryNode(val)
        } else {
            this.right.insert(val)
        }
    }
}

// 先序遍历打印
BinaryNode.prototype.print = function() {
    if (this.left !== null) this.print.call(this.left, this.left)
    console.log(this.value);
    if (this.right!== null) this.print.call(this.right, this.right)
}

const buildTree = (nums) => {
    const tree = new BinaryNode()
    nums.forEach(value => {
        tree.insert(value)
    })
    return tree
}

const tree = buildTree([5,2,8,0,10,7,18,20,30,12,15,1])
tree.print()
