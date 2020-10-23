/** 初代染色体 */
var generation0 = {
    chromosome: [],
    fitness: []
}

/** 染色体 */
var generation = {
    parents: [],
    site: [],
    chromosome: [],
    fitness: []
}

/** 染色体集合 */
var generations = []

/** 数组长度 */
var arrayLength = 11;

/** 任务集合 */
var tasks = [];

/** 染色体数量 */
var chromosomeNum = 10;

var binaryEnd;

var generationFitness0 = [];

(function initGA(arrayLength) {
    /** 初始化任务集合 */
    tasks = initIntegerArray(arrayLength);

    /** 二进制随机数组长度 */
    binaryEnd = Math.pow(2, arrayLength) - 1

    /** 生成第0代二进制随机数组 */
    generation0.chromosome = getRandomArr(chromosomeNum, 1, binaryEnd).map(item => {
        return convertToBinary(arrayLength, item)
    });

    /** 根据基因计算fitness */
    generation0.fitness = generation0.chromosome.map(item => {
        return calFitness(item)
    })

    console.log(generation0)

    
})(arrayLength)

/**
 * 计算 染色体适应度
 * @param chromosome
 */
function calFitness(chromosome) {
    let binaryArray = chromosome.split("").map(Number);
    let A = []
    let B = []
    for (j = 0; j < binaryArray.length; j++) {
        if (binaryArray[j] == 1) {
            A.push(tasks[j])
        } else {
            B.push(tasks[j])
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