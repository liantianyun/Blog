/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (nums.length === 1) return nums[0]
    function getSubArrayMax(nums, start){
        let i = start
        // 先找到一个非负数
        while(nums[i] <= 0) {
            i++
        }
        //如果i已经到了nums.length，说明整个数组都是非正数
        if (i === nums.length) {
            return [Math.max(...nums.slice(start)), i]
        }
        let max = nums[i], sum = nums[i], r = i, rightBorder
        // 找右边界
        while(sum >= 0 && i < nums.length - 1) {
            i ++
            sum = sum + nums[i]
            if(sum > max) {
                max = Math.max(max, sum)
                r = i
            }
        }
        // 记录小于0的位置的临界值，用于返回
        rightBorder = i
        i = r
        // 找左边界
        while(nums[i] <= 0) {
            i--
        }
        let maxR = nums[i], l = i
        sum = nums[i]
        // 从右向左累加
        while(sum >= 0 && i > start) {
            i --
            sum = sum + nums[i]
            if(sum > maxR) {
                maxR = Math.max(maxR, sum)
                l = i
            }
        }
        sum = nums[l]
        i = l
        // 计算l,r的和
        while(i < r) {
            i++
            sum = sum + nums[i]
        }
        return [sum, rightBorder]
    }

    let i = 0, resMax = -Infinity
    while(i < nums.length -1){
        const [max, rightBorder] = getSubArrayMax(nums, i)
        resMax = Math.max(resMax, max)
        i = rightBorder
    }

    return resMax
};