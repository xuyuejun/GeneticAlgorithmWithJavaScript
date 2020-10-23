/** 初代染色体 */
var generation0 = [];

/** 染色体集合 */
var generations = [];

/** 数组长度 */
var arrayLength = 11;

/** 任务集合 */
var tasks = [];

/** 染色体数量 */
var chromosomeNum = 10;

var binaryEnd;

/** 父母选择数量 */
var numberOfParents = 3;

(function initGA(arrayLength) {
    /** 初始化任务集合 */
    tasks = initIntegerArray(arrayLength);

    /** 二进制随机数组长度 */
    binaryEnd = Math.pow(2, arrayLength) - 1

    /** 初始化第一代染色体 */
    initZeroGeneration()

    console.log(generation0)

    // 第一代
    ga()

})(arrayLength)


/**
 * 遗传算法
 */
function ga() {

    let parentsTemp = selectBestTwoParents(generation0)
    let siteTemp = getRandom(0, arrayLength)
    let chromosomeTemp = cross(parentsTemp, siteTemp)
    let fitnessTemp = calFitness(chromosomeTemp)

    let individual = {
        parents: parentsTemp,
        site: siteTemp,
        chromosome: chromosomeTemp,
        fitness: fitnessTemp
    }

    // console.log(individual)

    console.log(parentsTemp)

    let parentsFlipTemp = []

    // 翻转父母数组
    parentsFlipTemp.push(parentsTemp[1])
    parentsFlipTemp.push(parentsTemp[0])
    
    console.log(parentsFlipTemp)


}

/**
 * 初始化零号染色体
 */
function initZeroGeneration() {
    let randomArray = getRandomArr(chromosomeNum, 1, binaryEnd).map(item => {
        return convertToBinary(arrayLength, item)
    });
    for (let i = 0; i < chromosomeNum; i++) {
        let individual = {
            parents: null,
            site: null,
            chromosome: randomArray[i],
            fitness: calFitness(randomArray[i])
        }
        generation0.push(individual)
    }
}

function selectBestTwoParents(lastGeneration) {
    let random = getRandomArr(numberOfParents, 0, chromosomeNum - 1)
    let parentTempArr = []
    for (i = 0; i < random.length; i++) {
        let parents = {
            index: random[i],
            chromosome: lastGeneration[random[i]].chromosome,
            fitness: lastGeneration[random[i]].fitness
        }
        parentTempArr.push(parents)
    }
    return parentTempArr.sort(function (a, b) {
        return (b.fitness - a.fitness)
    }).slice(0, 2)
}

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

/**
 * 染色体交叉
 */
function cross(parents, site) {
    return parents[0].chromosome.slice(0, site) + parents[1].chromosome.slice(site)
}

function Sum(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += Math.sqrt(array[i])
    }
    return sum
}