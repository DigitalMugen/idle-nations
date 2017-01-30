/**
 * Food module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * Symbols for "private" properties
 */
const sFood = Symbol('food');
const sGatheringRate = Symbol('gatheringRate');
const sFarmingRate = Symbol('farmingRate');
const sConsumptionRate = Symbol('consumptionRate');
const sImports = Symbol('imports');
const sExports = Symbol('exports');

/**
 * Food encapsulation
 * @class
 */
export default class Food {

  /**
   * Creates a new food model
   * @constructor
   * @param   {Number}  startingFood  Starting food
   * @return  {Food}    Newly created food model
   */
  constructor(startingFood = 1) {
    this[sFood] = startingFood;
    this[sGatheringRate] = 0;
    this[sFarmingRate] = 0;
    this[sConsumptionRate] = 0;
    this[sImports] = 0;
    this[sExports] = 0;
  }

  /**
   * Total food
   * @member  {Number}
   */
  get food() {
    return Math.round(this[sFood]);
  }

  get gatheringRate() {
    return this[sGatheringRate];
  }

  get farmingRate() {
    return this[sFarmingRate];
  }

  get consumptionRate() {
    return this[sConsumptionRate];
  }

  get netProduction() {
    return (this.gatheringRate + this.farmingRate) - this.consumptionRate;
  }

  get imports() {
    return this[sImports];
  }

  get exports() {
    return this[sExports];
  }

  get netTrade() {
    return this.imports - this.exports;
  }

  get netGrowth() {
    return this.netProduction + this.netTrade;
  }

  updateGatheringRate(population = 0, territory = 0) {
    this[sGatheringRate] = Math.min(territory ** (4 / 3), population * 2);
    return this;
  }

  updateConsumptionRate(population = 0) {
    this[sConsumptionRate] = Math.max(population, 0);
    return this;
  }

  tickFoodGrowth(tickLength = 0) {
    this[sFood] = Math.max(this[sFood] + (this.netGrowth * tickLength), 0);
    return this;
  }
}
