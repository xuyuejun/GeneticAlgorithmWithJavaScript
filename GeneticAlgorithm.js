/** 整数数组长度 */
var integerArrayLength = 10;

/** 任务集合 */
var tasks = [];

/** 染色体数量 */
var chromosomeNum = 10;

var binaryEnd;

var generationFitness0 = [];

(function initGA(_integerArrayLength) {
    /** 初始化任务集合 */
    tasks = initIntegerArray(integerArrayLength);

    /** 二进制结束 */
    binaryEnd = Math.pow(2, integerArrayLength) - 1

    /** 生成十进制随机数组 */
    generation0 = getRandomArr(chromosomeNum, 1, binaryEnd);

    /** 转换成二进制随机数组 */
    let generationBinary0 = generation0.map(item => {
        return convertToBinary(10, item)
    })

    /** 初始化第0代 */
    for (let i = 0; i < 10; i++) {
        generationFitness0.push(fitness = calFitness(generationBinary0[i], tasks))
    }

    console.log(generationFitness0)
    console.log(generation0)
    console.log(generationBinary0)

    /** 第一代 */
    

})(integerArrayLength)

/**
 * 计算 染色体适应度
 * @param chromosomes
 */
function calFitness(chromosomes, numberArray) {
    let binaryArray = chromosomes.split("").map(Number);
    let A = []
    let B = []
    for (j = 0; j < binaryArray.length; j++) {
        if (binaryArray[j] == 1) {
            A.push(numberArray[j])
        } else {
            B.push(numberArray[j])
        }
    }
    return Math.abs(Sum(A) - Sum(B))
}

function Sum(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += Math.sqrt(array[i])
    }
    return sum
}