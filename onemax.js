/** 初代染色体 */
var generation0 = [];

/** 染色体集合 */
var generations = [];

/** 数组长度 */
var arrayLength = 20;

/** 任务集合 */
var tasks = [];

/** 染色体数量 */
var chromosomeNum = 10;

var binaryEnd;

/** 父母选择数量 */
var numberOfParents = 3;

var generationsLength = 100;

/** 基因突变概率 */
var mutationProbability = 0.05;

var fitnessGroup = [];

var bestFitness;

var averageData = [];

var maxData = [];

(function initGA(arrayLength) {
    /** 初始化任务集合 */
    tasks = initIntegerArray(arrayLength);

    /** 二进制随机数组长度 */
    binaryEnd = Math.pow(2, arrayLength) - 1

    /** 初始化第一代染色体 */
    initZeroGeneration()

    // // 第一代
    ga(generation0)

    for (let step = 0; step < generationsLength - 1; step++) {
        ga(generations[step])
    }

    console.log(generations)

    generations.map(item => {
        let a = []
        item.map(item => {
            a.push(item.fitness)
        })
        fitnessGroup.push(a)
    })
    console.log(fitnessGroup)

    fitnessGroup.map(item => {
        maxData.push(Math.max(...item))
        averageData.push(average(item))
    })
    console.log(maxData)
    console.log(averageData)
    drawScatterChart(fitnessGroup, 'FitnessGroup')
    drawStackedLineChart(averageData, maxData, 'OneMaxChart')
})(arrayLength)


/**
 * 遗传算法
 */
function ga(parentsGeneration) {
    let chooseChild = []
    let generationArray = []
    // 选择数组
    for (let i = 0; i < chromosomeNum; i++) {
        chooseChild.push(selectBest(parentsGeneration))
    }

    // 交叉变异
    for (let i = 0; i < chromosomeNum - 1; i += 2) {
        let siteTemp = getRandom(0, arrayLength)
        let crossCache = CrossOver(chooseChild[i], chooseChild[i + 1], siteTemp)
        generationArray.push(crossCache[0])
        generationArray.push(crossCache[1])
    }
    generations.push(generationArray)
}

function CrossOver(par1, par2, site) {
    let crossoverTemp = []

    let crossTemp = geneMutation(cross(par1, par2, site))
    let individualFront = {
        chromosome: crossTemp,
        fitness: calFitness(crossTemp)
    }
    crossoverTemp.push(individualFront)

    let crossTempBack = geneMutation(cross(par2, par1, site))

    let individualBack = {
        chromosome: crossTempBack,
        fitness: calFitness(crossTempBack)
    }

    crossoverTemp.push(individualBack)

    return crossoverTemp
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
            chromosome: randomArray[i],
            fitness: calFitness(randomArray[i])
        }
        generation0.push(individual)
    }
}

function selectBest(lastGeneration) {
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
    let temp = parentTempArr.sort(function (a, b) {
        return (b.fitness - a.fitness)
    })
    return temp[0]
}

/**
 * 计算 染色体适应度
 * @param chromosome
 */
function calFitness(chromosome) {
    let binaryArray = chromosome.split("").map(Number);
    let fitnessSum = 0
    for (j = 0; j < binaryArray.length; j++) {
        if (binaryArray[j] == 1) {
            fitnessSum++
        }
    }
    return fitnessSum
}

/**
 * 染色体交叉
 */
function cross(par1, par2, site) {
    return par1.chromosome.slice(0, site) + par2.chromosome.slice(site)
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