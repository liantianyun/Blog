const plusAndMinus = ['+', '-']
const MultiplyAndDivide = ['*', '/']
const operator = [...plusAndMinus, ...MultiplyAndDivide]

function hanleOperation(stack) {
    const right = stack.pop()
    const operator = stack.pop()
    const left = stack.pop()
    let res
    if (operator === '+') {
        res = left + right
    }
    if (operator === '-') {
        res = left - right
    }
    if (operator === '*') {
        res = left * right
    }
    if (operator === '/') {
        res = left / right
    }
    return res
}

function handlEqual(stack) {
   let res = hanleOperation(stack)
   while (stack.length) {
        stack.push(res)
        res = hanleOperation(stack)
    }
    return res
}

function compute(expression) {
    const chars =  expression.split('')
    const stack = []
    let stackTopOperator = ''
    let res
    chars.forEach(c => {
        if (c === '=') {
            return res = handlEqual(stack)
        }
        if (!operator.includes(c)) {
            stack.push(Number(c))
        } else {
            // 上一个运算符为+-符号，如果遇到*/运算，继续压栈，否则先计算上一次的结果
            // 一个运算符为+*/符号，不论遇到了什么操作符，都先运算上一次的结果
            if(plusAndMinus.includes(stackTopOperator) &&  plusAndMinus.includes('c') || MultiplyAndDivide.includes('c')) {
                stack.push(hanleOperation(stack))
            }
            stack.push(c)
            stackTopOperator = c
        }
    })
    return res
}

console.log(compute('3+5*4/2='))