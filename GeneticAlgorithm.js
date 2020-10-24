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

var generationsLength = 30;

/** 基因突变概率 */
var mutationProbability = 0.05;

(function initGA(arrayLength) {
    /** 初始化任务集合 */
    tasks = initIntegerArray(arrayLength);

    /** 二进制随机数组长度 */
    binaryEnd = Math.pow(2, arrayLength) - 1

    /** 初始化第一代染色体 */
    initZeroGeneration()

    // // 第一代
    ga(generation0)

    for (let step = 0; step < generationsLength; step++) {
        ga(generations[step])
    }

    console.log(generations)

})(arrayLength)


/**
 * 遗传算法
 */
function ga(parentsGeneration) {
    let generationArray = []
    for (let i = 0; i < chromosomeNum / 2; i++) {
        let parentsTemp = selectBestTwoParents(parentsGeneration)
        let siteTemp = getRandom(0, arrayLength)
        let chromosomeTemp = geneMutation(cross(parentsTemp, siteTemp))
        let fitnessTemp = calFitness(chromosomeTemp)

        let individual = {
            parents: parentsTemp,
            site: siteTemp,
            chromosome: chromosomeTemp,
            fitness: fitnessTemp
        }
        generationArray.push(individual)

        let parentsFlippedTemp = []
        parentsFlippedTemp.push(parentsTemp[1])
        parentsFlippedTemp.push(parentsTemp[0])

        let chromosomeFlippedTemp = geneMutation(cross(parentsFlippedTemp, siteTemp))
        let fitnessFlippedTemp = calFitness(chromosomeFlippedTemp)

        let individualFlipped = {
            parents: parentsFlippedTemp,
            site: siteTemp,
            chromosome: chromosomeFlippedTemp,
            fitness: fitnessFlippedTemp
        }
        generationArray.push(individualFlipped)
    }
    generations.push(generationArray)
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
        return (a.fitness - b.fitness)
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

/**
 * 返回是否变异
 * @param mutationProbability 变异概率
 */
function mutation(mutationProbability) {
    let random = Math.random()
    if (random < mutationProbability) {
        return 1
    } else {
        return 0
    }
}
/**
 * 基因突变
 */
function geneMutation(chromosome) {
    chromosomeArray = chromosome.split("").map(Number)
    let afterGeneMutation = chromosomeArray.map(item => {
        if (mutation(mutationProbability)) {
            if (item == 1) {
                return 0
            } else {
                return 1
            }
        }
        return item
    }).join('')
    return afterGeneMutation
}

function Sum(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += Math.sqrt(array[i])
    }
    return sum
}