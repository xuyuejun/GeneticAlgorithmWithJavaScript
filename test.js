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
            console.log("有变异")
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

let mutationProbability = 0.1
let chromosome = "1111111111"

console.log(chromosome)

let a = geneMutation(chromosome)

console.log(a)