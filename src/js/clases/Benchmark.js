export class Benchmark {

/**
 * Constructs a new instance of the Benchmark class.
 *
 * @param {number} benchpress - The weight for benchpress.
 * @param {number} deadlift - The weight for deadlift.
 * @param {number} backsquat - The weight for backsquat.
 * @param {number} frontsquat - The weight for frontsquat.
 * @param {number} snatch - The weight for snatch.
 * @param {number} cleanjerk - The weight for clean and jerk.
 * @param {number} powerclean - The weight for power clean.
 * @param {number} squatclean - The weight for squat clean.
 * @param {number} shpress - The weight for shoulder press.
 * @param {number} pushpress - The weight for push press.
 */

    constructor(benchpress,deadlift,backsquat,frontsquat,snatch,cleanjerk,powerclean,squatclean,shpress,pushpress) {
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
    }
}