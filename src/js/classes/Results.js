// @ts-check
export class Results {

/**
 * Constructs a new instance of the Benchmark class.
 * @param {string} [fecha] - The date of the benchmark.
 * @param {string} [benchpress] - The weight for benchpress.
 * @param {string} [deadlift] - The weight for deadlift.
 * @param {string} [backsquat] - The weight for backsquat.
 * @param {string} [frontsquat] - The weight for frontsquat.
 * @param {string} [snatch] - The weight for snatch.
 * @param {string} [cleanjerk] - The weight for clean and jerk.
 * @param {string} [powerclean] - The weight for power clean.
 * @param {string} [squatclean] - The weight for squat clean.
 * @param {string} [shpress] - The weight for shoulder press.
 * @param {string} [pushpress] - The weight for push press.
 * @param {string} [pushjerk] - The weight for push jerk.
 * @param {string} [userID]
 */

    constructor(fecha,benchpress,deadlift,backsquat,frontsquat,snatch,cleanjerk,powerclean,squatclean,shpress,pushpress,pushjerk,userID='') {
        this.fecha = fecha       
        this.benchpress = benchpress
        this.deadlift = deadlift
        this.backsquat = backsquat
        this.frontsquat = frontsquat
        this.snatch = snatch
        this.cleanjerk = cleanjerk
        this.powerclean = powerclean
        this.squatclean = squatclean
        this.shpress = shpress
        this.pushpress = pushpress
        this.pushjerk = pushjerk
        this.userID = userID
    }
}