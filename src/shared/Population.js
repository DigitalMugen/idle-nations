/**
 * Population module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * WeakMaps for private data
 */
const populations = new WeakMap();
const birthRates = new WeakMap();
const deathRates = new WeakMap();
const immigrationRates = new WeakMap();
const emmigrationRates = new WeakMap();

/**
 * Population encapsulation
 *
 * @class
 */
export default class Population {
  constructor() {
    populations.set(this, 0);
    birthRates.set(this, 0);
    deathRates.set(this, 0);
    immigrationRates.set(this, 0);
    emmigrationRates.set(this, 0);
  }

  /**
   * Retrieve the current population
   *
   * @return  {Number}  Current population
   */
  get currentPopulation() {
    return Math.round(populations.get(this));
  }

  /**
   * Retrive the current birth rate
   *
   * @return  {Number}  Current birth rate
   */
  get birthRate() {
    return birthRates.get(this);
  }

  /**
   * Retrieve the current death rate
   *
   * @return  {Number}  Current death rate
   */
  get deathRate() {
    return deathRates.get(this);
  }

  /**
   * Retrieve current immigration rate
   *
   * @return  {Number}  Current immigration rate
   */
  get immigrationRate() {
    return immigrationRates.get(this);
  }

  /**
   * Retrieve current emmigration rate
   *
   * @return  {Number}  Current emmigration rate
   */
  get emmigrationRate() {
    return emmigrationRates.get(this);
  }

  /**
   * Updates the current population based on the current birth rate, death rate,
   * immigration rate, and emmigration rate.
   */
  tickPopulationGrowth() {
    const increase = this.currentPopulation * (this.birthRate + this.immigrationRate);
    const decrease = this.currentPopulation * (this.deathRate + this.emmigrationRate);
    populations.set(this, populations.get(this) + (increase - decrease));
  }
}
