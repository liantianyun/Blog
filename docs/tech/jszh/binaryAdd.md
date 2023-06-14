# 构建有序二叉树

题目(题目来源《计算之魂》2.2节思考题):

有这样一串数字5,2,8,0,10,7,18,20,30,12,155.1，将它们建成一棵
二又排序树。二又排序树满足下面的条件。

（1）如果左子树不为空，则左子树上所有节点的值均小于树的根节点的值。同样，如果
右子树不为空，则右子树上所有节点的值均大于树的根节点的值。

（2）左、右子树本身也是二叉排序树。

对于上述数字，我们在建立二叉排序树时，先把第一个数字5放在根节点，然后扫描第二
个数字2，由于它比根节，点的数字5小，因此我们将它放在左子树中。接下来我们扫描第
三个数字8，由于它比根节点的数字5大，因此我们将它放在右子树中。重复上述过程，
我们可以建成完整的二叉排序树。请完成下面三个小问题。

（1）写一个算法完成上述操作。

（2）这个算法的复杂度是多少？

（3）用何种遍历方法得到的结吉果恰好把上面的一串数字排好序？

这题比较简单，就三个问题一起解答了。

第一题本质上就是实现有序二叉树的`插入`操作的API就可以了。

第二个问题，构建这棵树的时候，需要遍历数组依次调用`插入`方法，而每次插入操作的时间复杂度是logN级别，所以构建树的操作时间复杂度是n*logn。

第三个问题，由于整棵树是有序的，且左子树 < 父节点 < 右子树，跟先序遍历的顺序一致，因此，先序遍历即可。

大学的时候，用java实现过，现在用js在实现一遍:

```js
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

```


