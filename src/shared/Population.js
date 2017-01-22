/**
 * Population module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * Symbols for private data
 */
const population = Symbol('population');
const birthRate = Symbol('birthRate');
const deathRate = Symbol('deathRate');
const immigrationRate = Symbol('immigrationRate');
const emmigrationRate = Symbol('emmigrationRate');

/**
 * Population encapsulation
 *
 * @class
 */
export default class Population {
  constructor() {
    this[population] = 0;
    this[birthRate] = 0;
    this[deathRate] = 0;
    this[immigrationRate] = 0;
    this[emmigrationRate] = 0;
  }

  /**
   * Retrieve the current population
   *
   * @return  {Number}  Current population
   */
  get population() {
    return Math.round(this[population]);
  }

  /**
   * Retrive the current birth rate
   *
   * @return  {Number}  Current birth rate
   */
  get birthRate() {
    return this[birthRate];
  }

  /**
   * Retrieve the current death rate
   *
   * @return  {Number}  Current death rate
   */
  get deathRate() {
    return this[deathRate];
  }

  /**
   * Retrieve current immigration rate
   *
   * @return  {Number}  Current immigration rate
   */
  get immigrationRate() {
    return this[immigrationRate];
  }

  /**
   * Retrieve current emmigration rate
   *
   * @return  {Number}  Current emmigration rate
   */
  get emmigrationRate() {
    return this[emmigrationRate];
  }

  /**
   * Updates the current population based on the current birth rate, death rate,
   * immigration rate, and emmigration rate.
   */
  tickPopulationGrowth() {
    const increase = this.population * (this.birthRate + this.immigrationRate);
    const decrease = this.population * (this.deathRate + this.emmigrationRate);
    this[population] = this[population] + (increase - decrease);
  }

  /**
   * Updates the current birth rate based on the current population, food, and
   * territory.
   *
   * @param   {Number}  food        Current food
   * @param   {Number}  territory   Current territory
   */
  updateBirthRate(food = 0, territory = 0) {
    const undercrowding = Math.log((1 + (this.population / (1 + territory))) / 50);
    const baseRate = (1 / 1040) * undercrowding;
    this[birthRate] = baseRate > 2 ? 1 - ((baseRate - 2) / baseRate) : baseRate;
  }

  /**
   * Updates the current death rate based on the current population, food, and
   * territory.
   *
   * @param   {Number}  food        Current food
   * @param   {Number}  territory   Current territory
   */
  updateDeathRate(food = 0, territory = 0) {
    const hunger = 1 / Math.min((this.population - food) / this.population, 1);
    const suicide = Math.min(1 / Math.log((this.population / (1 + territory)) / 777), 1);
    this[deathRate] = (1 / 3640) * hunger * suicide;
  }
}
