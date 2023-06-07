# 总和最大区间问题（二）:分治法解决

为了便于对照，还是在贴一遍题目:

> 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例：

>输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
>
>输出：6
>
>解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

提示：
* 1 <= nums.length <= 10**5

上文列举的两种解法如下：

解法一：

```js
var maxSubArray = function(nums) {
    let max = -Infinity
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j <= nums.length ; j ++) {
            max = Math.max(max, nums.slice(i, j).reduce(
                (total, cur) => total + cur, 0
            ))
        }
    }
    return max
};
```

解法二：

```js
var maxSubArray = function(nums) {
    let max = nums[0]
    for(let i = 0; i < nums.length; i++) {
        // 用一个数组缓存中间结果
        let rowSum = [nums[i]]
        for(let j = i + 1; j < nums.length ; j ++) {
            // 用最后一个元素的值加上当前值并缓存结果即可
            rowSum.push(rowSum[rowSum.length -1] + nums[j])
        }
        // 从缓存结果里找出最大值
        max = Math.max(max, Math.max(...rowSum))
    }
    return max
};
```

这两种解法中，本质上都是用的穷举法，我们其实把所有可能的起始位置和结束位置对应的子数组和都计算了出来，并找到了最大值，两者的区别仅仅是第二种方法中在计算S（i,j）时加入了一个数组缓存计算结果，减少了嵌套了一层O（n）级别的操作，所以把复杂度从`O(n**3)`降低到了`O(n**2)`。

在开始今天进一步探究解法之前，还可以在优化一下解法2的空间复杂度，实际上，既然我们最终的目的是从缓存的结果数组里找出最大值，数组只是作为一个中间值，那我们其实可以在遍历过程中直接记录最大值即可，没必要使用数组保存。

所以可以把算法优化如下：

```js
var maxSubArray = function(nums) {
    // max代表计算过程中的最大值
    let max = nums[0]
    for(let i = 0; i < nums.length; i++) {
        let rowSum = nums[i]
        max = Math.max(max, rowSum)
        for(let j = i + 1; j < nums.length ; j ++) {
            // 同样是记录到当前额位置的累加值
            rowSum = rowSum + nums[j]
            // 若当前位置累加值大于max，更新max
            max = Math.max(max, rowSum)
        }
    }
    return max
};
```

这样就相当于优化空间复杂度，不过时间复杂度还是一样的。

接下来我们看下如何通过分治法来解决这个问题。

首先看看书中提供的思路:

<!-- ![](../images/maxCount.md) -->

这是错的！这是错的！这是错的！

这里面第二点的描述，有间隔的情况，是错的，比如说下面这个数组:

`[4, 6, -11, 9, 9 ,-11, 6, 4]`

这里面的最大连续子数组是[9,9]，和是18，可是一分为二后，左边的数组是[4, 6, -11, 9],最大子数组和是10，右边同理，18不符合上面说的三种情况中的任何一种情况。

然而一开始因为我没意识到这个，一直尝试在理论层面证明它是对的。

我还真在理论层面证明它是错的，可是因为觉得书上是对的一直觉得自己是不是错了！最终没错，它就是错的！

气死了气死了。

言归正传，虽然书上这个思路是错的，不错这个题确实是可以通过分治法来解决的。

正确的思路是怎样的呢？

1. 将原数组拆分成两部分

2. 在左右两个数组里分别寻找到最大子数组的和。

3. 找到之后，此时最大子数组和是以下三个值的最大值。

    1. 左边数组的最大子数组和
    2. 右边数组的最大子数组和
    3. 中间存在的包含这个中点的一个子数组里。
第3点稍微解释下，为什么呢？如果如果不包含中点，要么在左侧数组的一个子数组，要么是右边数组的一个子数组，由于左右两侧的最大子数组我们已经找到了，因此，这个子数组的和绝不可能比它们更大，除非这个子数组的区间包含了中点才有可能。

思路有了，分治法从思路到编码还是有一定难度，建议一定要动手尝试下，最终编成的代码如下：

```js
var maxSubArray = function(nums) {
    function getMidlleMaxCount(nums, left, right, mid) {
        let leftCount = 0,  leftIndex = mid - 1, leftSum = 0
        // 从中点往左边找最大连续子数组和
        while(leftIndex >= left) {
            leftCount = leftCount + nums[leftIndex]
            leftSum = Math.max(leftCount, leftSum)
            leftIndex --
        }
        let rightCount = 0, rightIndex = mid + 1, rightSum = 0
        while(rightIndex <= right) {
            rightCount = rightCount + nums[rightIndex]
            rightSum = Math.max(rightCount, rightSum)
            rightIndex ++
        }
        return leftSum + rightSum + nums[mid]
    }
    // 给定一个数组，返回它的最大子数组和及该子数组的起始和结束位置的下标
    function getMaxCount(nums, left, right) {
        const mid = Math.floor((left + right) / 2)
        // 终止条件，如果数组只有一个元素，直接返回
        if(left === right) return nums[left]
        // 对左右两半分别调用该函数
        const letfMax = getMaxCount(nums, left, mid)
        const rightMax = getMaxCount(nums, mid + 1, right)
        const middleMax = getMidlleMaxCount(nums, left, right, mid)
        return Math.max(letfMax, rightMax, middleMax)

    }
    return getMaxCount(nums, 0, nums.length -1)
};
```
由于每次从中点开始找最大数组的复杂度为O(n)，所以该算法最终的时间复杂为O(n* log n)级别，总共提交并通过所有的测试用例了。