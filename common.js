/** 
 * 初始化整数数组
 * @param length 数组长度
 */
function initIntegerArray(length) {
    var integerArray = [];
    for (let i = 1; i <= length; i++) {
        integerArray.push(i);
    }
    return integerArray;
}

/**
 * 获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 */
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * 随机生成不重复数组
 * @param len 数组长度
 * @param start 起始位置
 * @param end 结束为止
 */
function getRandomArr(len, start, end) {
    let arr = [];
    while (arr.length < len) {
        let num = getRandom(start, end);
        if (arr.indexOf(num) == -1) {
            arr.push(num);
        }
    }
    return arr;
}

/**
 * 转换为二进制字符串并补0
 * @param length 长度
 * @param num 传入数字
 */
function convertToBinary(length, num) {
    var str = num.toString(2);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

function average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}